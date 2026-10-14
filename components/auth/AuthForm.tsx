"use client";

import { useState, type FormEvent } from "react";
import { useRouter } from "next/navigation";
import {
  ArrowRight,
  Check,
  Circle,
  Eye,
  EyeOff,
  Loader2,
  LockKeyhole,
} from "lucide-react";
import { authClient } from "@/lib/auth-client";
import { MedicoLink } from "@/components/medico/MedicoLink";

type Role = "patient" | "doctor";
interface AuthFormProps {
  mode: "login" | "signup";
  userType?: Role;
  onBusyChange?: (busy: boolean) => void;
}

export function AuthForm({
  mode,
  userType = "patient",
  onBusyChange,
}: AuthFormProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [name, setName] = useState("");
  const [visible, setVisible] = useState(false);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const router = useRouter();
  const signup = mode === "signup";
  const busy = loading;
  const passwordRules = [
    { text: "8+ characters", met: password.length >= 8 },
    { text: "Uppercase", met: /[A-Z]/.test(password) },
    { text: "Number", met: /\d/.test(password) },
    { text: "Symbol", met: /[^a-zA-Z0-9]/.test(password) },
  ];
  const score = passwordRules.filter((rule) => rule.met).length;

  async function saveRole() {
    const response = await fetch("/api/user/role", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ role: userType }),
    });
    if (!response.ok)
      throw new Error(
        "Your account is signed in, but profile setup could not finish. Please sign in again to continue.",
      );
  }
  async function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    if (busy) return;
    setError("");
    if (signup && !name.trim()) {
      setError("Please enter your full name.");
      return;
    }
    if (signup && password !== confirm) {
      setError("Your passwords do not match.");
      return;
    }
    setLoading(true);
    onBusyChange?.(true);
    try {
      const response = await fetch(
        `/api/doctors/check?email=${encodeURIComponent(email.trim())}`,
      );
      if (!response.ok)
        throw new Error(
          "We couldn’t check your account right now. Please try again.",
        );
      const account: {
        exists: boolean;
        role?: string;
        profileComplete?: boolean;
      } = await response.json();
      if (account.exists && account.role && account.role !== userType)
        throw new Error(
          `This email is registered as a ${account.role}. Select that role to sign in, or use a different email.`,
        );
      if (signup) {
        if (account.exists)
          throw new Error(
            "An account with this email already exists. Please log in instead.",
          );
        const result = await authClient.signUp.email({
          email: email.trim(),
          password,
          name: name.trim(),
        });
        if (result.error)
          throw new Error(
            result.error.message ||
              "We couldn’t create your account. Please try again.",
          );
        await saveRole();
        router.push(
          userType === "doctor"
            ? "/doctor/onboarding"
            : "/patient/medical_session",
        );
      } else {
        const result = await authClient.signIn.email({
          email: email.trim(),
          password,
        });
        if (result.error)
          throw new Error(
            result.error.message ||
              "Check your email and password and try again.",
          );
        if (userType === "doctor") await saveRole();
        router.push(
          userType === "doctor"
            ? account.profileComplete
              ? "/doctor/home"
              : "/doctor/onboarding"
            : account.profileComplete
              ? "/patient/home"
              : "/patient/medical_session",
        );
      }
      router.refresh();
    } catch (cause: unknown) {
      setError(
        cause instanceof Error
          ? cause.message
          : "Something went wrong. Please try again.",
      );
    } finally {
      setLoading(false);
      onBusyChange?.(false);
    }
  }
  return (
    <div className="medico-auth-form">
      <form onSubmit={submit} aria-busy={busy}>
        <fieldset disabled={busy} className="auth-fields">
          {signup && (
            <label className="form-field full" htmlFor="name">
              Full name{" "}
              <input
                id="name"
                name="name"
                autoComplete="name"
                placeholder="e.g. Ayesha Khan"
                required
                maxLength={100}
                value={name}
                onChange={(e) => setName(e.target.value)}
              />
            </label>
          )}
          <label className="form-field full" htmlFor="email">
            Email address
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@example.com"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
            />
          </label>
          <div className="form-field">
            <label htmlFor="password">
              {signup ? "Create password" : "Password"}
            </label>
            <div className="password-input">
              <input
                id="password"
                name="password"
                type={visible ? "text" : "password"}
                autoComplete={signup ? "new-password" : "current-password"}
                placeholder="Enter your password"
                required
                minLength={8}
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                aria-describedby={signup ? "password-guidance" : undefined}
              />
              <button
                type="button"
                onClick={() => setVisible(!visible)}
                aria-label={visible ? "Hide password" : "Show password"}
                aria-pressed={visible}
              >
                {visible ? <EyeOff size={18} /> : <Eye size={18} />}
              </button>
            </div>
          </div>
          {signup && (
            <label className="form-field" htmlFor="confirm-password">
              Confirm password
              <input
                id="confirm-password"
                name="confirm-password"
                type={visible ? "text" : "password"}
                autoComplete="new-password"
                placeholder="Repeat your password"
                required
                minLength={8}
                value={confirm}
                onChange={(e) => setConfirm(e.target.value)}
              />
            </label>
          )}
          {signup && (
            <div className="password-guidance full" id="password-guidance">
              <div>
                <span>Password strength</span>
                <strong>
                  {!password
                    ? "Not entered"
                    : score < 2
                      ? "Weak"
                      : score < 4
                        ? "Good"
                        : "Strong"}
                </strong>
              </div>
              <progress max={4} value={score} aria-label="Password strength" />
              <ul>
                {passwordRules.map((rule) => (
                  <li key={rule.text} className={rule.met ? "met" : ""}>
                    {rule.met ? <Check size={12} /> : <Circle size={12} />}
                    {rule.text}
                  </li>
                ))}
              </ul>
              <p>
                At least 8 characters required. A mix of characters is
                recommended.
              </p>
            </div>
          )}
        </fieldset>
        {error && (
          <div className="form-error" role="alert">
            {error}
          </div>
        )}
        <button type="submit" disabled={busy} className="m-button auth-submit">
          {loading ? (
            <>
              <Loader2 size={18} className="animate-spin" />
              {signup ? "Creating your account…" : "Signing you in…"}
            </>
          ) : (
            <>
              {signup
                ? `Create ${userType === "patient" ? "patient" : "doctor"} account`
                : "Sign in to Medico"}
              <ArrowRight size={19} />
            </>
          )}
        </button>
        {signup && (
          <p className="auth-onboarding-note">
            <LockKeyhole size={14} />
            {userType === "doctor"
              ? "Next: complete your professional profile and department."
              : "Next: complete your medical history in your patient portal."}
          </p>
        )}
        <p className="auth-switch">
          {signup ? "Already registered?" : "New to Medico?"}{" "}
          <MedicoLink href={`/${signup ? "login" : "signup"}?type=${userType}`}>
            {signup ? "Log in to your portal" : "Create an account"}
          </MedicoLink>
        </p>
      </form>
    </div>
  );
}
