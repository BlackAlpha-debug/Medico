'use client';

import Image from 'next/image';
import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Bell, CalendarDays, CreditCard, FileClock, FlaskConical, Home, LogOut, Menu, MessageSquare, Phone, Pill, Search, ShieldCheck, UserRound, X } from 'lucide-react';
import { ReactNode, useState } from 'react';

type PortalUser = { name?: string | null; email?: string | null } | null;
interface PatientPortalShellProps { user: PortalUser; children: ReactNode; searchValue?: string; onSearchChange?: (value: string) => void; searchPlaceholder?: string; onSignOut: () => void | Promise<void>; primaryAction?: { label: string; onClick: () => void }; messageCount?: number; hasClinicalRecord?: boolean; }

const navItems = [
  { href: '/patient/home', label: 'Home', icon: Home },
  { href: '/patient/appointments', label: 'Appointments', icon: CalendarDays },
  { href: '/patient/medical-records', label: 'Medical Records', icon: FileClock },
  { href: '/patient/prescriptions', label: 'Prescriptions', icon: Pill },
  { href: '/patient/lab-reports', label: 'Lab Reports', icon: FlaskConical },
  { href: '/patient/billing', label: 'Billing', icon: CreditCard },
  { href: '/patient/messages', label: 'Messages', icon: MessageSquare },
  { href: '/patient/profile', label: 'Profile', icon: UserRound },
];

export function PatientPortalShell({ user, children, searchValue, onSearchChange, searchPlaceholder = 'Search records, doctors, prescriptions…', onSignOut, primaryAction, messageCount = 0, hasClinicalRecord = false }: PatientPortalShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = user?.name?.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'P';

  const renderSidebar = (compactable: boolean) => <div className="flex h-full w-72 flex-col bg-[#226f70] px-4 py-4 text-white">
    <div className="relative flex h-11 items-center px-2">
      {compactable ? <>
        <Link href="/patient/home" aria-label="Patient home" className="w-10 overflow-hidden transition-opacity duration-200 group-hover/sidebar:opacity-0 group-focus-within/sidebar:opacity-0"><Image src="/medico/logo-dark.png" alt="" width={165} height={47} className="h-8 max-w-none" priority /></Link>
        <div className="pointer-events-none absolute left-2 flex w-[238px] items-center justify-between opacity-0 transition-opacity delay-75 duration-200 group-hover/sidebar:pointer-events-auto group-hover/sidebar:opacity-100 group-focus-within/sidebar:pointer-events-auto group-focus-within/sidebar:opacity-100"><Link href="/patient/home"><Image src="/medico/logo-dark.png" alt="Medico" width={165} height={47} className="h-8 w-auto" priority /></Link><span className="rounded-full bg-[#a8efee] px-2 py-0.5 text-[10px] font-semibold text-[#003f40]">PORTAL</span></div>
      </> : <div className="flex w-full items-center justify-between"><Link href="/patient/home"><Image src="/medico/logo-dark.png" alt="Medico" width={165} height={47} className="h-8 w-auto" priority /></Link><span className="rounded-full bg-[#a8efee] px-2 py-0.5 text-[10px] font-semibold text-[#003f40]">PORTAL</span></div>}
    </div>

    <div className="mt-3 flex min-h-14 items-center gap-3 rounded-xl bg-[#005252]/45 px-3"><ShieldCheck className="h-5 w-5 shrink-0 text-[#a8efee]" /><div className={`${compactable ? 'opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100' : ''} whitespace-nowrap transition-opacity`}><p className="text-[10px] leading-none text-[#c9e9e7]">Clinical Status</p><p className="mt-1 text-xs font-semibold">{hasClinicalRecord ? 'Active Record' : 'Getting Started'}</p></div></div>

    <nav className="mt-3 space-y-1" aria-label="Patient portal">{navItems.map(item => { const Icon = item.icon; const active = pathname === item.href || (item.href === '/patient/profile' && pathname.startsWith('/patient/profile')); const badge = item.href === '/patient/messages' ? messageCount : 0; return <Link key={item.href} href={item.href} onClick={() => setMobileOpen(false)} aria-label={compactable ? item.label : undefined} aria-current={active ? 'page' : undefined} className={`flex min-h-11 items-center justify-between rounded-xl px-3 text-[13px] font-medium transition ${active ? 'bg-white text-[#005252] shadow-sm' : 'text-[#c9e9e7] hover:bg-white/10 hover:text-white'}`}><span className="flex items-center gap-3"><Icon className="h-[18px] w-[18px] shrink-0" /><span className={`${compactable ? 'opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100' : ''} whitespace-nowrap transition-opacity`}>{item.label}</span></span>{badge > 0 && <span className={`${compactable ? 'opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100' : ''} rounded-full bg-[#2b69fd] px-2 py-0.5 text-[10px] font-bold text-white transition-opacity`}>{badge > 99 ? '99+' : badge}</span>}</Link>; })}</nav>

    <div className="mt-auto space-y-2"><a href="tel:1122" aria-label="24/7 care hotline 1122" className="flex min-h-14 items-center gap-3 rounded-xl bg-white/10 px-3 transition hover:bg-white/15"><Phone className="h-[18px] w-[18px] shrink-0 text-[#a8efee]" /><div className={`${compactable ? 'opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100' : ''} whitespace-nowrap transition-opacity`}><p className="text-[9px] font-bold uppercase tracking-wider text-[#a8efee]">24/7 Care Hotline</p><p className="mt-0.5 text-lg font-semibold [font-family:var(--font-outfit)]">1122</p></div></a><button onClick={onSignOut} aria-label="Logout" className="flex min-h-11 w-full items-center gap-3 rounded-xl px-3 text-[13px] font-medium text-[#c9e9e7] hover:bg-white/10 hover:text-white"><LogOut className="h-[18px] w-[18px] shrink-0" /><span className={`${compactable ? 'opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100' : ''} whitespace-nowrap transition-opacity`}>Logout</span></button></div>
  </div>;

  return <div className="min-h-screen bg-[#effcfb] text-[#121e1e] [font-family:var(--font-inter)]">
    <aside className="group/sidebar fixed inset-y-0 left-0 z-50 hidden w-20 overflow-hidden shadow-[6px_0_20px_rgba(7,59,88,.08)] transition-[width] duration-300 ease-out hover:w-72 focus-within:w-72 lg:block">{renderSidebar(true)}</aside>
    {mobileOpen && <div className="fixed inset-0 z-[70] lg:hidden"><button aria-label="Close menu" className="absolute inset-0 bg-[#071f1f]/55" onClick={() => setMobileOpen(false)} /><aside className="relative h-full w-72 shadow-2xl">{renderSidebar(false)}<button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute right-3 top-4 rounded-lg bg-white/10 p-2"><X className="h-5 w-5" /></button></aside></div>}
    <div className="lg:pl-20"><header className="sticky top-0 z-40 flex h-16 items-center gap-3 border-b border-[#e1efed] bg-white/95 px-4 shadow-[0_1px_8px_rgba(0,0,0,.03)] backdrop-blur-xl md:px-8"><button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="rounded-lg bg-white p-2 text-[#005252] shadow-sm lg:hidden"><Menu className="h-5 w-5" /></button><Link href="/patient/home" className="hidden shrink-0 text-xl font-bold tracking-tight text-[#111b3a] [font-family:var(--font-outfit)] lg:block">Medico.</Link><div className="relative min-w-0 flex-1 md:max-w-[510px]"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#657674]" /><input aria-label="Search patient records" value={searchValue ?? ''} onChange={event => onSearchChange?.(event.target.value)} disabled={!onSearchChange} placeholder={searchPlaceholder} className="w-full rounded-xl border border-[#dcebea] bg-[#f8fbfb] py-2.5 pl-10 pr-4 text-xs outline-none placeholder:text-[#788885] focus:ring-2 focus:ring-[#a8efee] disabled:cursor-default" /></div><div className="ml-auto flex items-center gap-1 sm:gap-3">{primaryAction && <button onClick={primaryAction.onClick} className="hidden items-center gap-2 rounded-full bg-[#1769ff] px-5 py-2.5 text-xs font-semibold text-white shadow-sm transition hover:bg-[#004fda] sm:flex"><span className="text-base leading-none">＋</span>{primaryAction.label}</button>}<Link href="/patient/messages" aria-label="Messages" className="rounded-full p-2 text-[#005252] hover:bg-[#e9f6f6]"><MessageSquare className="h-5 w-5" /></Link><Link href="/patient/messages" aria-label="Notifications" className="relative rounded-full p-2 text-[#005252] hover:bg-[#e9f6f6]"><Bell className="h-5 w-5" />{messageCount > 0 && <span className="absolute right-2 top-1.5 h-1.5 w-1.5 rounded-full bg-red-500 ring-2 ring-white" />}</Link><Link href="/patient/profile" className="flex items-center gap-2 rounded-lg p-1 hover:bg-[#e9f6f6]"><span className="flex h-9 w-9 items-center justify-center rounded-full bg-[#005252] text-[10px] font-bold text-white">{initials}</span><span className="hidden text-right md:block"><span className="block max-w-36 truncate text-xs font-semibold">{user?.name || 'Patient'}</span><span className="block text-[9px] font-medium text-[#005252]">Patient Portal</span></span></Link></div></header><main className="px-4 py-5 md:px-6">{children}</main></div>
  </div>;
}
