'use client';

import { useEffect, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { motion } from 'framer-motion';
import {
  User,
  Phone,
  MapPin,
  Calendar,
  Stethoscope,
  GraduationCap,
  Building,
  FileText,
  Loader2,
  CheckCircle,
  AlertCircle,
  ArrowRight,
  BadgeCheck,
  ShieldCheck,
  Clock3,
} from 'lucide-react';
import { Button } from '@/components/ui/button';
import { getDepartmentOptions } from '@/lib/constants/departments';
import { MedicoPortalBrand } from '@/components/medico/MedicoPortalBrand';

interface FormErrors {
  [key: string]: string;
}

interface DoctorUser {
  name?: string | null;
  email?: string | null;
}

export default function DoctorOnboarding() {
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [errors, setErrors] = useState<FormErrors>({});
  const [roleConflict, setRoleConflict] = useState(false);
  const [formData, setFormData] = useState({
    fullName: '',
    phone: '',
    address: '',
    dateOfBirth: '',
    specialization: '',
    qualification: '',
    experience: '',
    licenseNumber: '',
    hospital: '',
    department: '',
    bio: '',
  });
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      if (!data?.user) {
        router.push('/login');
        setLoading(false);
        return;
      }

      setUser(data.user);

      // Pre-fill name from auth
      setFormData(prev => ({
        ...prev,
        fullName: data.user.name || '',
      }));

      // First check if user is already registered as a patient
      try {
        const roleCheckRes = await fetch('/api/user/role/check');
        if (roleCheckRes.ok) {
          const roleData = await roleCheckRes.json();
          if (roleData.isPatient) {
            // User is already a patient, show error
            setRoleConflict(true);
            setLoading(false);
            return;
          }
        }
      } catch (e) {
        console.error('Failed to check role', e);
      }

      // Check if doctor profile already exists and is complete
      try {
        const res = await fetch('/api/doctors');
        if (res.ok) {
          const payload = await res.json();
          if (payload?.isComplete) {
            // Profile already complete, redirect to dashboard
            router.push('/doctor/home');
            return;
          }
          // Pre-fill any existing data
          if (payload?.data) {
            const d = payload.data;
            setFormData(prev => ({
              ...prev,
              fullName: d.fullName || prev.fullName,
              phone: d.phone || prev.phone,
              address: d.address || prev.address,
              dateOfBirth: d.dateOfBirth || prev.dateOfBirth,
              specialization: d.specialization || prev.specialization,
              qualification: d.qualification || prev.qualification,
              experience: d.experience ? String(d.experience) : prev.experience,
              licenseNumber: d.licenseNumber || prev.licenseNumber,
              hospital: d.hospital || prev.hospital,
              department: d.department || prev.department,
              bio: d.bio || prev.bio,
            }));
          }
        }
      } catch (e) {
        console.error('Failed to load doctor profile', e);
      }

      setLoading(false);
    };
    getSession();
  }, [router]);

  const handleInputChange = (
    e: React.ChangeEvent<
      HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement
    >
  ) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    // Clear error when user types
    if (errors[name]) {
      setErrors(prev => ({ ...prev, [name]: '' }));
    }
  };

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};

    if (!formData.fullName.trim()) newErrors.fullName = 'Full name is required';
    if (!formData.phone.trim()) newErrors.phone = 'Phone number is required';
    if (!formData.specialization)
      newErrors.specialization = 'Specialization is required';
    if (!formData.qualification.trim())
      newErrors.qualification = 'Qualification is required';
    if (!formData.experience.trim())
      newErrors.experience = 'Experience is required';
    if (!formData.licenseNumber.trim())
      newErrors.licenseNumber = 'License number is required';
    if (!formData.hospital.trim())
      newErrors.hospital = 'Hospital/Clinic is required';
    if (!formData.department) newErrors.department = 'Department is required';

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async () => {
    if (!validateForm()) {
      return;
    }

    setSaving(true);
    try {
      const res = await fetch('/api/doctors', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
          ...formData,
          isComplete: true,
        }),
      });

      if (res.ok) {
        router.push('/doctor/home');
      } else {
        const err = await res.json().catch(() => ({}));
        console.error('Failed to save doctor profile', err);

        // Check for role conflict error
        if (err.code === 'ROLE_CONFLICT') {
          setRoleConflict(true);
        } else {
          setErrors({
            submit: err.error || 'Failed to save profile. Please try again.',
          });
        }
      }
    } catch (e) {
      console.error('Error saving doctor profile', e);
      setErrors({ submit: 'Failed to save profile. Please try again.' });
    }
    setSaving(false);
  };

  if (loading) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#effcfb]">
        <Loader2 className="h-10 w-10 animate-spin text-[#005252]" />
      </div>
    );
  }

  // Show role conflict error
  if (roleConflict) {
    return (
      <div className="flex min-h-screen items-center justify-center bg-[#effcfb] p-6 text-[#121e1e]">
        <div className="w-full max-w-md rounded-[28px] border border-[#dcebea] bg-white p-8 text-center shadow-[0_24px_70px_rgba(0,82,82,0.13)]">
          <MedicoPortalBrand href="/" className="mb-8 justify-center rounded-2xl bg-[#005252] px-5 py-4" />
          <div className="mx-auto mb-6 flex h-16 w-16 items-center justify-center rounded-2xl bg-red-50">
            <AlertCircle className="h-8 w-8 text-red-600" />
          </div>
          <h2 className="text-2xl font-bold text-gray-900 mb-4">
            Account Already Registered
          </h2>
          <p className="text-gray-600 mb-6">
            This email is already registered as a <strong>patient</strong>{' '}
            account. You cannot use the same email for both patient and doctor
            portals.
          </p>
          <p className="text-gray-500 text-sm mb-8">
            Please use a different email address to register as a doctor, or
            login as a patient.
          </p>
          <div className="flex flex-col gap-3">
            <Button
              onClick={() => router.push('/patient/home')}
              className="w-full rounded-xl bg-[#005252] text-white hover:bg-[#1f6b6b]"
            >
              Go to Patient Home
            </Button>
            <Button
              onClick={async () => {
                await authClient.signOut();
                router.push('/login');
              }}
              variant="outline"
              className="w-full"
            >
              Sign Out & Use Different Email
            </Button>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#effcfb] text-[#121e1e] [font-family:var(--font-inter)]">
      <header className="border-b border-white/10 bg-[#005252]">
        <div className="mx-auto flex h-20 max-w-[1380px] items-center justify-between px-4 md:px-8">
          <MedicoPortalBrand href="/" />
          <div className="flex items-center gap-3 rounded-full bg-white/10 py-1.5 pl-2 pr-4 text-white">
            <span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#a8efea] text-xs font-bold text-[#005252]">{user?.name?.charAt(0) || 'D'}</span>
            <span className="hidden max-w-44 truncate text-sm font-medium sm:block">{user?.name}</span>
          </div>
        </div>
      </header>

      <main className="mx-auto grid max-w-[1380px] gap-6 px-4 py-6 md:px-8 md:py-9 xl:grid-cols-[360px_1fr]">
        <motion.aside initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} className="xl:sticky xl:top-8 xl:self-start">
          <div className="overflow-hidden rounded-[28px] bg-[#005252] p-7 text-white shadow-[0_24px_60px_rgba(0,82,82,0.18)]">
            <span className="inline-flex items-center gap-2 rounded-full bg-white/10 px-3 py-1.5 text-xs font-semibold text-[#d5fffb]"><BadgeCheck className="h-4 w-4" /> Clinician onboarding</span>
            <h1 className="mt-6 text-3xl font-semibold leading-tight [font-family:var(--font-outfit)]">Welcome, Dr. {user?.name?.split(' ')[0] || 'Doctor'}</h1>
            <p className="mt-3 text-sm leading-6 text-[#c9e6e4]">Complete your professional profile to enter the clinical review workspace.</p>
            <p className="mt-2 font-urdu text-sm leading-7 text-[#a8efea]">مریضوں کے کیسز دیکھنے کے لیے اپنا پروفائل مکمل کریں</p>
            <div className="mt-8 space-y-3 border-t border-white/10 pt-6">
              <OnboardingBenefit icon={ShieldCheck} title="Protected workspace" copy="Your credentials and review activity stay tied to your doctor account." />
              <OnboardingBenefit icon={Clock3} title="About 3 minutes" copy="Add your identity, workplace, and professional credentials." />
              <OnboardingBenefit icon={Stethoscope} title="Clinical context" copy="Your department helps route relevant patient reports." />
            </div>
          </div>
          <p className="mt-4 px-2 text-xs leading-5 text-[#687776]">All fields marked with <span className="font-bold text-red-600">*</span> are required. Your profile can be updated later.</p>
        </motion.aside>

        <motion.section initial={{ opacity: 0, y: 14 }} animate={{ opacity: 1, y: 0 }} transition={{ delay: 0.08 }} className="overflow-hidden rounded-[28px] border border-[#dcebea] bg-white shadow-sm">
          <div className="border-b border-[#e2efee] px-5 py-6 md:px-8">
            <p className="text-xs font-bold uppercase tracking-[0.16em] text-[#1f6b6b]">Profile setup</p>
            <h2 className="mt-2 text-2xl font-semibold [font-family:var(--font-outfit)]">Tell us about your practice</h2>
            <p className="mt-2 text-sm text-[#687776]">This information appears in your clinician workspace and reviewed patient records.</p>
          </div>
          <div className="p-5 md:p-8">
            {/* Error Message */}
            {errors.submit && (
              <div role="alert" className="mb-6 flex items-center gap-3 rounded-xl border border-red-200 bg-red-50 p-4 text-red-700">
                <AlertCircle className="h-5 w-5 shrink-0" />
                {errors.submit}
              </div>
            )}
            <FormSection icon={User} title="Personal details" copy="How the care team can identify and contact you." />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Full Name */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <User className="w-4 h-4 inline mr-2" />
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="fullName"
                  value={formData.fullName}
                  onChange={handleInputChange}
                  className={fieldClass(Boolean(errors.fullName))}
                  placeholder="Dr. Ahmed Khan"
                />
                {errors.fullName && (
                  <p className="text-red-500 text-xs mt-1">{errors.fullName}</p>
                )}
              </div>

              {/* Phone */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <Phone className="w-4 h-4 inline mr-2" />
                  Phone Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="tel"
                  name="phone"
                  value={formData.phone}
                  onChange={handleInputChange}
                  className={fieldClass(Boolean(errors.phone))}
                  placeholder="+92 300 1234567"
                />
                {errors.phone && (
                  <p className="text-red-500 text-xs mt-1">{errors.phone}</p>
                )}
              </div>

              {/* Date of Birth */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <Calendar className="w-4 h-4 inline mr-2" />
                  Date of Birth
                </label>
                <input
                  type="date"
                  name="dateOfBirth"
                  value={formData.dateOfBirth}
                  onChange={handleInputChange}
                  className={fieldClass()}
                />
              </div>

              {/* Address */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <MapPin className="w-4 h-4 inline mr-2" />
                  Address
                </label>
                <input
                  type="text"
                  name="address"
                  value={formData.address}
                  onChange={handleInputChange}
                  className={fieldClass()}
                  placeholder="City, Country"
                />
              </div>

            </div>

            <FormSection icon={Stethoscope} title="Professional details" copy="Your qualifications and clinical area of work." className="mt-9 border-t border-[#e2efee] pt-8" />
            <div className="grid grid-cols-1 gap-5 md:grid-cols-2">
              {/* Specialization */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <Stethoscope className="w-4 h-4 inline mr-2" />
                  Specialization <span className="text-red-500">*</span>
                </label>
                <select
                  name="specialization"
                  value={formData.specialization}
                  onChange={handleInputChange}
                  className={fieldClass(Boolean(errors.specialization))}
                >
                  <option value="">Select Specialization</option>
                  {getDepartmentOptions().map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.specialization && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.specialization}
                  </p>
                )}
              </div>

              {/* Qualification */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <GraduationCap className="w-4 h-4 inline mr-2" />
                  Qualification <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="qualification"
                  value={formData.qualification}
                  onChange={handleInputChange}
                  className={fieldClass(Boolean(errors.qualification))}
                  placeholder="MBBS, FCPS, etc."
                />
                {errors.qualification && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.qualification}
                  </p>
                )}
              </div>

              {/* Experience */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  Years of Experience <span className="text-red-500">*</span>
                </label>
                <input
                  type="number"
                  name="experience"
                  value={formData.experience}
                  onChange={handleInputChange}
                  min="0"
                  className={fieldClass(Boolean(errors.experience))}
                  placeholder="e.g., 10"
                />
                {errors.experience && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.experience}
                  </p>
                )}
              </div>

              {/* License Number */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <FileText className="w-4 h-4 inline mr-2" />
                  PMC License Number <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="licenseNumber"
                  value={formData.licenseNumber}
                  onChange={handleInputChange}
                  className={fieldClass(Boolean(errors.licenseNumber))}
                  placeholder="PMC-XXXXX"
                />
                {errors.licenseNumber && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.licenseNumber}
                  </p>
                )}
              </div>

              {/* Hospital */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  <Building className="w-4 h-4 inline mr-2" />
                  Hospital/Clinic <span className="text-red-500">*</span>
                </label>
                <input
                  type="text"
                  name="hospital"
                  value={formData.hospital}
                  onChange={handleInputChange}
                  className={fieldClass(Boolean(errors.hospital))}
                  placeholder="Hospital Name"
                />
                {errors.hospital && (
                  <p className="text-red-500 text-xs mt-1">{errors.hospital}</p>
                )}
              </div>

              {/* Department */}
              <div>
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  Department <span className="text-red-500">*</span>
                </label>
                <select
                  name="department"
                  value={formData.department}
                  onChange={handleInputChange}
                  className={fieldClass(Boolean(errors.department))}
                >
                  <option value="">Select Department</option>
                  {getDepartmentOptions().map(dept => (
                    <option key={dept.id} value={dept.id}>
                      {dept.name}
                    </option>
                  ))}
                </select>
                {errors.department && (
                  <p className="text-red-500 text-xs mt-1">
                    {errors.department}
                  </p>
                )}
              </div>

              {/* Bio */}
              <div className="md:col-span-2">
                <label className="mb-2 block text-sm font-semibold text-[#3f4948]">
                  Bio / About
                </label>
                <textarea
                  name="bio"
                  value={formData.bio}
                  onChange={handleInputChange}
                  rows={3}
                  className={`${fieldClass()} resize-none`}
                  placeholder="Brief description about yourself and your expertise..."
                />
              </div>
            </div>

            {/* Submit Button */}
            <div className="mt-8 flex flex-col-reverse gap-3 border-t border-[#e2efee] pt-6 sm:flex-row sm:items-center sm:justify-between">
              <p className="text-xs text-[#687776]">By continuing, you confirm these professional details are accurate.</p>
              <Button
                onClick={handleSubmit}
                disabled={saving}
                className="h-auto rounded-xl bg-[#005252] px-6 py-3 text-white hover:bg-[#1f6b6b]"
              >
                {saving ? (
                  <>
                    <Loader2 className="w-5 h-5 mr-2 animate-spin" />
                    Saving...
                  </>
                ) : (
                  <>
                    <CheckCircle className="w-5 h-5 mr-2" />
                    Complete registration <ArrowRight className="ml-2 h-4 w-4" />
                  </>
                )}
              </Button>
            </div>
          </div>
        </motion.section>
      </main>
    </div>
  );
}

function fieldClass(hasError = false) {
  return `w-full rounded-xl border bg-[#f7fbfb] px-4 py-3 text-sm text-[#121e1e] outline-none transition placeholder:text-[#91a09e] focus:border-[#005252] focus:bg-white focus:ring-2 focus:ring-[#a8efea] ${hasError ? 'border-red-300 bg-red-50' : 'border-[#cfe1df]'}`;
}

function FormSection({ icon: Icon, title, copy, className = '' }: { icon: typeof User; title: string; copy: string; className?: string }) {
  return <div className={`mb-5 flex items-start gap-3 ${className}`}><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f5f3] text-[#005252]"><Icon className="h-5 w-5" /></span><div><h3 className="font-semibold [font-family:var(--font-outfit)]">{title}</h3><p className="mt-1 text-xs text-[#687776]">{copy}</p></div></div>;
}

function OnboardingBenefit({ icon: Icon, title, copy }: { icon: typeof User; title: string; copy: string }) {
  return <div className="flex gap-3"><span className="flex h-9 w-9 shrink-0 items-center justify-center rounded-xl bg-white/10 text-[#a8efea]"><Icon className="h-4 w-4" /></span><div><p className="text-sm font-semibold">{title}</p><p className="mt-1 text-xs leading-5 text-white/65">{copy}</p></div></div>;
}
