'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import Image from 'next/image';
import { BadgeCheck, Building2, Calendar, Camera, CheckCircle2, GraduationCap, Loader2, Lock, Mail, MapPin, Phone, Save, ShieldCheck, Stethoscope, User } from 'lucide-react';
import { getDepartmentOptions } from '@/lib/constants/departments';
import { DoctorPortalShell } from '@/components/medico/DoctorPortalShell';

interface DoctorUser { name?: string | null; email?: string | null }
interface DoctorFormData { fullName: string; email: string; phone: string; address: string; dateOfBirth: string; specialization: string; qualification: string; experience: string; licenseNumber: string; hospital: string; department: string; bio: string }
const emptyForm: DoctorFormData = { fullName: '', email: '', phone: '', address: '', dateOfBirth: '', specialization: '', qualification: '', experience: '', licenseNumber: '', hospital: '', department: '', bio: '' };

export default function DoctorProfile() {
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [profileImage, setProfileImage] = useState('');
  const [formData, setFormData] = useState<DoctorFormData>(emptyForm);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [saveError, setSaveError] = useState('');
  const router = useRouter();

  useEffect(() => {
    const loadProfile = async () => {
      const { data } = await authClient.getSession();
      if (!data?.user) { router.push('/login'); setLoading(false); return; }
      const accountUser = { name: data.user.name, email: data.user.email };
      setUser(accountUser);
      setFormData(current => ({ ...current, fullName: data.user.name || '', email: data.user.email || '' }));
      try {
        const response = await fetch('/api/doctors');
        if (!response.ok) throw new Error('Profile request failed');
        const payload = await response.json();
        if (payload?.data) {
          const doctor = payload.data;
          setFormData(current => ({
            ...current,
            fullName: doctor.fullName || current.fullName,
            email: doctor.email || current.email,
            phone: doctor.phone || '', address: doctor.address || '', dateOfBirth: doctor.dateOfBirth || '',
            specialization: doctor.specialization || '', qualification: doctor.qualification || '',
            experience: doctor.experience != null ? String(doctor.experience) : '',
            licenseNumber: doctor.licenseNumber || '', hospital: doctor.hospital || '',
            department: doctor.department || '', bio: doctor.bio || '',
          }));
          setProfileImage(doctor.profileImage || '');
        }
      } catch (error) {
        console.error('Failed to load doctor profile', error);
        setSaveError('We could not load every profile detail. Please refresh and try again.');
      } finally { setLoading(false); }
    };
    loadProfile();
  }, [router]);

  const handleInputChange = (event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = event.target;
    setFormData(current => ({ ...current, [name]: value }));
    setSaveSuccess(false); setSaveError('');
  };
  const handleImageUpload = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0]; if (!file) return;
    const reader = new FileReader(); reader.onload = loadEvent => setProfileImage(loadEvent.target?.result as string); reader.readAsDataURL(file);
  };
  const handleSave = async () => {
    setSaving(true); setSaveSuccess(false); setSaveError('');
    try {
      const response = await fetch('/api/doctors', { method: 'POST', headers: { 'Content-Type': 'application/json' }, body: JSON.stringify({ ...formData, profileImage, isComplete: true }) });
      if (!response.ok) { const payload = await response.json().catch(() => ({})); throw new Error(payload.error || 'Profile update failed'); }
      setSaveSuccess(true); window.setTimeout(() => setSaveSuccess(false), 3500);
    } catch (error) { console.error('Error saving doctor profile', error); setSaveError(error instanceof Error ? error.message : 'We could not save your changes. Please try again.'); }
    finally { setSaving(false); }
  };
  const handleSignOut = async () => { await authClient.signOut(); router.push('/'); router.refresh(); };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#effcfb]"><Loader2 className="h-10 w-10 animate-spin text-[#005252]" /></div>;
  const initials = (formData.fullName || 'Doctor').split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase();

  return <DoctorPortalShell user={user} profile={{ specialization: formData.specialization, department: formData.department }} onSignOut={handleSignOut} searchPlaceholder="Profile settings">
    <div className="mx-auto max-w-[1220px]">
      <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} className="relative overflow-hidden rounded-[28px] border border-[#d1eeeb] bg-gradient-to-r from-[#eefbfa] via-[#d7f3f1] to-[#9bded8] px-6 py-8 text-[#073b58] shadow-sm md:px-9">
        <div aria-hidden="true" className="absolute -right-12 -top-36 h-80 w-80 rotate-[34deg] rounded-[42%] bg-white/25" />
        <div aria-hidden="true" className="absolute -bottom-44 right-10 h-80 w-[34rem] -rotate-[24deg] rounded-[46%] bg-[#54c3ba]/20" />
        <Stethoscope aria-hidden="true" className="absolute bottom-4 right-8 h-16 w-16 text-white/65" />
        <div className="relative flex flex-col gap-6 md:flex-row md:items-end md:justify-between"><div><span className="inline-flex items-center gap-2 rounded-full border border-white/80 bg-white/65 px-3 py-1.5 text-xs font-semibold text-[#285d78]"><ShieldCheck className="h-4 w-4" /> Clinician identity</span><h1 className="mt-5 text-3xl font-semibold [font-family:var(--font-outfit)] md:text-4xl">Your doctor profile</h1><p className="mt-2 max-w-2xl text-sm leading-6 text-[#315c70]">Keep your clinical credentials, workplace, and contact information accurate for every reviewed report.</p></div><div className="mr-16 inline-flex items-center gap-2 self-start rounded-xl border border-[#b9d6df] bg-white/80 px-4 py-2 text-xs font-bold text-[#1264f5] shadow-sm md:self-auto"><BadgeCheck className="h-4 w-4" /> Profile active</div></div>
      </motion.section>
      {saveError && <p role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{saveError}</p>}

      <div className="mt-6 grid gap-6 xl:grid-cols-[320px_1fr]">
        <motion.aside initial={{ opacity: 0, x: -12 }} animate={{ opacity: 1, x: 0 }} className="xl:sticky xl:top-28 xl:self-start"><div className="rounded-[26px] border border-[#dcebea] bg-white p-6 shadow-sm">
          <div className="relative mx-auto h-28 w-28"><div className="flex h-full w-full items-center justify-center overflow-hidden rounded-[28px] bg-[#d6f6ef] text-3xl font-bold text-[#087f73] ring-4 ring-white shadow-lg">{profileImage ? <Image src={profileImage} alt="Doctor profile" width={112} height={112} unoptimized className="h-full w-full object-cover" /> : initials}</div><label className="absolute -bottom-2 -right-2 flex h-10 w-10 cursor-pointer items-center justify-center rounded-xl bg-[#1264f5] text-white shadow-lg transition hover:bg-[#0b55db]" aria-label="Upload profile photo"><Camera className="h-4 w-4" /><input type="file" accept="image/*" onChange={handleImageUpload} className="hidden" /></label></div>
          <div className="mt-6 text-center"><h2 className="text-xl font-semibold [font-family:var(--font-outfit)]">Dr. {formData.fullName || 'Doctor'}</h2><p className="mt-1 text-sm font-semibold text-[#1f6b6b]">{departmentLabel(formData.specialization) || 'Medical professional'}</p><p className="mt-1 text-xs text-[#687776]">{formData.hospital || 'Healthcare provider'}</p></div>
          <div className="mt-6 grid grid-cols-2 gap-3 border-t border-[#e2efee] pt-5"><ProfileMetric label="Experience" value={`${formData.experience || '0'} yrs`} /><ProfileMetric label="Department" value={departmentLabel(formData.department) || 'Not set'} /></div>
          <div className="mt-5 rounded-2xl border border-[#cfe3ff] bg-[#f3f8ff] p-4 text-xs leading-5 text-[#526174]"><div className="flex items-center gap-2 font-semibold text-[#1264f5]"><Lock className="h-3.5 w-3.5" /> Account-protected</div><p className="mt-2">Your name and email remain linked to your login identity.</p></div>
        </div></motion.aside>

        <motion.section initial={{ opacity: 0, y: 12 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.06 }} className="overflow-hidden rounded-[26px] border border-[#dcebea] bg-white shadow-sm">
          <div className="border-b border-[#e2efee] px-5 py-6 md:px-8"><p className="text-xs font-bold uppercase tracking-[0.15em] text-[#1f6b6b]">Profile settings</p><h2 className="mt-2 text-2xl font-semibold [font-family:var(--font-outfit)]">Personal and professional details</h2><p className="mt-2 text-sm text-[#687776]">Changes are saved directly to your clinician profile.</p></div>
          <div className="p-5 md:p-8">
            <SectionHeading icon={User} title="Personal details" copy="Account identity and contact information." />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Full name" icon={User} locked><input name="fullName" value={formData.fullName} readOnly disabled className={inputClass(true)} /></Field>
              <Field label="Email address" icon={Mail} locked><input name="email" value={formData.email} readOnly disabled className={inputClass(true)} /></Field>
              <Field label="Phone number" icon={Phone}><input type="tel" name="phone" value={formData.phone} onChange={handleInputChange} className={inputClass()} placeholder="+92 300 1234567" /></Field>
              <Field label="Date of birth" icon={Calendar}><input type="date" name="dateOfBirth" value={formData.dateOfBirth} onChange={handleInputChange} className={inputClass()} /></Field>
              <Field label="Address" icon={MapPin} className="md:col-span-2"><input name="address" value={formData.address} onChange={handleInputChange} className={inputClass()} placeholder="City, country" /></Field>
            </div>
            <SectionHeading icon={Stethoscope} title="Professional details" copy="Credentials and practice information shown in the care workflow." className="mt-9 border-t border-[#e2efee] pt-8" />
            <div className="grid gap-5 md:grid-cols-2">
              <Field label="Specialization" icon={Stethoscope}><select name="specialization" value={formData.specialization} onChange={handleInputChange} className={inputClass()}><option value="">Select specialization</option>{getDepartmentOptions().map(option => <option key={option.id} value={option.id}>{option.name}</option>)}</select></Field>
              <Field label="Qualification" icon={GraduationCap}><input name="qualification" value={formData.qualification} onChange={handleInputChange} className={inputClass()} placeholder="MBBS, FCPS, MD" /></Field>
              <Field label="Years of experience" icon={BadgeCheck}><input type="number" min="0" name="experience" value={formData.experience} onChange={handleInputChange} className={inputClass()} placeholder="10" /></Field>
              <Field label="Medical license number" icon={ShieldCheck}><input name="licenseNumber" value={formData.licenseNumber} onChange={handleInputChange} className={inputClass()} placeholder="PMC-XXXXX" /></Field>
              <Field label="Hospital or clinic" icon={Building2}><input name="hospital" value={formData.hospital} onChange={handleInputChange} className={inputClass()} placeholder="Hospital name" /></Field>
              <Field label="Department" icon={Stethoscope}><select name="department" value={formData.department} onChange={handleInputChange} className={inputClass()}><option value="">Select department</option>{getDepartmentOptions().map(option => <option key={option.id} value={option.id}>{option.name}</option>)}</select></Field>
              <Field label="Professional bio" icon={User} className="md:col-span-2"><textarea name="bio" value={formData.bio} onChange={handleInputChange} rows={4} className={`${inputClass()} resize-none`} placeholder="Share your expertise and approach to patient care." /></Field>
            </div>
            <div className="mt-8 flex flex-col gap-4 border-t border-[#e2efee] pt-6 sm:flex-row sm:items-center sm:justify-between"><div aria-live="polite">{saveSuccess && <motion.p initial={{ opacity: 0, x: -8 }} animate={{ opacity: 1, x: 0 }} className="flex items-center gap-2 text-sm font-semibold text-[#087f73]"><CheckCircle2 className="h-5 w-5" /> Changes saved successfully</motion.p>}</div><button onClick={handleSave} disabled={saving} className="inline-flex items-center justify-center gap-2 rounded-xl bg-[#1264f5] px-6 py-3 text-sm font-semibold text-white transition hover:bg-[#0b55db] disabled:cursor-wait disabled:opacity-65">{saving ? <Loader2 className="h-4 w-4 animate-spin" /> : <Save className="h-4 w-4" />}{saving ? 'Saving changes…' : 'Save changes'}</button></div>
          </div>
        </motion.section>
      </div>
    </div>
  </DoctorPortalShell>;
}

function inputClass(locked = false) { return `w-full rounded-xl border px-4 py-3 text-sm outline-none transition ${locked ? 'cursor-not-allowed border-[#d9e1ea] bg-[#f1f4f7] text-[#68778a]' : 'border-[#cfd9e5] bg-[#f8fafc] text-[#121e1e] placeholder:text-[#91a09e] focus:border-[#1264f5] focus:bg-white focus:ring-2 focus:ring-[#dce9ff]'}`; }
function Field({ label, icon: Icon, locked = false, className = '', children }: { label: string; icon: typeof User; locked?: boolean; className?: string; children: React.ReactNode }) { return <label className={`block ${className}`}><span className="mb-2 flex items-center gap-2 text-sm font-semibold text-[#3f4948]"><Icon className="h-4 w-4 text-[#1264f5]" />{label}{locked && <span className="ml-auto inline-flex items-center gap-1 rounded-full bg-[#ffedc9] px-2 py-0.5 text-[10px] font-bold text-[#b76500]"><Lock className="h-3 w-3" /> Locked</span>}</span>{children}</label>; }
function SectionHeading({ icon: Icon, title, copy, className = '' }: { icon: typeof User; title: string; copy: string; className?: string }) { return <div className={`mb-5 flex items-start gap-3 ${className}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f7f5] text-[#087f73]"><Icon className="h-5 w-5" /></span><div><h3 className="font-semibold text-[#111b3a] [font-family:var(--font-outfit)]">{title}</h3><p className="mt-1 text-xs text-[#68778a]">{copy}</p></div></div>; }
function ProfileMetric({ label, value }: { label: string; value: string }) { return <div className={`rounded-xl border p-3 text-center ${label === 'Experience' ? 'border-[#c9ebe6] bg-[#f1fbf9]' : 'border-[#cfe3ff] bg-[#f3f8ff]'}`}><p className="text-[10px] font-bold uppercase tracking-wider text-[#68778a]">{label}</p><p className="mt-1 truncate text-sm font-semibold text-[#111b3a]">{value}</p></div>; }
function departmentLabel(value: string) { return getDepartmentOptions().find(option => option.id === value)?.name || value; }
