import type { Metadata } from "next";
import { AuthExperience } from "@/components/medico/AuthExperience";
export const metadata: Metadata = { title: "Create your account | Medico" };
export default async function SignupPage({
  searchParams,
}: {
  searchParams: Promise<{ type?: string }>;
}) {
  const params = await searchParams;
  return (
    <AuthExperience
      mode="signup"
      initialRole={params.type === "doctor" ? "doctor" : "patient"}
    />
  );
}
