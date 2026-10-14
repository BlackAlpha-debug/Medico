import type { Metadata } from "next";
import { FAQ } from "@/components/medico/Content";
import {
  PublicShell,
  PageIntro,
  GetStarted,
} from "@/components/medico/PublicShell";
export const metadata: Metadata = {
  title: "Frequently asked questions | Medico",
};
export default function FAQPage() {
  return (
    <PublicShell>
      <PageIntro
        eyebrow="HELP CENTER"
        title="A little clarity goes a long way."
      >
        Find answers about accounts, interviews, and how Medico fits into your
        care journey.
      </PageIntro>
      <section className="medico-container section-space">
        <FAQ />
      </section>
      <GetStarted />
    </PublicShell>
  );
}
