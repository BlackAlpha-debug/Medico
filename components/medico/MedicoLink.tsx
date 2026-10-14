import Link from "next/link";
import type { ComponentProps } from "react";

/** Keep navigation in the current tab, per the latest product direction. */
export function MedicoLink({
  children,
  ...props
}: ComponentProps<typeof Link>) {
  return (
    <Link {...props}>
      {children}
    </Link>
  );
}
