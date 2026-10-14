import type { Metadata } from "next";
import Image from "next/image";
import {
  ArrowRight,
  ArrowUpRight,
  Check,
  FileCheck2,
  Languages,
  Mic,
  Play,
  ShieldCheck,
  Stethoscope,
} from "lucide-react";
import { PublicShell, GetStarted } from "@/components/medico/PublicShell";
import { MedicoLink } from "@/components/medico/MedicoLink";
import {
  Benefits,
  FAQ,
  ServiceCards,
  Steps,
} from "@/components/medico/Content";

export const metadata: Metadata = {
  title: "Medico | A more connected care journey",
  description:
    "Your health story, brought together. Voice and text clinical interviews in Urdu and English, structured reports, and clinician review with Medico.",
};

export default function Home() {
  return (
    <PublicShell>
      <section className="landing-hero">
        <div className="medico-container hero-grid">
          <div className="hero-copy">
            <span className="hero-badge">
              <ShieldCheck size={15} /> CONNECTED CARE. HUMAN AT HEART.
            </span>
            <h1>
              Discover the care
              <br />
              you deserve.
            </h1>
            <p>
              Your health story matters. Bring it together with thoughtful
              conversations, clear clinical reports, and care that keeps your
              clinician in the loop.
            </p>
            <div className="hero-actions">
              <MedicoLink href="/signup" className="m-button white">
                Start your care journey <ArrowUpRight size={19} />
              </MedicoLink>
              <MedicoLink href="/how-it-works" className="m-button translucent">
                <Play size={16} /> See how it works
              </MedicoLink>
            </div>
            <div className="hero-reassurance">
              <span>
                <Check size={15} /> Urdu & English
              </span>
              <span>
                <Check size={15} /> Voice & text
              </span>
              <span>
                <Check size={15} /> Clinician review
              </span>
            </div>
          </div>
          <div className="hero-visual">
            <Image
              src="/medico/care-team.jpg"
              alt="A doctor and nurse in a bright clinical setting"
              fill
              priority
              sizes="(max-width: 767px) 90vw, 44vw"
            />
            <span className="image-badge">
              <Stethoscope size={17} /> A more connected experience
            </span>
            <div className="image-note">
              <span className="icon-tile">
                <FileCheck2 size={25} />
              </span>
              <div>
                <small>FROM CONVERSATION TO CLARITY</small>
                <strong>Your story. Clearer next steps.</strong>
              </div>
            </div>
          </div>
        </div>
      </section>
      <section
        className="medico-container capability-strip"
        aria-label="Medico capabilities"
      >
        {[
          { Icon: Mic, title: "Voice & text", text: "Conversations your way" },
          {
            Icon: Languages,
            title: "Urdu & English",
            text: "Speak with confidence",
          },
          {
            Icon: FileCheck2,
            title: "Structured reports",
            text: "Your story, organized",
          },
          {
            Icon: Stethoscope,
            title: "Clinician review",
            text: "Human expertise in the loop",
          },
        ].map(({ Icon, title, text }) => (
          <div key={title}>
            <Icon size={24} />
            <div>
              <strong>{title}</strong>
              <span>{text}</span>
            </div>
          </div>
        ))}
      </section>
      <section className="medico-container section-space">
        <div className="section-heading">
          <div>
            <span className="eyebrow">CARE, CONNECTED</span>
            <h2>
              Personalized support.
              <br />
              One clearer care journey.
            </h2>
          </div>
          <MedicoLink href="/services" className="text-link">
            Explore our services <ArrowUpRight size={18} />
          </MedicoLink>
        </div>
        <ServiceCards />
      </section>
      <section className="steps-section">
        <div className="medico-container">
          <div className="section-heading centered">
            <span className="eyebrow">LESS FRICTION. MORE CLARITY.</span>
            <h2>Four steps to a better conversation.</h2>
            <p>From the first hello to a report your clinician can review.</p>
          </div>
          <Steps />
          <div className="center-action">
            <MedicoLink href="/how-it-works" className="text-link">
              Take a closer look <ArrowRight size={18} />
            </MedicoLink>
          </div>
        </div>
      </section>
      <section className="medico-container section-space care-split">
        <div className="care-photo">
          <Image
            src="/medico/consultation.jpg"
            alt="A clinician holding a clipboard in a sunlit clinic"
            fill
            sizes="(max-width: 767px) 90vw, 45vw"
          />
          <span className="photo-caption">
            <Stethoscope size={19} /> Technology with a human perspective.
          </span>
        </div>
        <div>
          <span className="eyebrow">BUILT AROUND YOUR HEALTH STORY</span>
          <h2>
            Good care begins
            <br />
            with being heard.
          </h2>
          <p className="section-description">
            The details matter. Medico helps you share them, organize them, and
            bring them into the next clinical conversation.
          </p>
          <ul className="check-list">
            <li>
              <Check /> Share symptoms naturally through voice or text.
            </li>
            <li>
              <Check /> Keep your health history in one place.
            </li>
            <li>
              <Check /> Follow your report’s review status.
            </li>
            <li>
              <Check /> Access prescriptions recorded by your clinician.
            </li>
          </ul>
          <MedicoLink href="/signup?type=patient" className="m-button">
            Create a patient account <ArrowUpRight size={18} />
          </MedicoLink>
        </div>
      </section>
      <section className="clinician-section">
        <div className="medico-container clinician-grid">
          <div>
            <span className="eyebrow light">
              FOR THE PEOPLE WHO PROVIDE CARE
            </span>
            <h2>
              More context.
              <br />A clearer clinical picture.
            </h2>
            <p>
              Review structured SOAP reports, explore the patient’s story, and
              bring your expertise to the next step.
            </p>
            <MedicoLink href="/signup?type=doctor" className="m-button white">
              Join as a clinician <ArrowUpRight size={18} />
            </MedicoLink>
          </div>
          <div className="report-preview">
            <div className="report-preview-heading">
              <span>
                <FileCheck2 size={19} /> A structured approach
              </span>
              <span className="soft-badge">SOAP</span>
            </div>
            {[
              ["S", "Subjective", "The patient’s story, in their own words."],
              [
                "O",
                "Objective",
                "Available clinical observations and context.",
              ],
              ["A", "Assessment", "Organized findings for clinical review."],
              ["P", "Plan", "Recommendations and next steps to review."],
            ].map(([letter, title, text]) => (
              <div className="report-row" key={letter}>
                <span>{letter}</span>
                <div>
                  <strong>{title}</strong>
                  <p>{text}</p>
                </div>
                <Check size={16} />
              </div>
            ))}
          </div>
        </div>
      </section>
      <section className="medico-container section-space">
        <div className="section-heading centered">
          <span className="eyebrow">THOUGHTFULLY CONNECTED</span>
          <h2>A little more confidence at every step.</h2>
        </div>
        <Benefits />
      </section>
      <section className="medico-container faq-section">
        <div className="section-heading centered">
          <span className="eyebrow">LET’S MAKE IT SIMPLE</span>
          <h2>Frequently asked questions</h2>
          <p>A few things to know before you get started.</p>
        </div>
        <FAQ />
        <div className="center-action">
          <MedicoLink href="/contact" className="text-link">
            Still have a question? Get in touch <ArrowUpRight size={17} />
          </MedicoLink>
        </div>
      </section>
      <GetStarted />
    </PublicShell>
  );
}
