'use client';

import { useEffect, useState, useRef, Suspense } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { motion, AnimatePresence } from 'framer-motion';
import {
  Send,
  Clock,
  ChevronLeft,
  Loader2,
  Volume2,
  VolumeX,
  AlertTriangle,
  FileText,
  Brain,
  Sparkles,
  MessageSquare,
  X,
  CheckCircle,
  Paperclip,
  ThumbsUp,
  ThumbsDown,
  MoreHorizontal,
  UserRound,
  Info,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import Image from 'next/image';
import Link from 'next/link';
import { ReportCompleteDialog } from '@/components/ui/ReportCompleteDialog';
import {
  ThinkingActivity,
  TypingText,
  generateThinkingSteps,
} from '@/components/ui/ThinkingActivity';
import { VoiceOrb } from '@/components/ui/VoiceOrbNew';

interface ThinkingStep {
  id: string;
  agent: string;
  action: string;
  status: 'pending' | 'running' | 'completed';
  details?: string;
  icon: 'database' | 'brain' | 'search' | 'file' | 'shield' | 'sparkles';
}

interface Message {
  id: string;
  role: 'assistant' | 'user';
  content: string;
  urdu?: string;
  timestamp: Date;
  severity?:
    | 'critical'
    | 'high'
    | 'moderate'
    | 'initial'
    | 'normal'
    | 'emergency'
    | 'urgent';
  confidenceLevel?: number;
  diseaseCount?: number;
  thinkingSteps?: ThinkingStep[];
  thinkingDuration?: number;
  isTyping?: boolean;
}

interface SessionInfo {
  id: string;
  confidenceLevel: number;
  severity: string;
  identifiedSymptoms: string[];
  isConfident: boolean;
  diseaseCount: number;
  conversationTurn: number;
}

interface DiagnosisProgress {
  initialDiseases: number;
  currentDiseases: number;
  confidence: number;
  topConditions: string[];
  symptomsIdentified: number;
}

interface SpeechRecognitionResultLike {
  0: { transcript: string };
}

interface SpeechRecognitionEventLike {
  results: ArrayLike<SpeechRecognitionResultLike>;
}

interface SpeechRecognitionErrorLike {
  error: string;
}

interface BrowserSpeechRecognition {
  continuous: boolean;
  interimResults: boolean;
  lang: string;
  onresult: ((event: SpeechRecognitionEventLike) => void) | null;
  onerror: ((event: SpeechRecognitionErrorLike) => void) | null;
  onend: (() => void) | null;
  start: () => void;
  stop: () => void;
}

type SpeechRecognitionWindow = Window & {
  SpeechRecognition?: new () => BrowserSpeechRecognition;
  webkitSpeechRecognition?: new () => BrowserSpeechRecognition;
};

function InterviewPageContent() {
  const [user, setUser] = useState<{
    id: string;
    name?: string;
    email?: string;
  } | null>(null);
  const [loading, setLoading] = useState(true);
  const [messages, setMessages] = useState<Message[]>([]);
  const [inputValue, setInputValue] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [sessionTime, setSessionTime] = useState(0);
  const [showEndDialog, setShowEndDialog] = useState(false);
  const [isGeneratingReport, setIsGeneratingReport] = useState(false);
  const [sessionInfo, setSessionInfo] = useState<SessionInfo | null>(null);
  const [showReportDialog, setShowReportDialog] = useState(false);
  const [patientInfo, setPatientInfo] = useState<{
    age?: number;
    gender?: string;
    chronicConditions?: string[];
  } | null>(null);

  // Voice mode states
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isListening, setIsListening] = useState(false);
  const [ttsNotice, setTtsNotice] = useState('');
  const [speechLanguage, setSpeechLanguage] = useState<'ur-PK' | 'en-US'>('ur-PK');
  const [currentAudio, setCurrentAudio] = useState<HTMLAudioElement | null>(
    null
  );

  // Diagnosis tracking
  const [diagnosisProgress, setDiagnosisProgress] = useState<DiagnosisProgress>(
    {
      initialDiseases: 50,
      currentDiseases: 50,
      confidence: 0,
      topConditions: [],
      symptomsIdentified: 0,
    }
  );

  // Store actual diagnosis state from API for subsequent calls
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [diagnosisState, setDiagnosisState] = useState<any>(null);

  // Thinking state for current processing
  const [currentThinkingSteps, setCurrentThinkingSteps] = useState<
    ThinkingStep[]
  >([]);
  const [thinkingStartTime, setThinkingStartTime] = useState<number>(
    Date.now()
  );

  // Show side panel on larger screens
  const [showActivityPanel, setShowActivityPanel] = useState(false);
  // Voice mode sidebar visibility
  const [showVoiceSidebar, setShowVoiceSidebar] = useState(false);
  const [attachedFileNames, setAttachedFileNames] = useState<string[]>([]);
  const [messageFeedback, setMessageFeedback] = useState<Record<string, 'up' | 'down'>>({});
  const [showIssueInfo, setShowIssueInfo] = useState(false);

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const fileInputRef = useRef<HTMLInputElement>(null);
  const searchParams = useSearchParams();
  const mode = searchParams?.get('mode') === 'voice' ? 'voice' : 'text';
  const router = useRouter();

  // Speech recognition ref
  const recognitionRef = useRef<BrowserSpeechRecognition | null>(null);
  // TTS request in flight ref to prevent duplicates
  const ttsInFlightRef = useRef<boolean>(false);
  const initializationStartedRef = useRef(false);
  const ttsAvailable = process.env.NEXT_PUBLIC_TTS_ENABLED === 'true';

  // Initialize session
  useEffect(() => {
    if (initializationStartedRef.current) return;
    initializationStartedRef.current = true;

    const initializeSession = async () => {
      const { data } = await authClient.getSession();
      if (!data?.user) {
        router.push('/login');
        setLoading(false);
        return;
      }
      setUser({
        id: data.user.id,
        name: data.user.name,
        email: data.user.email,
      });

      // Fetch patient medical history
      try {
        const historyRes = await fetch('/api/medical-history');
        if (historyRes.ok) {
          const historyData = await historyRes.json();
          const medicalHistory = historyData.medicalHistory || historyData.data;
          if (medicalHistory) {
            setPatientInfo({
              age: medicalHistory.age,
              gender: medicalHistory.gender,
              chronicConditions:
                medicalHistory.chronicConditions || [],
            });
          }
        }
      } catch (e) {
        console.error('Failed to fetch medical history:', e);
      }

      // Create new clinical session
      try {
        const sessionRes = await fetch('/api/clinical-chat', {
          method: 'PUT',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: data.user.id }),
        });
        const sessionData = await sessionRes.json();
        if (sessionData.sessionId) {
          setSessionInfo({
            id: sessionData.sessionId,
            confidenceLevel: 0,
            severity: 'normal',
            identifiedSymptoms: [],
            isConfident: false,
            diseaseCount: 50,
            conversationTurn: 0,
          });
        }
      } catch (e) {
        console.error('Failed to create session:', e);
      }

      // Initialize with welcome message
      const welcomeMessage: Message = {
        id: '1',
        role: 'assistant',
        content:
          "Hello! I'm your AI health assistant. I'll ask you some questions to understand your symptoms better. What brings you here today?",
        urdu: 'السلام علیکم! میں آپ کا اے آئی ہیلتھ اسسٹنٹ ہوں۔ میں آپ کی علامات کو بہتر سمجھنے کے لیے کچھ سوالات پوچھوں گا۔ آج آپ یہاں کیوں آئے ہیں؟',
        timestamp: new Date(),
        severity: 'normal',
        confidenceLevel: 0,
        diseaseCount: 50,
        isTyping: false,
      };
      setMessages([welcomeMessage]);

      // Auto-speak welcome in voice mode
      if (ttsAvailable && mode === 'voice') {
        setTimeout(
          () => speakText(welcomeMessage.urdu || welcomeMessage.content),
          500
        );
      }

      setLoading(false);
    };
    initializeSession();
  // TTS availability is fixed at build time; session initialization must run once.
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [router, mode, ttsAvailable]);

  // Session timer
  useEffect(() => {
    const timer = setInterval(() => {
      setSessionTime(prev => prev + 1);
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: 'smooth' });
  }, [messages]);

  const formatTime = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${mins.toString().padStart(2, '0')}:${secs.toString().padStart(2, '0')}`;
  };

  // Text-to-speech function
  const speakText = async (text: string) => {
    if (!text) return;
    // Prevent duplicate TTS calls using ref (survives React re-renders)
    if (ttsInFlightRef.current || isSpeaking || currentAudio) {
      console.log('TTS already in progress, skipping...');
      return;
    }
    ttsInFlightRef.current = true;
    setIsSpeaking(true);
    try {
      const response = await fetch('/api/voice/tts', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ text, language: 'ur' }),
      });
      if (response.ok) {
        setTtsNotice('');
        const audioBlob = await response.blob();
        const audioUrl = URL.createObjectURL(audioBlob);
        const audio = new Audio(audioUrl);
        setCurrentAudio(audio);
        audio.onended = () => {
          setIsSpeaking(false);
          setCurrentAudio(null);
          ttsInFlightRef.current = false;
        };
        audio.onerror = () => {
          setIsSpeaking(false);
          setCurrentAudio(null);
          ttsInFlightRef.current = false;
        };
        await audio.play();
      } else {
        const data = await response.json().catch(() => null);
        setTtsNotice(
          data?.error || 'Text-to-speech is not working right now.'
        );
        setIsSpeaking(false);
        ttsInFlightRef.current = false;
      }
    } catch (e) {
      console.error('TTS failed:', e);
      setIsSpeaking(false);
      ttsInFlightRef.current = false;
    }
  };

  // Speech recognition
  const startListening = () => {
    if ('webkitSpeechRecognition' in window || 'SpeechRecognition' in window) {
      const speechWindow = window as SpeechRecognitionWindow;
      const SpeechRecognition =
        speechWindow.SpeechRecognition ||
        speechWindow.webkitSpeechRecognition;
      if (!SpeechRecognition) return;
      const recognition = new SpeechRecognition();
      recognition.continuous = false;
      recognition.interimResults = true;
      recognition.lang = speechLanguage;

      recognition.onresult = (event: SpeechRecognitionEventLike) => {
        const transcript = Array.from(event.results)
          .map(result => result[0].transcript)
          .join('');
        setInputValue(transcript);
      };

      recognition.onerror = (event: SpeechRecognitionErrorLike) => {
        console.error('Speech recognition error:', event.error);
        setIsListening(false);
      };

      recognition.onend = () => {
        setIsListening(false);
        // Keep the transcript visible so the patient can review it before sending.
      };

      recognitionRef.current = recognition;
      recognition.start();
      setIsListening(true);
    } else {
      alert('Speech recognition is not supported in your browser.');
    }
  };

  const stopListening = () => {
    if (recognitionRef.current) {
      recognitionRef.current.stop();
    }
    setIsListening(false);
  };

  // Main send message handler
  const handleSendMessage = async () => {
    if ((!inputValue.trim() && attachedFileNames.length === 0) || !user || isLoading) return;

    const attachmentContext = attachedFileNames.length
      ? `Attached files: ${attachedFileNames.join(', ')}`
      : '';
    const outgoingContent = [inputValue.trim(), attachmentContext]
      .filter(Boolean)
      .join('\n');

    const userMessage: Message = {
      id: Date.now().toString(),
      role: 'user',
      content: outgoingContent,
      timestamp: new Date(),
    };

    setMessages(prev => [...prev, userMessage]);
    const messageToSend = outgoingContent;
    setInputValue('');
    setAttachedFileNames([]);
    setIsLoading(true);
    setThinkingStartTime(Date.now());

    // Generate thinking steps for animation
    const thinkingSteps = generateThinkingSteps(
      sessionInfo?.confidenceLevel || 0,
      diagnosisProgress.currentDiseases
    );
    setCurrentThinkingSteps(thinkingSteps);

    try {
      const conversationHistory = messages.map(m => ({
        role: m.role,
        content: m.content,
      }));

      const response = await fetch('/api/clinical-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: messageToSend,
          sessionId: sessionInfo?.id,
          userId: user.id,
          conversationHistory,
          patientInfo,
          // Pass stored diagnosis state if available (from previous API response)
          diagnosisState: diagnosisState || undefined,
          conversationTurn: sessionInfo?.conversationTurn || 0,
        }),
      });

      const data = await response.json();
      const thinkingDuration = Math.round(
        (Date.now() - thinkingStartTime) / 1000
      );

      if (data.success && data.response) {
        // Use the server's evidence-based shortlist directly.
        const newConfidence = data.response.confidenceLevel || 0;
        const newDiseaseCount = data.response.potentialDiseases?.length || 0;

        // Store the diagnosis state from API for next request
        if (data.nextState?.diagnosisState) {
          setDiagnosisState(data.nextState.diagnosisState);
        }

        // Update diagnosis progress
        setDiagnosisProgress(prev => ({
          ...prev,
          currentDiseases: newDiseaseCount,
          confidence: newConfidence,
          topConditions:
            data.response.potentialDiseases
              ?.slice(0, 5)
              .map((d: { name: string }) => d.name) || prev.topConditions,
          symptomsIdentified:
            data.response.identifiedSymptoms?.length || prev.symptomsIdentified,
        }));

        const aiMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content: data.response.content,
          urdu: data.response.urdu,
          timestamp: new Date(),
          severity: data.response.severity,
          confidenceLevel: newConfidence,
          diseaseCount: newDiseaseCount,
          thinkingSteps: thinkingSteps.map(s => ({
            ...s,
            status: 'completed' as const,
          })),
          thinkingDuration,
          isTyping: true, // Enable typing animation
        };

        setMessages(prev => [...prev, aiMessage]);

        // Update session info
        setSessionInfo(prev =>
          prev
            ? {
                ...prev,
                confidenceLevel: newConfidence,
                severity: data.response.severity,
                identifiedSymptoms:
                  data.response.identifiedSymptoms || prev.identifiedSymptoms,
                isConfident: data.response.isConfident,
                diseaseCount: newDiseaseCount,
                conversationTurn: (prev.conversationTurn || 0) + 1,
              }
            : null
        );

        // Auto-speak in voice mode (after typing animation)
        if (ttsAvailable && mode === 'voice' && data.response.urdu) {
          setTimeout(() => {
            speakText(data.response.urdu);
          }, 2000); // Wait for typing animation
        }

        // Show completion popup when the server confirms enough information.
        // SOAP/Safety agents are NOT triggered yet - only on user confirmation
        if (data.response.isConfident) {
          // Add completion message
          const completionMessage: Message = {
            id: (Date.now() + 2).toString(),
            role: 'assistant',
            content:
              'I have established a clinical narrative of your case and forwarded the Clinical Narrative Report to the doctor.',
            urdu: 'میں نے آپ کے کیس کی طبی تفصیل مرتب کر لی ہے اور کلینیکل نیریٹو رپورٹ ڈاکٹر کو بھیج دی ہے۔',
            timestamp: new Date(),
            severity: 'normal',
            confidenceLevel: newConfidence,
            isTyping: false,
          };
          setMessages(prev => [...prev, completionMessage]);

          // Speak completion message in voice mode
          if (ttsAvailable && mode === 'voice') {
            setTimeout(() => {
              speakText(completionMessage.urdu || completionMessage.content);
            }, 3000);
          }

          setTimeout(() => {
            setShowReportDialog(true);
          }, 4000);
        }
      } else {
        // Error message
        const errorMessage: Message = {
          id: (Date.now() + 1).toString(),
          role: 'assistant',
          content:
            'I apologize, but I encountered an issue. Could you please describe your symptoms again?',
          urdu: 'معذرت، کوئی مسئلہ پیش آگیا۔ براہ کرم اپنی علامات دوبارہ بیان کریں۔',
          timestamp: new Date(),
          isTyping: true,
        };
        setMessages(prev => [...prev, errorMessage]);
      }
    } catch (error) {
      console.error('Failed to send message:', error);
      const errorMessage: Message = {
        id: (Date.now() + 1).toString(),
        role: 'assistant',
        content: "I'm having trouble connecting. Please try again.",
        urdu: 'کنکشن میں مسئلہ ہے۔ براہ کرم دوبارہ کوشش کریں۔',
        timestamp: new Date(),
        isTyping: true,
      };
      setMessages(prev => [...prev, errorMessage]);
    } finally {
      setIsLoading(false);
      setCurrentThinkingSteps([]);
    }
  };

  const handleEndSession = () => {
    setShowEndDialog(true);
  };

  // Generate report - triggers SOAP and Safety agents
  const generateReport = async () => {
    setIsGeneratingReport(true);

    try {
      // Call API with generateReport flag to trigger SOAP/Safety agents
      const response = await fetch('/api/clinical-chat', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          message: 'Generate final report',
          sessionId: sessionInfo?.id,
          userId: user?.id,
          conversationHistory: messages.map(m => ({
            role: m.role,
            content: m.content,
          })),
          diagnosisState: diagnosisState,
          conversationTurn: sessionInfo?.conversationTurn || 0,
          generateReport: true, // This triggers SOAP + Safety agents
        }),
      });

      const data = await response.json();

      if (data.success && data.orchestration?.reportGenerated) {
        console.log('✅ Report generated:', data.orchestration.reportId);
        console.log('   Department:', data.orchestration.department);
        console.log('   Triage:', data.orchestration.triageLabel);

        // Navigate to dashboard with report info
        router.push(
          `/patient/home?reportId=${data.orchestration.reportId}`
        );
      } else {
        // Still navigate but without report
        router.push('/patient/home');
      }
    } catch (error) {
      console.error('Failed to generate report:', error);
      router.push('/patient/home');
    }
  };

  // Mark message typing as complete
  const handleTypingComplete = (messageId: string) => {
    setMessages(prev =>
      prev.map(m => (m.id === messageId ? { ...m, isTyping: false } : m))
    );
  };

  // Confidence color helper
  const getConfidenceColor = (level: number) => {
    if (level >= 80) return 'text-green-600';
    if (level >= 50) return 'text-yellow-600';
    return 'text-blue-600';
  };

  // Severity badge helper
  const getSeverityBadge = (severity: string) => {
    const config: Record<string, { bg: string; text: string; label: string }> =
      {
        critical: { bg: 'bg-red-500', text: 'text-white', label: 'Critical' },
        emergency: { bg: 'bg-red-500', text: 'text-white', label: 'Emergency' },
        urgent: { bg: 'bg-orange-500', text: 'text-white', label: 'Urgent' },
        high: { bg: 'bg-orange-500', text: 'text-white', label: 'High' },
        moderate: {
          bg: 'bg-yellow-500',
          text: 'text-white',
          label: 'Moderate',
        },
        normal: { bg: 'bg-green-500', text: 'text-white', label: 'Stable' },
        initial: { bg: 'bg-blue-500', text: 'text-white', label: 'Initial' },
      };
    const { bg, text, label } = config[severity] || config.initial;
    return (
      <span
        className={`px-2 py-0.5 rounded-full text-xs font-medium ${bg} ${text}`}
      >
        {label}
      </span>
    );
  };

  const issueCount = messages.filter(
    message =>
      message.role === 'assistant' &&
      ['critical', 'emergency', 'urgent', 'high'].includes(message.severity || '')
  ).length;

  const toggleFeedback = (messageId: string, value: 'up' | 'down') => {
    setMessageFeedback(current => {
      if (current[messageId] === value) {
        const next = { ...current };
        delete next[messageId];
        return next;
      }
      return { ...current, [messageId]: value };
    });
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#effcfb]">
        <motion.div
          animate={{ rotate: 360 }}
          transition={{ duration: 1, repeat: Infinity, ease: 'linear' }}
          className="h-12 w-12 rounded-full border-4 border-[#b8d8d5] border-t-[#005252]"
        />
      </div>
    );
  }

  // Voice Mode UI
  if (mode === 'voice') {
    return (
      <div className="flex min-h-screen bg-[#effcfb] text-[#121e1e]">
        {/* Main content area */}
        <div className="flex-1 flex flex-col h-screen overflow-hidden">
          {/* Header - Same as chat mode */}
          <header className="z-40 flex-shrink-0 border-b border-[#064343] bg-[#005252] shadow-lg">
            <div className="mx-auto flex w-full max-w-4xl items-center justify-between gap-2 px-3 py-3 sm:px-4">
              <div className="flex min-w-0 items-center gap-2 sm:gap-4">
                <Link href="/patient/home">
                  <button className="p-2 rounded-xl hover:bg-white/20 transition-colors">
                    <ChevronLeft className="w-5 h-5 text-white" />
                  </button>
                </Link>
                <div className="flex items-center gap-3">
                  <div className="hidden h-10 w-10 items-center justify-center overflow-hidden rounded-xl bg-white/10 shadow-sm sm:flex">
                    <Image
                      src="/medico/icon.png"
                      alt="Medico"
                      width={40}
                      height={40}
                    />
                  </div>
                  <div>
                    <h1 className="font-semibold text-white">
                      Voice Interview
                    </h1>
                    <p className="hidden text-xs text-white/70 sm:block">
                      AI-powered clinical assessment
                    </p>
                  </div>
                </div>
              </div>
              <div className="flex shrink-0 items-center gap-2 sm:gap-3">
                <div className="flex items-center gap-1.5 rounded-lg bg-white/10 px-2 py-1.5 shadow-sm sm:px-3">
                  <Clock className="w-4 h-4 text-white/70" />
                  <span className="text-sm font-medium text-white">
                    {formatTime(sessionTime)}
                  </span>
                </div>
                <button
                  onClick={handleEndSession}
                  className="px-4 py-1.5 text-sm font-medium text-red-500 bg-white rounded-xl hover:bg-red-50 transition-colors"
                >
                  <span className="sm:hidden">End</span><span className="hidden sm:inline">End Session</span>
                </button>
              </div>
            </div>
          </header>

          {/* Main Voice Interface */}
          <main className="flex flex-1 flex-col items-center justify-center overflow-y-auto px-4 py-8">
            {/* Current message display */}
            <AnimatePresence mode="wait">
              {messages.length > 0 && (
                <motion.div
                  key={messages[messages.length - 1].id}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  exit={{ opacity: 0, y: -20 }}
                  className="w-full max-w-lg mb-8"
                >
                  <div className="rounded-2xl border border-[#d9e9e7] bg-white p-6 shadow-sm">
                    {messages[messages.length - 1].role === 'assistant' &&
                      isLoading && (
                        <ThinkingActivity
                          isThinking={true}
                          steps={currentThinkingSteps}
                        />
                      )}
                    <p className="mb-2 text-center text-lg text-[#3f4948]">
                      {messages[messages.length - 1].content}
                    </p>
                    {messages[messages.length - 1].urdu && (
                      <p
                        className="text-center font-urdu text-lg text-[#005252]"
                        dir="rtl"
                      >
                        {messages[messages.length - 1].urdu}
                      </p>
                    )}
                  </div>
                </motion.div>
              )}
            </AnimatePresence>

            {/* Voice Orb - Disabled when AI is speaking */}
            <VoiceOrb
              isSpeaking={isSpeaking}
              isListening={isListening}
              isProcessing={isLoading}
              onStartListening={startListening}
              onStopListening={stopListening}
              disabled={isLoading || isSpeaking}
            />

            <div className="mt-5 flex rounded-full border border-[#cfe1df] bg-white p-1 shadow-sm" aria-label="Microphone language">
              <button
                onClick={() => setSpeechLanguage('ur-PK')}
                aria-pressed={speechLanguage === 'ur-PK'}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${speechLanguage === 'ur-PK' ? 'bg-[#005252] text-white' : 'text-[#566462] hover:bg-[#eff7f6]'}`}
              >
                Urdu microphone
              </button>
              <button
                onClick={() => setSpeechLanguage('en-US')}
                aria-pressed={speechLanguage === 'en-US'}
                className={`rounded-full px-4 py-2 text-xs font-semibold transition ${speechLanguage === 'en-US' ? 'bg-[#005252] text-white' : 'text-[#566462] hover:bg-[#eff7f6]'}`}
              >
                English microphone
              </button>
            </div>

            {ttsNotice && (
              <p role="status" className="mt-3 text-center text-sm text-amber-700">
                {ttsNotice}
              </p>
            )}
            {!ttsAvailable && (
              <p role="status" className="mt-3 rounded-full bg-[#fff5d7] px-4 py-2 text-center text-xs font-semibold text-[#765300]">
                Voice playback is unavailable right now. Microphone transcription still works.
              </p>
            )}

            {/* Transcription display */}
            {inputValue && (
              <motion.div
                initial={{ opacity: 0, y: 10 }}
                animate={{ opacity: 1, y: 0 }}
                className="mt-6 w-full max-w-md"
              >
                <div className="rounded-xl border border-[#d9e9e7] bg-white p-4 shadow-sm">
                  <p className="text-center text-[#3f4948]">{inputValue}</p>
                  <div className="flex justify-center gap-2 mt-3">
                    <button
                      onClick={() => setInputValue('')}
                      className="px-4 py-2 text-sm font-medium text-slate-600 bg-white border border-slate-200 rounded-lg hover:bg-slate-50 transition-colors flex items-center gap-1"
                    >
                      <X className="w-4 h-4" />
                      Clear
                    </button>
                    <button
                      onClick={handleSendMessage}
                      className="flex items-center gap-1 rounded-lg bg-[#005252] px-4 py-2 text-sm font-medium text-white transition-colors hover:bg-[#1f6b6b]"
                    >
                      <Send className="w-4 h-4" />
                      Send
                    </button>
                  </div>
                </div>
              </motion.div>
            )}
          </main>
        </div>

        {/* Toggle Sidebar Button */}
        <button
          onClick={() => setShowVoiceSidebar(!showVoiceSidebar)}
          className={`fixed top-1/2 z-[60] -translate-y-1/2 rounded-l-lg border border-r-0 border-[#d9e9e7] bg-white p-2 shadow-lg transition-all ${showVoiceSidebar ? 'right-80' : 'right-0'}`}
        >
          <ChevronLeft
            className={`w-5 h-5 text-slate-600 transition-transform ${showVoiceSidebar ? '' : 'rotate-180'}`}
          />
        </button>

        {/* Right Sidebar - Analysis Progress & Agent Reasoning */}
        <AnimatePresence>
          {showVoiceSidebar && (
            <motion.div
              initial={{ width: 0, opacity: 0 }}
              animate={{ width: 320, opacity: 1 }}
              exit={{ width: 0, opacity: 0 }}
              className="fixed inset-y-0 right-0 z-50 flex-shrink-0 overflow-hidden border-l border-[#d9e9e7] bg-white shadow-xl xl:relative xl:shadow-none"
            >
              <div className="w-80 p-4 h-full overflow-y-auto">
                <div className="flex items-center justify-between mb-4">
                  <h2 className="text-slate-700 font-semibold">
                    Analysis Progress
                  </h2>
                  <button
                    onClick={() => setShowVoiceSidebar(false)}
                    className="p-1 text-slate-400 hover:text-slate-600"
                  >
                    <X className="w-4 h-4" />
                  </button>
                </div>

                {/* Progress Card */}
                <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center gap-2">
                      <Brain className="w-5 h-5 text-primary" />
                      <span className="text-slate-600 text-sm font-medium">
                        Interview completeness
                      </span>
                    </div>
                    <span
                      className={`text-lg font-bold ${getConfidenceColor(diagnosisProgress.confidence)}`}
                    >
                      {diagnosisProgress.confidence}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${diagnosisProgress.confidence}%` }}
                      className="h-full bg-[#005252]"
                    />
                  </div>
                </div>

                {/* Agent Reasoning - Current Thinking */}
                {(isLoading || currentThinkingSteps.length > 0) && (
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-600 mb-3">
                      {isLoading ? 'Agent Reasoning' : 'Last Analysis'}
                    </h3>
                    <ThinkingActivity
                      isThinking={isLoading}
                      steps={currentThinkingSteps}
                    />
                  </div>
                )}

                {/* Previous Message Reasoning */}
                {messages.length > 0 &&
                  messages[messages.length - 1].thinkingSteps && (
                    <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                      <h3 className="text-sm font-medium text-slate-600 mb-3">
                        Previous Reasoning
                      </h3>
                      <ThinkingActivity
                        isThinking={false}
                        steps={messages[messages.length - 1].thinkingSteps!}
                        duration={
                          messages[messages.length - 1].thinkingDuration
                        }
                      />
                    </div>
                  )}

                {/* Stats */}
                <div className="grid grid-cols-2 gap-3 mb-4">
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                      <Sparkles className="w-3 h-3" />
                      Symptoms
                    </div>
                    <p className="text-xl font-bold text-slate-700">
                      {diagnosisProgress.symptomsIdentified}
                    </p>
                  </div>
                  <div className="bg-slate-50 rounded-xl p-3 text-center border border-slate-100">
                    <div className="flex items-center justify-center gap-1 text-slate-400 text-xs mb-1">
                      <MessageSquare className="w-3 h-3" />
                      Questions
                    </div>
                    <p className="text-xl font-bold text-slate-700">
                      {sessionInfo?.conversationTurn || 0}
                    </p>
                  </div>
                </div>

                {/* Top Conditions */}
                {diagnosisProgress.topConditions.length > 0 && (
                  <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                    <h3 className="text-sm font-medium text-slate-600 mb-3">
                      Top Conditions
                    </h3>
                    <div className="space-y-2">
                      {diagnosisProgress.topConditions.map((condition, i) => (
                        <div
                          key={i}
                          className="flex items-center gap-2 text-sm text-slate-600"
                        >
                          <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs">
                            {i + 1}
                          </span>
                          {condition}
                        </div>
                      ))}
                    </div>
                  </div>
                )}

                {/* Session Info */}
                <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                  <h3 className="text-sm font-medium text-slate-600 mb-3">
                    Session Info
                  </h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex justify-between">
                      <span className="text-slate-400">Duration</span>
                      <span className="text-slate-700">
                        {formatTime(sessionTime)}
                      </span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Mode</span>
                      <span className="text-slate-700">Voice</span>
                    </div>
                    <div className="flex justify-between">
                      <span className="text-slate-400">Status</span>
                      {sessionInfo?.severity &&
                        getSeverityBadge(sessionInfo.severity)}
                    </div>
                  </div>
                </div>
              </div>
            </motion.div>
          )}
        </AnimatePresence>

        {/* Dialogs */}
        <ReportCompleteDialog
          isOpen={showReportDialog}
          onClose={() => setShowReportDialog(false)}
          sessionId={sessionInfo?.id}
        />
      </div>
    );
  }

  // Text Mode UI
  return (
    <div className="relative h-screen overflow-hidden bg-[#edf7f3] text-[#173a45]">
      <Image src="/medico/interview-reference.png" alt="" fill priority sizes="100vw" className="hidden object-cover object-center lg:block" />

      <div className="relative z-10 grid h-full lg:grid-cols-[276px_minmax(0,1fr)]">
        <aside aria-hidden="true" className="hidden lg:block" />

        <section className="flex min-w-0 flex-col gap-3 p-3 sm:p-4 lg:pl-0">
          <header className="flex min-h-[78px] shrink-0 items-center justify-between gap-3 rounded-[22px] border border-white/80 bg-white/90 px-4 shadow-[0_14px_40px_rgba(18,77,73,.08)] backdrop-blur-xl sm:px-6">
            <div className="flex min-w-0 items-center gap-3">
              <Link href="/patient/home" aria-label="Back to patient home" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border border-[#dce9e6] text-[#07545a] transition hover:bg-[#edf7f4]"><ChevronLeft className="h-5 w-5" /></Link>
              <Image src="/medico/icon.png" alt="Medico" width={45} height={45} className="hidden h-11 w-11 sm:block" />
              <div className="min-w-0"><h1 className="truncate text-lg font-semibold text-[#07545a] sm:text-xl">Health Interview</h1><p className="hidden text-xs text-[#6f8285] sm:block">AI-powered clinical assessment</p></div>
            </div>
            <div className="flex shrink-0 items-center gap-2">
              <button onClick={() => setShowActivityPanel(true)} className="hidden items-center gap-2 rounded-full bg-[#eaf5f2] px-4 py-2.5 text-sm font-semibold text-[#07545a] transition hover:bg-[#dcefeb] sm:flex"><Brain className="h-4 w-4" />Activity</button>
              <div className="flex items-center gap-2 rounded-full bg-[#eaf5f2] px-3 py-2.5 text-sm font-semibold text-[#07545a]"><Clock className="h-4 w-4" /><span>{formatTime(sessionTime)}</span></div>
              <button onClick={handleEndSession} className="rounded-full bg-[#f34f55] px-4 py-2.5 text-sm font-semibold text-white shadow-sm transition hover:bg-[#df3e45] sm:px-6"><span className="sm:hidden">End</span><span className="hidden sm:inline">End Session</span></button>
            </div>
          </header>

          <div className="grid min-h-0 flex-1 gap-4 xl:grid-cols-[minmax(0,1fr)_300px] xl:pl-[96px]">
            <main className="min-h-0 overflow-y-auto overscroll-contain bg-[#eef7f4]/95 px-2 py-3 sm:px-5">
              <div className="mx-auto max-w-[820px] space-y-5 pb-2">
                <AnimatePresence>
                  {messages.map(message => (
                    <motion.article key={message.id} initial={{ opacity: 0, y: 16 }} animate={{ opacity: 1, y: 0 }} className={`flex items-start gap-3 ${message.role === 'user' ? 'justify-end' : 'justify-start'}`}>
                      {message.role === 'assistant' ? (
                        <>
                          <div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-4 border-[#d8efeb] bg-white shadow-sm"><Image src="/medico/care-team.jpg" alt="AI health assistant" fill sizes="44px" className="object-cover object-right" /></div>
                          <div className="min-w-0 flex-1 rounded-[22px] border border-white bg-white/95 p-4 shadow-[0_12px_30px_rgba(16,78,73,.07)] sm:p-5">
                            {message.thinkingDuration !== undefined && <button onClick={() => setShowActivityPanel(true)} className="mb-3 inline-flex items-center gap-2 text-sm font-medium text-[#526a74]"><Sparkles className="h-4 w-4 text-[#f6a313]" />Thought for {message.thinkingDuration}s</button>}
                            {message.severity && message.severity !== 'normal' && <div className="mb-3">{getSeverityBadge(message.severity)}</div>}
                            <div className="whitespace-pre-wrap text-[15px] leading-7 text-[#35536a] sm:text-base">{message.isTyping ? <TypingText text={message.content} speed={15} onComplete={() => handleTypingComplete(message.id)} /> : message.content}</div>
                            {message.urdu && !message.isTyping && <div className="mt-4 rounded-xl bg-[#eef8f7] px-4 py-3"><p className="font-urdu text-right text-[15px] leading-8 text-[#164f58]" dir="rtl">{message.urdu}</p></div>}
                            <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                              <div className="min-w-[210px] flex-1">
                                <button onClick={() => ttsAvailable && message.urdu && speakText(message.urdu)} disabled={isSpeaking || !ttsAvailable || !message.urdu} className="flex items-center gap-2 text-xs font-medium text-[#f05a35] disabled:cursor-not-allowed disabled:opacity-75">{isSpeaking ? <VolumeX className="h-4 w-4" /> : <Volume2 className="h-4 w-4" />}{ttsAvailable ? 'Listen in Urdu' : 'Urdu audio unavailable right now'}</button>
                                {message.confidenceLevel !== undefined && <div className="mt-3 flex items-center gap-3"><span className={`shrink-0 text-xs font-medium ${getConfidenceColor(message.confidenceLevel)}`}>{message.confidenceLevel}% complete</span><div className="h-1.5 flex-1 overflow-hidden rounded-full bg-[#e2ecec]"><motion.div initial={{ width: 0 }} animate={{ width: `${message.confidenceLevel}%` }} className="h-full rounded-full bg-[#438af5]" /></div></div>}
                              </div>
                              <div className="flex items-center rounded-xl bg-[#f4f7f7] p-1 text-[#405b69]">
                                <button onClick={() => toggleFeedback(message.id, 'up')} aria-label="Helpful response" className={`rounded-lg p-2 ${messageFeedback[message.id] === 'up' ? 'bg-white text-[#008f82] shadow-sm' : 'hover:bg-white'}`}><ThumbsUp className="h-4 w-4" /></button>
                                <button onClick={() => toggleFeedback(message.id, 'down')} aria-label="Unhelpful response" className={`rounded-lg p-2 ${messageFeedback[message.id] === 'down' ? 'bg-white text-[#e34c50] shadow-sm' : 'hover:bg-white'}`}><ThumbsDown className="h-4 w-4" /></button>
                                <button onClick={() => setShowActivityPanel(true)} aria-label="More response details" className="rounded-lg p-2 hover:bg-white"><MoreHorizontal className="h-4 w-4" /></button>
                              </div>
                            </div>
                          </div>
                        </>
                      ) : (
                        <><div className="max-w-[78%] whitespace-pre-wrap rounded-[22px] rounded-br-md bg-[#006c68] px-5 py-3.5 text-sm leading-6 text-white shadow-md sm:text-base">{message.content}</div><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#cfe9e4] text-[#07545a]"><UserRound className="h-5 w-5" /></span></>
                      )}
                    </motion.article>
                  ))}
                </AnimatePresence>
                {isLoading && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} className="flex items-start gap-3"><div className="relative h-11 w-11 shrink-0 overflow-hidden rounded-full border-4 border-[#d8efeb] bg-white"><Image src="/medico/care-team.jpg" alt="AI health assistant" fill sizes="44px" className="object-cover object-right" /></div><div className="min-w-0 flex-1 rounded-[22px] border border-white bg-white/95 p-5 shadow-sm"><ThinkingActivity isThinking steps={currentThinkingSteps} /></div></motion.div>}
                <div ref={messagesEndRef} />
              </div>
            </main>

            <aside aria-label="Interview reassurance" className="hidden xl:block" />
          </div>

          <div className="relative shrink-0 rounded-[24px] border border-white/80 bg-white/95 p-3 shadow-[0_-8px_32px_rgba(17,70,66,.08)] backdrop-blur-xl xl:-ml-[48px] xl:mr-[210px]">
            {showIssueInfo && <div className="absolute bottom-[calc(100%+8px)] left-0 z-20 w-72 rounded-2xl border border-[#efd8d8] bg-white p-4 text-xs leading-5 text-[#5c6c70] shadow-xl"><div className="flex items-center gap-2 font-semibold text-[#a53b3f]"><Info className="h-4 w-4" />Clinical safety alerts</div><p className="mt-2">{issueCount ? `${issueCount} potentially urgent issue${issueCount === 1 ? '' : 's'} detected in this conversation. End the session to generate a report for clinical review.` : 'No urgent clinical safety alerts have been detected so far.'}</p></div>}
            <div className="flex items-center gap-2">
              <button onClick={() => setShowIssueInfo(value => !value)} className={`hidden shrink-0 items-center gap-2 rounded-full px-4 py-3 text-sm font-semibold sm:flex ${issueCount ? 'bg-[#ffe6e7] text-[#d43e43]' : 'bg-[#eaf5f2] text-[#53706f]'}`}><AlertTriangle className="h-4 w-4" />{issueCount ? `${issueCount} Issue${issueCount === 1 ? '' : 's'}` : 'No alerts'}</button>
              <div className="relative flex min-w-0 flex-1 items-center rounded-full border border-[#cddddb] bg-white px-2 focus-within:border-[#5ea89f] focus-within:ring-2 focus-within:ring-[#bce8e2]">
                <input ref={fileInputRef} type="file" accept="image/*,.pdf" multiple className="hidden" onChange={event => { const files = Array.from(event.target.files || []); setAttachedFileNames(files.map(file => file.name)); event.currentTarget.value = ''; }} />
                <button onClick={() => fileInputRef.current?.click()} aria-label="Attach a file" className="rounded-full p-3 text-[#577180] transition hover:bg-[#edf5f3]"><Paperclip className="h-5 w-5" /></button>
                <input value={inputValue} onChange={event => setInputValue(event.target.value)} onKeyDown={event => { if (event.key === 'Enter' && !event.shiftKey && !isLoading) { event.preventDefault(); handleSendMessage(); } }} placeholder="Describe your symptoms... / اپنی علامات بیان کریں" disabled={isLoading} className="min-w-0 flex-1 bg-transparent py-3 text-sm text-[#173a45] outline-none placeholder:text-[#7b8c92] disabled:opacity-50 sm:text-base" />
                <button onClick={handleSendMessage} disabled={(!inputValue.trim() && attachedFileNames.length === 0) || isLoading} aria-label="Send message" className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full bg-[#006c68] text-white shadow-sm transition hover:bg-[#005853] disabled:cursor-not-allowed disabled:opacity-40">{isLoading ? <Loader2 className="h-5 w-5 animate-spin" /> : <Send className="h-5 w-5" />}</button>
              </div>
            </div>
            {attachedFileNames.length > 0 && <div className="mt-2 flex flex-wrap gap-2 px-2">{attachedFileNames.map(file => <button key={file} onClick={() => setAttachedFileNames(files => files.filter(item => item !== file))} className="inline-flex items-center gap-1 rounded-full bg-[#edf5f3] px-3 py-1 text-xs text-[#456366]" title="Remove attachment"><Paperclip className="h-3 w-3" />{file}<X className="h-3 w-3" /></button>)}</div>}
          </div>
        </section>
      </div>

      {/* Activity Side Panel */}
      <AnimatePresence>
        {showActivityPanel && (
          <motion.div
            initial={{ width: 0, opacity: 0 }}
            animate={{ width: 320, opacity: 1 }}
            exit={{ width: 0, opacity: 0 }}
            className="fixed inset-y-0 right-0 z-50 overflow-hidden border-l border-[#d9e9e7] bg-white shadow-xl xl:relative xl:shadow-none"
          >
            <div className="p-4 h-full overflow-y-auto">
              <div className="flex items-center justify-between mb-4">
                <h2 className="text-slate-700 font-semibold">Activity</h2>
                <button
                  onClick={() => setShowActivityPanel(false)}
                  className="p-1 text-slate-400 hover:text-slate-600"
                >
                  <X className="w-4 h-4" />
                </button>
              </div>

              {/* Diagnosis Progress */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                <h3 className="text-sm font-medium text-slate-600 mb-3">
                  Interview progress
                </h3>
                <div className="space-y-3">
                  <div className="flex justify-between items-center">
                    <span className="text-xs text-slate-400">Completeness</span>
                    <span
                      className={`font-bold ${getConfidenceColor(diagnosisProgress.confidence)}`}
                    >
                      {diagnosisProgress.confidence}%
                    </span>
                  </div>
                  <div className="h-2 bg-slate-200 rounded-full overflow-hidden">
                    <motion.div
                      initial={{ width: 0 }}
                      animate={{ width: `${diagnosisProgress.confidence}%` }}
                      className="h-full bg-[#005252]"
                    />
                  </div>
                  <div className="grid grid-cols-2 gap-2 mt-3">
                    <div className="bg-white rounded-lg p-2 text-center border border-slate-100">
                      <p className="text-xs text-slate-400">Symptoms</p>
                      <p className="text-lg font-bold text-slate-700">
                        {diagnosisProgress.symptomsIdentified}
                      </p>
                    </div>
                    <div className="bg-white rounded-lg p-2 text-center border border-slate-100">
                      <p className="text-xs text-slate-400">Questions</p>
                      <p className="text-lg font-bold text-slate-700">
                        {sessionInfo?.conversationTurn || 0}
                      </p>
                    </div>
                  </div>
                </div>
              </div>

              {/* Top Conditions */}
              {diagnosisProgress.topConditions.length > 0 && (
                <div className="bg-slate-50 rounded-xl p-4 mb-4 border border-slate-100">
                  <h3 className="text-sm font-medium text-slate-600 mb-3">
                    Top Conditions
                  </h3>
                  <div className="space-y-2">
                    {diagnosisProgress.topConditions.map((condition, i) => (
                      <div
                        key={i}
                        className="flex items-center gap-2 text-sm text-slate-600"
                      >
                        <span className="w-5 h-5 bg-primary/10 text-primary rounded-full flex items-center justify-center text-xs">
                          {i + 1}
                        </span>
                        {condition}
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {/* Session Info */}
              <div className="bg-slate-50 rounded-xl p-4 border border-slate-100">
                <h3 className="text-sm font-medium text-slate-600 mb-3">
                  Session Info
                </h3>
                <div className="space-y-2 text-sm">
                  <div className="flex justify-between">
                    <span className="text-slate-400">Duration</span>
                    <span className="text-slate-700">
                      {formatTime(sessionTime)}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Questions</span>
                    <span className="text-slate-700">
                      {sessionInfo?.conversationTurn || 0}
                    </span>
                  </div>
                  <div className="flex justify-between">
                    <span className="text-slate-400">Status</span>
                    {sessionInfo?.severity &&
                      getSeverityBadge(sessionInfo.severity)}
                  </div>
                </div>
              </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* Dialogs */}
      <AnimatePresence>
        {showEndDialog && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-white rounded-2xl p-6 max-w-md w-full border border-slate-200 shadow-xl"
            >
              <div className="text-center mb-6">
                <div className="mx-auto mb-4 flex h-14 w-14 items-center justify-center rounded-xl bg-[#d8f8f4]">
                  <FileText className="h-7 w-7 text-[#005252]" />
                </div>
                <h2 className="text-xl font-bold text-slate-800 mb-1">
                  End Session?
                </h2>
                <p className="font-urdu text-[#005252]">
                  کیا آپ سیشن ختم کرنا چاہتے ہیں؟
                </p>
              </div>

              {/* Summary */}
              <div className="bg-slate-50 rounded-xl p-4 mb-4 space-y-2 text-sm border border-slate-100">
                <div className="flex justify-between">
                  <span className="text-slate-400">Duration</span>
                  <span className="text-slate-700">
                    {formatTime(sessionTime)}
                  </span>
                </div>
                <div className="flex justify-between">
                  <span className="text-slate-400">Completeness</span>
                  <span
                    className={getConfidenceColor(diagnosisProgress.confidence)}
                  >
                    {diagnosisProgress.confidence}%
                  </span>
                </div>
              </div>

              {diagnosisProgress.confidence < 50 && (
                <div className="flex items-center gap-2 p-3 bg-yellow-50 border border-yellow-200 rounded-xl mb-4 text-yellow-700 text-sm">
                  <AlertTriangle className="w-4 h-4 shrink-0" />
                  More symptom details will improve the preliminary report.
                </div>
              )}

              <div className="flex gap-3">
                <Button
                  onClick={() => setShowEndDialog(false)}
                  variant="outline"
                  className="flex-1 border-slate-200 text-slate-600 hover:bg-slate-50"
                >
                  Continue
                </Button>
                <Button
                  onClick={generateReport}
                  className="flex-1 bg-[#005252] text-white hover:bg-[#1f6b6b]"
                  disabled={isGeneratingReport}
                >
                  {isGeneratingReport ? (
                    <Loader2 className="w-4 h-4 animate-spin mr-2" />
                  ) : (
                    <CheckCircle className="w-4 h-4 mr-2" />
                  )}
                  Generate Report
                </Button>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>

      <ReportCompleteDialog
        isOpen={showReportDialog}
        onClose={() => setShowReportDialog(false)}
        sessionId={sessionInfo?.id}
      />
    </div>
  );
}

export default function InterviewPage() {
  return (
    <Suspense
      fallback={
        <div className="flex min-h-screen items-center justify-center bg-[#effcfb]">
          <Loader2 className="h-8 w-8 animate-spin text-[#005252]" />
        </div>
      }
    >
      <InterviewPageContent />
    </Suspense>
  );
}
