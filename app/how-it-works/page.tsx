import type { Metadata } from "next";
import { ArrowUpRight } from "lucide-react";
import { Steps } from "@/components/medico/Content";
import {
  PublicShell,
  PageIntro,
  GetStarted,
} from "@/components/medico/PublicShell";
import { MedicoLink } from "@/components/medico/MedicoLink";
export const metadata: Metadata = { title: "How it works | Medico" };
export default function HowItWorksPage() {
  return (
    <PublicShell>
      <PageIntro
        eyebrow="YOUR CARE JOURNEY"
        title="A clearer path, from the very first hello."
      >
        A few simple steps help you share your health story and prepare for
        clinical review.
      </PageIntro>
      <section className="medico-container section-space">
        <Steps />
      </section>
      <section className="medico-container content-grid faq-section">
        <article className="content-panel">
          <h2>For patients</h2>
          <p>
            Create your account and complete your medical history. You can then
            begin a text or voice interview from your dashboard.
          </p>
          <p>
            After the interview, a structured report is prepared for clinical
            review. Check your dashboard for the report’s status and
            prescriptions recorded by your clinician.
          </p>
          <MedicoLink href="/signup?type=patient" className="m-button">
            Start as a patient <ArrowUpRight size={17} />
          </MedicoLink>
        </article>
        <article className="content-panel">
          <h2>For clinicians</h2>
          <p>
            Register as a doctor and complete your professional profile,
            including your department and specialization.
          </p>
          <p>
            Your portal brings report queues, clinical context, feedback, and
            prescription recording together. Review the information and apply
            your clinical judgment to the next steps.
          </p>
          <MedicoLink href="/signup?type=doctor" className="m-button">
            Join as a clinician <ArrowUpRight size={17} />
          </MedicoLink>
        </article>
      </section>
      <GetStarted />
    </PublicShell>
  );
}
