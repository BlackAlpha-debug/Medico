'use client';

import { useEffect, useMemo, useState } from 'react';
import { authClient } from '@/lib/auth-client';
import { useRouter } from 'next/navigation';
import { AnimatePresence, motion } from 'framer-motion';
import {
  AlertTriangle, ArrowRight, BarChart3, CalendarDays, CheckCircle2, ChevronDown,
  ChevronRight, FileCheck2, FileText, Filter, ListChecks, Loader2, RefreshCw,
  ShieldCheck, Stethoscope, Users, X,
} from 'lucide-react';
import Link from 'next/link';
import { DoctorPortalShell, MaterialIcon } from '@/components/medico/DoctorPortalShell';
import { getDepartmentById, getDepartmentFilterOptions, normalizeDepartmentId } from '@/lib/constants/departments';

interface Report {
  id: string;
  sessionId: string;
  patientName: string;
  patientId: string;
  age: number | null;
  complaint: string;
  department: string;
  status: string;
  timestamp: string;
  reviewedAt: string | null;
  redFlags: string[];
  urgency: string;
  triageLabel: string;
}

interface DoctorStats { pending: number; inReview: number; reviewed: number; total: number }
interface DoctorUser { name?: string | null; email?: string | null }
interface DoctorProfile { department?: string | null; specialization?: string | null }
type ReviewTab = 'pending' | 'in-review' | 'reviewed';

export default function DoctorHome() {
  const [user, setUser] = useState<DoctorUser | null>(null);
  const [loading, setLoading] = useState(true);
  const [dataLoading, setDataLoading] = useState(true);
  const [dataError, setDataError] = useState('');
  const [activeTab, setActiveTab] = useState<ReviewTab>('pending');
  const [searchQuery, setSearchQuery] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [doctorProfile, setDoctorProfile] = useState<DoctorProfile | null>(null);
  const [stats, setStats] = useState<DoctorStats>({ pending: 0, inReview: 0, reviewed: 0, total: 0 });
  const [reports, setReports] = useState<{ pending: Report[]; inReview: Report[]; reviewed: Report[] }>({ pending: [], inReview: [], reviewed: [] });
  const [filters, setFilters] = useState({ dateRange: 'all', priority: 'all', department: 'all' });
  const router = useRouter();

  useEffect(() => {
    const getSession = async () => {
      const { data } = await authClient.getSession();
      if (!data?.user) { router.push('/login'); setLoading(false); return; }
      setUser(data.user);
      try {
        const response = await fetch('/api/doctors');
        if (!response.ok) { router.push('/doctor/onboarding'); return; }
        const payload = await response.json();
        if (!payload?.isComplete) { router.push('/doctor/onboarding'); return; }
        setDoctorProfile(payload.data);
      } catch (error) {
        console.error('Failed to load doctor profile', error);
        router.push('/doctor/onboarding');
        return;
      }
      setLoading(false);
    };
    getSession();
  }, [router]);

  const fetchDashboardData = async () => {
    setDataLoading(true); setDataError('');
    try {
      const response = await fetch('/api/doctors/stats');
      if (!response.ok) throw new Error('Dashboard request failed');
      const data = await response.json();
      setStats(data.stats);
      setReports({ pending: data.reports.pending, inReview: data.reports.inReview, reviewed: data.reports.reviewed });
    } catch (error) {
      console.error('Failed to fetch doctor dashboard', error);
      setDataError('The clinical queue could not be refreshed. Please try again.');
    } finally { setDataLoading(false); }
  };

  useEffect(() => {
    if (!user) return;
    fetchDashboardData();
    const interval = window.setInterval(fetchDashboardData, 30000);
    return () => window.clearInterval(interval);
  }, [user]);

  useEffect(() => {
    const syncHash = () => {
      if (window.location.hash === '#reviewed') setActiveTab('reviewed');
      if (window.location.hash === '#queue') setActiveTab('pending');
      if (window.location.hash === '#in-review') setActiveTab('in-review');
    };
    syncHash();
    window.addEventListener('hashchange', syncHash);
    return () => window.removeEventListener('hashchange', syncHash);
  }, []);

  const allReports = useMemo(() => [...reports.pending, ...reports.inReview, ...reports.reviewed], [reports]);
  const sourceReports = activeTab === 'pending' ? reports.pending : activeTab === 'in-review' ? reports.inReview : reports.reviewed;
  const filteredReports = sourceReports.filter(report => {
    const haystack = `${report.patientName} ${report.complaint} ${report.department}`.toLowerCase();
    const now = new Date();
    const date = new Date(report.timestamp);
    const age = now.getTime() - date.getTime();
    const matchesDate = filters.dateRange === 'all' ||
      (filters.dateRange === 'today' && date.toDateString() === now.toDateString()) ||
      (filters.dateRange === 'week' && age <= 604800000) ||
      (filters.dateRange === 'month' && age <= 2592000000);
    return haystack.includes(searchQuery.toLowerCase()) &&
      (filters.department === 'all' || normalizeDepartmentId(report.department) === filters.department) &&
      (filters.priority === 'all' || report.urgency === filters.priority) && matchesDate;
  });

  const departmentMix = useMemo(() => {
    const counts = new Map<string, number>();
    allReports.forEach(report => {
      const id = normalizeDepartmentId(report.department);
      counts.set(id, (counts.get(id) || 0) + 1);
    });
    return [...counts.entries()]
      .map(([id, count]) => ({ department: getDepartmentById(id), count }))
      .sort((a, b) => b.count - a.count)
      .slice(0, 5);
  }, [allReports]);

  const reviewActivity = useMemo(() => {
    const formatter = new Intl.DateTimeFormat('en-PK', { weekday: 'short' });
    return Array.from({ length: 7 }, (_, index) => {
      const date = new Date();
      date.setHours(0, 0, 0, 0);
      date.setDate(date.getDate() - (6 - index));
      const next = new Date(date); next.setDate(next.getDate() + 1);
      const received = allReports.filter(report => {
        const reportDate = new Date(report.timestamp);
        return reportDate >= date && reportDate < next;
      }).length;
      const reviewed = reports.reviewed.filter(report => {
        const reportDate = new Date(report.reviewedAt || report.timestamp);
        return reportDate >= date && reportDate < next;
      }).length;
      return { label: formatter.format(date), received, reviewed };
    });
  }, [allReports, reports.reviewed]);

  const maxActivity = Math.max(1, ...reviewActivity.flatMap(day => [day.received, day.reviewed]));
  const hasFilters = Object.values(filters).some(value => value !== 'all');
  const signOut = async () => { await authClient.signOut(); router.push('/'); router.refresh(); };
  const formatDate = (value: string) => new Date(value).toLocaleString('en-PK', { day: 'numeric', month: 'short', hour: '2-digit', minute: '2-digit' });
  const urgency = (value: string) => value === 'high'
    ? { label: 'Urgent', className: 'bg-[#ffe0dc] text-[#a52218]' }
    : value === 'medium'
      ? { label: 'Moderate', className: 'bg-[#fff1c9] text-[#765300]' }
      : { label: 'Routine', className: 'bg-[#d8f8f4] text-[#005252]' };

  const showTab = (tab: ReviewTab) => {
    setActiveTab(tab);
    history.replaceState(null, '', tab === 'reviewed' ? '#reviewed' : tab === 'in-review' ? '#in-review' : '#queue');
    window.dispatchEvent(new Event('hashchange'));
    document.getElementById('queue')?.scrollIntoView({ behavior: 'smooth' });
  };
  const openNext = (collection: Report[]) => {
    if (collection[0]) router.push(`/doctor/report/${collection[0].id}`);
    else showTab('pending');
  };
  const showUrgent = () => {
    setFilters(current => ({ ...current, priority: 'high' }));
    const targetTab = reports.pending.some(report => report.urgency === 'high')
      ? 'pending'
      : reports.inReview.some(report => report.urgency === 'high')
        ? 'in-review'
        : 'pending';
    showTab(targetTab);
  };

  if (loading) return <div className="flex min-h-screen items-center justify-center bg-[#effcfb]"><Loader2 className="h-10 w-10 animate-spin text-[#005252]" /></div>;

  const firstName = user?.name?.split(' ')[0] || 'Doctor';
  const statCards = [
    { label: "Today's Appointments", value: stats.total, icon: CalendarDays, note: `${stats.pending} waiting · ${stats.inReview} active`, href: '/doctor/appointments', cardClass: 'border-[#cfe3ff] bg-[#f3f8ff]', iconClass: 'bg-[#dce9ff] text-[#1264f5]', arrowClass: 'text-[#1264f5]' },
    { label: 'Total Active Patients', value: new Set(allReports.map(report => report.patientId || report.patientName)).size, icon: Users, note: 'Across the clinical workspace', href: '/doctor/patients', cardClass: 'border-[#c9ebe6] bg-[#f1fbf9]', iconClass: 'bg-[#d6f6ef] text-[#0b9f8e]', arrowClass: 'text-[#168f86]' },
    { label: 'Pending Clinical Reports', value: stats.pending, icon: FileText, note: `${reports.pending.filter(item => item.urgency === 'high').length} urgent reviews`, href: '/doctor/reports', cardClass: 'border-[#f4ddb3] bg-[#fffaf1]', iconClass: 'bg-[#ffedc9] text-[#dd8500]', arrowClass: 'text-[#d58a12]' },
    { label: 'Reviewed Reports (MTD)', value: stats.reviewed, icon: FileCheck2, note: 'Approved or returned', href: '/doctor/reports?tab=reviewed', cardClass: 'border-[#d9e1ea] bg-[#f7f9fc]', iconClass: 'bg-[#e6edf5] text-[#365d78]', arrowClass: 'text-[#60778b]' },
  ];

  return (
    <DoctorPortalShell
      user={user}
      profile={doctorProfile}
      onSignOut={signOut}
      searchValue={searchQuery}
      onSearchChange={setSearchQuery}
      headerAction={
        <div className="flex items-center gap-2"><Link href="/doctor/reports" className="hidden items-center gap-2 rounded-lg bg-[#004fda] px-4 py-2.5 text-xs font-semibold text-white shadow-sm hover:bg-[#2b69fd] md:inline-flex"><MaterialIcon className="text-[18px]">clinical_notes</MaterialIcon>Open Review Queue</Link><button onClick={fetchDashboardData} aria-label="Refresh dashboard" disabled={dataLoading} className="hidden rounded-lg p-2.5 text-[#005252] transition hover:bg-[#effcfb] disabled:opacity-50 sm:block"><RefreshCw className={`h-4 w-4 ${dataLoading ? 'animate-spin' : ''}`} /></button></div>
      }
    >
      <div className="mx-auto max-w-[1380px]">
        <section className="relative overflow-hidden rounded-xl border border-[#d1eeeb] bg-gradient-to-r from-[#eefbfa] via-[#d7f3f1] to-[#9bded8] p-6 text-[#073b58] shadow-sm">
          <div aria-hidden="true" className="absolute -right-12 -top-36 h-80 w-80 rotate-[34deg] rounded-[42%] bg-white/25" />
          <div aria-hidden="true" className="absolute -bottom-44 right-10 h-80 w-[34rem] -rotate-[24deg] rounded-[46%] bg-[#54c3ba]/20" />
          <MaterialIcon className="absolute bottom-3 right-7 text-[72px] text-white/65">stethoscope</MaterialIcon>
          <div className="relative z-10 flex flex-col justify-between gap-5 xl:flex-row xl:items-center"><div className="max-w-3xl"><div className="mb-2 flex flex-wrap gap-2"><span className="inline-flex items-center gap-1 rounded-full border border-white/80 bg-white/65 px-2.5 py-1 text-[10px] font-semibold text-[#285d78]"><MaterialIcon className="text-[14px]">calendar_today</MaterialIcon>{new Date().toLocaleDateString('en-PK', { weekday: 'long', month: 'long', day: 'numeric', year: 'numeric' })}</span><span className="inline-flex items-center gap-1.5 rounded-full border border-white/70 bg-white/55 px-2.5 py-1 text-[10px] font-medium text-[#315e70]"><span className="h-2 w-2 rounded-full bg-[#20b8a9]" />On-Duty · Clinical Review Unit</span></div><h1 className="text-3xl font-semibold tracking-tight [font-family:var(--font-outfit)] md:text-4xl">Good morning, Dr. {firstName}</h1><p className="mt-1 max-w-2xl text-sm leading-6 text-[#315c70]">You have <strong className="text-[#073b58]">{stats.total} clinical appointments</strong> in your workspace ({stats.pending} waiting, {stats.inReview} in consultation, {stats.reviewed} completed). The next patient report is ready for assessment.</p></div><div className="mr-24 flex max-w-[390px] flex-wrap gap-2 xl:justify-end"><button onClick={showUrgent} className="inline-flex items-center gap-1.5 rounded-lg border border-[#f1b7b0] bg-[#fff4f2]/90 px-3.5 py-2 text-xs font-semibold text-[#a52218] shadow-sm"><MaterialIcon className="text-[18px]">e911_emergency</MaterialIcon>Emergency Triage</button><Link href="/doctor/schedule" className="inline-flex items-center gap-1.5 rounded-lg border border-[#b9d6df] bg-white/70 px-3.5 py-2 text-xs font-semibold text-[#174b65] shadow-sm"><MaterialIcon className="text-[18px]">calendar_month</MaterialIcon>Master Schedule</Link><button onClick={() => openNext(reports.pending)} disabled={!reports.pending.length} className="inline-flex items-center gap-1.5 rounded-lg border border-[#dbe8ff] bg-white px-4 py-2 text-xs font-bold text-[#1264f5] shadow-sm disabled:opacity-60"><MaterialIcon className="text-[18px]">person_add</MaterialIcon>Quick Triage Intake</button></div></div>
        </section>

        <section className="mt-5 grid gap-4 sm:grid-cols-2 xl:grid-cols-4">
          {statCards.map(({ label, value, icon: Icon, note, href, cardClass, iconClass, arrowClass }) => <Link key={label} href={href} className={`rounded-xl border p-4 text-left shadow-sm transition hover:-translate-y-0.5 ${cardClass}`}><div className="flex items-start gap-3"><span className={`flex h-10 w-10 shrink-0 items-center justify-center rounded-lg ${iconClass}`}><Icon className="h-5 w-5" /></span><div className="min-w-0 flex-1"><p className="text-xs font-medium text-[#33485a]">{label}</p>{dataLoading ? <Loader2 className="mt-2 h-5 w-5 animate-spin text-[#6b8583]" /> : <span className="mt-1 block text-3xl font-semibold text-[#111b3a] [font-family:var(--font-outfit)]">{value}</span>}</div><ChevronRight className={`mt-3 h-4 w-4 shrink-0 ${arrowClass}`} /></div><p className="mt-3 pl-[52px] text-xs text-[#647386]">{note}</p></Link>)}
        </section>

        {dataError && <p role="alert" className="mt-5 rounded-2xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700">{dataError}</p>}

        <section id="queue" className="mt-6 scroll-mt-28 overflow-hidden rounded-xl border border-[#e2e8ef] bg-white shadow-sm">
          <div className="flex flex-col gap-4 border-b border-[#e2e8ef] p-5 xl:flex-row xl:items-center xl:justify-between"><div><div className="flex items-center gap-2"><MaterialIcon className="text-[20px] text-[#185e80]">queue</MaterialIcon><h2 className="text-xl font-semibold text-[#111b3a] [font-family:var(--font-outfit)]">Today&apos;s Appointment Queue</h2><span className="rounded-full bg-[#dce9ff] px-2 py-0.5 text-[9px] font-bold text-[#1264f5]">{stats.total} PATIENTS</span></div><p className="mt-1 text-xs text-[#68778a]">Live clinical staging, AI interview verification, and direct consultation handoffs.</p></div><div className="flex flex-wrap items-center gap-2"><div className="flex rounded-lg bg-[#f5f7fa] p-1">{([{ key: 'pending', label: 'Waiting', count: stats.pending }, { key: 'in-review', label: 'In Consultation', count: stats.inReview }, { key: 'reviewed', label: 'Done', count: stats.reviewed }] as const).map(tab => <button key={tab.key} onClick={() => showTab(tab.key)} className={`rounded-md px-3 py-2 text-xs font-semibold ${activeTab === tab.key ? 'bg-white text-[#1264f5] shadow-sm ring-1 ring-[#9fc2ff]' : 'text-[#637286]'}`}>{tab.label} <span className="ml-1 text-[10px] text-[#1264f5]">{tab.count}</span></button>)}</div><button onClick={() => setShowFilters(true)} className="relative inline-flex items-center gap-2 rounded-lg border border-[#d6dee8] px-3 py-2 text-xs font-semibold text-[#46566a] hover:bg-[#f6f8fb]"><Filter className="h-4 w-4" /> Filter by Room <ChevronDown className="h-3.5 w-3.5" />{hasFilters && <span className="h-2 w-2 rounded-full bg-[#1264f5]" />}</button></div></div>

          {dataLoading ? <div className="flex justify-center py-20"><Loader2 className="h-8 w-8 animate-spin text-[#1264f5]" /></div> : filteredReports.length === 0 ? <div className="py-20 text-center"><span className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#eaf2ff] text-[#1264f5]"><FileText className="h-7 w-7" /></span><h3 className="mt-4 font-semibold">No reports found</h3><p className="mt-2 text-sm text-[#687776]">{hasFilters ? 'Adjust or clear the active filters.' : `There are no ${activeTab.replace('-', ' ')} reports right now.`}</p>{hasFilters && <button onClick={() => setFilters({ dateRange: 'all', priority: 'all', department: 'all' })} className="mt-5 rounded-full bg-[#073b58] px-5 py-2.5 text-sm font-semibold text-white">Clear filters</button>}</div> : <div className="overflow-x-auto"><table className="w-full min-w-[860px] border-collapse text-left"><thead className="bg-[#f4f7fa] text-[10px] font-bold uppercase tracking-[0.1em] text-[#526174]"><tr><th className="px-6 py-4">Patient</th><th className="px-5 py-4">Clinical indication</th><th className="px-5 py-4">Department</th><th className="px-5 py-4">Priority</th><th className="px-5 py-4">Received</th><th className="px-6 py-4 text-right">Action</th></tr></thead><tbody className="divide-y divide-[#e5eaf0]">{filteredReports.map(report => { const priority = urgency(report.urgency); const department = getDepartmentById(normalizeDepartmentId(report.department)); const DepartmentIcon = department.icon; return <tr key={report.id} className="transition hover:bg-[#f8fafc]"><td className="px-6 py-5"><div className="flex items-center gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full bg-[#d8f8f4] text-xs font-bold text-[#087f73]">{report.patientName.split(' ').map(part => part[0]).join('').slice(0, 2)}</span><div><p className="font-semibold text-[#111b3a]">{report.patientName}</p><p className="mt-1 text-xs text-[#68778a]">{report.age ? `${report.age} years` : 'Age not provided'} · #{report.patientId?.slice(-6) || 'record'}</p></div></div></td><td className="max-w-[300px] px-5 py-5"><p className="font-medium text-[#334155]">{report.complaint || 'Clinical interview'}</p>{report.redFlags.length > 0 && <p className="mt-1 flex items-center gap-1 text-xs text-[#a52218]"><AlertTriangle className="h-3 w-3" />{report.redFlags[0]}{report.redFlags.length > 1 ? ` +${report.redFlags.length - 1}` : ''}</p>}</td><td className="px-5 py-5"><span className="inline-flex items-center gap-1.5 text-sm text-[#516174]"><DepartmentIcon className="h-4 w-4 text-[#18a9a1]" />{department.name}</span></td><td className="px-5 py-5"><span className={`rounded-full px-3 py-1.5 text-xs font-semibold ${priority.className}`}>{priority.label}</span></td><td className="px-5 py-5 text-sm text-[#68778a]">{formatDate(report.timestamp)}</td><td className="px-6 py-5 text-right"><Link href={`/doctor/report/${report.id}`} className="inline-flex items-center gap-2 rounded-xl bg-[#073b58] px-4 py-2.5 text-sm font-semibold text-white hover:bg-[#0c506f]">{activeTab === 'reviewed' ? 'Open' : 'Review'} <ArrowRight className="h-4 w-4" /></Link></td></tr>; })}</tbody></table></div>}
        </section>

        <section className="mt-6 grid items-start gap-6 xl:grid-cols-[1.35fr_0.65fr]">
          <div className="space-y-6">
            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <PanelHeading icon={BarChart3} title="Weekly Patient Consultations" copy="Clinical reports received and completed over the last seven days" action={<Link href="/doctor/appointments" className="inline-flex items-center gap-1 text-xs font-semibold text-[#1264f5] hover:underline">Full analytics <ArrowRight className="h-3.5 w-3.5" /></Link>} />
              <div className="mt-7 grid h-52 grid-cols-7 items-end gap-2 sm:gap-4" aria-label="Seven-day report activity">
                {reviewActivity.map(day => <div key={day.label} className="flex h-full flex-col justify-end"><div className="flex flex-1 items-end justify-center gap-1"><span title={`${day.received} received`} className="w-3 rounded-t bg-[#005252] sm:w-5" style={{ height: `${Math.max(5, (day.received / maxActivity) * 100)}%` }} /><span title={`${day.reviewed} reviewed`} className="w-3 rounded-t bg-[#1264f5] sm:w-5" style={{ height: `${Math.max(5, (day.reviewed / maxActivity) * 100)}%` }} /></div><p className="mt-3 text-center text-[10px] font-semibold text-[#687776]">{day.label}</p></div>)}
              </div>
              <div className="mt-4 flex justify-end gap-4 text-[11px] text-[#687776]"><span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#005252]" /> Received</span><span className="inline-flex items-center gap-1.5"><span className="h-2.5 w-2.5 rounded-sm bg-[#1264f5]" /> Reviewed</span></div>
            </article>

            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <PanelHeading icon={Stethoscope} title="Patient Demographics & Risk Stratification" copy="Current registry distribution based on report department" />
              <div className="mt-5 space-y-3">{departmentMix.length === 0 ? <p className="rounded-2xl bg-[#f1fbf9] p-5 text-sm text-[#687776]">Case distribution will appear when reports enter the workspace.</p> : departmentMix.map(({ department, count }) => { const Icon = department.icon; return <button key={department.id} onClick={() => { setFilters(current => ({ ...current, department: department.id })); showTab('pending'); }} className="flex w-full items-center justify-between rounded-xl bg-gradient-to-r from-[#f1fbf9] to-[#eef9fb] p-3 text-left hover:from-[#e5f7f3] hover:to-[#e5f3f7]"><span className="flex items-center gap-3"><span className="flex h-9 w-9 items-center justify-center rounded-lg bg-white text-[#087f73] shadow-sm"><Icon className="h-4 w-4" /></span><span className="text-sm font-semibold text-[#111b3a]">{department.name}</span></span><span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#087f73] shadow-sm">{count}</span></button>; })}</div>
            </article>

            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <div className="flex items-center gap-3"><ShieldCheck className="h-5 w-5 text-[#087f73]" /><h2 className="text-lg font-semibold text-[#111b3a] [font-family:var(--font-outfit)]">Review workflow</h2></div>
              <div className="mt-5 grid gap-3 sm:grid-cols-3"><WorkflowStep number="1" title="Open report" copy="Review patient context and generated SOAP sections." tone="teal" /><WorkflowStep number="2" title="Document decision" copy="Approve, reject, add notes, or request regeneration." tone="blue" /><WorkflowStep number="3" title="Return guidance" copy="Save prescriptions and make the result available to the patient." tone="amber" /></div>
            </article>

            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <PanelHeading icon={FileCheck2} title="Recent clinical activity" copy="Latest reports across all review states" />
              <div className="mt-5 grid gap-3 md:grid-cols-3">{allReports.length === 0 ? <p className="text-sm text-[#687776]">No clinical activity yet.</p> : [...allReports].sort((a, b) => new Date(b.reviewedAt || b.timestamp).getTime() - new Date(a.reviewedAt || a.timestamp).getTime()).slice(0, 3).map((report, index) => <Link key={report.id} href={`/doctor/report/${report.id}`} className={`block rounded-xl border p-4 transition hover:-translate-y-0.5 ${index % 3 === 0 ? 'border-[#c9ebe6] bg-[#f1fbf9]' : index % 3 === 1 ? 'border-[#cfe3ff] bg-[#f3f8ff]' : 'border-[#f4ddb3] bg-[#fffaf1]'}`}><div className="flex items-start justify-between gap-3"><div><p className="text-sm font-semibold text-[#111b3a]">{report.patientName}</p><p className="mt-1 line-clamp-2 text-xs leading-5 text-[#68778a]">{report.complaint || 'Clinical interview'}</p></div><ArrowRight className={`mt-0.5 h-4 w-4 shrink-0 ${index % 3 === 1 ? 'text-[#1264f5]' : index % 3 === 2 ? 'text-[#d58a12]' : 'text-[#087f73]'}`} /></div></Link>)}</div>
            </article>
          </div>

          <div className="space-y-6">
            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <PanelHeading icon={ListChecks} title="Rapid clinical actions" copy="Shortcuts into the real review workflow" />
              <div className="mt-5 grid grid-cols-2 gap-3"><ActionCard icon={Stethoscope} title="Write Prescription" copy="Open reviewed records" tone="teal" onClick={() => router.push('/doctor/prescriptions')} /><ActionCard icon={FileText} title="SOAP Progress Note" copy="Continue active report" tone="blue" onClick={() => openNext(reports.inReview)} disabled={reports.inReview.length === 0} /><ActionCard icon={AlertTriangle} title="Order Lab / Echo" copy="Diagnostics routing" tone="amber" onClick={() => router.push('/doctor/lab-requests')} /><ActionCard icon={CheckCircle2} title="Refer Specialist" copy="Open patient registry" tone="rose" onClick={() => router.push('/doctor/patients')} /></div>
            </article>

            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <div className="flex items-center justify-between"><h2 className="text-lg font-semibold text-[#111b3a] [font-family:var(--font-outfit)]">{new Date().toLocaleDateString('en-PK', { month: 'long', year: 'numeric' })}</h2><Link href="/doctor/schedule" className="inline-flex items-center gap-1 text-xs font-semibold text-[#1264f5]">Full schedule <ArrowRight className="h-3.5 w-3.5" /></Link></div><div className="mt-5 grid grid-cols-7 gap-2 text-center text-[10px] text-[#6f7979]">{['Su','Mo','Tu','We','Th','Fr','Sa'].map(day => <span key={day} className="font-semibold">{day}</span>)}{Array.from({ length: 35 }, (_, index) => <span key={index} className={`rounded-md py-2 ${index === 14 ? 'bg-[#087f73] font-bold text-white shadow-sm' : 'hover:bg-[#eef4f8]'}`}>{index + 1}</span>)}</div>
            </article>

            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <PanelHeading icon={FileCheck2} title="Clinical Communications" copy="Latest activity across the care workspace" />
              <div className="mt-5 space-y-3">{allReports.slice(0, 3).map((report, index) => <Link key={report.id} href={`/doctor/report/${report.id}`} className={`block rounded-xl border p-3 ${index % 2 === 0 ? 'border-[#f4d4dc] bg-[#fff4f6]' : 'border-[#d6e5fb] bg-[#f3f8ff]'}`}><p className="text-xs font-semibold text-[#111b3a]">{report.patientName} · Patient Portal</p><p className="mt-1 line-clamp-2 text-[11px] leading-5 text-[#68778a]">{report.complaint}</p></Link>)}{allReports.length === 0 && <p className="text-xs text-[#687776]">No new communications.</p>}</div><Link href="/doctor/messages" className="mt-4 inline-flex items-center gap-1 text-xs font-semibold text-[#1264f5]">Open clinical messages <ArrowRight className="h-3.5 w-3.5" /></Link>
            </article>

            <article className="rounded-[24px] border border-[#dcebea] bg-white p-6 shadow-sm">
              <PanelHeading icon={ShieldCheck} title="Workspace pulse" copy="Live state of the review pipeline" />
              <div className="mt-5 space-y-3"><PulseRow label="Pending decisions" value={stats.pending} tone="amber" /><PulseRow label="Active reviews" value={stats.inReview} tone="blue" /><PulseRow label="Completed records" value={stats.reviewed} tone="teal" /></div>
            </article>

            <article className="rounded-[24px] bg-gradient-to-br from-[#073b58] to-[#0b5b73] p-6 text-white shadow-sm">
              <AlertTriangle className="h-5 w-5 text-[#8ee8df]" /><h2 className="mt-4 text-lg font-semibold [font-family:var(--font-outfit)]">Clinical responsibility</h2><p className="mt-2 text-sm leading-6 text-[#d2edf0]">AI output is decision support. Verify all findings and recommendations before approval.</p>
            </article>
          </div>
        </section>
      </div>

      <AnimatePresence>{showFilters && <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} exit={{ opacity: 0 }} onClick={() => setShowFilters(false)} className="fixed inset-0 z-[70] flex items-center justify-center bg-[#071f1f]/55 p-4"><motion.div initial={{ y: 18, opacity: 0 }} animate={{ y: 0, opacity: 1 }} exit={{ y: 18, opacity: 0 }} onClick={event => event.stopPropagation()} className="relative w-full max-w-lg rounded-[26px] bg-white p-6 shadow-2xl"><button aria-label="Close filters" onClick={() => setShowFilters(false)} className="absolute right-5 top-5 rounded-full bg-[#eef4f8] p-2"><X className="h-4 w-4" /></button><h2 className="text-xl font-semibold [font-family:var(--font-outfit)]">Filter clinical reports</h2><p className="mt-1 text-sm text-[#687776]">Narrow the current queue without changing its review status.</p><div className="mt-6 space-y-5"><FilterSelect label="Department" value={filters.department} onChange={value => setFilters(current => ({ ...current, department: value }))} options={getDepartmentFilterOptions().map(department => ({ value: department.id, label: department.name }))} /><FilterSelect label="Date range" value={filters.dateRange} onChange={value => setFilters(current => ({ ...current, dateRange: value }))} options={[{ value: 'all', label: 'All time' }, { value: 'today', label: 'Today' }, { value: 'week', label: 'This week' }, { value: 'month', label: 'This month' }]} /><FilterSelect label="Priority" value={filters.priority} onChange={value => setFilters(current => ({ ...current, priority: value }))} options={[{ value: 'all', label: 'All priorities' }, { value: 'high', label: 'Urgent' }, { value: 'medium', label: 'Moderate' }, { value: 'low', label: 'Routine' }]} /></div><div className="mt-7 flex gap-3"><button onClick={() => setFilters({ dateRange: 'all', priority: 'all', department: 'all' })} className="flex-1 rounded-xl border border-[#cfd9e5] px-4 py-3 text-sm font-semibold">Clear filters</button><button onClick={() => setShowFilters(false)} className="flex-1 rounded-xl bg-[#1264f5] px-4 py-3 text-sm font-semibold text-white hover:bg-[#0b55db]">Apply filters</button></div></motion.div></motion.div>}</AnimatePresence>
    </DoctorPortalShell>
  );
}

function PanelHeading({ icon: Icon, title, copy, action }: { icon: typeof BarChart3; title: string; copy: string; action?: React.ReactNode }) { return <div className="flex items-start justify-between gap-4"><div className="flex items-start gap-3"><span className="flex h-10 w-10 shrink-0 items-center justify-center rounded-xl bg-[#e5f7f5] text-[#087f73]"><Icon className="h-5 w-5" /></span><div><h2 className="text-lg font-semibold text-[#111b3a] [font-family:var(--font-outfit)]">{title}</h2><p className="mt-1 text-xs text-[#68778a]">{copy}</p></div></div>{action}</div>; }
function ActionCard({ icon: Icon, title, copy, tone, onClick, disabled = false }: { icon: typeof Stethoscope; title: string; copy: string; tone: 'teal' | 'blue' | 'amber' | 'rose'; onClick: () => void; disabled?: boolean }) { const tones = { teal: 'border-[#c9ebe6] bg-[#f1fbf9] text-[#087f73]', blue: 'border-[#cfe3ff] bg-[#f3f8ff] text-[#1264f5]', amber: 'border-[#f4ddb3] bg-[#fffaf1] text-[#d17b00]', rose: 'border-[#f4d4dc] bg-[#fff4f6] text-[#b51f47]' } as const; return <button onClick={onClick} disabled={disabled} className={`rounded-2xl border p-4 text-left transition hover:-translate-y-0.5 disabled:cursor-not-allowed disabled:opacity-50 ${tones[tone]}`}><span className="flex items-start justify-between"><span className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/80 shadow-sm"><Icon className="h-4 w-4" /></span><ArrowRight className="mt-2 h-4 w-4" /></span><span className="mt-3 block text-sm font-semibold text-[#111b3a]">{title}</span><span className="mt-1 block text-xs leading-5 text-[#68778a]">{copy}</span></button>; }
function PulseRow({ label, value, tone }: { label: string; value: number; tone: 'amber' | 'blue' | 'teal' }) { const color = tone === 'amber' ? 'bg-[#ffedc9] text-[#c67000]' : tone === 'blue' ? 'bg-[#dce9ff] text-[#1264f5]' : 'bg-[#d6f6ef] text-[#087f73]'; return <div className="flex items-center justify-between rounded-xl bg-[#f4f7fa] px-4 py-3"><span className="text-sm font-medium text-[#334155]">{label}</span><span className={`rounded-full px-3 py-1 text-xs font-bold ${color}`}>{value}</span></div>; }
function WorkflowStep({ number, title, copy, tone }: { number: string; title: string; copy: string; tone: 'teal' | 'blue' | 'amber' }) { const tones = { teal: 'border-[#c9ebe6] bg-[#f1fbf9]', blue: 'border-[#cfe3ff] bg-[#f3f8ff]', amber: 'border-[#f4ddb3] bg-[#fffaf1]' } as const; const badges = { teal: 'bg-[#087f73]', blue: 'bg-[#1264f5]', amber: 'bg-[#c77a13]' } as const; return <div className={`rounded-2xl border p-4 ${tones[tone]}`}><span className={`flex h-7 w-7 items-center justify-center rounded-full text-xs font-bold text-white ${badges[tone]}`}>{number}</span><p className="mt-3 font-semibold text-[#111b3a]">{title}</p><p className="mt-1 text-xs leading-5 text-[#68778a]">{copy}</p></div>; }
function FilterSelect({ label, value, onChange, options }: { label: string; value: string; onChange: (value: string) => void; options: { value: string; label: string }[] }) { return <label className="block"><span className="mb-2 block text-sm font-semibold text-[#3f4948]">{label}</span><div className="relative"><select value={value} onChange={event => onChange(event.target.value)} className="w-full appearance-none rounded-xl border border-[#cfd9e5] bg-[#f7fbfb] px-4 py-3 text-sm outline-none focus:border-[#1264f5] focus:ring-2 focus:ring-[#dce9ff]">{options.map(option => <option key={option.value} value={option.value}>{option.label}</option>)}</select><ChevronDown className="pointer-events-none absolute right-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#687776]" /></div></label>; }
