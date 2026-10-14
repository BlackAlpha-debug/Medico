import type { Metadata } from "next";
import { AuthExperience } from "@/components/medico/AuthExperience";
export const metadata: Metadata = { title: "Log in | Medico" };
export default async function LoginPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  return (
    <AuthExperience
      mode="login"
      initialRole={params.type === "doctor" ? "doctor" : "patient"}
    />
  );
}
