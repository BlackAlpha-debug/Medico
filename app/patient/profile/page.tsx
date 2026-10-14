'use client';

import { useEffect, useState, Suspense } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter, useSearchParams } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  Activity, AlertTriangle, Calendar, CheckCircle2, Cigarette, Download,
  Droplets, FileText, Heart, History, Loader2, Lock, Mail, Pill, Ruler,
  Scale, Shield, Stethoscope, User, Wine,
} from 'lucide-react';
import Link from 'next/link';
import { PatientPortalShell } from '@/components/medico/PatientPortalShell';

interface MedicalHistoryData {
  id: string; age?: number; gender?: string; bloodGroup?: string; weight?: number;
  height?: number; familyHistory?: Record<string, boolean>; chronicConditions?: string[];
  currentMedications?: string[]; allergies?: string[]; pastSurgeries?: string[];
  smokingStatus?: string; alcoholConsumption?: string; onboardingTranscript?: unknown[];
  isComplete?: boolean; createdAt?: string; updatedAt?: string;
}
interface PatientUser { id: string; name?: string | null; email?: string | null; emailVerified?: boolean; role?: string; createdAt?: string | Date }

function ProfilePageContent() {
  const [user, setUser] = useState<PatientUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [activeTab, setActiveTab] = useState<'profile' | 'medical-history'>('profile');
  const [medicalHistory, setMedicalHistory] = useState<MedicalHistoryData | null>(null);
  const [historyLoading, setHistoryLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  useEffect(() => { if (searchParams.get('tab') === 'medical-history') setActiveTab('medical-history') }, [searchParams]);
  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      if (!data?.user) router.push('/login'); else setUser(data.user);
      setLoading(false);
    };
    getSession();
  }, [router]);
  useEffect(() => {
    if (activeTab !== 'medical-history' || !user) return;
    const fetchMedicalHistory = async () => {
      setHistoryLoading(true);
      try { const response = await fetch('/api/medical-history'); if (response.ok) setMedicalHistory((await response.json()).data) }
      catch (error) { console.error('Failed to fetch medical history:', error) }
      finally { setHistoryLoading(false) }
    };
    fetchMedicalHistory();
  }, [activeTab, user]);

  const signOut = async () => { await authClient.signOut(); router.push('/'); router.refresh() };
  const formatDate = (value?: string | Date) => value ? new Date(value).toLocaleDateString('en-PK', { year: 'numeric', month: 'long', day: 'numeric' }) : 'Not available';
  const familyConditions = Object.entries(medicalHistory?.familyHistory || {}).filter(([, value]) => value).map(([key]) => key.replace(/_/g, ' ').replace(/\b\w/g, letter => letter.toUpperCase()));

  if (loading) return <LoadingScreen />;

  return (
    <PatientPortalShell user={user} onSignOut={signOut} hasClinicalRecord={Boolean(medicalHistory)}>
      <div className="mx-auto max-w-6xl">
        <div className="flex flex-col gap-5 border-b border-[#d8e8e6] pb-6 md:flex-row md:items-end md:justify-between">
          <div><p className="text-xs font-bold uppercase tracking-[0.18em] text-[#1f6b6b]">Patient portal / Personal record</p><h1 className="mt-2 text-3xl font-semibold tracking-tight [font-family:var(--font-outfit)] md:text-4xl">Profile & health history</h1><p className="mt-2 text-sm text-[#687776]">Review the account and medical-history information currently stored for your care flow.</p></div>
          {activeTab === 'medical-history' && medicalHistory?.isComplete && <button onClick={() => window.print()} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#005252] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#1f6b6b]"><Download className="h-4 w-4" /> Print health history</button>}
        </div>

        <div className="mt-6 flex w-full max-w-md rounded-xl bg-[#e4f1ef] p-1">
          <button onClick={() => setActiveTab('profile')} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${activeTab === 'profile' ? 'bg-white text-[#005252] shadow-sm' : 'text-[#596765]'}`}><User className="h-4 w-4" /> Account</button>
          <button onClick={() => setActiveTab('medical-history')} className={`flex flex-1 items-center justify-center gap-2 rounded-lg px-4 py-2.5 text-sm font-semibold ${activeTab === 'medical-history' ? 'bg-white text-[#005252] shadow-sm' : 'text-[#596765]'}`}><History className="h-4 w-4" /> Medical history</button>
        </div>

        <AnimatePresence mode="wait">
          {activeTab === 'profile' ? (
            <motion.section key="account" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6 overflow-hidden rounded-[26px] border border-[#d9e9e7] bg-white shadow-sm">
              <div className="bg-[#005252] p-6 text-white md:p-8"><div className="flex flex-col gap-5 sm:flex-row sm:items-center"><span className="flex h-20 w-20 items-center justify-center rounded-2xl bg-[#a8efea] text-3xl font-bold text-[#005252]">{user?.name?.charAt(0) || 'P'}</span><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-2xl font-semibold [font-family:var(--font-outfit)]">{user?.name || 'Patient'}</h2>{user?.emailVerified && <span className="inline-flex items-center gap-1 rounded-full bg-white/10 px-2.5 py-1 text-xs"><CheckCircle2 className="h-3.5 w-3.5" /> Verified</span>}</div><p className="mt-1 text-sm text-[#c9e6e4]">{user?.email}</p><p className="mt-3 max-w-2xl text-xs leading-5 text-[#a9cecb]">Account details come from your authenticated profile and are read-only here.</p></div></div></div>
              <div className="grid gap-4 p-6 md:grid-cols-2 md:p-8">
                <InfoCard icon={User} label="Full name" value={user?.name || 'Not provided'} />
                <InfoCard icon={Mail} label="Email address" value={user?.email || 'Not provided'} />
                <InfoCard icon={Calendar} label="Member since" value={formatDate(user?.createdAt)} />
                <InfoCard icon={Shield} label="Account type" value={user?.role || 'Patient'} />
              </div>
            </motion.section>
          ) : (
            <motion.section key="history" initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} exit={{ opacity: 0 }} className="mt-6">
              {historyLoading ? <div className="rounded-[26px] border border-[#d9e9e7] bg-white py-24"><LoadingRows /></div> : !medicalHistory?.isComplete ? (
                <div className="rounded-[26px] border border-[#d9e9e7] bg-white px-6 py-20 text-center"><span className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl bg-[#e5f5f3] text-[#005252]"><History className="h-8 w-8" /></span><h2 className="mt-5 text-xl font-semibold">No medical history found</h2><p className="mx-auto mt-2 max-w-md text-sm leading-6 text-[#687776]">Complete your medical history before starting a clinical interview.</p><Link href="/patient/medical_session" className="mt-6 inline-flex rounded-full bg-[#005252] px-5 py-3 text-sm font-semibold text-white">Complete medical history</Link></div>
              ) : (
                <div className="grid gap-6 xl:grid-cols-[1.65fr_0.75fr]">
                  <div className="space-y-6">
                    <section className="rounded-[26px] border border-[#d9e9e7] bg-white p-6 shadow-sm md:p-8">
                      <div className="flex flex-col justify-between gap-5 border-b border-[#e2efee] pb-6 sm:flex-row sm:items-center"><div className="flex items-center gap-4"><span className="flex h-14 w-14 items-center justify-center rounded-full bg-[#a8efea] text-lg font-bold text-[#005252]">{user?.name?.charAt(0) || 'P'}</span><div><div className="flex flex-wrap items-center gap-2"><h2 className="text-xl font-semibold [font-family:var(--font-outfit)]">{user?.name}</h2><span className="rounded-full bg-[#d8f8f4] px-2.5 py-1 text-[10px] font-bold uppercase tracking-wide text-[#005252]">Complete record</span></div><p className="mt-1 text-xs text-[#687776]">Updated {formatDate(medicalHistory.updatedAt)}</p></div></div><span className="flex items-center gap-2 text-xs font-medium text-[#1f6b6b]"><Lock className="h-3.5 w-3.5" /> Private clinical data</span></div>
                      <h3 className="mt-6 text-lg font-semibold [font-family:var(--font-outfit)]">Personal health baseline</h3>
                      <div className="mt-4 grid grid-cols-2 gap-3 md:grid-cols-5"><Metric icon={Calendar} label="Age" value={medicalHistory.age ? `${medicalHistory.age} years` : 'Not provided'} /><Metric icon={User} label="Gender" value={medicalHistory.gender || 'Not provided'} /><Metric icon={Droplets} label="Blood group" value={medicalHistory.bloodGroup || 'Not provided'} /><Metric icon={Scale} label="Weight" value={medicalHistory.weight ? `${medicalHistory.weight} kg` : 'Not provided'} /><Metric icon={Ruler} label="Height" value={medicalHistory.height ? `${medicalHistory.height} cm` : 'Not provided'} /></div>
                    </section>

                    <section className="rounded-[26px] border border-[#d9e9e7] bg-white p-6 shadow-sm md:p-8"><SectionTitle icon={Heart} title="Clinical history" subtitle="Information you provided during medical-history onboarding" /><div className="mt-6 space-y-4"><HistoryGroup icon={Heart} label="Chronic conditions" values={medicalHistory.chronicConditions} empty="No chronic conditions reported" /><HistoryGroup icon={AlertTriangle} label="Allergies" values={medicalHistory.allergies} empty="No allergies reported" /><HistoryGroup icon={Pill} label="Current medications" values={medicalHistory.currentMedications} empty="No current medications reported" /><HistoryGroup icon={Stethoscope} label="Past surgeries" values={medicalHistory.pastSurgeries} empty="No past surgeries reported" /></div></section>

                    <section className="rounded-[26px] border border-[#d9e9e7] bg-white p-6 shadow-sm md:p-8"><SectionTitle icon={History} title="Family & lifestyle" subtitle="Context used to personalize the clinical interview" /><div className="mt-6 grid gap-4 md:grid-cols-2"><HistoryGroup icon={History} label="Family medical history" values={familyConditions} empty="No family-history conditions reported" /><div className="grid gap-4"><Lifestyle icon={Cigarette} label="Smoking status" value={formatChoice(medicalHistory.smokingStatus, { never: 'Never smoked', former: 'Former smoker', current: 'Current smoker' })} /><Lifestyle icon={Wine} label="Alcohol consumption" value={formatChoice(medicalHistory.alcoholConsumption, { never: 'Never', occasional: 'Occasional', regular: 'Regular' })} /></div></div></section>
                  </div>
                  <aside className="space-y-5">
                    <div className="rounded-[24px] border border-[#d9e9e7] bg-white p-6"><SectionTitle icon={FileText} title="Record summary" /><div className="mt-5 space-y-4 text-sm"><SummaryRow label="Status" value="Complete" /><SummaryRow label="Last updated" value={formatDate(medicalHistory.updatedAt)} /><SummaryRow label="Source" value="Patient-provided" /></div></div>
                    <div className="rounded-[24px] bg-[#005252] p-6 text-white"><Activity className="h-6 w-6 text-[#a8efea]" /><h3 className="mt-4 text-lg font-semibold [font-family:var(--font-outfit)]">Keep your history current</h3><p className="mt-2 text-sm leading-6 text-[#c9e6e4]">Redo the guided history when medications, allergies, or major health details change.</p><Link href="/patient/medical_session" className="mt-5 inline-flex rounded-full bg-[#a8efea] px-4 py-2.5 text-sm font-semibold text-[#005252]">Update medical history</Link></div>
                  </aside>
                </div>
              )}
            </motion.section>
          )}
        </AnimatePresence>
      </div>
    </PatientPortalShell>
  );
}

function formatChoice(value: string | undefined, labels: Record<string, string>) { return value ? labels[value] || value : 'Not provided' }
function LoadingScreen() { return <div className="flex min-h-screen items-center justify-center bg-[#effcfb]"><Loader2 className="h-10 w-10 animate-spin text-[#005252]" /></div> }
function LoadingRows() { return <div className="flex justify-center"><Loader2 className="h-8 w-8 animate-spin text-[#005252]" /></div> }
function InfoCard({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) { return <div className="flex items-center gap-4 rounded-2xl bg-[#f3faf9] p-4"><span className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#d8f8f4] text-[#005252]"><Icon className="h-5 w-5" /></span><div className="min-w-0 flex-1"><p className="text-xs text-[#687776]">{label}</p><p className="mt-1 truncate font-semibold capitalize">{value}</p></div><Lock className="h-4 w-4 text-[#91a09e]" /></div> }
function Metric({ icon: Icon, label, value }: { icon: typeof User; label: string; value: string }) { return <div className="rounded-2xl bg-[#eaf6f5] p-4"><Icon className="h-4 w-4 text-[#005252]" /><p className="mt-3 text-[11px] uppercase tracking-wide text-[#687776]">{label}</p><p className="mt-1 text-sm font-bold capitalize">{value}</p></div> }
function SectionTitle({ icon: Icon, title, subtitle }: { icon: typeof User; title: string; subtitle?: string }) { return <div className="flex items-start gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-[#d8f8f4] text-[#005252]"><Icon className="h-4 w-4" /></span><div><h3 className="text-lg font-semibold [font-family:var(--font-outfit)]">{title}</h3>{subtitle && <p className="mt-1 text-xs text-[#687776]">{subtitle}</p>}</div></div> }
function HistoryGroup({ icon: Icon, label, values, empty }: { icon: typeof Heart; label: string; values?: string[]; empty: string }) { const safeValues = values?.filter(Boolean) || []; return <div className="rounded-2xl bg-[#eff7f6] p-4"><p className="flex items-center gap-2 text-sm font-semibold text-[#005252]"><Icon className="h-4 w-4" />{label}</p>{safeValues.length ? <div className="mt-3 flex flex-wrap gap-2">{safeValues.map((value, index) => <span key={`${value}-${index}`} className="rounded-full border border-[#cfe1df] bg-white px-3 py-1.5 text-xs text-[#3f4948]">{value}</span>)}</div> : <p className="mt-2 text-sm text-[#687776]">{empty}</p>}</div> }
function Lifestyle({ icon: Icon, label, value }: { icon: typeof Cigarette; label: string; value: string }) { return <div className="rounded-2xl bg-[#eff7f6] p-4"><p className="flex items-center gap-2 text-xs text-[#687776]"><Icon className="h-4 w-4 text-[#005252]" />{label}</p><p className="mt-2 font-semibold">{value}</p></div> }
function SummaryRow({ label, value }: { label: string; value: string }) { return <div className="flex items-start justify-between gap-3 border-b border-[#e3efee] pb-3 last:border-0 last:pb-0"><span className="text-[#687776]">{label}</span><span className="text-right font-semibold">{value}</span></div> }

export default function ProfilePage() { return <Suspense fallback={<LoadingScreen />}><ProfilePageContent /></Suspense> }
