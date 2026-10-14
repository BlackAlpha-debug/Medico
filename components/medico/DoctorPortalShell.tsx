'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { Menu, Search, X } from 'lucide-react';
import { ReactNode, useState } from 'react';
import { MedicoPortalBrand } from './MedicoPortalBrand';

interface DoctorPortalShellProps {
  user: { name?: string | null; email?: string | null } | null;
  profile?: { specialization?: string | null; department?: string | null } | null;
  children: ReactNode;
  onSignOut: () => void | Promise<void>;
  searchValue?: string;
  onSearchChange?: (value: string) => void;
  searchPlaceholder?: string;
  headerAction?: ReactNode;
  messageCount?: number;
}

const navigation = [
  { href: '/doctor/home', label: 'Home', icon: 'home' },
  { href: '/doctor/appointments', label: 'Appointments', icon: 'event_available' },
  { href: '/doctor/patients', label: 'Patients', icon: 'groups' },
  { href: '/doctor/schedule', label: 'Schedule', icon: 'calendar_month' },
  { href: '/doctor/prescriptions', label: 'Prescriptions', icon: 'prescriptions' },
  { href: '/doctor/lab-requests', label: 'Lab Requests', icon: 'biotech' },
  { href: '/doctor/messages', label: 'Messages', icon: 'mark_chat_unread' },
  { href: '/doctor/reports', label: 'Reports', icon: 'monitoring' },
  { href: '/doctor/settings', label: 'Settings', icon: 'settings' },
];

export function MaterialIcon({ children, className = '' }: { children: string; className?: string }) {
  return <span aria-hidden="true" className={`doctor-material-icon ${className}`}>{children}</span>;
}

export function DoctorPortalShell({ user, profile, children, onSignOut, searchValue, onSearchChange, searchPlaceholder = 'Search patients, MRN, lab orders, records...', headerAction, messageCount = 0 }: DoctorPortalShellProps) {
  const pathname = usePathname();
  const [mobileOpen, setMobileOpen] = useState(false);
  const initials = user?.name?.split(' ').map(part => part[0]).join('').slice(0, 2).toUpperCase() || 'DR';
  const specialty = profile?.specialization || profile?.department || 'Clinical reviewer';

  const renderSidebar = (compactable: boolean) => <div className="flex h-full flex-col overflow-hidden bg-[#1f6b6b] text-white">
    <div className={`relative flex h-20 shrink-0 items-center ${compactable ? 'justify-center px-4 group-hover/sidebar:justify-between group-hover/sidebar:px-6 group-focus-within/sidebar:justify-between group-focus-within/sidebar:px-6' : 'justify-between px-6'}`}>
      {compactable ? <><div className="transition-opacity duration-200 group-hover/sidebar:opacity-0 group-focus-within/sidebar:opacity-0"><MedicoPortalBrand iconOnly /></div><div className="pointer-events-none absolute left-6 opacity-0 transition-opacity delay-75 duration-200 group-hover/sidebar:pointer-events-auto group-hover/sidebar:opacity-100 group-focus-within/sidebar:pointer-events-auto group-focus-within/sidebar:opacity-100"><MedicoPortalBrand className="min-w-0" /></div></> : <MedicoPortalBrand className="min-w-0" />}
      <span className={`${compactable ? 'absolute right-5 opacity-0 group-hover/sidebar:opacity-100 group-focus-within/sidebar:opacity-100' : ''} h-2.5 w-2.5 rounded-full bg-[#a8efea] ring-2 ring-[#1f6b6b] transition-opacity`} />
    </div>
    <nav className={`${compactable ? 'px-3 group-hover/sidebar:px-4 group-focus-within/sidebar:px-4' : 'px-4'} space-y-1 py-2 transition-all`}>{navigation.map(item => { const active = pathname === item.href || (item.href === '/doctor/reports' && pathname.startsWith('/doctor/report/')); return <Link key={item.href} href={item.href} title={compactable ? item.label : undefined} onClick={() => setMobileOpen(false)} aria-current={active ? 'page' : undefined} className={`flex min-h-11 items-center rounded-lg text-sm transition ${compactable ? 'justify-center px-3 group-hover/sidebar:justify-between group-hover/sidebar:px-3.5 group-focus-within/sidebar:justify-between group-focus-within/sidebar:px-3.5' : 'justify-between px-3.5'} ${active ? 'bg-[#005252] font-semibold text-white shadow-sm' : 'text-[#d1ece9] hover:bg-[#005252]/50 hover:text-white'}`}><span className="flex min-w-0 items-center gap-3"><MaterialIcon className="shrink-0 text-[20px]">{item.icon}</MaterialIcon><span className={`${compactable ? 'max-w-0 overflow-hidden whitespace-nowrap opacity-0 transition-all duration-200 group-hover/sidebar:max-w-44 group-hover/sidebar:opacity-100 group-focus-within/sidebar:max-w-44 group-focus-within/sidebar:opacity-100' : ''}`}>{item.label}</span></span>{item.label === 'Messages' && messageCount > 0 && <span className={`${compactable ? 'absolute ml-7 mt-[-22px] h-2 w-2 overflow-hidden p-0 text-[0] group-hover/sidebar:static group-hover/sidebar:ml-0 group-hover/sidebar:mt-0 group-hover/sidebar:h-auto group-hover/sidebar:w-auto group-hover/sidebar:px-2 group-hover/sidebar:py-0.5 group-hover/sidebar:text-[10px] group-focus-within/sidebar:static group-focus-within/sidebar:ml-0 group-focus-within/sidebar:mt-0 group-focus-within/sidebar:h-auto group-focus-within/sidebar:w-auto group-focus-within/sidebar:px-2 group-focus-within/sidebar:py-0.5 group-focus-within/sidebar:text-[10px]' : 'px-2 py-0.5 text-[10px]'} rounded-full bg-[#2b69fd] font-bold text-white`}>{messageCount}</span>}</Link>; })}</nav>
    <div className={`${compactable ? 'p-3 group-hover/sidebar:p-4 group-focus-within/sidebar:p-4' : 'p-4'} mt-auto space-y-3 transition-all`}><div className={`rounded-xl bg-[#005252]/45 ${compactable ? 'flex justify-center p-3 group-hover/sidebar:block group-focus-within/sidebar:block' : 'p-3'}`}><div className="flex items-center gap-2 text-xs font-semibold"><span className="h-2 w-2 shrink-0 rounded-full bg-[#a8efea]" /><span className={`${compactable ? 'max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/sidebar:max-w-48 group-hover/sidebar:opacity-100 group-focus-within/sidebar:max-w-48 group-focus-within/sidebar:opacity-100' : ''} transition-all`}>On Duty · Pavilion B</span></div><p className={`${compactable ? 'hidden group-hover/sidebar:block group-focus-within/sidebar:block' : ''} mt-1 text-[11px] text-[#c4e4e1]`}>{profile?.department || 'Clinical Review Unit'}</p></div><Link href="/contact" title={compactable ? 'Call On-Call Support' : undefined} className={`flex items-center rounded-lg py-2 text-xs text-[#d1ece9] hover:bg-[#005252]/50 ${compactable ? 'justify-center px-3 group-hover/sidebar:justify-start group-hover/sidebar:gap-2 group-focus-within/sidebar:justify-start group-focus-within/sidebar:gap-2' : 'gap-2 px-3'}`}><MaterialIcon className="shrink-0 text-[18px]">support_agent</MaterialIcon><span className={`${compactable ? 'max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/sidebar:max-w-48 group-hover/sidebar:opacity-100 group-focus-within/sidebar:max-w-48 group-focus-within/sidebar:opacity-100' : ''} transition-all`}>Call On-Call Support</span></Link><button onClick={onSignOut} title={compactable ? 'Logout' : undefined} className={`flex w-full items-center rounded-lg py-2 text-left text-xs text-[#d1ece9] hover:bg-[#005252]/50 ${compactable ? 'justify-center px-3 group-hover/sidebar:justify-start group-hover/sidebar:gap-2 group-focus-within/sidebar:justify-start group-focus-within/sidebar:gap-2' : 'gap-2 px-3'}`}><MaterialIcon className="shrink-0 text-[18px]">logout</MaterialIcon><span className={`${compactable ? 'max-w-0 overflow-hidden whitespace-nowrap opacity-0 group-hover/sidebar:max-w-48 group-hover/sidebar:opacity-100 group-focus-within/sidebar:max-w-48 group-focus-within/sidebar:opacity-100' : ''} transition-all`}>Logout</span></button></div>
  </div>;

  return <div className="min-h-screen bg-[#effcfb] text-[#121e1e] [font-family:var(--font-inter)]">
    <aside className="group/sidebar fixed inset-y-0 left-0 z-40 hidden w-20 overflow-hidden shadow-[6px_0_20px_rgba(7,59,88,.08)] transition-[width] duration-300 ease-out hover:w-72 focus-within:w-72 lg:block">{renderSidebar(true)}</aside>
    {mobileOpen && <div className="fixed inset-0 z-50 lg:hidden"><button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute inset-0 bg-[#071f1f]/45" /><aside className="relative h-full w-72 shadow-2xl">{renderSidebar(false)}<button aria-label="Close menu" onClick={() => setMobileOpen(false)} className="absolute right-3 top-5 rounded-lg bg-white/10 p-2"><X className="h-5 w-5" /></button></aside></div>}
    <div className="lg:pl-20">
      <header className="sticky top-0 z-30 flex h-16 items-center gap-3 bg-white/95 px-4 shadow-[0_1px_8px_rgba(0,0,0,.04)] backdrop-blur md:px-8"><button aria-label="Open menu" onClick={() => setMobileOpen(true)} className="rounded-lg p-2 text-[#005252] lg:hidden"><Menu className="h-5 w-5" /></button><Link href="/doctor/home" className="hidden shrink-0 text-xl font-bold tracking-tight text-[#111b3a] [font-family:var(--font-outfit)] lg:block">Medico.</Link><div className="relative min-w-0 flex-1 md:max-w-xl"><Search className="absolute left-3 top-1/2 h-4 w-4 -translate-y-1/2 text-[#6f7979]" /><input aria-label="Search doctor workspace" value={searchValue ?? ''} onChange={event => onSearchChange?.(event.target.value)} placeholder={searchPlaceholder} disabled={!onSearchChange} className="w-full rounded-lg border-0 bg-[#f7fbfb] py-2.5 pl-10 pr-4 text-sm outline-none ring-1 ring-[#e1eeed] transition focus:ring-2 focus:ring-[#1f6b6b]/30 disabled:cursor-default" /></div><div className="ml-auto flex items-center gap-2">{headerAction}<Link href="/doctor/messages" aria-label="Clinical messages" className="hidden rounded-lg p-2 text-[#3f4948] hover:bg-[#e3f1f0] sm:block"><MaterialIcon className="text-[21px]">forum</MaterialIcon></Link><Link href="/docs" aria-label="Documentation help" className="hidden rounded-lg p-2 text-[#3f4948] hover:bg-[#e3f1f0] sm:block"><MaterialIcon className="text-[21px]">help</MaterialIcon></Link><Link href="/doctor/settings" className="flex shrink-0 items-center gap-2 border-l border-[#e0ebea] pl-3"><span className="flex h-8 w-8 items-center justify-center rounded-full bg-[#005252] text-[10px] font-bold text-white">{initials}</span><span className="hidden text-right xl:block"><span className="block max-w-48 truncate text-xs font-semibold">Dr. {user?.name || 'Doctor'}, MD</span><span className="block max-w-48 truncate text-[10px] text-[#3f4948]">{specialty}</span></span><MaterialIcon className="hidden text-[17px] text-[#6f7979] xl:block">expand_more</MaterialIcon></Link></div></header>
      <main className="px-4 py-6 md:px-8 md:py-8">{children}</main>
    </div>
  </div>;
}
