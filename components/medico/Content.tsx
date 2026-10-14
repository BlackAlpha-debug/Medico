import {
  ArrowUpRight,
  ClipboardList,
  FileCheck2,
  Languages,
  MessageSquareText,
  Mic,
  ShieldCheck,
  Stethoscope,
  UserRoundPlus,
} from "lucide-react";
import { MedicoLink } from "./MedicoLink";

export const services = [
  {
    Icon: ClipboardList,
    title: "Your history, connected",
    text: "Start with your health story. Keep your medical history, medications, and allergies together for more informed conversations.",
    link: "Start your health profile",
    href: "/signup?type=patient",
  },
  {
    Icon: Mic,
    title: "Care starts with a conversation",
    text: "Describe how you’re feeling in your own words. Choose a voice or text interview, with support for Urdu and English.",
    link: "Explore clinical interviews",
    href: "/how-it-works",
  },
  {
    Icon: FileCheck2,
    title: "Clarity for your clinician",
    text: "Turn your conversation into a structured clinical report. Clinicians can review, add feedback, and record prescriptions.",
    link: "Discover clinician tools",
    href: "/signup?type=doctor",
  },
];
export const steps = [
  {
    Icon: UserRoundPlus,
    title: "Create your account",
    text: "Choose your patient or clinician portal and get started.",
  },
  {
    Icon: ClipboardList,
    title: "Share your health story",
    text: "Complete your medical history so every conversation has context.",
  },
  {
    Icon: MessageSquareText,
    title: "Tell us how you feel",
    text: "Use a voice or text interview to describe your symptoms.",
  },
  {
    Icon: Stethoscope,
    title: "Connect the next steps",
    text: "Your structured report becomes part of the clinician review workflow.",
  },
];
export const questions = [
  {
    question: "How do I get started with Medico?",
    answer:
      "Create a patient account, complete your medical-history onboarding, and open your dashboard. From there you can start a voice or text interview.",
  },
  {
    question: "Can I speak in Urdu or English?",
    answer:
      "The clinical interview supports Urdu and English. Voice interviews use your microphone, so your browser will ask for microphone access. You can also choose a text interview.",
  },
  {
    question: "What happens after my interview?",
    answer:
      "Your conversation is organized into a structured clinical report. Patient Home shows its status as it moves through clinician review. Prescriptions are available when added by a reviewing clinician.",
  },
  {
    question: "Can doctors use Medico too?",
    answer:
      "Yes. Choose the doctor role when creating your account, complete your professional profile, and use the doctor portal to review reports, give feedback, and record prescriptions.",
  },
  {
    question: "Does an AI interview replace a doctor?",
    answer:
      "No. Medico helps collect and organize information for clinical review. An AI-generated report is not a substitute for a clinician’s assessment. For an emergency, seek immediate local emergency care rather than waiting for an online response.",
  },
  {
    question: "Where can I get help with my account?",
    answer:
      "Visit the Contact page or email Support@medico.com for help getting started or accessing your account. Avoid including private medical details or passwords in support emails.",
  },
];
export function ServiceCards() {
  return (
    <div className="service-grid">
      {services.map(({ Icon, title, text, link, href }, index) => (
        <article
          className={`service-card ${index === 0 ? "featured" : ""}`}
          key={title}
        >
          <span className="icon-tile">
            <Icon size={27} />
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
          <MedicoLink href={href} className="text-link">
            {link}
            <ArrowUpRight size={19} />
          </MedicoLink>
        </article>
      ))}
    </div>
  );
}
export function Steps() {
  return (
    <ol className="steps-grid">
      {steps.map(({ Icon, title, text }, i) => (
        <li key={title}>
          <span className="step-number">0{i + 1}</span>
          <span className="step-icon">
            <Icon size={23} />
          </span>
          <h3>{title}</h3>
          <p>{text}</p>
        </li>
      ))}
    </ol>
  );
}
export function FAQ() {
  return (
    <div className="faq-list">
      {questions.map(({ question, answer }) => (
        <details key={question}>
          <summary>
            {question}
            <span aria-hidden="true" className="faq-plus">
              +
            </span>
          </summary>
          <p>{answer}</p>
        </details>
      ))}
    </div>
  );
}
export function Benefits() {
  return (
    <div className="benefits-grid">
      {[
        {
          Icon: Languages,
          title: "In your own words",
          text: "Urdu and English support makes it easier to tell your story.",
        },
        {
          Icon: ShieldCheck,
          title: "Context that stays with you",
          text: "Your medical history supports more informed clinical conversations.",
        },
        {
          Icon: Stethoscope,
          title: "Clinicians in the loop",
          text: "Structured reports and feedback keep clinical review central.",
        },
      ].map(({ Icon, title, text }) => (
        <article key={title}>
          <span className="icon-tile">
            <Icon size={23} />
          </span>
          <div>
            <h3>{title}</h3>
            <p>{text}</p>
          </div>
        </article>
      ))}
    </div>
  );
}
