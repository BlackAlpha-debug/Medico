import Image from 'next/image';
import Link from 'next/link';

interface MedicoPortalBrandProps {
  href?: string;
  compact?: boolean;
  iconOnly?: boolean;
  className?: string;
}

export function MedicoPortalBrand({
  href = '/doctor/home',
  compact = false,
  iconOnly = false,
  className = '',
}: MedicoPortalBrandProps) {
  return (
    <Link
      href={href}
      aria-label="Medico portal"
      className={`inline-flex items-center gap-3 ${iconOnly ? 'w-10 overflow-hidden' : ''} ${className}`}
    >
      <Image
        src="/medico/logo-dark.png"
        alt="Medico"
        width={120}
        height={32}
        className={`${compact ? 'h-7' : 'h-8'} max-w-none w-auto shrink-0`}
        priority
      />
      {!iconOnly && <span className="rounded-full bg-[#a8efea] px-2.5 py-1 text-[10px] font-bold tracking-[0.15em] text-[#005252]">
        PORTAL
      </span>}
    </Link>
  );
}
