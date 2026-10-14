import { ArrowUpRight, Mail, ShieldCheck } from "lucide-react";
import type { ReactNode } from "react";
import { Brand, Header } from "./Header";
import { MedicoLink } from "./MedicoLink";

export function Footer() {
  return (
    <footer className="medico-footer">
      <div className="medico-container">
        <div className="footer-grid">
          <div>
            <Brand />
            <p>
              A little more clarity.
              <br />A more connected care journey.
            </p>
            <p className="footer-note">
              Voice and text interviews, structured reports, and clinician
              review in one place.
            </p>
          </div>
          <div>
            <h3>Explore Medico</h3>
            <MedicoLink href="/services">Our services</MedicoLink>
            <MedicoLink href="/how-it-works">How it works</MedicoLink>
            <MedicoLink href="/about">About us</MedicoLink>
            <MedicoLink href="/faq">Frequently asked questions</MedicoLink>
          </div>
          <div>
            <h3>Your care journey</h3>
            <MedicoLink href="/signup?type=patient">
              Join as a patient
            </MedicoLink>
            <MedicoLink href="/signup?type=doctor">Join as a doctor</MedicoLink>
            <MedicoLink href="/login">Access your portal</MedicoLink>
            <MedicoLink href="/contact">Get support</MedicoLink>
          </div>
          <div>
            <h3>Let’s stay connected</h3>
            <p>
              Questions about getting started?
              <br />
              We’re here to help.
            </p>
            <a
              href="mailto:Support@medico.com"
              target="_self"
              rel="noopener noreferrer"
              className="footer-email"
            >
              <Mail size={16} />
              Support@medico.com
            </a>
            <MedicoLink href="/contact" className="footer-contact">
              Contact us <ArrowUpRight size={16} />
            </MedicoLink>
          </div>
        </div>
        <div className="footer-bottom">
          <span>© {new Date().getFullYear()} Medico. All rights reserved.</span>
          <span>
            <ShieldCheck size={15} /> Designed around patient and clinician
            workflows
          </span>
        </div>
      </div>
    </footer>
  );
}
export function PublicShell({ children }: { children: ReactNode }) {
  return (
    <div className="medico">
      <a href="#main-content" className="medico-skip">
        Skip to content
      </a>
      <Header />
      <main id="main-content">{children}</main>
      <Footer />
    </div>
  );
}
export function PageIntro({
  eyebrow,
  title,
  children,
}: {
  eyebrow: string;
  title: string;
  children: ReactNode;
}) {
  return (
    <section className="page-intro">
      <div className="medico-container">
        <span className="eyebrow light">{eyebrow}</span>
        <h1>{title}</h1>
        <p>{children}</p>
      </div>
    </section>
  );
}
export function GetStarted() {
  return (
    <section className="medico-container cta-wrap">
      <div className="medico-cta">
        <div>
          <span className="eyebrow light">YOUR NEXT CHAPTER IN CARE</span>
          <h2>
            Better conversations.
            <br />
            Clearer next steps.
          </h2>
          <p>Bring your health story together with Medico.</p>
        </div>
        <div className="cta-actions">
          <MedicoLink href="/signup" className="m-button white">
            Create your account <ArrowUpRight size={18} />
          </MedicoLink>
          <MedicoLink href="/contact" className="cta-text">
            Have a question? Contact us <ArrowUpRight size={16} />
          </MedicoLink>
        </div>
      </div>
    </section>
  );
}
