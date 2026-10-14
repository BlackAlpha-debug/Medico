"use client";
import {
  useEffect,
  useRef,
  useState,
  type ReactNode,
  type MouseEvent,
} from "react";
import catalog from "./catalog.json";
import directory from "./directory.json";
import { directoryAction, filterDirectory } from "./directory-controls";
type Action = { name: string; value?: string };
export function StitchLanding({ children }: { children: ReactNode }) {
  const root = useRef<HTMLDivElement>(null);
  const dialog = useRef<HTMLDialogElement>(null);
  const [action, setAction] = useState<Action | null>(null);
  const [notice, setNotice] = useState("");
  const [menu, setMenu] = useState(false);
  const [saved, setSaved] = useState(false);
  useEffect(() => {
    if (action) {
      setSaved(false);
      dialog.current?.showModal();
    } else dialog.current?.close();
  }, [action]);
  useEffect(() => {
    if (!notice) return;
    const timer = setTimeout(() => setNotice(""), 5000);
    return () => clearTimeout(timer);
  }, [notice]);
  async function handle(event: MouseEvent<HTMLDivElement>) {
    const button = (event.target as HTMLElement).closest<HTMLElement>(
      "[data-action]",
    );
    if (!button) return;
    event.preventDefault();
    const name = button.dataset.action!;
    const value = button.dataset.value;
    if (root.current && directoryAction(root.current, name, value, button))
      return;
    if (name === "copy-address") {
      try {
        await navigator.clipboard.writeText(
          "742 Evergreen Healthcare Ave, Medical District, NY 10001",
        );
        setNotice("Reference campus address copied.");
      } catch {
        setNotice("742 Evergreen Healthcare Ave, Medical District, NY 10001");
      }
      return;
    }
    if (name === "faq") {
      const expanded = button.getAttribute("aria-expanded") === "true";
      root.current
        ?.querySelectorAll<HTMLElement>('[data-action="faq"]')
        .forEach((item) => {
          const open = item === button && !expanded;
          item.setAttribute("aria-expanded", String(open));
          const panel = document.getElementById(
            item.getAttribute("aria-controls")!,
          );
          if (panel) {
            panel.classList.toggle("hidden", !open);
            panel.hidden = !open;
          }
          const icon = item.querySelector<HTMLElement>(
            ".material-symbols-outlined",
          );
          if (icon) icon.style.transform = open ? "rotate(180deg)" : "";
        });
      return;
    }
    if (name === "filter") {
      root.current
        ?.querySelectorAll<HTMLElement>('[data-action="filter"]')
        .forEach((item) => {
          const active = item === button;
          item.setAttribute("aria-pressed", String(active));
          item.style.background = active ? "#005050" : "transparent";
          item.style.color = active ? "white" : "#3f4948";
        });
      root.current
        ?.querySelectorAll<HTMLElement>("[data-doctor-card]")
        .forEach((card) => {
          card.hidden =
            value !== "All Specialists" && card.dataset.specialty !== value;
        });
      return;
    }
    if (name === "service-slide") {
      const grid = root.current?.querySelector("[data-services]");
      if (grid && grid.children.length) {
        if (value === "1") grid.append(grid.children[0]);
        else grid.prepend(grid.children[grid.children.length - 1]);
      }
      return;
    }
    if (name === "toggle") {
      const active = button.getAttribute("aria-pressed") !== "true";
      button.setAttribute("aria-pressed", String(active));
      button.style.fontVariationSettings = active ? "'FILL' 1" : "'FILL' 0";
      setNotice(
        active
          ? `${button.getAttribute("aria-label") || value} saved for this visit.`
          : `${button.getAttribute("aria-label") || value} removed.`,
      );
      return;
    }
    if (name === "message") {
      const input =
        root.current?.querySelector<HTMLInputElement>("[data-chat-input]");
      if (!input?.value.trim()) {
        input?.focus();
        return;
      }
      const draft = document.createElement("p");
      draft.className = "stitch-chat-draft";
      draft.textContent = `Your draft: ${input.value.trim()} — Sign in to send a message to your care team.`;
      root.current?.querySelector("[data-chat-body]")?.append(draft);
      input.value = "";
      draft.scrollIntoView({ block: "nearest" });
      return;
    }
    if (name === "download") {
      const { default: jsPDF } = await import("jspdf");
      const pdf = new jsPDF();
      pdf.setFontSize(22);
      pdf.text("Medico - sample attachment", 20, 25);
      pdf.setFontSize(12);
      pdf.text("Design preview only. This is not a prescription.", 20, 45);
      pdf.text("Sign in to access documents shared by your care team.", 20, 55);
      pdf.save("Medico-sample-attachment.pdf");
      return;
    }
    if (name === "directions") {
      window.location.assign(
        "https://www.google.com/maps/search/emergency+department+near+me/",
      );
      return;
    }
    if (name === "contact") {
      window.location.assign("/contact");
      return;
    }
    if (name === "email") {
      window.location.assign("mailto:Support@medico.com");
      return;
    }
    if (name === "share") {
      try {
        await navigator.clipboard.writeText(window.location.origin);
        setNotice("Medico link copied.");
      } catch {
        setAction({ name: "information", value: window.location.origin });
      }
      return;
    }
    setAction({ name, value });
  }
  const item = Number(action?.value ?? 0);
  const booking =
    action &&
    ["booking", "directory-book", "confirm", "reschedule", "package"].includes(
      action.name,
    );
  const profile =
    action?.name === "directory-profile" ? directory[item] : undefined;
  const department =
    action?.name === "department" ? catalog.departments[item] : undefined;
  const article =
    action?.name === "article" ? catalog.articles[item] : undefined;
  const pack = action?.name === "package" ? catalog.packages[item] : undefined;
  const titles: Record<string, string> = {
    tour: "Your Medico care journey",
    articles: "Medical articles",
    pharmacy: "Your prescriptions",
    audio: "Start an audio consultation",
    video: "Start a video consultation",
    call: "Contact your care team",
    emergency: "Emergency care",
  };
  const title = booking
    ? pack
      ? pack.title
      : action?.name === "reschedule"
        ? "Request a different time"
        : "Book an appointment"
    : (profile?.name ??
      department?.title ??
      article?.title ??
      titles[action?.name ?? ""] ??
      action?.value ??
      "Medico");
  return (
    <div
      id="stitch-landing"
      ref={root}
      onClick={handle}
      onInput={(event) => {
        const input = event.target as HTMLInputElement;
        if (input.id === "messageBox") {
          const counter = root.current?.querySelector("#charCounter");
          if (counter)
            counter.textContent = `${input.value.length} / 500 characters`;
        }
        if (input.matches("[data-filter-search]"))
          root.current
            ?.querySelectorAll<HTMLElement>("aside label")
            .forEach((label) => {
              label.hidden = !label.textContent
                ?.toLowerCase()
                .includes(input.value.toLowerCase());
            });
      }}
      onChange={(event) => {
        const input = event.target as HTMLElement;
        if (root.current && input.matches('[data-directory-radio="rating"]'))
          delete root.current.dataset.minimumRating;
        if (root.current && input.matches("[data-directory-sort]"))
          filterDirectory(root.current);
      }}
      onKeyDown={(event) => {
        const target = event.target as HTMLElement;
        if (
          (event.key === "Enter" || event.key === " ") &&
          target.getAttribute("role") === "button"
        ) {
          event.preventDefault();
          target.click();
        }
        if (event.key === "Enter" && target.matches("[data-chat-input]")) {
          event.preventDefault();
          root.current
            ?.querySelector<HTMLButtonElement>('[data-action="message"]')
            ?.click();
        }
      }}
      onSubmit={(event) => {
        const form = event.target as HTMLFormElement;
        if (form.matches("[data-directory-search]")) {
          event.preventDefault();
          if (root.current) filterDirectory(root.current);
          return;
        }
        if (form.id === "medicoContactForm") {
          event.preventDefault();
          const data = new FormData(form);
          const body = Array.from(data.entries())
            .filter(([name]) => name !== "hipaaConsent")
            .map(([name, value]) => `${name}: ${value}`)
            .join("\n");
          window.location.assign(
            `mailto:Support@medico.com?subject=${encodeURIComponent(String(data.get("subjectField") || "Medico contact inquiry"))}&body=${encodeURIComponent(body)}`,
          );
          setNotice(
            "Your email draft is ready. Review and send it in your email app. If it does not open, email Support@medico.com directly.",
          );
          return;
        }
        if (!form.matches("[data-newsletter]")) return;
        event.preventDefault();
        const email = new FormData(form).get("email");
        window.location.assign(
          `mailto:Support@medico.com?subject=Medico%20newsletter%20subscription&body=${encodeURIComponent(`Please subscribe ${email} to Medico news.`)}`,
        );
        setNotice(
          "Finish sending your subscription request in your email app.",
        );
      }}
    >
      {children}
      <button
        className="stitch-mobile-menu"
        aria-label="Open navigation"
        aria-expanded={menu}
        onClick={() => setMenu(!menu)}
      >
        ☰
      </button>
      {menu && (
        <nav className="stitch-mobile-nav" aria-label="Mobile navigation">
          {["Services", "Doctors", "Departments", "About", "Contact"].map(
            (text) => (
              <a key={text} href={`/${text.toLowerCase()}`}>
                {text}
              </a>
            ),
          )}
        </nav>
      )}
      {notice && (
        <div className="stitch-notice" role="status">
          {notice}
        </div>
      )}
      <dialog
        className="stitch-dialog"
        ref={dialog}
        onCancel={() => setAction(null)}
        onClick={(event) => {
          if (event.target === event.currentTarget) setAction(null);
        }}
        onClose={() => setAction(null)}
      >
        <div className="stitch-dialog-body">
          <button
            className="stitch-close"
            aria-label="Close dialog"
            onClick={() => setAction(null)}
          >
            ×
          </button>
          <h2>{title}</h2>
          {booking ? (
            <>
              <p>
                Choose your preferences and send an appointment request to
                Support@medico.com. Your appointment is confirmed only when the
                care team replies.
              </p>
              {pack && (
                <p>
                  Reference package: {pack.price}. The care team will confirm
                  availability and pricing.
                </p>
              )}
              <form
                className="stitch-form"
                onSubmit={(event) => {
                  event.preventDefault();
                  const data = new FormData(event.currentTarget);
                  const body = Array.from(data.entries())
                    .map(([key, value]) => `${key}: ${value}`)
                    .join("\n");
                  window.location.assign(
                    `mailto:Support@medico.com?subject=${encodeURIComponent(pack ? `Package request: ${pack.title}` : "Appointment request")}&body=${encodeURIComponent(body)}`,
                  );
                  setSaved(true);
                }}
              >
                <label>
                  Your name
                  <input
                    required
                    name="Name"
                    autoComplete="name"
                    maxLength={100}
                  />
                </label>
                <label>
                  Email
                  <input
                    required
                    type="email"
                    name="Email"
                    autoComplete="email"
                    maxLength={254}
                  />
                </label>
                <label>
                  Preferred specialist
                  <select
                    name="Specialist"
                    defaultValue={
                      action?.value !== undefined && !pack
                        ? directory[item]?.name
                        : "Any available specialist"
                    }
                  >
                    <option>Any available specialist</option>
                    {directory.map((d) => (
                      <option key={d.name}>{d.name}</option>
                    ))}
                  </select>
                </label>
                <div className="stitch-form-row">
                  <label>
                    Preferred date
                    <input
                      required
                      type="date"
                      name="Date"
                      min={new Date().toLocaleDateString("en-CA")}
                    />
                  </label>
                  <label>
                    Preferred time
                    <input required type="time" name="Time" />
                  </label>
                </div>
                <button type="submit">Compose appointment request</button>
                {saved && (
                  <p role="status">
                    Your email draft is ready. Send it in your email app to
                    submit the request.
                  </p>
                )}
              </form>
            </>
          ) : profile ? (
            <>
              <p>{profile.description}</p>
              <p>
                {profile.experience} years of experience · {profile.rating}{" "}
                rating · Languages: {profile.languages}
              </p>
              <p>
                Reference consultation fee: ${profile.fee}. This profile comes
                from the supplied design; the care team will confirm details and
                availability.
              </p>
              <button
                onClick={() =>
                  setAction({ name: "directory-book", value: String(item) })
                }
              >
                Request an appointment
              </button>
            </>
          ) : department ? (
            <>
              <p>{department.description}</p>
              <button onClick={() => setAction({ name: "booking" })}>
                Request an appointment
              </button>
            </>
          ) : article ? (
            <>
              <p>{article.description}</p>
              <p>
                This is the article preview supplied with the design. The full
                article has not been published yet.
              </p>
              <a href="/contact">Ask the Medico team</a>
            </>
          ) : action?.name === "articles" ? (
            <div className="stitch-article-list">
              {catalog.articles.map((a, i) => (
                <button
                  key={a.title}
                  onClick={() =>
                    setAction({ name: "article", value: String(i) })
                  }
                >
                  {a.title}
                </button>
              ))}
            </div>
          ) : action?.name === "tour" ? (
            <>
              <p>Explore how to get started with Medico.</p>
              <video
                className="stitch-tour-video"
                controls
                playsInline
                preload="metadata"
                aria-label="Two-minute Medico website walkthrough"
                src="/medico/stitch/tour.mp4"
              >
                <track
                  kind="captions"
                  src="/medico/stitch/tour.vtt"
                  srcLang="en"
                  label="English"
                  default
                />
              </video>
              <ol>
                <li>Choose a department or specialist.</li>
                <li>Request your preferred appointment time.</li>
                <li>Create your patient account.</li>
                <li>
                  Access your consultations and reports in the patient portal.
                </li>
              </ol>
              <a href="/signup">Create your account</a>
            </>
          ) : action?.name === "emergency" ? (
            <>
              <p>
                The phone number in this design is a placeholder. For urgent
                help, contact your local emergency service or find your nearest
                emergency department.
              </p>
              <a href="https://www.google.com/maps/search/emergency+department+near+me/">
                Find nearby emergency care
              </a>
            </>
          ) : ["audio", "video", "call", "pharmacy"].includes(
              action?.name ?? "",
            ) ? (
            <>
              <p>
                Sign in to access your care team and patient records. The
                clinicians and conversation shown on this landing page are
                design previews.
              </p>
              <a href="/login">Continue to patient portal</a>
              <a href="/contact">Contact support</a>
            </>
          ) : (
            <>
              <p>
                For information about {action?.value || "Medico"}, contact our
                team.
              </p>
              <a href="mailto:Support@medico.com">Support@medico.com</a>
              <a href="/contact">Open Contact Us</a>
            </>
          )}
        </div>
      </dialog>
    </div>
  );
}
