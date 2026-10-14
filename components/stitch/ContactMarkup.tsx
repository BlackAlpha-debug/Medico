/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
export function ContactMarkup() {
  return (
    <div className="bg-surface font-body-md text-on-surface antialiased selection:bg-primary-fixed selection:text-on-primary-fixed">
      <header className="sticky top-0 z-50 w-full bg-surface-container-lowest/90 backdrop-blur-xl border-b border-outline-variant/30 shadow-[0_1px_8px_rgba(0,0,0,0.03)]">
        <div className="h-20 max-w-[1440px] mx-auto px-margin flex items-center justify-between gap-space-lg">
          <div className="flex items-center gap-space-sm">
            <img
              alt="Medico Brand Logo"
              className="h-8 w-auto object-contain"
              src="/medico/stitch/image-00.png"
              loading="lazy"
            />
          </div>
          <nav
            className="hidden lg:flex items-center gap-space-lg"
            data-active-classes="text-primary font-semibold border-b-2 border-primary pb-1"
          >
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              data-path="home"
              href="/"
            >
              {"Home"}
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              data-path="services"
              href="/services"
            >
              {"Services"}
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              data-path="doctors"
              href="/doctors"
            >
              {"Doctors"}
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              data-path="departments"
              href="/departments"
            >
              {"Departments"}
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              data-path="about"
              href="/about"
            >
              {"About"}
            </a>
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              data-path="contact"
              href="/contact"
            >
              {"Contact"}
            </a>
          </nav>
          <div className="flex items-center gap-space-md">
            <a
              className="font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors px-space-xs py-space-sm"
              data-path="login"
              href="/login"
            >
              {"Login"}
            </a>
            <a
              className="inline-flex items-center gap-space-xs bg-primary-container text-on-primary font-label-lg text-label-lg px-space-md py-space-sm rounded-full shadow-[0_2px_8px_rgba(31,107,107,0.2)] hover:bg-tertiary transition-all active:translate-y-[1px]"
              data-path="appointment-booking"
              href="?action=booking"
              data-action="booking"
            >
              <span className="material-symbols-outlined text-[18px]">
                {"calendar_add_on"}
              </span>
              <span>{"Book Appointment"}</span>
            </a>
            <a
              className="w-8 h-8 rounded-full bg-primary flex items-center justify-center"
              href="/login"
              aria-label="Open patient portal"
            >
              <span className="material-symbols-outlined text-on-primary text-[18px]">
                {"person"}
              </span>
            </a>
          </div>
        </div>
      </header>
      <main className="w-full bg-surface">
        <div className="flex flex-col w-full">
          <section className="relative bg-primary text-on-primary overflow-hidden pb-24 md:pb-32">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed/10 blur-3xl pointer-events-none"></div>
            <div className="absolute top-1/2 -left-20 w-80 h-80 rounded-full bg-secondary-container/15 blur-3xl pointer-events-none"></div>
            <div className="max-w-[1440px] mx-auto px-margin pt-10 md:pt-16 pb-12 relative z-10 flex flex-col items-center text-center">
              <div className="flex flex-wrap items-center justify-center gap-space-sm mb-6">
                <nav
                  aria-label="Breadcrumb"
                  className="inline-flex items-center gap-space-xs px-space-md py-1.5 rounded-full bg-surface-container-lowest/10 backdrop-blur-md text-on-primary font-label-md text-label-md"
                >
                  <a
                    className="opacity-80 hover:opacity-100 transition-opacity flex items-center gap-1"
                    href="/"
                  >
                    <span className="material-symbols-outlined text-[16px]">
                      {"home"}
                    </span>
                    {" Home\n          "}
                  </a>
                  <span className="material-symbols-outlined text-[14px] opacity-50">
                    {"chevron_right"}
                  </span>
                  <span className="text-primary-fixed font-medium">
                    {"Contact Us"}
                  </span>
                </nav>
                <span className="inline-flex items-center gap-1.5 px-space-md py-1.5 rounded-full bg-secondary-container text-on-secondary-container font-label-sm text-label-sm uppercase tracking-wider shadow-sm">
                  <span className="inline-block w-2 h-2 rounded-full bg-primary-fixed animate-pulse"></span>
                  {"\n          24/7 Clinical Assistance\n        "}
                </span>
              </div>

              <h1 className="font-headline-xl text-headline-xl md:text-[54px] md:leading-[62px] text-on-primary tracking-tight max-w-4xl mb-6">
                {"\n        We're Here For You. "}
                <br className="hidden sm:inline" />
                <span className="text-primary-fixed">
                  {"Connect With Medico."}
                </span>
              </h1>

              <p className="font-body-lg text-body-lg text-inverse-on-surface/90 max-w-2xl mb-8 leading-relaxed">
                {
                  "\n        Whether you have inquiries regarding specialist appointments, clinical departments, inpatient services, or urgent emergency care, our clinical liaison desk is on duty 24/7.\n      "
                }
              </p>

              <div className="flex flex-wrap items-center justify-center gap-space-md pt-2">
                <div className="flex items-center gap-2.5 px-space-md py-2 rounded-full bg-primary-container/60 backdrop-blur-md shadow-sm">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                    {"bolt"}
                  </span>
                  <span className="font-label-md text-label-md text-on-primary">
                    {"Average clinical triage response < 15 mins"}
                  </span>
                </div>
                <div className="flex items-center gap-2.5 px-space-md py-2 rounded-full bg-primary-container/60 backdrop-blur-md shadow-sm">
                  <span className="material-symbols-outlined text-primary-fixed text-[20px]">
                    {"translate"}
                  </span>
                  <span className="font-label-md text-label-md text-on-primary">
                    {"24/7 Multilingual Interpretation Support"}
                  </span>
                </div>
              </div>
            </div>

            <div className="w-full absolute bottom-0 left-0 leading-none overflow-hidden pointer-events-none">
              <svg
                className="relative block w-full h-12 md:h-16 text-surface"
                preserveAspectRatio="none"
                viewBox="0 0 1200 120"
              >
                <path
                  d="M0,0 C150,90 350,-40 500,45 C650,130 900,10 1200,50 L1200,120 L0,120 Z"
                  fill="currentColor"
                ></path>
              </svg>
            </div>
          </section>

          <section className="max-w-[1440px] mx-auto px-margin -mt-14 md:-mt-20 relative z-20 w-full mb-20 md:mb-28">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
              <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[28px]">
                        {"phone_in_talk"}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      <span className="w-2 h-2 rounded-full bg-secondary-container"></span>
                      {"\n              Available 24/7\n            "}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                    {"Direct Helpline"}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-4">
                    {"Emergency & General Lines"}
                  </h3>
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-surface-container-low">
                      <span className="block font-label-sm text-label-sm text-error font-semibold uppercase">
                        {"Trauma & Emergency (24/7)"}
                      </span>
                      <a
                        className="font-headline-sm text-headline-sm text-on-surface font-bold hover:text-primary transition-colors"
                        href="?action=call"
                        data-action="call"
                      >
                        {"+1 (800) 845-3342"}
                      </a>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-lowest">
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        {"General Outpatient & Scheduling"}
                      </span>
                      <a
                        className="font-body-md text-body-md font-semibold text-primary hover:underline"
                        href="?action=call"
                        data-action="call"
                      >
                        {"+1 (800) 555-0199"}
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="pt-6 mt-6 flex items-center justify-between text-on-surface-variant"
                  data-action="call"
                  role="button"
                  tabIndex={0}
                  aria-label="Direct Triage Dispatch"
                >
                  <span className="font-label-md text-label-md">
                    {"Direct Triage Dispatch"}
                  </span>
                  <span className="material-symbols-outlined text-primary text-[20px] group-hover:translate-x-1 transition-transform">
                    {"arrow_forward"}
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[28px]">
                        {"mark_email_read"}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-[14px]">
                        {"lock"}
                      </span>
                      {"\n              Encrypted\n            "}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                    {"Electronic Inquiries"}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-4">
                    {"Email & Digital Helpdesk"}
                  </h3>
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-surface-container-low">
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        {"Clinical Care Coordination"}
                      </span>
                      <a
                        className="font-body-md text-body-md font-semibold text-primary hover:underline break-all"
                        href="mailto:Support@medico.com"
                      >
                        {"Support@medico.com"}
                      </a>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-lowest">
                      <span className="block font-label-sm text-label-sm text-on-surface-variant">
                        {"Specialist Bookings & Referral Desk"}
                      </span>
                      <a
                        className="font-body-md text-body-md font-semibold text-primary hover:underline break-all"
                        href="mailto:Support@medico.com"
                      >
                        {"Support@medico.com"}
                      </a>
                    </div>
                  </div>
                </div>
                <div
                  className="pt-6 mt-6 flex items-center justify-between text-on-surface-variant"
                  data-action="email"
                  role="button"
                  tabIndex={0}
                  aria-label="HIPAA Secure Correspondence"
                >
                  <span className="font-label-md text-label-md">
                    {"HIPAA Secure Correspondence"}
                  </span>
                  <span className="material-symbols-outlined text-primary text-[20px] group-hover:translate-x-1 transition-transform">
                    {"arrow_forward"}
                  </span>
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-space-lg md:p-8 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between group">
                <div>
                  <div className="flex items-center justify-between mb-6">
                    <div className="w-14 h-14 rounded-2xl bg-surface-container-low flex items-center justify-center text-primary group-hover:bg-primary group-hover:text-on-primary transition-colors">
                      <span className="material-symbols-outlined text-[28px]">
                        {"local_hospital"}
                      </span>
                    </div>
                    <span className="inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full bg-surface-container text-primary font-label-sm text-label-sm">
                      <span className="w-2 h-2 rounded-full bg-primary"></span>
                      {"\n              Level 1 Trauma\n            "}
                    </span>
                  </div>
                  <span className="font-label-sm text-label-sm text-on-surface-variant uppercase tracking-wider block mb-1">
                    {"Campus Location"}
                  </span>
                  <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-4">
                    {"Main Medical Campus"}
                  </h3>
                  <div className="space-y-3 pt-2">
                    <div className="p-3 rounded-xl bg-surface-container-low flex items-start gap-2.5">
                      <span className="material-symbols-outlined text-primary text-[20px] mt-0.5">
                        {"pin_drop"}
                      </span>
                      <div>
                        <p className="font-body-sm text-body-sm text-on-surface font-medium leading-snug">
                          {"\n                  742 Evergreen Healthcare Ave"}
                          <br />
                          {
                            "\n                  Medical District, NY 10001\n                "
                          }
                        </p>
                      </div>
                    </div>
                    <div className="p-3 rounded-xl bg-surface-container-lowest">
                      <div className="flex justify-between items-center text-body-sm">
                        <span className="text-on-surface-variant">
                          {"Visiting Hours:"}
                        </span>
                        <span className="font-semibold text-on-surface">
                          {"08:00 AM – 09:00 PM"}
                        </span>
                      </div>
                      <div className="flex justify-between items-center text-body-sm mt-1">
                        <span className="text-on-surface-variant">
                          {"Emergency Bay:"}
                        </span>
                        <span className="font-semibold text-error">
                          {"24 Hours / 7 Days"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
                <div
                  className="pt-6 mt-6 flex items-center justify-between text-on-surface-variant"
                  data-action="directions"
                  role="button"
                  tabIndex={0}
                  aria-label="Interactive Pavilion Guide"
                >
                  <span className="font-label-md text-label-md">
                    {"Interactive Pavilion Guide"}
                  </span>
                  <span className="material-symbols-outlined text-primary text-[20px] group-hover:translate-x-1 transition-transform">
                    {"arrow_forward"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[1440px] mx-auto px-margin mb-24 md:mb-32 w-full">
            <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-start">
              <div className="lg:col-span-7 bg-surface-container-lowest rounded-3xl p-6 sm:p-8 md:p-10 shadow-lg relative">
                <div className="mb-8">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-surface-container-low text-primary font-label-sm text-label-sm tracking-wider uppercase mb-3">
                    <span className="material-symbols-outlined text-[16px]">
                      {"outgoing_mail"}
                    </span>
                    {"\n            Direct Liaison Message\n          "}
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-2">
                    {"Send Us a Direct Message"}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                    {
                      "\n            Fill out the consultation or clinical inquiry request below and our senior care desk will review and reply within 15 minutes during operating hours.\n          "
                    }
                  </p>
                </div>
                <form className="space-y-6" id="medicoContactForm">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface font-semibold mb-2"
                        htmlFor="fullName"
                      >
                        {"\n                Full Name "}
                        <span className="text-error">{"*"}</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          {"person"}
                        </span>
                        <input
                          className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                          id="fullName"
                          placeholder="Eleanor Vance"
                          required
                          type="text"
                          name="fullName"
                          maxLength={254}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface font-semibold mb-2"
                        htmlFor="emailAddr"
                      >
                        {"\n                Email Address "}
                        <span className="text-error">{"*"}</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          {"mail"}
                        </span>
                        <input
                          className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                          id="emailAddr"
                          placeholder="eleanor.v@example.com"
                          required
                          type="email"
                          name="emailAddr"
                          maxLength={254}
                        />
                      </div>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-space-md">
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface font-semibold mb-2"
                        htmlFor="phoneNumber"
                      >
                        {"\n                Phone Number "}
                        <span className="text-error">{"*"}</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          {"call"}
                        </span>
                        <input
                          className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                          id="phoneNumber"
                          placeholder="+1 (555) 000-0000"
                          required
                          type="tel"
                          name="phoneNumber"
                          maxLength={254}
                        />
                      </div>
                    </div>
                    <div>
                      <label
                        className="block font-label-md text-label-md text-on-surface font-semibold mb-2"
                        htmlFor="deptSelect"
                      >
                        {"\n                Select Department "}
                        <span className="text-error">{"*"}</span>
                      </label>
                      <div className="relative flex items-center">
                        <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                          {"clinical_notes"}
                        </span>
                        <select
                          className="w-full h-11 pl-11 pr-10 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all appearance-none cursor-pointer"
                          id="deptSelect"
                          required
                          name="deptSelect"
                          defaultValue=""
                        >
                          <option disabled value="">
                            {"Choose Medical Department"}
                          </option>
                          <option value="cardiology">
                            {"Cardiology & Vascular Institute"}
                          </option>
                          <option value="neurology">
                            {"Neurology & Neurosurgery"}
                          </option>
                          <option value="pediatrics">
                            {"Pediatrics & Neonatology"}
                          </option>
                          <option value="orthopedics">
                            {"Orthopedics & Sports Medicine"}
                          </option>
                          <option value="dental">
                            {"Advanced Dental Surgery"}
                          </option>
                          <option value="general">
                            {"Internal Medicine & Primary Care"}
                          </option>
                          <option value="billing">
                            {"Patient Billing & Insurance Claims"}
                          </option>
                        </select>
                        <span className="material-symbols-outlined absolute right-3 text-outline text-[20px] pointer-events-none">
                          {"expand_more"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div>
                    <label className="block font-label-md text-label-md text-on-surface font-semibold mb-2">
                      {
                        "\n              Preferred Contact Channel\n            "
                      }
                    </label>
                    <div className="grid grid-cols-3 gap-2 p-1 bg-surface-container-low rounded-xl">
                      <label className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-center cursor-pointer transition-colors has-[:checked]:bg-primary has-[:checked]:text-on-primary text-on-surface-variant font-label-sm text-label-sm">
                        <input
                          className="sr-only"
                          name="contactChannel"
                          type="radio"
                          value="email"
                          defaultChecked
                        />
                        <span className="material-symbols-outlined text-[16px]">
                          {"email"}
                        </span>
                        <span>{"Email"}</span>
                      </label>
                      <label className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-center cursor-pointer transition-colors has-[:checked]:bg-primary has-[:checked]:text-on-primary text-on-surface-variant font-label-sm text-label-sm">
                        <input
                          className="sr-only"
                          name="contactChannel"
                          type="radio"
                          value="phone"
                        />
                        <span className="material-symbols-outlined text-[16px]">
                          {"phone"}
                        </span>
                        <span>{"Phone Call"}</span>
                      </label>
                      <label className="flex items-center justify-center gap-1.5 py-2 px-3 rounded-lg text-center cursor-pointer transition-colors has-[:checked]:bg-primary has-[:checked]:text-on-primary text-on-surface-variant font-label-sm text-label-sm">
                        <input
                          className="sr-only"
                          name="contactChannel"
                          type="radio"
                          value="sms"
                        />
                        <span className="material-symbols-outlined text-[16px]">
                          {"sms"}
                        </span>
                        <span>{"SMS / WhatsApp"}</span>
                      </label>
                    </div>
                  </div>

                  <div>
                    <label
                      className="block font-label-md text-label-md text-on-surface font-semibold mb-2"
                      htmlFor="subjectField"
                    >
                      {"\n              Inquiry Subject\n            "}
                    </label>
                    <div className="relative flex items-center">
                      <span className="material-symbols-outlined absolute left-3.5 text-outline text-[20px] pointer-events-none">
                        {"help_outline"}
                      </span>
                      <input
                        className="w-full h-11 pl-11 pr-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all"
                        id="subjectField"
                        placeholder="e.g., Follow-up consultation or diagnostic scan booking"
                        type="text"
                        name="subjectField"
                        maxLength={254}
                      />
                    </div>
                  </div>

                  <div>
                    <div className="flex items-center justify-between mb-2">
                      <label
                        className="font-label-md text-label-md text-on-surface font-semibold"
                        htmlFor="messageBox"
                      >
                        {"\n                Detailed Message "}
                        <span className="text-error">{"*"}</span>
                      </label>
                      <span
                        className="font-label-sm text-label-sm text-outline"
                        id="charCounter"
                      >
                        {"0 / 500 characters"}
                      </span>
                    </div>
                    <textarea
                      className="w-full p-4 rounded-xl bg-surface-container-low text-on-surface font-body-md text-body-md placeholder:text-outline focus:outline-none focus:bg-surface-container-lowest focus:ring-2 focus:ring-primary transition-all resize-none"
                      id="messageBox"
                      maxLength={500}
                      placeholder="Describe your inquiry, medical symptoms, or preferred consultation dates..."
                      required
                      rows={4}
                      name="messageBox"
                    ></textarea>
                  </div>

                  <div className="flex items-start gap-3">
                    <input
                      className="w-5 h-5 rounded mt-0.5 accent-primary cursor-pointer"
                      id="hipaaConsent"
                      required
                      type="checkbox"
                      name="hipaaConsent"
                    />
                    <label
                      className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed select-none"
                      htmlFor="hipaaConsent"
                    >
                      {
                        "I agree to share these details with Medico support through my email app. Please do not include sensitive medical records."
                      }
                    </label>
                  </div>

                  <div className="pt-2 flex flex-col sm:flex-row items-center justify-between gap-4">
                    <button
                      className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-8 py-3.5 rounded-full bg-primary text-on-primary font-label-lg text-label-lg shadow-md hover:bg-tertiary transition-all active:scale-[0.98]"
                      type="submit"
                    >
                      <span>{"Send Message"}</span>
                      <span className="material-symbols-outlined text-[20px]">
                        {"send"}
                      </span>
                    </button>
                    <div className="flex items-center gap-1.5 text-on-surface-variant font-label-sm text-label-sm">
                      <span className="material-symbols-outlined text-primary text-[18px]">
                        {"verified_user"}
                      </span>
                      <span>{"Review and send in your email app"}</span>
                    </div>
                  </div>
                </form>
              </div>

              <div className="lg:col-span-5 flex flex-col gap-space-lg">
                <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-md overflow-hidden relative">
                  <div className="flex items-center justify-between mb-4">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold">
                        {"Campus Geolocation"}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                        {"Medical Center Pavilion"}
                      </h3>
                    </div>
                    <a
                      className="w-10 h-10 rounded-full bg-surface-container-low flex items-center justify-center text-primary hover:bg-primary hover:text-on-primary transition-colors"
                      href="?action=directions"
                      rel="noopener noreferrer"
                      title="Open in Maps"
                      data-action="directions"
                      aria-label="Find directions"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {"open_in_new"}
                      </span>
                    </a>
                  </div>

                  <div className="relative w-full h-72 rounded-2xl overflow-hidden bg-surface-container-high group">
                    <div
                      className="w-full h-full bg-cover bg-center transition-transform duration-500 group-hover:scale-105"
                      data-location="742 Evergreen Healthcare Ave, New York, NY 10001"
                      style={{
                        backgroundImage:
                          "url('https://lh3.googleusercontent.com/aida-public/AB6AXuCXCCBd7w9X2gbf8AJYzEhctzZrm3OkqOpIumDFQi16OT9C_Y-zVidKF_GYALVYbOeILlqR8kMWQ0p6jTFb8HTe5sMWImwzb5IzLuSyQqsZNLkrzN6S3_rBCjx5x4IgkV8JJtMa9vzXq6weLpakxpjgpDz-tZIYFTYRmnp9xVOc0p7lUwDFP_ca34XwiQArOx6e9BfOzGd23YDCKJQ0I6HJ3neTQtRHT-HdFP88wflwuHMb72OySx9iYg')",
                      }}
                    ></div>

                    <div className="absolute inset-0 bg-gradient-to-t from-inverse-surface/80 via-transparent to-inverse-surface/20 pointer-events-none"></div>

                    <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 flex flex-col items-center pointer-events-none">
                      <div className="px-3 py-1.5 rounded-xl bg-surface-container-lowest text-primary shadow-xl font-label-sm text-label-sm font-bold flex items-center gap-1.5 animate-bounce">
                        <span className="w-2.5 h-2.5 rounded-full bg-error"></span>
                        {
                          "\n                Medico Main Campus & Trauma\n              "
                        }
                      </div>
                      <span className="material-symbols-outlined text-error text-[36px] drop-shadow-md -mt-1">
                        {"location_on"}
                      </span>
                    </div>

                    <div className="absolute bottom-3 left-3 right-3 flex flex-wrap gap-2 pointer-events-auto">
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[16px] text-primary">
                          {"directions_subway"}
                        </span>
                        {"\n                Metro: 200m\n              "}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[16px] text-secondary">
                          {"local_parking"}
                        </span>
                        {"\n                Parking: P1-P3\n              "}
                      </span>
                      <span className="px-2.5 py-1 rounded-lg bg-surface-container-lowest/90 backdrop-blur-md text-on-surface font-label-sm text-label-sm flex items-center gap-1 shadow-sm">
                        <span className="material-symbols-outlined text-[16px] text-error">
                          {"flight_takeoff"}
                        </span>
                        {"\n                Helipad Active\n              "}
                      </span>
                    </div>
                  </div>

                  <div className="mt-4 p-4 rounded-xl bg-surface-container-low flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <span className="material-symbols-outlined text-primary text-[24px]">
                        {"signpost"}
                      </span>
                      <div>
                        <p className="font-label-md text-label-md text-on-surface font-semibold">
                          {"East Wing Main Reception"}
                        </p>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Entrance directly via Healthcare Ave"}
                        </p>
                      </div>
                    </div>
                    <button
                      className="px-3.5 py-1.5 rounded-full bg-surface-container text-primary font-label-sm text-label-sm hover:bg-primary hover:text-on-primary transition-colors flex items-center gap-1"
                      data-action="copy-address"
                      type="button"
                      aria-label="Copy campus address"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {"content_copy"}
                      </span>
                      <span>{"Copy"}</span>
                    </button>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-3xl p-6 shadow-md">
                  <h4 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-4 flex items-center gap-2">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      {"navigation"}
                    </span>
                    {"\n            Transit, Parking & Access\n          "}
                  </h4>
                  <div className="space-y-4">
                    <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          {"train"}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-label-lg text-label-lg text-on-surface font-semibold">
                          {"Rapid Transit & Subway"}
                        </h5>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {
                            "Blue & Green line to 'Healthcare Plaza Station'. Accessible elevators connect directly into the Medico atrium."
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-surface-container-low text-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          {"local_parking"}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-label-lg text-label-lg text-on-surface font-semibold">
                          {"Valet & Visitor Parking"}
                        </h5>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {
                            "Complimentary 2-hour covered parking for patients in Levels P1-P3. Complimentary valet service at North Atrium."
                          }
                        </p>
                      </div>
                    </div>

                    <div className="flex items-start gap-3.5 p-3 rounded-xl hover:bg-surface-container-low transition-colors">
                      <div className="w-10 h-10 rounded-xl bg-error-container text-on-error-container flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          {"emergency"}
                        </span>
                      </div>
                      <div>
                        <h5 className="font-label-lg text-label-lg text-on-surface font-semibold text-error">
                          {"Emergency Trauma Bay (Gate 4)"}
                        </h5>
                        <p className="font-body-sm text-body-sm text-on-surface-variant">
                          {
                            "Direct ambulance and private acute drop-off located on East Perimeter Road. 24/7 immediate triage nurses on site."
                          }
                        </p>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[1440px] mx-auto px-margin mb-24 md:mb-32 w-full">
            <div className="relative bg-tertiary text-on-tertiary rounded-3xl p-8 sm:p-10 md:p-14 overflow-hidden shadow-xl">
              <div className="absolute -right-16 -bottom-16 w-80 h-80 rounded-full bg-primary-container/40 blur-2xl pointer-events-none"></div>
              <div className="absolute left-1/3 top-0 w-64 h-64 rounded-full bg-secondary/10 blur-3xl pointer-events-none"></div>
              <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                <div className="max-w-2xl text-center lg:text-left">
                  <div className="inline-flex items-center gap-2 px-3.5 py-1.5 rounded-full bg-surface-container-lowest/15 backdrop-blur-md text-error-container font-label-sm text-label-sm uppercase tracking-wider mb-4">
                    <span className="w-2.5 h-2.5 rounded-full bg-error animate-ping"></span>
                    {
                      "\n            Life-Threatening Emergency Protocol\n          "
                    }
                  </div>
                  <h2 className="font-headline-lg text-headline-lg md:text-[36px] text-on-tertiary font-bold mb-3 tracking-tight">
                    {
                      "\n            Experiencing a Medical Emergency?\n          "
                    }
                  </h2>
                  <p className="font-body-md text-body-md text-on-tertiary-container leading-relaxed">
                    {
                      "\n            Do not submit online forms for urgent conditions. Dial our dedicated trauma response dispatch line or proceed directly to our Level 1 Emergency Bay at Gate 4.\n          "
                    }
                  </p>
                </div>
                <div className="flex flex-col sm:flex-row items-center gap-space-md shrink-0 w-full sm:w-auto">
                  <a
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-3 px-8 py-4 rounded-full bg-error text-on-error font-headline-sm text-headline-sm font-bold shadow-lg hover:brightness-110 active:scale-[0.98] transition-all group"
                    href="?action=call"
                    data-action="call"
                  >
                    <span className="material-symbols-outlined text-[24px] group-hover:rotate-12 transition-transform">
                      {"emergency_home"}
                    </span>
                    <span>{"(800) 845-3342"}</span>
                  </a>

                  <a
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-4 rounded-full bg-surface-container-lowest/20 hover:bg-surface-container-lowest/30 text-on-tertiary font-label-lg text-label-lg backdrop-blur-md transition-all"
                    href="?action=directions"
                    data-action="directions"
                    aria-label="Find directions"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {"directions"}
                    </span>
                    <span>{"Navigate to ER"}</span>
                  </a>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[1040px] mx-auto px-margin mb-28 md:mb-36 w-full">
            <div className="text-center mb-12">
              <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary font-semibold block mb-2">
                {"Help Center Guidance"}
              </span>
              <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mb-3">
                {"Frequently Asked Questions"}
              </h2>
              <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mx-auto">
                {
                  "\n        Quick answers to common questions about appointments, records, emergency check-ins, and doctor communications.\n      "
                }
              </p>
            </div>

            <div className="space-y-4" id="faqAccordion">
              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm transition-all duration-200">
                <button
                  className="w-full flex items-center justify-between text-left gap-4"
                  type="button"
                  data-action="faq"
                  data-value="0"
                  aria-expanded="false"
                  aria-controls="contact-faq-0"
                >
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium text-base sm:text-lg">
                    {
                      "How quickly will I receive a response to my online message?"
                    }
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-low text-primary flex items-center justify-center shrink-0 transition-transform duration-200">
                    <span className="material-symbols-outlined text-[20px]">
                      {"expand_more"}
                    </span>
                  </span>
                </button>
                <div
                  className="hidden pt-3 text-on-surface-variant font-body-md text-body-md leading-relaxed"
                  id="contact-faq-0"
                >
                  {
                    "\n          Inquiries submitted via our portal or contact form are processed by our clinical liaison coordination desk. During standard outpatient hours (07:00 AM – 09:00 PM EST), we typically respond within 15 to 30 minutes. Messages submitted overnight are addressed promptly by the next morning triage team.\n        "
                  }
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm transition-all duration-200">
                <button
                  className="w-full flex items-center justify-between text-left gap-4"
                  type="button"
                  data-action="faq"
                  data-value="1"
                  aria-expanded="false"
                  aria-controls="contact-faq-1"
                >
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium text-base sm:text-lg">
                    {
                      "Can I book a same-day specialist consultation through this form?"
                    }
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-low text-primary flex items-center justify-center shrink-0 transition-transform duration-200">
                    <span className="material-symbols-outlined text-[20px]">
                      {"expand_more"}
                    </span>
                  </span>
                </button>
                <div
                  className="hidden pt-3 text-on-surface-variant font-body-md text-body-md leading-relaxed"
                  id="contact-faq-1"
                >
                  {
                    '\n          Yes! Select "Appointment" in the message subject and note your preferred department. Our scheduling department will call you directly with open cancellation slots or same-day telehealth windows. For urgent specialist care, you may also phone our OPD desk at +1 (800) 555-0199.\n        '
                  }
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm transition-all duration-200">
                <button
                  className="w-full flex items-center justify-between text-left gap-4"
                  type="button"
                  data-action="faq"
                  data-value="2"
                  aria-expanded="false"
                  aria-controls="contact-faq-2"
                >
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium text-base sm:text-lg">
                    {
                      "Where should I go for emergency outpatient visits after hours?"
                    }
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-low text-primary flex items-center justify-center shrink-0 transition-transform duration-200">
                    <span className="material-symbols-outlined text-[20px]">
                      {"expand_more"}
                    </span>
                  </span>
                </button>
                <div
                  className="hidden pt-3 text-on-surface-variant font-body-md text-body-md leading-relaxed"
                  id="contact-faq-2"
                >
                  {
                    "\n          Between 09:00 PM and 08:00 AM, all outpatient admissions, pediatric urgent walk-ins, and trauma arrivals are handled directly through the East Wing Emergency Gate (Gate 4). Security guards and nursing intake coordinators remain posted at this entrance 24/7.\n        "
                  }
                </div>
              </div>

              <div className="bg-surface-container-lowest rounded-2xl p-5 shadow-sm transition-all duration-200">
                <button
                  className="w-full flex items-center justify-between text-left gap-4"
                  type="button"
                  data-action="faq"
                  data-value="3"
                  aria-expanded="false"
                  aria-controls="contact-faq-3"
                >
                  <span className="font-headline-sm text-headline-sm text-on-surface font-medium text-base sm:text-lg">
                    {
                      "How do I request official copies of my diagnostic and lab records?"
                    }
                  </span>
                  <span className="w-8 h-8 rounded-full bg-surface-container-low text-primary flex items-center justify-center shrink-0 transition-transform duration-200">
                    <span className="material-symbols-outlined text-[20px]">
                      {"expand_more"}
                    </span>
                  </span>
                </button>
                <div
                  className="hidden pt-3 text-on-surface-variant font-body-md text-body-md leading-relaxed"
                  id="contact-faq-3"
                >
                  {
                    '\n          Patients can retrieve electronic records and lab panels instantly via the Medico Patient Portal. Alternatively, you can specify "Medical Records" in the form above along with your Patient ID to receive encrypted digital copies via our secure EMR release workflow.\n        '
                  }
                </div>
              </div>
            </div>
          </section>
        </div>
      </main>
      <footer className="w-full bg-tertiary text-inverse-on-surface border-t border-outline/20">
        <div className="max-w-[1440px] mx-auto px-margin py-space-xl">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-space-xl mb-space-xl">
            <div className="lg:col-span-1 flex flex-col gap-space-md">
              <div className="flex items-center gap-space-sm">
                <img
                  alt="Medico Brand Logo"
                  className="h-7 w-auto object-contain brightness-0 invert"
                  src="/medico/stitch/image-00.png"
                  loading="lazy"
                />
              </div>
              <p className="font-body-sm text-body-sm text-on-tertiary-container leading-relaxed">
                {
                  "Providing compassionate, gold-standard clinical excellence and patient care across multi-specialty healthcare networks."
                }
              </p>
              <div className="flex flex-col gap-space-xs">
                <span className="font-label-sm text-label-sm text-on-tertiary-container uppercase tracking-wider">
                  {"24/7 Emergency Helpline"}
                </span>
                <span className="font-headline-sm text-headline-sm text-on-primary font-semibold">
                  {"+1 (800) 845-3342"}
                </span>
              </div>
            </div>
            <div className="flex flex-col gap-space-md">
              <h4 className="font-headline-sm text-headline-sm text-on-primary font-medium">
                {"Quick Links"}
              </h4>
              <ul className="flex flex-col gap-space-xs">
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/doctors">
                    {"Find a Doctor"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/departments">
                    {"Our Specialties"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Clinical Trials"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Telehealth Access"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Careers & Fellowships"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-md">
              <h4 className="font-headline-sm text-headline-sm text-on-primary font-medium">
                {"Departments"}
              </h4>
              <ul className="flex flex-col gap-space-xs">
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Cardiology & Vascular"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Neurology & Neurosurgery"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Orthopedics & Sports Medicine"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Pediatrics & Neonatal Care"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Oncology Comprehensive Care"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-md">
              <h4 className="font-headline-sm text-headline-sm text-on-primary font-medium">
                {"Patient Resources"}
              </h4>
              <ul className="flex flex-col gap-space-xs">
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Patient Portal Guide"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Insurance & Financial Aid"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/contact">
                    {"Visitor Guidelines & Hours"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/login">
                    {"Medical Records (EMR)"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a className="block" href="/login">
                    {"Prescription Refills"}
                  </a>
                </li>
              </ul>
            </div>
            <div className="flex flex-col gap-space-md">
              <h4 className="font-headline-sm text-headline-sm text-on-primary font-medium">
                {"Contact & Location"}
              </h4>
              <div className="flex flex-col gap-space-xs text-on-tertiary-container font-body-sm text-body-sm">
                <div className="flex items-start gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary-fixed">
                    {"location_on"}
                  </span>
                  <span>
                    {"742 Evergreen Healthcare Ave, Medical District, NY 10001"}
                  </span>
                </div>
                <div className="flex items-center gap-space-xs">
                  <span className="material-symbols-outlined text-[18px] text-primary-fixed">
                    {"mail"}
                  </span>
                  <span>{"care@medico-health.org"}</span>
                </div>
              </div>
              <div className="flex items-center gap-space-xs mt-space-sm">
                <div
                  className="w-9 h-9 rounded-full bg-tertiary-container flex items-center justify-center cursor-pointer hover:bg-primary-container transition-colors"
                  data-action="share"
                  role="button"
                  tabIndex={0}
                  aria-label="Medico share"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-primary">
                    {"share"}
                  </span>
                </div>
                <div
                  className="w-9 h-9 rounded-full bg-tertiary-container flex items-center justify-center cursor-pointer hover:bg-primary-container transition-colors"
                  data-action="contact"
                  role="button"
                  tabIndex={0}
                  aria-label="Medico forum"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-primary">
                    {"forum"}
                  </span>
                </div>
                <div
                  className="w-9 h-9 rounded-full bg-tertiary-container flex items-center justify-center cursor-pointer hover:bg-primary-container transition-colors"
                  data-action="email"
                  role="button"
                  tabIndex={0}
                  aria-label="Medico alternate_email"
                >
                  <span className="material-symbols-outlined text-[18px] text-on-primary">
                    {"alternate_email"}
                  </span>
                </div>
              </div>
            </div>
          </div>
          <div className="pt-space-lg border-t border-outline/20 flex flex-col md:flex-row items-center justify-between gap-space-md">
            <div className="flex flex-wrap items-center gap-space-md">
              <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-tertiary-container font-label-sm text-label-sm text-on-primary">
                <span className="material-symbols-outlined text-[14px] text-primary-fixed">
                  {"verified"}
                </span>
                {" JCI Accredited"}
              </span>
              <span className="inline-flex items-center gap-space-xs px-space-sm py-space-xs rounded-full bg-tertiary-container font-label-sm text-label-sm text-on-primary">
                <span className="material-symbols-outlined text-[14px] text-primary-fixed">
                  {"shield"}
                </span>
                {" HIPAA Compliant"}
              </span>
            </div>
            <div className="flex items-center gap-space-lg font-body-sm text-body-sm text-on-tertiary-container">
              <span>
                {"© 2025 Medico Health Systems. All rights reserved."}
              </span>
              <a
                className="hover:text-on-primary transition-colors"
                href="?action=information&item=Privacy Policy"
                data-action="information"
                data-value="Privacy Policy"
              >
                {"Privacy Policy"}
              </a>
              <a
                className="hover:text-on-primary transition-colors"
                href="?action=information&item=Terms of Service"
                data-action="information"
                data-value="Terms of Service"
              >
                {"Terms of Service"}
              </a>
              <a
                className="hover:text-on-primary transition-colors"
                href="?action=information&item=Notice of Nondiscrimination"
                data-action="information"
                data-value="Notice of Nondiscrimination"
              >
                {"Notice of Nondiscrimination"}
              </a>
            </div>
          </div>
        </div>
      </footer>
    </div>
  );
}
