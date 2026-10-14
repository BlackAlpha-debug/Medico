"use client";
import { useState, type FormEvent } from "react";
import { ArrowUpRight, Copy, Mail } from "lucide-react";

export function ContactForm() {
  const [status, setStatus] = useState("");
  const [error, setError] = useState("");
  function submit(event: FormEvent<HTMLFormElement>) {
    event.preventDefault();
    const data = new FormData(event.currentTarget);
    const subject = `[Medico ${data.get("topic")}] ${data.get("subject")}`;
    const body = `Name: ${data.get("name")}\nReply email: ${data.get("email")}\n\n${data.get("message")}`;
    window.location.assign(
      `mailto:Support@medico.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`,
    );
    setError("");
    setStatus(
      "Your email app has been requested. Review and send the draft there. If nothing opens, copy our email address and send your message using your preferred email service.",
    );
  }
  async function copyEmail() {
    try {
      await navigator.clipboard.writeText("Support@medico.com");
      setError("");
      setStatus("Support@medico.com copied to your clipboard.");
    } catch {
      setError(
        "Copy is unavailable in this browser. You can select and copy Support@medico.com directly.",
      );
    }
  }
  return (
    <form onSubmit={submit} className="content-panel">
      <span className="eyebrow">LET’S TALK</span>
      <h2>Send our team a message</h2>
      <p className="contact-form-intro">
        Tell us how we can help. This form prepares a message in your email app
        for you to review and send.
      </p>
      <div className="form-grid">
        <label className="form-field">
          Full name
          <input
            name="name"
            autoComplete="name"
            placeholder="Your full name"
            required
            maxLength={100}
          />
        </label>
        <label className="form-field">
          Email address
          <input
            name="email"
            type="email"
            autoComplete="email"
            placeholder="you@example.com"
            required
            maxLength={254}
          />
        </label>
        <label className="form-field full">
          What can we help with?
          <select name="topic">
            <option>Account support</option>
            <option>Patient portal</option>
            <option>Doctor portal</option>
            <option>General question</option>
          </select>
        </label>
        <label className="form-field full">
          Subject
          <input
            name="subject"
            placeholder="A short description of your question"
            required
            maxLength={120}
          />
        </label>
        <label className="form-field full">
          Your message
          <textarea
            name="message"
            rows={5}
            placeholder="Tell us a little more…"
            required
            maxLength={2000}
          />
        </label>
      </div>
      <p className="form-note">
        Please don’t include passwords or private medical details. This inbox is
        for support, not urgent medical care.
      </p>
      <div className="contact-form-actions">
        <button className="m-button" type="submit">
          <Mail size={17} /> Open email draft <ArrowUpRight size={16} />
        </button>
        <button type="button" className="text-link" onClick={copyEmail}>
          <Copy size={16} /> Copy email address
        </button>
      </div>
      {status && (
        <p className="form-status" role="status">
          {status}
        </p>
      )}
      {error && (
        <p className="form-error" role="alert">
          {error}
        </p>
      )}
    </form>
  );
}
