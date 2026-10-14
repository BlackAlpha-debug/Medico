import type { Metadata } from "next";
export const metadata: Metadata = {
  title: "Your portal | Medico",
  description: "Log in or create your Medico patient or doctor account.",
};
export default function AuthLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return children;
}
