/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
export function AboutMarkup() {
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
          <section className="relative bg-primary text-on-primary overflow-hidden pt-8 pb-20 md:pb-28">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-10 left-10 w-80 h-80 rounded-full bg-secondary-container/15 blur-2xl pointer-events-none"></div>
            <div className="max-w-[1440px] mx-auto px-margin relative z-10 flex flex-col items-center text-center">
              <nav className="flex items-center gap-space-xs text-primary-fixed font-label-md text-label-md mb-6">
                <a
                  className="hover:underline opacity-80 hover:opacity-100 transition-opacity"
                  href="/"
                >
                  {"Home"}
                </a>
                <span className="opacity-50">{"/"}</span>
                <span className="text-on-primary font-semibold">
                  {"About Us"}
                </span>
              </nav>

              <div className="inline-block transform -rotate-2 hover:rotate-0 transition-transform mb-6">
                <span className="bg-inverse-surface text-inverse-on-surface text-label-sm font-label-sm uppercase tracking-wider px-4 py-1.5 rounded-full shadow-md">
                  {"\n          WHO WE ARE\n        "}
                </span>
              </div>

              <h1 className="font-headline-xl text-headline-xl md:text-headline-xl text-on-primary max-w-4xl tracking-tight leading-tight">
                {
                  "\n        Pioneering Compassionate Care & Clinical Excellence Since 2008.\n      "
                }
              </h1>

              <p className="font-body-lg text-body-lg text-on-primary-container max-w-2xl mt-5 leading-relaxed opacity-95">
                {
                  "\n        At Medico, we bridge cutting-edge clinical innovation with deep, patient-first empathy. Over 15 years, our multispecialty medical center has evolved into a nationally ranked health system dedicated to holistic healing.\n      "
                }
              </p>

              <div className="mt-12 w-full max-w-5xl bg-surface-container-lowest/10 backdrop-blur-md rounded-2xl p-4 md:p-6 shadow-sm">
                <div className="grid grid-cols-2 md:grid-cols-4 gap-4 md:gap-8 divide-y md:divide-y-0 md:divide-x divide-on-primary/15">
                  <div className="flex flex-col items-center text-center p-2">
                    <span className="font-headline-lg text-headline-lg text-primary-fixed">
                      {"15+"}
                    </span>
                    <span className="font-label-md text-label-md text-on-primary/90 mt-1">
                      {"Years of Care"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
                    <span className="font-headline-lg text-headline-lg text-primary-fixed">
                      {"25,000+"}
                    </span>
                    <span className="font-label-md text-label-md text-on-primary/90 mt-1">
                      {"Surgeries & Procedures"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
                    <span className="font-headline-lg text-headline-lg text-primary-fixed">
                      {"99.4%"}
                    </span>
                    <span className="font-label-md text-label-md text-on-primary/90 mt-1">
                      {"Patient Approval"}
                    </span>
                  </div>
                  <div className="flex flex-col items-center text-center p-2 pt-4 md:pt-2">
                    <div className="flex items-center gap-1 text-primary-fixed">
                      <span
                        className="material-symbols-outlined text-headline-sm"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"verified"}
                      </span>
                      <span className="font-headline-sm text-headline-sm text-primary-fixed">
                        {"Gold Seal"}
                      </span>
                    </div>
                    <span className="font-label-md text-label-md text-on-primary/90 mt-1">
                      {"JCI International"}
                    </span>
                  </div>
                </div>
              </div>
            </div>

            <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none z-0">
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

          <section className="py-20 md:py-28 bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin">
              <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-16 items-center">
                <div className="lg:col-span-7 flex flex-col items-start">
                  <span className="text-secondary font-label-md text-label-md tracking-wider uppercase font-semibold mb-3">
                    {"\n            OUR ORIGIN STORY\n          "}
                  </span>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mb-6">
                    {
                      "\n            Born from a Commitment to Accessible, World-Class Medicine\n          "
                    }
                  </h2>
                  <div className="space-y-4 text-on-surface-variant font-body-md text-body-md leading-relaxed">
                    <p>
                      {
                        "\n              In 2008, Dr. Evelyn Sterling and Dr. David Chen saw a persistent disconnect between rapid pharmacological advancements and the human experience inside modern hospitals. They set out to build an institution where diagnostic precision and compassionate doctor-patient bonds weren't mutually exclusive.\n            "
                      }
                    </p>
                    <p>
                      {
                        "\n              Starting as a specialized ambulatory center with just twelve physicians, Medico steadily broke new ground in regional surgical outcomes, preventative cardiology, and transparent patient advocacy. Over the past fifteen years, that initial clinic has flourished into a multi-campus, tertiary academic healthcare ecosystem spanning 450+ patient suites, state-level trauma readiness, and an interdisciplinary medical research institute.\n            "
                      }
                    </p>
                  </div>

                  <div className="mt-8 flex flex-col gap-3 w-full">
                    <div className="flex items-center gap-3 p-3.5 bg-surface-container-low rounded-xl">
                      <span
                        className="material-symbols-outlined text-primary text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"check_circle"}
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        {
                          "Pioneered digitized electronic health records (EMR) in 2012"
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 bg-surface-container-low rounded-xl">
                      <span
                        className="material-symbols-outlined text-primary text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"check_circle"}
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        {
                          "First robotic microsurgery center in the regional district"
                        }
                      </span>
                    </div>
                    <div className="flex items-center gap-3 p-3.5 bg-surface-container-low rounded-xl">
                      <span
                        className="material-symbols-outlined text-primary text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"check_circle"}
                      </span>
                      <span className="font-label-lg text-label-lg text-on-surface">
                        {
                          "Dedicated community outreach treating 5,000+ uninsured families annually"
                        }
                      </span>
                    </div>
                  </div>
                </div>

                <div className="lg:col-span-5 relative flex justify-center">
                  <div className="absolute inset-0 bg-primary-fixed/40 blur-2xl rounded-full transform -rotate-6 scale-95"></div>

                  <div className="relative w-full max-w-[460px] h-[520px] rounded-[2.5rem] overflow-hidden shadow-xl bg-surface-container">
                    <img
                      className="w-full h-full object-cover"
                      data-alt="A diverse team of senior medical doctors, cardiac surgeons, and nurses in pristine teal scrubs and white clinical coats standing collaboratively in a sunlit hospital atrium with high ceilings, glass architecture, and warm natural lighting."
                      src="/medico/stitch/page-image-00.png"
                      alt="A diverse team of senior medical doctors, cardiac surgeons, and nurses in pristine teal scrubs and white clinical coats standing collaboratively in a sunlit hospital atrium with high ceilings, glass architecture, and warm natural lighting."
                      loading="lazy"
                    />
                    <div className="absolute inset-0 bg-gradient-to-t from-primary/70 via-transparent to-transparent"></div>

                    <div className="absolute top-6 right-6 bg-surface-container-lowest/95 backdrop-blur-md px-4 py-2.5 rounded-full shadow-lg flex items-center gap-2">
                      <span
                        className="material-symbols-outlined text-secondary text-[20px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"workspace_premium"}
                      </span>
                      <span className="font-label-sm text-label-sm text-on-surface font-semibold">
                        {"Ranked #1 Regional Network"}
                      </span>
                    </div>

                    <div className="absolute bottom-6 left-6 right-6 bg-surface-container-lowest/95 backdrop-blur-md p-4 rounded-xl shadow-lg flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-primary-container text-on-primary flex items-center justify-center shrink-0">
                        <span className="material-symbols-outlined text-[20px]">
                          {"medical_services"}
                        </span>
                      </div>
                      <div className="flex flex-col">
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          {"100% Compassionate Care"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {"Founded by surgeons, led by patient advocacy."}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="hidden sm:block absolute -bottom-6 -left-8 bg-surface-container-lowest p-3 rounded-2xl shadow-md rotate-6">
                    <div className="flex items-center gap-2 text-primary font-label-sm">
                      <span className="material-symbols-outlined text-[20px]">
                        {"favorite"}
                      </span>
                      <span className="font-semibold">
                        {"Healing with Purpose"}
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin">
              <div className="flex flex-col items-center text-center mb-16">
                <div className="inline-block transform rotate-1 mb-4">
                  <span className="bg-inverse-surface text-inverse-on-surface text-label-sm font-label-sm uppercase tracking-wider px-3.5 py-1.5 rounded-full shadow-sm">
                    {"\n            OUR GUIDING PRINCIPLES\n          "}
                  </span>
                </div>
                <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight max-w-2xl">
                  {
                    "\n          The Standards That Define Every Diagnosis and Decision\n        "
                  }
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-3">
                  {
                    "\n          Our ethical architecture governs how we consult, perform surgeries, safeguard confidential records, and nurture clinical talent.\n        "
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                <div className="bg-primary text-on-primary rounded-2xl p-8 flex flex-col justify-between shadow-lg relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div className="absolute -right-12 -bottom-12 w-40 h-40 bg-primary-fixed/10 rounded-full blur-xl pointer-events-none"></div>
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-primary-fixed text-on-primary-fixed flex items-center justify-center mb-6 shadow-sm">
                      <span
                        className="material-symbols-outlined text-[30px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"emergency"}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary-fixed">
                      {"Our Mission"}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-primary mt-1 mb-4">
                      {"\n              Patient-First Healing\n            "}
                    </h3>
                    <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                      {
                        "\n              Delivering evidence-based clinical mastery with profound empathy, absolute dignity, and uncompromised accessibility for every patient regardless of socioeconomic standing.\n            "
                      }
                    </p>
                  </div>
                  <div className="mt-8 pt-6 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary-fixed uppercase tracking-wider">
                      {"Pillars of Care"}
                    </span>
                    <span className="material-symbols-outlined text-primary-fixed text-[20px] group-hover:translate-x-1 transition-transform">
                      {"arrow_forward"}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container-lowest text-on-surface rounded-2xl p-8 flex flex-col justify-between shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-secondary-fixed text-on-secondary-fixed flex items-center justify-center mb-6 shadow-sm">
                      <span
                        className="material-symbols-outlined text-[30px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"insights"}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary">
                      {"Our Vision"}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mt-1 mb-4">
                      {"\n              Global Standard Medicine\n            "}
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {
                        "\n              Redefining connected hospital ecosystems through predictive AI diagnostics, minimally invasive microsurgery, and humane bedside clinical warmth.\n            "
                      }
                    </p>
                  </div>
                  <div className="mt-8 pt-6 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-secondary uppercase tracking-wider">
                      {"Future Horizons"}
                    </span>
                    <span className="material-symbols-outlined text-secondary text-[20px] group-hover:translate-x-1 transition-transform">
                      {"arrow_forward"}
                    </span>
                  </div>
                </div>

                <div className="bg-surface-container text-on-surface rounded-2xl p-8 flex flex-col justify-between shadow-md relative overflow-hidden group hover:-translate-y-1 transition-transform">
                  <div>
                    <div className="w-14 h-14 rounded-xl bg-primary text-on-primary flex items-center justify-center mb-6 shadow-sm">
                      <span
                        className="material-symbols-outlined text-[30px]"
                        style={{ fontVariationSettings: "'FILL' 1" }}
                      >
                        {"verified_user"}
                      </span>
                    </div>
                    <span className="font-label-sm text-label-sm uppercase tracking-wider text-primary">
                      {"Core Values"}
                    </span>
                    <h3 className="font-headline-md text-headline-md text-on-surface mt-1 mb-4">
                      {
                        "\n              Integrity, Precision, Inclusivity\n            "
                      }
                    </h3>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {
                        "\n              Uncompromising clinical safety protocols, continuous medical inquiry, transparent pricing, and relentless dedication to holistic patient empowerment.\n            "
                      }
                    </p>
                  </div>
                  <div className="mt-8 pt-6 flex items-center justify-between">
                    <span className="font-label-sm text-label-sm text-primary uppercase tracking-wider">
                      {"Guiding Creed"}
                    </span>
                    <span className="material-symbols-outlined text-primary text-[20px] group-hover:translate-x-1 transition-transform">
                      {"arrow_forward"}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-28 bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="text-secondary font-label-md text-label-md tracking-wider uppercase font-semibold mb-2">
                  {"\n          OUR EVOLUTION\n        "}
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight">
                  {
                    "\n          15 Years of Transformative Milestones\n        "
                  }
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-3">
                  {
                    "\n          Tracing our trajectory from a humble outpatient dispensary to an internationally acclaimed hospital and research sanctuary.\n        "
                  }
                </p>
              </div>

              <div className="relative max-w-4xl mx-auto">
                <div className="absolute left-4 md:left-1/2 top-4 bottom-4 w-1 bg-surface-container-high -translate-x-1/2 rounded-full"></div>
                <div className="space-y-12 relative">
                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                        {"2008"}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        {"Medico Clinic Founded"}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {
                          "\n                Opened doors with 12 physicians, 2 specialized wards, and an unwavering commitment to non-profit patient assistance.\n              "
                        }
                      </p>
                    </div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[16px]">
                        {"flag"}
                      </span>
                    </div>
                    <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="hidden md:block md:w-1/2 md:pr-12"></div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[16px]">
                        {"verified"}
                      </span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 pl-12">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                        {"2013"}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        {"JCI International Accreditation"}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {
                          "\n                Earned the prestigious Gold Seal of Approval for meeting rigorous international patient safety and hygiene protocols.\n              "
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                        {"2016"}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        {"Comprehensive Cancer & Cardiac Institute"}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {
                          "\n                Expanded into a 450-bed tertiary facility with dedicated oncology radiation suites and state-of-the-art cath labs.\n              "
                        }
                      </p>
                    </div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[16px]">
                        {"domain"}
                      </span>
                    </div>
                    <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="hidden md:block md:w-1/2 md:pr-12"></div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-secondary text-on-secondary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[16px]">
                        {"phone_iphone"}
                      </span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 pl-12">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                        {"2019"}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        {"Digital Health & Telemedicine Pioneer"}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {
                          "\n                Launched full integrated mobile EMR and remote triage networks, serving over 80,000 rural consultations in year one.\n              "
                        }
                      </p>
                    </div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="md:w-1/2 md:pr-12 md:text-right pl-12 md:pl-0">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                        {"2021"}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        {"Robotic Surgery & Genomics Suite"}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {
                          "\n                Integrated advanced Da Vinci surgical systems and tailored genomic sequencing for targeted oncology therapies.\n              "
                        }
                      </p>
                    </div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[16px]">
                        {"precision_manufacturing"}
                      </span>
                    </div>
                    <div className="hidden md:block md:w-1/2 md:pl-12"></div>
                  </div>

                  <div className="flex flex-col md:flex-row items-start md:items-center">
                    <div className="hidden md:block md:w-1/2 md:pr-12"></div>
                    <div className="absolute left-4 md:left-1/2 -translate-x-1/2 w-8 h-8 rounded-full bg-primary-container text-on-primary flex items-center justify-center shadow-md">
                      <span className="material-symbols-outlined text-[16px]">
                        {"eco"}
                      </span>
                    </div>
                    <div className="md:w-1/2 md:pl-12 pl-12">
                      <span className="font-label-sm text-label-sm uppercase tracking-wider text-secondary font-semibold">
                        {"2024"}
                      </span>
                      <h4 className="font-headline-sm text-headline-sm text-on-surface mt-1">
                        {"Sustainable Smart Hospital Campus"}
                      </h4>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-2">
                        {
                          "\n                Achieved net-zero carbon operations alongside an expanded Level 1 pediatric and adult trauma resuscitation center.\n              "
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-28 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin">
              <div className="flex flex-col md:flex-row md:items-end justify-between mb-16 gap-6">
                <div>
                  <span className="text-secondary font-label-md text-label-md tracking-wider uppercase font-semibold">
                    {"\n            WORLD-CLASS LEADERS\n          "}
                  </span>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-2">
                    {
                      "\n            The Minds Leading Modern Medicine\n          "
                    }
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-3">
                    {
                      "\n            Our multidisciplinary board brings together Ivy League academics, clinical researchers, and healthcare pioneers committed to setting new treatment benchmarks.\n          "
                    }
                  </p>
                </div>
                <div className="shrink-0">
                  <a
                    className="inline-flex items-center gap-2 text-primary font-label-lg text-label-lg hover:underline"
                    href="/doctors"
                  >
                    <span>{"View All Medical Staff"}</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {"arrow_forward"}
                    </span>
                  </a>
                </div>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md group hover:-translate-y-1 transition-all flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Distinguished female cardiac surgeon in her late forties wearing scrubs and white lab coat with stethoscope, confident warm smile in bright hospital suite with teal medical accents."
                      src="/medico/stitch/page-image-01.png"
                      alt="Distinguished female cardiac surgeon in her late forties wearing scrubs and white lab coat with stethoscope, confident warm smile in bright hospital suite with teal medical accents."
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
                      {"\n              Cardiology & Surgery\n            "}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {"Dr. Evelyn Sterling, MD, FACS"}
                      </h3>
                      <p className="font-label-md text-label-md text-primary font-semibold mt-1">
                        {"Chief Medical Officer & Cardiac Surgeon"}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                        {
                          "\n                Harvard Medical School alumna with 22 years of surgical leadership. Pioneer of minimally invasive mitral valve repairs.\n              "
                        }
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm bg-surface-container-low px-2.5 py-1 rounded-full">
                        {"48+ Research Papers"}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                        data-action="information"
                        data-value="Medical leadership"
                        role="button"
                        tabIndex={0}
                        aria-label="Ask about this medical leader"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {"share"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md group hover:-translate-y-1 transition-all flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Professional Asian male neurosurgeon in his mid-forties with glasses wearing modern clinical lab coat, standing in front of brain scan monitor, reassuring posture and warm expression."
                      src="/medico/stitch/page-image-02.png"
                      alt="Professional Asian male neurosurgeon in his mid-forties with glasses wearing modern clinical lab coat, standing in front of brain scan monitor, reassuring posture and warm expression."
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
                      {"\n              Neurology & Research\n            "}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {"Dr. David Chen, MD, PhD"}
                      </h3>
                      <p className="font-label-md text-label-md text-primary font-semibold mt-1">
                        {"Head of Neurology & Clinical Research"}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                        {
                          "\n                Stanford Medicine graduate with 18 years specializing in neuro-oncology and AI-assisted deep brain stimulation therapies.\n              "
                        }
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm bg-surface-container-low px-2.5 py-1 rounded-full">
                        {"62+ Research Papers"}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                        data-action="information"
                        data-value="Medical leadership"
                        role="button"
                        tabIndex={0}
                        aria-label="Ask about this medical leader"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {"share"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md group hover:-translate-y-1 transition-all flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Compassionate female pediatrician in early forties smiling warmly wearing soft clinical attire in child-friendly hospital pavilion, natural gentle lighting."
                      src="/medico/stitch/page-image-03.png"
                      alt="Compassionate female pediatrician in early forties smiling warmly wearing soft clinical attire in child-friendly hospital pavilion, natural gentle lighting."
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
                      {"\n              Pediatrics & NICU\n            "}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {"Dr. Elena Rostova, MD"}
                      </h3>
                      <p className="font-label-md text-label-md text-primary font-semibold mt-1">
                        {"Director of Pediatrics & Neonatal Care"}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                        {
                          "\n                Johns Hopkins fellowship trained, overseeing Medico's Level IV neonatal intensive care unit with 14 years of pediatric mastery.\n              "
                        }
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm bg-surface-container-low px-2.5 py-1 rounded-full">
                        {"34+ Research Papers"}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                        data-action="information"
                        data-value="Medical leadership"
                        role="button"
                        tabIndex={0}
                        aria-label="Ask about this medical leader"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {"share"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md group hover:-translate-y-1 transition-all flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Distinguished Black male physician in his late forties holding a tablet device in high-tech telehealth studio, sharp formal doctor jacket, confident and friendly demeanour."
                      src="/medico/stitch/page-image-04.png"
                      alt="Distinguished Black male physician in his late forties holding a tablet device in high-tech telehealth studio, sharp formal doctor jacket, confident and friendly demeanour."
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
                      {
                        "\n              Internal Medicine & Virtual Care\n            "
                      }
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {"Dr. Marcus Vance, MD"}
                      </h3>
                      <p className="font-label-md text-label-md text-primary font-semibold mt-1">
                        {"Chief of Internal Medicine & Telehealth"}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                        {
                          "\n                Oxford University graduate spearheading decentralized hospital-at-home models and chronic preventive care systems.\n              "
                        }
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm bg-surface-container-low px-2.5 py-1 rounded-full">
                        {"29+ Research Papers"}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                        data-action="information"
                        data-value="Medical leadership"
                        role="button"
                        tabIndex={0}
                        aria-label="Ask about this medical leader"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {"share"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md group hover:-translate-y-1 transition-all flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Dynamic female orthopedic surgeon in her late thirties in surgical scrub uniform and sterile attire, focused energetic confidence in clinical rehabilitation wing."
                      src="/medico/stitch/page-image-05.png"
                      alt="Dynamic female orthopedic surgeon in her late thirties in surgical scrub uniform and sterile attire, focused energetic confidence in clinical rehabilitation wing."
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
                      {
                        "\n              Orthopedics & Sports Rehab\n            "
                      }
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {"Dr. Sarah Jenkins, FACS"}
                      </h3>
                      <p className="font-label-md text-label-md text-primary font-semibold mt-1">
                        {"Chair of Orthopedic Surgery"}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                        {
                          "\n                Mayo Clinic veteran specializing in robotic joint replacement and accelerated musculoskeletal recovery for elite athletes.\n              "
                        }
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm bg-surface-container-low px-2.5 py-1 rounded-full">
                        {"41+ Research Papers"}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                        data-action="information"
                        data-value="Medical leadership"
                        role="button"
                        tabIndex={0}
                        aria-label="Ask about this medical leader"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {"share"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>

                <div className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-md group hover:-translate-y-1 transition-all flex flex-col">
                  <div className="relative h-64 overflow-hidden bg-surface-container">
                    <img
                      className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-500"
                      data-alt="Professional hospital executive in well-tailored business suit standing in clean architecturally modern hospital boardroom overlooking city skyline, warm natural light."
                      src="/medico/stitch/page-image-06.png"
                      alt="Professional hospital executive in well-tailored business suit standing in clean architecturally modern hospital boardroom overlooking city skyline, warm natural light."
                      loading="lazy"
                    />
                    <div className="absolute top-4 left-4 bg-primary text-on-primary font-label-sm text-label-sm px-3 py-1 rounded-full">
                      {"\n              Executive Administration\n            "}
                    </div>
                  </div>
                  <div className="p-6 flex flex-col flex-1 justify-between">
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {"Alistair Thorne, MHA"}
                      </h3>
                      <p className="font-label-md text-label-md text-primary font-semibold mt-1">
                        {"Chief Executive Officer"}
                      </p>
                      <p className="font-body-sm text-body-sm text-on-surface-variant mt-3">
                        {
                          "\n                Wharton Healthcare alumnus with 20 years guiding large-scale hospital mergers, health equity programs, and patient infrastructure.\n              "
                        }
                      </p>
                    </div>
                    <div className="mt-6 pt-4 flex items-center justify-between text-on-surface-variant">
                      <span className="font-label-sm text-label-sm bg-surface-container-low px-2.5 py-1 rounded-full">
                        {"Healthcare Fellow"}
                      </span>
                      <div
                        className="w-8 h-8 rounded-full bg-surface-container flex items-center justify-center hover:bg-primary-container hover:text-on-primary transition-colors cursor-pointer"
                        data-action="information"
                        data-value="Medical leadership"
                        role="button"
                        tabIndex={0}
                        aria-label="Ask about this medical leader"
                      >
                        <span className="material-symbols-outlined text-[16px]">
                          {"share"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin">
              <div className="flex flex-col items-center text-center mb-10">
                <span className="text-secondary font-label-sm text-label-sm tracking-wider uppercase font-semibold">
                  {
                    "\n          VALIDATED BY GLOBAL HEALTH AUTHORITIES\n        "
                  }
                </span>
                <h3 className="font-headline-md text-headline-md text-on-surface tracking-tight mt-1">
                  {
                    "\n          Recognized for Unrivaled Safety & Clinical Governance\n        "
                  }
                </h3>
              </div>

              <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6 items-center">
                <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-3">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"stars"}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {"JCI Accredited"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    {"Gold Seal Hospital"}
                  </span>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-3">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"shield"}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {"HIPAA Certified"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    {"100% Data Privacy"}
                  </span>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-3">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"local_hospital"}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {"AHA Member"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    {"American Hospital Assn"}
                  </span>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-3">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"fact_check"}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {"ISO 9001"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    {"Quality Systems"}
                  </span>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low text-secondary flex items-center justify-center mb-3">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"grade"}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {"Leapfrog Grade 'A'"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    {"Hospital Safety Score"}
                  </span>
                </div>

                <div className="bg-surface-container-lowest p-6 rounded-2xl flex flex-col items-center text-center shadow-sm hover:shadow-md transition-shadow">
                  <div className="w-12 h-12 rounded-full bg-surface-container-low text-primary flex items-center justify-center mb-3">
                    <span
                      className="material-symbols-outlined text-[24px]"
                      style={{ fontVariationSettings: "'FILL' 1" }}
                    >
                      {"public"}
                    </span>
                  </div>
                  <span className="font-label-md text-label-md text-on-surface font-semibold">
                    {"WHO Partner"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant text-[11px] mt-0.5">
                    {"Patient Safety Global"}
                  </span>
                </div>
              </div>
            </div>
          </section>

          <section className="py-20 md:py-28 bg-surface-container-low">
            <div className="max-w-[1440px] mx-auto px-margin">
              <div className="flex flex-col items-center text-center mb-16">
                <span className="text-secondary font-label-md text-label-md tracking-wider uppercase font-semibold">
                  {"\n          CAMPUS & INFRASTRUCTURE\n        "}
                </span>
                <h2 className="font-headline-xl text-headline-xl text-on-surface tracking-tight mt-2">
                  {
                    "\n          Designed for Precision, Built for Comfort\n        "
                  }
                </h2>
                <p className="font-body-md text-body-md text-on-surface-variant max-w-xl mt-3">
                  {
                    "\n          Explore our sterile robotic operating theaters, calming natural recovery wards, and rapid imaging facilities built for round-the-clock care.\n        "
                  }
                </p>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-12 gap-6">
                <div className="md:col-span-3 lg:col-span-7 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-md relative group h-[380px]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Futuristic robotic surgical operating room with high-precision Da Vinci robotic arms, sterile teal lighting, medical monitors showing 4K endoscopic views, immaculate clinical environment."
                    src="/medico/stitch/page-image-07.png"
                    alt="Futuristic robotic surgical operating room with high-precision Da Vinci robotic arms, sterile teal lighting, medical monitors showing 4K endoscopic views, immaculate clinical environment."
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-inverse-on-surface">
                    <div className="inline-block bg-primary px-3 py-1 rounded-full text-label-sm font-label-sm text-on-primary mb-2">
                      {"\n              Surgical Excellence\n            "}
                    </div>
                    <h3 className="font-headline-md text-headline-md text-inverse-on-surface">
                      {"Advanced Robotic Surgical Suites"}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-tertiary-container mt-1 max-w-lg">
                      {
                        "\n              Equipped with ultra-sterile HEPA laminar airflow and 4K real-time endoscopic micro-manipulation systems.\n            "
                      }
                    </p>
                  </div>
                </div>

                <div className="md:col-span-3 lg:col-span-5 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-md relative group h-[380px]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Emergency trauma resuscitation bay with specialized crash carts, digital vitals cardiac telemetry displays, brightly lit high-urgency medical bay in state-of-the-art facility."
                    src="/medico/stitch/page-image-08.png"
                    alt="Emergency trauma resuscitation bay with specialized crash carts, digital vitals cardiac telemetry displays, brightly lit high-urgency medical bay in state-of-the-art facility."
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/80 via-on-background/20 to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-inverse-on-surface">
                    <div className="inline-block bg-error px-3 py-1 rounded-full text-label-sm font-label-sm text-on-error mb-2">
                      {"\n              24/7 Immediate Triage\n            "}
                    </div>
                    <h3 className="font-headline-md text-headline-md text-inverse-on-surface">
                      {"Level 1 Trauma Center"}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-tertiary-container mt-1">
                      {
                        "\n              Immediate response bay staffed around the clock with rapid surgical intervention readiness.\n            "
                      }
                    </p>
                  </div>
                </div>

                <div className="md:col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-md relative group h-[340px]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Peaceful private hospital inpatient healing suite with comfortable ergonomic bed, natural circadian warm wooden accents, large window looking out onto landscaped medical garden."
                    src="/medico/stitch/page-image-09.png"
                    alt="Peaceful private hospital inpatient healing suite with comfortable ergonomic bed, natural circadian warm wooden accents, large window looking out onto landscaped medical garden."
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-inverse-on-surface">
                    <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface">
                      {"Private Patient Suites"}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-tertiary-container mt-1">
                      {
                        "\n              Circadian lighting, acoustic dampening, and relaxing botanical healing gardens.\n            "
                      }
                    </p>
                  </div>
                </div>

                <div className="md:col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-md relative group h-[340px]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Modern 3T high-resolution MRI scanner in a soothing clinical suite with soft ambient blue cove lighting and cloud ceiling panels to calm patient anxiety."
                    src="/medico/stitch/page-image-10.png"
                    alt="Modern 3T high-resolution MRI scanner in a soothing clinical suite with soft ambient blue cove lighting and cloud ceiling panels to calm patient anxiety."
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-inverse-on-surface">
                    <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface">
                      {"Diagnostic 3T MRI Pavilion"}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-tertiary-container mt-1">
                      {
                        "\n              Silent scan technology providing instantaneous sub-millimeter radiologic precision.\n            "
                      }
                    </p>
                  </div>
                </div>

                <div className="md:col-span-1 lg:col-span-4 bg-surface-container-lowest rounded-3xl overflow-hidden shadow-md relative group h-[340px]">
                  <img
                    className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-700"
                    data-alt="Colorful welcoming pediatric recovery playroom in modern children's ward with soft furnishings, interactive learning games, bright teal and pastel soothing walls."
                    src="/medico/stitch/page-image-11.png"
                    alt="Colorful welcoming pediatric recovery playroom in modern children's ward with soft furnishings, interactive learning games, bright teal and pastel soothing walls."
                    loading="lazy"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-on-background/85 via-transparent to-transparent"></div>
                  <div className="absolute bottom-6 left-6 right-6 text-inverse-on-surface">
                    <h4 className="font-headline-sm text-headline-sm text-inverse-on-surface">
                      {"Pediatric Recovery Haven"}
                    </h4>
                    <p className="font-body-sm text-body-sm text-on-tertiary-container mt-1">
                      {
                        "\n              Warm, playful environments crafted specifically to accelerate pediatric healing and morale.\n            "
                      }
                    </p>
                  </div>
                </div>
              </div>
            </div>
          </section>

          <section className="py-16 bg-surface">
            <div className="max-w-[1440px] mx-auto px-margin">
              <div className="relative bg-primary text-on-primary rounded-3xl p-8 md:p-14 overflow-hidden shadow-xl">
                <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-fixed/20 blur-3xl pointer-events-none"></div>
                <div className="absolute top-0 right-1/3 w-60 h-60 rounded-full bg-secondary-container/20 blur-2xl pointer-events-none"></div>
                <div className="relative z-10 flex flex-col lg:flex-row items-center justify-between gap-8">
                  <div className="max-w-2xl text-center lg:text-left">
                    <span className="inline-block bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm uppercase tracking-wider px-3.5 py-1 rounded-full mb-4 font-semibold">
                      {
                        "\n              JOIN OUR HEALING COMMUNITY\n            "
                      }
                    </span>
                    <h2 className="font-headline-xl text-headline-xl text-on-primary tracking-tight">
                      {
                        "\n              Experience World-Class Care With Medico\n            "
                      }
                    </h2>
                    <p className="font-body-md text-body-md text-on-primary-container mt-3">
                      {
                        "\n              Whether you are scheduling a specialized routine screening or require immediate second opinions from our senior clinical department chairs, our staff is at your service.\n            "
                      }
                    </p>
                  </div>

                  <div className="flex flex-col sm:flex-row items-center gap-4 shrink-0">
                    <a
                      className="inline-flex items-center gap-2 bg-primary-fixed text-on-primary-fixed font-label-lg text-label-lg px-6 py-3.5 rounded-full shadow-md hover:bg-surface-container-lowest transition-all"
                      href="?action=booking"
                      data-action="booking"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {"calendar_today"}
                      </span>
                      <span>{"Schedule Consultation"}</span>
                    </a>
                    <a
                      className="inline-flex items-center gap-2 bg-surface-container-lowest/15 backdrop-blur-md text-on-primary font-label-lg text-label-lg px-6 py-3.5 rounded-full hover:bg-surface-container-lowest/25 transition-all"
                      href="?action=call"
                      data-action="call"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {"call"}
                      </span>
                      <span>{"(800) 845-3342"}</span>
                    </a>
                  </div>
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
