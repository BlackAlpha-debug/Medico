'use client';

import Image from 'next/image';
import Link from 'next/link';
import { ArrowLeft, ArrowRight, Home, LifeBuoy, Search, Stethoscope } from 'lucide-react';

export default function NotFound() {
  return <main className="min-h-screen bg-[#effcfb] px-4 py-6 text-[#121e1e] [font-family:var(--font-inter)] sm:px-6">
    <div className="mx-auto flex min-h-[calc(100vh-3rem)] max-w-6xl flex-col overflow-hidden rounded-[30px] border border-[#d8e8e6] bg-white shadow-[0_24px_80px_rgba(0,82,82,0.10)]">
      <header className="flex items-center justify-between border-b border-[#e1eeec] px-5 py-4 sm:px-8"><Link href="/" className="flex items-center"><Image src="/medico/logo.png" alt="Medico" width={132} height={42} className="h-10 w-auto" priority /></Link><Link href="/contact" className="inline-flex items-center gap-2 rounded-full border border-[#cfe1df] px-4 py-2 text-sm font-semibold text-[#005252] hover:bg-[#effcfb]"><LifeBuoy className="h-4 w-4" /> <span className="hidden sm:inline">Get help</span></Link></header>
      <div className="grid flex-1 lg:grid-cols-[1.05fr_0.95fr]">
        <section className="flex flex-col justify-center p-7 sm:p-12 lg:p-16"><span className="inline-flex w-fit items-center gap-2 rounded-full bg-[#d8f8f4] px-3 py-1.5 text-xs font-bold uppercase tracking-[0.16em] text-[#005252]"><Search className="h-3.5 w-3.5" /> Page not found</span><p className="mt-7 text-8xl font-semibold leading-none tracking-[-0.07em] text-[#005252] [font-family:var(--font-outfit)] sm:text-9xl">404</p><h1 className="mt-6 max-w-xl text-3xl font-semibold tracking-tight [font-family:var(--font-outfit)] sm:text-4xl">This page isn’t part of your care path.</h1><p className="mt-4 max-w-xl text-base leading-7 text-[#596765]">The address may have changed, or the page may no longer exist. Your account and clinical records have not been affected.</p><p className="mt-3 font-urdu text-lg text-[#1f6b6b]" dir="rtl">یہ صفحہ دستیاب نہیں ہے</p><div className="mt-8 flex flex-col gap-3 sm:flex-row"><Link href="/" className="inline-flex items-center justify-center gap-2 rounded-full bg-[#005252] px-6 py-3 text-sm font-bold text-white hover:bg-[#1f6b6b]"><Home className="h-4 w-4" /> Return home</Link><button onClick={() => window.history.back()} className="inline-flex items-center justify-center gap-2 rounded-full border border-[#cfe1df] px-6 py-3 text-sm font-bold text-[#005252] hover:bg-[#effcfb]"><ArrowLeft className="h-4 w-4" /> Go back</button></div></section>
        <aside className="flex items-center bg-[#005252] p-7 text-white sm:p-12 lg:p-16"><div className="w-full"><span className="flex h-14 w-14 items-center justify-center rounded-2xl bg-[#a8efea] text-[#005252]"><Stethoscope className="h-7 w-7" /></span><h2 className="mt-7 text-2xl font-semibold [font-family:var(--font-outfit)]">Useful destinations</h2><p className="mt-2 text-sm leading-6 text-[#c9e6e4]">Continue through a verified Medico route.</p><nav className="mt-7 space-y-3"><Destination href="/login" label="Sign in to your portal" description="Access patient or clinician workflows" /><Destination href="/doctors" label="Preview doctor directory" description="Browse the supplied directory profiles" /><Destination href="/contact" label="Contact Medico support" description="Prepare a message to Support@medico.com" /></nav></div></aside>
      </div>
    </div>
  </main>;
}

function Destination({ href, label, description }: { href: string; label: string; description: string }) {
  return <Link href={href} className="group flex items-center justify-between gap-4 rounded-2xl bg-white/10 p-4 transition hover:bg-white/15"><span><span className="block font-semibold">{label}</span><span className="mt-1 block text-xs leading-5 text-[#b9d9d6]">{description}</span></span><ArrowRight className="h-5 w-5 shrink-0 text-[#a8efea] transition group-hover:translate-x-1" /></Link>;
}
