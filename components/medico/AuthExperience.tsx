"use client";
import { useState } from "react";
import Image from "next/image";
import {
  ArrowLeft,
  CheckCircle2,
  ClipboardCheck,
  ShieldCheck,
  Stethoscope,
  UserRound,
} from "lucide-react";
import { AuthForm } from "@/components/auth/AuthForm";
import { Brand, Header } from "./Header";
import { Footer } from "./PublicShell";
import { MedicoLink } from "./MedicoLink";

type Role = "patient" | "doctor";
export function AuthExperience({
  mode,
  initialRole,
}: {
  mode: "login" | "signup";
  initialRole: Role;
}) {
  const [role, setRole] = useState<Role>(initialRole);
  const [busy, setBusy] = useState(false);
  const signup = mode === "signup";
  const selectRole = (next: Role) => {
    setRole(next);
    const url = new URL(window.location.href);
    url.searchParams.set("type", next);
    window.history.replaceState(null, "", url);
  };
  const roles = (
    <fieldset
      className={`role-options ${signup ? "registration-roles" : "login-roles"}`}
      disabled={busy}
    >
      <legend>{signup ? "Choose your role" : "SELECT YOUR PORTAL ROLE"}</legend>
      {(["patient", "doctor"] as const).map((value) => (
        <button
          type="button"
          key={value}
          aria-pressed={role === value}
          className={role === value ? "selected" : ""}
          onClick={() => selectRole(value)}
        >
          {value === "patient" ? (
            <UserRound size={23} />
          ) : (
            <Stethoscope size={23} />
          )}
          <span>
            <strong>
              {value === "patient" ? "Patient" : "Doctor / Clinician"}
            </strong>
            {signup && (
              <small>
                {value === "patient"
                  ? "Your health story, reports, and care journey."
                  : "Clinical reports, reviews, and professional tools."}
              </small>
            )}
          </span>
          {signup && role === value && <CheckCircle2 size={17} />}
        </button>
      ))}
    </fieldset>
  );

  if (signup)
    return (
      <div className="medico">
        <Header />
        <main className="signup-main">
          <div className="signup-heading">
            <span className="soft-badge">
              <ShieldCheck size={13} /> MEDICO HEALTH NETWORK
            </span>
            <h1>Join a more connected care journey.</h1>
            <p>Choose your role to get started with your own Medico portal.</p>
          </div>
          {roles}
          <section className="signup-card">
            <div className="signup-card-heading">
              <div>
                <span className="soft-badge">
                  <ClipboardCheck size={12} /> YOUR FIRST STEP
                </span>
                <h2>
                  {role === "patient"
                    ? "Patient registration"
                    : "Doctor registration"}
                </h2>
                <p>
                  {role === "patient"
                    ? "Create your account. We’ll get to know your health story next."
                    : "Create your account, then complete your professional profile."}
                </p>
              </div>
              <MedicoLink href={`/login?type=${role}`} className="text-link">
                Already registered? Log in
              </MedicoLink>
            </div>
            <AuthForm
              key={role}
              mode="signup"
              userType={role}
              onBusyChange={setBusy}
            />
          </section>
          <div className="signup-footnote">
            <ShieldCheck size={16} /> Patient and clinician portals, connected
            through Medico.
          </div>
        </main>
        <Footer />
      </div>
    );

  return (
    <div className="medico login-page">
      <main className="login-layout">
        <aside className="login-story">
          <div className="login-story-top">
            <Brand />
            <MedicoLink href="/" className="back-link">
              <ArrowLeft size={16} /> Back to site
            </MedicoLink>
          </div>
          <span className="story-badge">
            <ShieldCheck size={16} /> YOUR CONNECTED CARE JOURNEY
          </span>
          <h1>
            Compassionate care,
            <br />
            powered by modern intelligence.
          </h1>
          <p>
            A clearer view of your health story. Connect your conversations,
            clinical reports, and next steps in one place.
          </p>
          <div className="login-photo">
            <Image
              src="/medico/login-team.jpg"
              fill
              priority
              sizes="(max-width: 900px) 90vw, 45vw"
              alt="A doctor and nurse standing together in a clinic"
            />
            <span className="login-photo-note">
              <ShieldCheck size={25} />
              <span>
                Human care.<strong>Connected by Medico.</strong>
              </span>
            </span>
          </div>
          <div className="story-bottom">
            <CheckCircle2 size={16} /> Your story. Your language. A clearer
            conversation.
          </div>
        </aside>
        <section className="login-form-panel">
          <div className="login-panel-top">
            <span>MEDICO PORTAL</span>
            <MedicoLink href="/signup" className="text-link">
              Create an account
            </MedicoLink>
          </div>
          <div className="login-form-content">
            <h2>Welcome back.</h2>
            <p>Sign in to continue your care journey.</p>
            {roles}
            <p className="role-help">
              {role === "patient"
                ? "Access your interviews, reports, and prescriptions."
                : "Review clinical reports and manage your professional profile."}
            </p>
            <AuthForm
              key={role}
              mode="login"
              userType={role}
              onBusyChange={setBusy}
            />
          </div>
          <div className="login-panel-bottom">
            <span>© {new Date().getFullYear()} Medico</span>
            <MedicoLink href="/contact">Need help?</MedicoLink>
          </div>
        </section>
      </main>
    </div>
  );
}
