'use client';

import React, { useState, useEffect, useRef, useCallback } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { VoiceOrb } from './VoiceOrb';
import {
  medicalHistoryQuestions,
  Question,
  setNestedValue,
} from '@/lib/medicalHistoryQuestions';
import { useSaveMedicalHistory } from '@/hooks/useMedicalHistory';
import { Mic, ChevronRight, Check, Loader2, Keyboard, Volume2 } from 'lucide-react';

interface MedicalHistoryOnboardingProps {
  userName: string;
  onComplete: () => void;
}

type Language = 'urdu' | 'english';
type InputMode = 'voice' | 'text';

export const MedicalHistoryOnboarding: React.FC<
  MedicalHistoryOnboardingProps
> = ({ userName, onComplete }) => {
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(0);
  const [language, setLanguage] = useState<Language>('urdu');
  const [inputMode, setInputMode] = useState<InputMode>('voice'); // Voice input by default
  const [answers, setAnswers] = useState<Record<string, any>>({});
  const [currentAnswer, setCurrentAnswer] = useState<string>('');
  const [selectedOptions, setSelectedOptions] = useState<string[]>([]);
  const [isListening, setIsListening] = useState(false);
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);
  const [isTranscribing, setIsTranscribing] = useState(false);
  const [voiceEnabled, setVoiceEnabled] = useState(true);
  const [ttsNotice, setTtsNotice] = useState('');
  const [transcript, setTranscript] = useState<
    Array<{ role: string; content: string; timestamp: string }>
  >([]);
  const [lastSpokenAnswer, setLastSpokenAnswer] = useState<string>('');

  const { saveMedicalHistory, isSaving } = useSaveMedicalHistory();
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const audioChunksRef = useRef<Blob[]>([]);

  const currentQuestion = medicalHistoryQuestions[currentQuestionIndex];
  const isLastQuestion =
    currentQuestionIndex === medicalHistoryQuestions.length - 1;
  const progress =
    ((currentQuestionIndex + 1) / medicalHistoryQuestions.length) * 100;

  // Browser TTS fallback using Web Speech API
  const speakWithBrowserTTS = useCallback(
    (text: string) => {
      if ('speechSynthesis' in window) {
        window.speechSynthesis.cancel();
        const utterance = new SpeechSynthesisUtterance(text);
        const voices = window.speechSynthesis.getVoices();
        if (language === 'urdu') {
          const urduVoice = voices.find(
            v => v.lang.includes('ur') || v.lang.includes('hi')
          );
          if (urduVoice) utterance.voice = urduVoice;
        }
        utterance.rate = 0.9;
        utterance.onend = () => setIsSpeaking(false);
        utterance.onerror = () => setIsSpeaking(false);
        window.speechSynthesis.speak(utterance);
      } else {
        setIsSpeaking(false);
      }
    },
    [language]
  );

  // Text-to-Speech function using ElevenLabs with browser fallback
  const speak = useCallback(
    async (text: string, lang?: 'urdu' | 'english') => {
      if (!voiceEnabled) return;

      try {
        setIsSpeaking(true);
        const response = await fetch('/api/voice/tts', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            text,
            language: lang || language,
          }),
        });

        if (!response.ok) {
          const data = await response.json().catch(() => null);
          if (data?.code === 'TTS_DISABLED') {
            setTtsNotice(data.error);
            setIsSpeaking(false);
            return;
          }
          console.warn('TTS API unavailable, using browser TTS fallback');
          speakWithBrowserTTS(text);
          return;
        }

        const audioBlob = await response.blob();
        setTtsNotice('');
        const audioUrl = URL.createObjectURL(audioBlob);

        if (audioRef.current) {
          audioRef.current.src = audioUrl;
          audioRef.current.play();
        }
      } catch (error) {
        console.warn('Speech error, using browser fallback:', error);
        speakWithBrowserTTS(text);
      }
    },
    [voiceEnabled, language, speakWithBrowserTTS]
  );

  // Handle audio end
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.onended = () => setIsSpeaking(false);
    }
  }, []);

  // Speak current question on load
  useEffect(() => {
    if (currentQuestion && voiceEnabled) {
      const questionText =
        language === 'urdu'
          ? currentQuestion.questionUrdu
          : currentQuestion.questionEnglish;
      speak(questionText, language);
    }
  }, [currentQuestionIndex, language, voiceEnabled, speak, currentQuestion]);

  // Speech-to-Text using Groq Whisper API
  const transcribeAudio = async (audioBlob: Blob) => {
    try {
      setIsTranscribing(true);
      const formData = new FormData();
      formData.append('audio', audioBlob, 'recording.webm');
      formData.append('language', language === 'urdu' ? 'ur' : 'en');

      const response = await fetch('/api/voice/stt', {
        method: 'POST',
        body: formData,
      });

      if (!response.ok) {
        throw new Error('Transcription failed');
      }

      const result = await response.json();
      if (result.text) {
        const spokenText = result.text;
        setCurrentAnswer(spokenText);
        setLastSpokenAnswer(spokenText);

        // Auto-advance for voice mode after showing the answer briefly
        if (inputMode === 'voice') {
          setTimeout(() => {
            // Auto-submit the answer
            handleVoiceSubmit(spokenText);
          }, 1500); // Wait 1.5s to show the answer before moving
        }
      }
    } catch (error) {
      console.error('Transcription error:', error);
    } finally {
      setIsTranscribing(false);
    }
  };

  // Handle voice submit (auto-advance)
  const handleVoiceSubmit = async (spokenAnswer: string) => {
    if (!currentQuestion) return;

    // Prepare answer based on question type
    let answerValue: any = spokenAnswer;

    // For number type, try to parse
    if (currentQuestion.type === 'number') {
      const parsed = parseFloat(spokenAnswer.replace(/[^\d.]/g, ''));
      answerValue = isNaN(parsed) ? null : parsed;
    }

    // Skip _closing field
    if (currentQuestion.field !== '_closing') {
      // Update answers
      const newAnswers = { ...answers };
      setNestedValue(newAnswers, currentQuestion.field, answerValue);
      setAnswers(newAnswers);

      // Add to transcript
      const questionText =
        language === 'urdu'
          ? currentQuestion.questionUrdu
          : currentQuestion.questionEnglish;
      setTranscript(prev => [
        ...prev,
        {
          role: 'assistant',
          content: questionText,
          timestamp: new Date().toISOString(),
        },
        {
          role: 'user',
          content: String(answerValue),
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    // Check if last question
    if (isLastQuestion) {
      await handleComplete();
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
      setLastSpokenAnswer('');
      setSelectedOptions([]);
    }
  };

  // Start voice recording
  const startRecording = async () => {
    try {
      const stream = await navigator.mediaDevices.getUserMedia({ audio: true });
      const mediaRecorder = new MediaRecorder(stream, {
        mimeType: 'audio/webm',
      });
      mediaRecorderRef.current = mediaRecorder;
      audioChunksRef.current = [];

      mediaRecorder.ondataavailable = event => {
        if (event.data.size > 0) {
          audioChunksRef.current.push(event.data);
        }
      };

      mediaRecorder.onstop = async () => {
        const audioBlob = new Blob(audioChunksRef.current, {
          type: 'audio/webm',
        });
        stream.getTracks().forEach(track => track.stop());
        await transcribeAudio(audioBlob);
      };

      mediaRecorder.start();
      setIsListening(true);
    } catch (error) {
      console.error('Error starting recording:', error);
    }
  };

  // Stop voice recording
  const stopRecording = () => {
    if (mediaRecorderRef.current && isListening) {
      mediaRecorderRef.current.stop();
      setIsListening(false);
    }
  };

  // Toggle voice input
  const toggleVoiceInput = () => {
    if (isListening) {
      stopRecording();
    } else {
      startRecording();
    }
  };

  // Handle option selection for select/multiselect
  const handleOptionSelect = (value: string) => {
    if (currentQuestion.type === 'multiselect') {
      if (value === 'none') {
        setSelectedOptions(['none']);
      } else {
        setSelectedOptions(prev => {
          const filtered = prev.filter(v => v !== 'none');
          return filtered.includes(value)
            ? filtered.filter(v => v !== value)
            : [...filtered, value];
        });
      }
    } else {
      setSelectedOptions([value]);
    }
  };

  // Handle boolean answer
  const handleBooleanAnswer = (value: boolean) => {
    setSelectedOptions([value ? 'yes' : 'no']);
  };

  // Submit current answer and move to next question
  const handleNext = async () => {
    if (!currentQuestion) return;

    // Prepare answer based on question type
    let answerValue: any;
    switch (currentQuestion.type) {
      case 'boolean':
        answerValue = selectedOptions[0] === 'yes';
        break;
      case 'select':
        answerValue = selectedOptions[0] || null;
        break;
      case 'multiselect':
        answerValue = selectedOptions.filter(v => v !== 'none');
        break;
      case 'number':
        answerValue = currentAnswer ? parseFloat(currentAnswer) : null;
        break;
      case 'text':
      default:
        answerValue = currentAnswer || null;
        break;
    }

    // Skip _closing field
    if (currentQuestion.field !== '_closing') {
      // Update answers
      const newAnswers = { ...answers };
      setNestedValue(newAnswers, currentQuestion.field, answerValue);
      setAnswers(newAnswers);

      // Add to transcript
      const questionText =
        language === 'urdu'
          ? currentQuestion.questionUrdu
          : currentQuestion.questionEnglish;
      setTranscript(prev => [
        ...prev,
        {
          role: 'assistant',
          content: questionText,
          timestamp: new Date().toISOString(),
        },
        {
          role: 'user',
          content: String(answerValue),
          timestamp: new Date().toISOString(),
        },
      ]);
    }

    // Check if last question
    if (isLastQuestion) {
      await handleComplete();
    } else {
      // Move to next question
      setCurrentQuestionIndex(prev => prev + 1);
      setCurrentAnswer('');
      setSelectedOptions([]);
    }
  };

  // Complete onboarding
  const handleComplete = async () => {
    setIsProcessing(true);
    try {
      // Prepare data for saving - ensure proper types
      const medicalHistoryData = {
        age: answers.age || null,
        gender: answers.gender || null,
        bloodGroup: answers.bloodGroup || null,
        weight: answers.weight || null,
        height: answers.height || null,
        familyHistory: answers.familyHistory || {},
        chronicConditions: Array.isArray(answers.chronicConditions)
          ? answers.chronicConditions
          : [],
        currentMedications: answers.currentMedications
          ? [answers.currentMedications].flat()
          : [],
        allergies: answers.allergies ? [answers.allergies].flat() : [],
        pastSurgeries: answers.pastSurgeries
          ? [answers.pastSurgeries].flat()
          : [],
        smokingStatus: answers.smokingStatus || null,
        alcoholConsumption: answers.alcoholConsumption || null,
        onboardingTranscript: transcript,
        isComplete: true,
      };

      console.log('Saving medical history:', medicalHistoryData);
      const result = await saveMedicalHistory(medicalHistoryData);
      console.log('Save result:', result);

      // Call onComplete callback to close modal and redirect
      onComplete();
    } catch (error) {
      console.error('Error saving medical history:', error);
      // Still call onComplete to not leave user stuck
      // The data might have partially saved
      onComplete();
    } finally {
      setIsProcessing(false);
    }
  };

  // Check if current answer is valid
  const isAnswerValid = () => {
    if (!currentQuestion.required) return true;

    switch (currentQuestion.type) {
      case 'boolean':
      case 'select':
        return selectedOptions.length > 0;
      case 'multiselect':
        return selectedOptions.length > 0;
      case 'number':
        return currentAnswer !== '' && !isNaN(parseFloat(currentAnswer));
      case 'text':
        return (
          currentAnswer.trim() !== '' || currentQuestion.field === '_closing'
        );
      default:
        return true;
    }
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center overflow-y-auto bg-[#effcfb] px-4 py-8 text-[#121e1e]">
      {/* Hidden audio element */}
      <audio ref={audioRef} className="hidden" />

      {/* Main Content */}
      <motion.div
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        className="relative w-full max-w-3xl rounded-[28px] border border-[#d9e9e7] bg-white p-6 shadow-[0_24px_70px_rgba(0,82,82,0.13)] md:p-8"
      >
        {/* Header */}
        <div className="flex items-center justify-between mb-6">
          <div>
            <p className="mb-1 text-xs font-bold uppercase tracking-[0.18em] text-[#1f6b6b]">Medico patient intake</p>
            <h2 className={`text-2xl font-semibold text-[#121e1e] [font-family:var(--font-outfit)] ${language === 'urdu' ? 'font-urdu' : ''}`}>
              {language === 'urdu' ? 'طبی تاریخ' : 'MEDICAL HISTORY'}
            </h2>
            <p className="mt-1 text-sm text-[#687776]">
              {language === 'urdu'
                ? `${userName}، آئیے آپ کی صحت کے بارے میں جانتے ہیں`
                : `${userName}, let's learn about your health`}
            </p>
          </div>
          <div className="flex items-center gap-2">
            <button
              onClick={() => setVoiceEnabled(!voiceEnabled)}
              aria-label={voiceEnabled ? 'Turn question audio off' : 'Turn question audio on'}
              className={`rounded-full p-2 transition-colors ${voiceEnabled ? 'bg-[#d8f8f4] text-[#005252]' : 'bg-[#eff7f6] text-[#687776]'}`}
            >
              <Volume2 className="h-4 w-4" />
            </button>
            {/* Language Toggle */}
            <button
              onClick={() =>
                setLanguage(language === 'urdu' ? 'english' : 'urdu')
              }
              className="rounded-full border border-[#cfe1df] bg-white px-3 py-1.5 text-sm font-semibold text-[#005252] transition-colors hover:bg-[#effcfb]"
            >
              {language === 'urdu' ? 'English' : 'اردو'}
            </button>
          </div>
        </div>

        {ttsNotice && (
          <p role="status" className="mb-4 rounded-lg bg-amber-50 px-3 py-2 text-sm text-amber-800">
            {ttsNotice}
          </p>
        )}

        {/* Progress Bar */}
        <div className="mb-5 flex items-center justify-between text-xs text-[#687776]"><span>Question {currentQuestionIndex + 1} of {medicalHistoryQuestions.length}</span><span>{Math.round(progress)}% complete</span></div>
        <div className="mb-7 h-1.5 overflow-hidden rounded-full bg-[#e4efee]">
          <motion.div
            className="h-full rounded-full bg-[#005252]"
            initial={{ width: 0 }}
            animate={{ width: `${progress}%` }}
            transition={{ duration: 0.3 }}
          />
        </div>

        <div className="mb-7 flex justify-center">
          <div className="flex rounded-xl bg-[#eff7f6] p-1">
            <button onClick={() => setInputMode('voice')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${inputMode === 'voice' ? 'bg-white text-[#005252] shadow-sm' : 'text-[#687776]'}`}><Mic className="h-4 w-4" />Voice</button>
            <button onClick={() => setInputMode('text')} className={`flex items-center gap-2 rounded-lg px-4 py-2 text-sm font-semibold ${inputMode === 'text' ? 'bg-white text-[#005252] shadow-sm' : 'text-[#687776]'}`}><Keyboard className="h-4 w-4" />Text</button>
          </div>
        </div>

        {/* Voice Orb */}
        {inputMode === 'voice' && <div className="mb-6 flex flex-col items-center">
          <VoiceOrb
            isListening={isListening}
            isSpeaking={isSpeaking}
            isProcessing={isProcessing || isTranscribing}
            size="md"
            onClick={toggleVoiceInput}
          />

          {/* Voice mode hint - show when not speaking, not listening, not processing */}
          {!isListening && !isSpeaking && !isTranscribing && (
            <p className="mt-2 text-sm text-[#687776]">
              {language === 'urdu' ? 'بولنے کے لیے ٹیپ کریں' : 'Tap to speak'}
            </p>
          )}

          {/* AI Speaking indicator */}
          {isSpeaking && (
            <p className="mt-2 text-sm text-[#1f6b6b]">
              {language === 'urdu' ? 'AI بول رہا ہے...' : 'AI is speaking...'}
            </p>
          )}

          {/* Listening indicator */}
          {isListening && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center gap-2 text-sm text-[#005252]"
            >
              <span className="w-2 h-2 bg-red-500 rounded-full animate-pulse" />
              {language === 'urdu' ? 'سن رہا ہوں...' : 'Listening...'}
            </motion.p>
          )}

          {/* Transcribing indicator */}
          {isTranscribing && (
            <motion.p
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              className="mt-2 flex items-center gap-2 text-sm text-[#8a6200]"
            >
              <Loader2 size={14} className="animate-spin" />
              {language === 'urdu' ? 'سمجھ رہا ہوں...' : 'Processing...'}
            </motion.p>
          )}

          {/* Show transcribed answer */}
          {lastSpokenAnswer &&
            inputMode === 'voice' &&
            !isListening &&
            !isTranscribing && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-4 rounded-xl border border-[#cfe1df] bg-[#effcfb] px-6 py-3"
              >
                <p className="mb-1 text-xs text-[#687776]">
                  {language === 'urdu' ? 'آپ کا جواب:' : 'Your answer:'}
                </p>
                <p
                  className={`font-medium text-[#121e1e] ${language === 'urdu' ? 'font-urdu text-right' : ''}`}
                >
                  {lastSpokenAnswer}
                </p>
              </motion.div>
            )}
        </div>}

        {/* Question */}
        <AnimatePresence mode="wait">
          <motion.div
            key={currentQuestionIndex}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="mb-7 rounded-2xl bg-[#effcfb] p-5 text-center md:p-6"
          >
            <p
              className={`text-xl leading-relaxed text-[#121e1e] ${language === 'urdu' ? 'font-urdu text-right' : ''}`}
            >
              {language === 'urdu'
                ? currentQuestion?.questionUrdu
                : currentQuestion?.questionEnglish}
            </p>
          </motion.div>
        </AnimatePresence>

        {/* Input Area */}
        <div className="mb-6">
          {/* Boolean Type */}
          {currentQuestion?.type === 'boolean' && (
            <div className="flex justify-center gap-4">
              <button
                onClick={() => handleBooleanAnswer(true)}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  selectedOptions[0] === 'yes'
                    ? 'bg-[#005252] text-white'
                    : 'border border-[#cfe1df] bg-white text-[#3f4948] hover:bg-[#effcfb]'
                }`}
              >
                {language === 'urdu' ? 'ہاں' : 'Yes'}
              </button>
              <button
                onClick={() => handleBooleanAnswer(false)}
                className={`px-8 py-3 rounded-xl font-medium transition-all ${
                  selectedOptions[0] === 'no'
                    ? 'bg-[#005252] text-white'
                    : 'border border-[#cfe1df] bg-white text-[#3f4948] hover:bg-[#effcfb]'
                }`}
              >
                {language === 'urdu' ? 'نہیں' : 'No'}
              </button>
            </div>
          )}

          {/* Select Type */}
          {currentQuestion?.type === 'select' && currentQuestion.options && (
            <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
              {currentQuestion.options.map(option => (
                <button
                  key={option.value}
                  onClick={() => handleOptionSelect(option.value)}
                  className={`px-4 py-3 rounded-xl font-medium transition-all text-sm ${
                    selectedOptions.includes(option.value)
                      ? 'bg-[#005252] text-white'
                      : 'border border-[#cfe1df] bg-white text-[#3f4948] hover:bg-[#effcfb]'
                  }`}
                >
                  {language === 'urdu' ? option.labelUrdu : option.labelEnglish}
                </button>
              ))}
            </div>
          )}

          {/* Multiselect Type */}
          {currentQuestion?.type === 'multiselect' &&
            currentQuestion.options && (
              <div className="grid grid-cols-2 md:grid-cols-3 gap-3">
                {currentQuestion.options.map(option => (
                  <button
                    key={option.value}
                    onClick={() => handleOptionSelect(option.value)}
                    className={`px-4 py-3 rounded-xl font-medium transition-all text-sm flex items-center justify-center gap-2 ${
                      selectedOptions.includes(option.value)
                        ? 'bg-[#005252] text-white'
                        : 'border border-[#cfe1df] bg-white text-[#3f4948] hover:bg-[#effcfb]'
                    }`}
                  >
                    {selectedOptions.includes(option.value) && (
                      <Check size={16} />
                    )}
                    {language === 'urdu'
                      ? option.labelUrdu
                      : option.labelEnglish}
                  </button>
                ))}
              </div>
            )}

          {/* Number/Text Type */}
          {(currentQuestion?.type === 'number' ||
            currentQuestion?.type === 'text') &&
            currentQuestion.field !== '_closing' && (
              <div className="flex flex-col items-center gap-4">
                {inputMode === 'voice' ? <p className="text-center text-sm text-[#687776]">{language === 'urdu' ? 'جواب دینے کے لیے مائیک پر ٹیپ کریں' : 'Tap the mic to answer'}</p> : <div className="w-full"><label htmlFor="medical-history-answer" className="mb-2 block text-sm font-semibold text-[#3f4948]">{language === 'urdu' ? 'اپنا جواب لکھیں' : 'Your answer'}</label><textarea id="medical-history-answer" autoFocus rows={3} value={currentAnswer} onChange={event => setCurrentAnswer(event.target.value)} inputMode={currentQuestion.type === 'number' ? 'decimal' : 'text'} className={`w-full resize-none rounded-2xl border border-[#cfe1df] bg-white px-4 py-3 text-[#121e1e] outline-none transition focus:border-[#005252] focus:ring-2 focus:ring-[#a8efea] ${language === 'urdu' ? 'font-urdu text-right' : ''}`} placeholder={language === 'urdu' ? 'یہاں لکھیں…' : 'Type your answer…'} /></div>}
              </div>
            )}

          {/* Closing Message - No input needed */}
          {currentQuestion?.field === '_closing' && (
            <div className="text-center">
              <motion.div
                initial={{ scale: 0 }}
                animate={{ scale: 1 }}
                className="mx-auto mb-4 flex h-20 w-20 items-center justify-center rounded-full bg-[#005252]"
              >
                <Check size={40} className="text-white" />
              </motion.div>
            </div>
          )}
        </div>

        {/* Next Button */}
        {(currentQuestion?.type === 'boolean' ||
          currentQuestion?.type === 'select' ||
          currentQuestion?.type === 'multiselect' ||
          inputMode === 'text' ||
          currentQuestion?.field === '_closing') && (
          <div className="flex justify-center">
            <button
              onClick={handleNext}
              disabled={!isAnswerValid() || isSaving || isProcessing}
              className={`px-8 py-3 rounded-xl font-medium flex items-center gap-2 transition-all ${
                isAnswerValid() && !isSaving && !isProcessing
                  ? 'bg-[#005252] text-white hover:bg-[#1f6b6b]'
                  : 'cursor-not-allowed bg-[#dfe9e8] text-[#8a9695]'
              }`}
            >
              {isSaving || isProcessing ? (
                <>
                  <Loader2 size={20} className="animate-spin" />
                  {language === 'urdu' ? 'محفوظ ہو رہا ہے...' : 'Saving...'}
                </>
              ) : isLastQuestion ? (
                <>
                  {language === 'urdu' ? 'مکمل' : 'Complete'}
                  <Check size={20} />
                </>
              ) : (
                <>
                  {language === 'urdu' ? 'اگلا' : 'Next'}
                  <ChevronRight size={20} />
                </>
              )}
            </button>
          </div>
        )}
      </motion.div>
    </div>
  );
};
