/* Generated from the supplied Stitch export; do not redesign this markup. */
/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
export function StitchMarkup({
  view = "home",
}: {
  view?: "home" | "services" | "departments" | "doctors";
}) {
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
              aria-current={view === "home" ? "page" : undefined}
              className={
                view === "home"
                  ? "transition-colors py-1 text-primary font-semibold border-b-2 border-primary pb-1"
                  : "font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              }
              data-path="home"
              href="/"
            >
              {"Home"}
            </a>
            <a
              aria-current={view === "services" ? "page" : undefined}
              className={
                view === "services"
                  ? "transition-colors py-1 text-primary font-semibold border-b-2 border-primary pb-1"
                  : "font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              }
              data-path="services"
              href="/services"
            >
              {"Services"}
            </a>
            <a
              aria-current={view === "doctors" ? "page" : undefined}
              className={
                view === "doctors"
                  ? "transition-colors py-1 text-primary font-semibold border-b-2 border-primary pb-1"
                  : "font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              }
              data-path="doctors"
              href="/doctors"
            >
              {"Doctors"}
            </a>
            <a
              aria-current={view === "departments" ? "page" : undefined}
              className={
                view === "departments"
                  ? "transition-colors py-1 text-primary font-semibold border-b-2 border-primary pb-1"
                  : "font-label-lg text-label-lg text-on-surface-variant hover:text-primary transition-colors py-1"
              }
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
          {view === "home" && (
            <section
              className="relative bg-primary text-on-primary overflow-hidden pt-space-xl pb-32"
              data-section="1"
            >
              <div className="absolute -top-32 -left-32 w-96 h-96 bg-primary-fixed/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="absolute top-1/2 right-0 w-[500px] h-[500px] bg-secondary/10 rounded-full blur-3xl pointer-events-none"></div>
              <div className="max-w-[1440px] mx-auto px-margin relative z-10">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                  <div className="lg:col-span-7 flex flex-col items-start gap-space-md">
                    <div className="inline-flex items-center gap-space-xs px-4 py-1.5 rounded-full bg-secondary-container text-on-secondary shadow-md transform -rotate-1 hover:rotate-0 transition-transform">
                      <span className="material-symbols-outlined text-[18px]">
                        {"verified"}
                      </span>
                      <span className="font-label-lg text-label-lg tracking-wide uppercase">
                        {"Top Rated Healthcare Network 2025"}
                      </span>
                    </div>

                    <h1 className="font-headline-xl text-headline-xl lg:text-[56px] lg:leading-[64px] text-surface-container-lowest font-semibold tracking-tight max-w-2xl">
                      {
                        "\n            Discover the Comprehensive Care You Deserve.\n          "
                      }
                    </h1>

                    <p className="font-body-lg text-body-lg text-on-primary-container max-w-xl leading-relaxed">
                      {
                        "\n            A unified clinical ecosystem for you and your family in one modern location. From preventive health screenings to complex specialist surgeries, our board-certified clinical staff is here 24/7.\n          "
                      }
                    </p>

                    <div className="flex flex-wrap items-center gap-space-md pt-space-sm">
                      <a
                        className="inline-flex items-center gap-space-sm bg-surface-container-lowest text-primary font-label-lg text-label-lg px-7 py-3.5 rounded-full shadow-lg hover:bg-surface-container-low transition-all active:translate-y-0.5 group"
                        href="?action=booking"
                        data-action="booking"
                      >
                        <span>{"Book an Appointment"}</span>
                        <span className="material-symbols-outlined text-[20px] group-hover:translate-x-1 transition-transform">
                          {"arrow_forward"}
                        </span>
                      </a>
                      <button
                        className="inline-flex items-center gap-space-sm bg-primary-container/60 hover:bg-primary-container text-on-primary font-label-lg text-label-lg px-6 py-3.5 rounded-full transition-all"
                        type="button"
                        data-action="tour"
                      >
                        <span className="w-7 h-7 rounded-full bg-surface-container-lowest/20 flex items-center justify-center">
                          <span className="material-symbols-outlined text-[18px]">
                            {"play_arrow"}
                          </span>
                        </span>
                        <span>{"Watch Video (2 min)"}</span>
                      </button>
                    </div>

                    <div className="flex items-center gap-space-lg pt-space-md">
                      <div className="flex -space-x-3">
                        <img
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
                          data-alt="Portrait of smiling female medical patient with healthy glow in soft natural lighting"
                          src="/medico/stitch/image-01.png"
                          alt="Portrait of smiling female medical patient with healthy glow in soft natural lighting"
                        />
                        <img
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
                          data-alt="Portrait of middle aged male patient smiling confidently after cardiac consultation"
                          src="/medico/stitch/image-02.png"
                          alt="Portrait of middle aged male patient smiling confidently after cardiac consultation"
                        />
                        <img
                          className="w-10 h-10 rounded-full object-cover ring-2 ring-primary"
                          data-alt="Portrait of senior female patient smiling pleasantly with clean white background"
                          src="/medico/stitch/image-03.png"
                          alt="Portrait of senior female patient smiling pleasantly with clean white background"
                        />
                        <div className="w-10 h-10 rounded-full bg-secondary text-on-secondary font-label-md text-label-md flex items-center justify-center font-bold ring-2 ring-primary">
                          {"\n                +100k\n              "}
                        </div>
                      </div>
                      <div className="flex flex-col">
                        <div className="flex items-center gap-1 text-tertiary-fixed">
                          <span
                            className="material-symbols-outlined text-[16px] text-amber-300 fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {"star"}
                          </span>
                          <span
                            className="material-symbols-outlined text-[16px] text-amber-300 fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {"star"}
                          </span>
                          <span
                            className="material-symbols-outlined text-[16px] text-amber-300 fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {"star"}
                          </span>
                          <span
                            className="material-symbols-outlined text-[16px] text-amber-300 fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {"star"}
                          </span>
                          <span
                            className="material-symbols-outlined text-[16px] text-amber-300 fill-current"
                            style={{ fontVariationSettings: "'FILL' 1" }}
                          >
                            {"star"}
                          </span>
                          <span className="font-label-lg text-label-lg font-bold text-surface-container-lowest ml-1">
                            {"4.9/5"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-on-primary-container">
                          {"From over 18,400+ verified clinical reviews"}
                        </span>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-5 relative flex items-center justify-center">
                    <div className="relative w-full max-w-[460px] h-[520px] rounded-[3rem] overflow-hidden shadow-2xl bg-surface-container-high/20 backdrop-blur-sm">
                      <img
                        alt="Medico chief physicians and clinical staff"
                        className="w-full h-full object-cover object-top"
                        src="/medico/stitch/image-04.png"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-primary/60 via-transparent to-transparent"></div>
                    </div>

                    <div className="absolute top-6 -left-6 bg-secondary-container text-on-secondary px-4 py-2 rounded-2xl shadow-xl flex items-center gap-2 transform -rotate-3 hover:rotate-0 transition-transform">
                      <span className="material-symbols-outlined text-[20px]">
                        {"medical_services"}
                      </span>
                      <span className="font-label-lg text-label-lg font-bold">
                        {"#1 Doctor Network"}
                      </span>
                    </div>

                    <div className="absolute -bottom-6 right-2 sm:-right-4 bg-surface-container-lowest/95 backdrop-blur-md text-on-surface px-5 py-3.5 rounded-2xl shadow-2xl flex items-center gap-3">
                      <div className="relative flex items-center justify-center">
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 animate-ping absolute"></span>
                        <span className="w-3.5 h-3.5 rounded-full bg-emerald-500 relative"></span>
                      </div>
                      <div>
                        <div className="font-label-sm text-label-sm text-on-surface-variant font-medium uppercase tracking-wider">
                          {"Emergency Dispatch"}
                        </div>
                        <div className="font-headline-sm text-headline-sm font-bold text-primary">
                          {"Avg. Triage < 8 Mins"}
                        </div>
                      </div>
                    </div>

                    <div className="absolute -top-4 -right-4 w-28 h-28 hidden sm:flex items-center justify-center">
                      <svg
                        className="w-full h-full animate-[spin_18s_linear_infinite]"
                        viewBox="0 0 100 100"
                      >
                        <path
                          d="M 50, 50 m -36, 0 a 36,36 0 1,1 72,0 a 36,36 0 1,1 -72,0"
                          fill="none"
                          id="circlePath"
                          stroke="none"
                        ></path>
                        <text className="text-[9.5px] uppercase font-bold tracking-[2px] fill-primary-fixed">
                          <textPath href="#circlePath">
                            {"★ QUALITY HEALTHCARE ★ MEDICO 24/7"}
                          </textPath>
                        </text>
                      </svg>
                      <div className="absolute w-10 h-10 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center shadow-md">
                        <span className="material-symbols-outlined text-[20px]">
                          {"local_hospital"}
                        </span>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              <div className="absolute bottom-0 left-0 right-0 w-full overflow-hidden leading-none pointer-events-none">
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
          )}
          {view === "home" && (
            <section
              className="relative -mt-10 z-20 max-w-[1440px] mx-auto px-margin w-full"
              data-section="2"
            >
              <div className="bg-surface-container-lowest rounded-2xl shadow-xl px-space-lg py-space-md grid grid-cols-2 lg:grid-cols-4 gap-space-lg">
                <div className="flex flex-col items-center text-center p-space-sm">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold">
                    {"25,000+"}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                    {"Patients Treated"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {"Gold-standard outpatient care"}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-space-sm">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold">
                    {"150+"}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                    {"Specialist Doctors"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {"Board-certified clinical leads"}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-space-sm">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold">
                    {"30+"}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                    {"Clinical Departments"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {"Comprehensive multi-specialty"}
                  </span>
                </div>
                <div className="flex flex-col items-center text-center p-space-sm">
                  <span className="font-headline-xl text-headline-xl text-primary font-bold">
                    {"15+"}
                  </span>
                  <span className="font-headline-sm text-headline-sm text-on-surface font-semibold mt-1">
                    {"Years Experience"}
                  </span>
                  <span className="font-body-sm text-body-sm text-on-surface-variant mt-0.5">
                    {"JCI & HIPAA accredited service"}
                  </span>
                </div>
              </div>
            </section>
          )}
          {(view === "home" || view === "services") && (
            <section className="w-full py-space-xl bg-surface" data-section="3">
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                  <div>
                    <span className="inline-block px-3 py-1 bg-inverse-surface text-inverse-on-surface rounded font-label-md text-label-md uppercase tracking-wider mb-2 transform -rotate-1">
                      {"\n            Our Services\n          "}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                      {
                        "\n            Personalized Healthcare Tailored To You\n          "
                      }
                    </h2>
                  </div>

                  <div className="flex items-center gap-space-xs self-start md:self-auto">
                    <button
                      aria-label="Previous service"
                      className="w-11 h-11 rounded-full bg-surface-container-highest text-on-surface flex items-center justify-center hover:bg-surface-dim transition-colors"
                      type="button"
                      data-action="service-slide"
                      data-value="-1"
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {"chevron_left"}
                      </span>
                    </button>
                    <button
                      aria-label="Next service"
                      className="w-11 h-11 rounded-full bg-primary text-on-primary flex items-center justify-center hover:bg-tertiary transition-colors shadow-sm"
                      type="button"
                      data-action="service-slide"
                      data-value="1"
                    >
                      <span className="material-symbols-outlined text-[22px]">
                        {"chevron_right"}
                      </span>
                    </button>
                  </div>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-3 gap-space-lg"
                  data-services="true"
                >
                  <div
                    className="relative bg-primary text-on-primary rounded-2xl p-space-lg flex flex-col justify-between shadow-lg overflow-hidden group min-h-[380px]"
                    data-service-card="0"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-primary-container rounded-bl-[3rem] -z-0"></div>
                    <div className="relative z-10 flex flex-col gap-space-md">
                      <div className="w-14 h-14 rounded-xl bg-surface-container-lowest/15 flex items-center justify-center text-primary-fixed">
                        <span className="material-symbols-outlined text-[32px]">
                          {"calendar_month"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-surface-container-lowest font-semibold mb-2">
                          {"Make an Appointment"}
                        </h3>
                        <p className="font-body-md text-body-md text-on-primary-container leading-relaxed">
                          {
                            "\n                Fast and intuitive doctor scheduling. Filter by specific symptoms, availability, or clinical department with instant digital confirmation.\n              "
                          }
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 pt-space-lg flex items-center justify-between">
                      <a
                        className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary-fixed font-semibold hover:text-surface-container-lowest transition-colors"
                        href="?action=booking"
                        data-action="booking"
                      >
                        <span>{"Book Priority Slot"}</span>
                        <span className="material-symbols-outlined text-[18px]">
                          {"arrow_forward"}
                        </span>
                      </a>
                      <div className="flex items-center gap-1">
                        <button
                          aria-label="Bookmark service"
                          className="w-9 h-9 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 flex items-center justify-center text-on-primary transition-colors"
                          data-action="toggle"
                          data-value="Bookmark service"
                          type="button"
                          aria-pressed="false"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"bookmark"}
                          </span>
                        </button>
                        <button
                          aria-label="Favorite service"
                          className="w-9 h-9 rounded-full bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 flex items-center justify-center text-on-primary transition-colors"
                          data-action="toggle"
                          data-value="Favorite service"
                          type="button"
                          aria-pressed="false"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"favorite"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative bg-surface-container-lowest text-on-surface rounded-2xl p-space-lg flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow group min-h-[380px]"
                    data-service-card="1"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container-low rounded-bl-[3rem] -z-0"></div>
                    <div className="relative z-10 flex flex-col gap-space-md">
                      <div className="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center text-primary">
                        <span className="material-symbols-outlined text-[32px]">
                          {"local_pharmacy"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-2">
                          {"Online Pharmacy"}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {
                            "\n                Direct digital prescription fulfillment with door delivery under 2 hours. Real-time batch tracing and 100% genuine guaranteed medicines.\n              "
                          }
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 pt-space-lg flex items-center justify-between">
                      <a
                        className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary font-semibold hover:text-tertiary transition-colors"
                        href="?action=pharmacy"
                        data-action="pharmacy"
                      >
                        <span>{"Order Medications"}</span>
                        <span className="material-symbols-outlined text-[18px]">
                          {"arrow_forward"}
                        </span>
                      </a>
                      <div className="flex items-center gap-1">
                        <button
                          aria-label="Save prescription"
                          className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors"
                          data-action="toggle"
                          data-value="Save prescription"
                          type="button"
                          aria-pressed="false"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"bookmark"}
                          </span>
                        </button>
                        <button
                          aria-label="Favorite medicine list"
                          className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-primary transition-colors"
                          data-action="toggle"
                          data-value="Favorite medicine list"
                          type="button"
                          aria-pressed="false"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"favorite"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="relative bg-surface-container-lowest text-on-surface rounded-2xl p-space-lg flex flex-col justify-between shadow-md hover:shadow-xl transition-shadow group min-h-[380px]"
                    data-service-card="2"
                  >
                    <div className="absolute top-0 right-0 w-24 h-24 bg-surface-container-low rounded-bl-[3rem] -z-0"></div>
                    <div className="relative z-10 flex flex-col gap-space-md">
                      <div className="w-14 h-14 rounded-xl bg-surface-container-low flex items-center justify-center text-secondary">
                        <span className="material-symbols-outlined text-[32px]">
                          {"groups_3"}
                        </span>
                      </div>
                      <div>
                        <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mb-2">
                          {"Doctor's Community"}
                        </h3>
                        <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                          {
                            "\n                Multi-disciplinary tumor boards and peer second opinions. Connect with cross-institutional medical experts for complex case consultations.\n              "
                          }
                        </p>
                      </div>
                    </div>
                    <div className="relative z-10 pt-space-lg flex items-center justify-between">
                      <a
                        className="inline-flex items-center gap-2 font-label-lg text-label-lg text-secondary font-semibold hover:text-on-secondary-fixed-variant transition-colors"
                        href="/signup?type=doctor"
                      >
                        <span>{"Join Medical Network"}</span>
                        <span className="material-symbols-outlined text-[18px]">
                          {"arrow_forward"}
                        </span>
                      </a>
                      <div className="flex items-center gap-1">
                        <button
                          aria-label="Bookmark network"
                          className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-secondary transition-colors"
                          data-action="toggle"
                          data-value="Bookmark network"
                          type="button"
                          aria-pressed="false"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"bookmark"}
                          </span>
                        </button>
                        <button
                          aria-label="Favorite community"
                          className="w-9 h-9 rounded-full bg-surface-container-low hover:bg-surface-container flex items-center justify-center text-secondary transition-colors"
                          data-action="toggle"
                          data-value="Favorite community"
                          type="button"
                          aria-pressed="false"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"favorite"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {(view === "home" || view === "departments") && (
            <section
              className="w-full py-space-xl bg-surface-container-lowest"
              data-section="4"
            >
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                  <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-widest">
                    {"Centers of Excellence"}
                  </span>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold mt-1">
                    {"Multi-Specialty Clinical Departments"}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    {
                      "\n          From cutting-edge diagnostic suites to minimally invasive surgical intervention, our departments set industry standards.\n        "
                    }
                  </p>
                </div>
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-md">
                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"cardiology"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"Cardiology & Vascular"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Complete cardiovascular interventions, 4D echocardiograms, and preventive heart panels.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=0"
                      data-action="department"
                      data-value="0"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"psychology"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"Neurology & Brain"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Specialized diagnostics for neurodegenerative conditions, epilepsy, and brain trauma.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=1"
                      data-action="department"
                      data-value="1"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"child_care"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"Pediatrics & Neonatal"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Compassionate child wellness, routine immunizations, and round-the-clock neonatal ICU.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=2"
                      data-action="department"
                      data-value="2"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"accessibility_new"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"Orthopedics & Sports"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Robotic joint reconstruction, spinal therapy, and athletic rehabilitation programs.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=3"
                      data-action="department"
                      data-value="3"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"dentistry"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"Dental Surgery"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Implants, maxillofacial reconstructive surgery, and cosmetic preventive dentistry.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=4"
                      data-action="department"
                      data-value="4"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"visibility"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"Eye Care & Lasik"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Refractive surgery, corneal transplantation, and advanced diabetic retinopathy monitoring.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=5"
                      data-action="department"
                      data-value="5"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"pregnant_woman"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"Maternal & OB/GYN"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Holistic pregnancy management, fertility consultations, and high-risk obstetric monitoring.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-primary font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=6"
                      data-action="department"
                      data-value="6"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-md flex flex-col justify-between hover:bg-surface-container transition-all group">
                    <div>
                      <div className="w-12 h-12 rounded-xl bg-error text-on-error flex items-center justify-center mb-space-sm group-hover:scale-110 transition-transform">
                        <span className="material-symbols-outlined text-[26px]">
                          {"e911_emergency"}
                        </span>
                      </div>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                        {"24/7 Level 1 Trauma"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed mb-space-md">
                        {
                          "\n              Fully equipped acute resuscitation bays with immediate helicopter helipad access.\n            "
                        }
                      </p>
                    </div>
                    <a
                      className="inline-flex items-center gap-1 font-label-md text-label-md text-error font-bold group-hover:translate-x-1 transition-transform"
                      href="?action=department&item=7"
                      data-action="department"
                      data-value="7"
                    >
                      <span>{"Explore Dept"}</span>
                      <span className="material-symbols-outlined text-[16px]">
                        {"arrow_forward"}
                      </span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section className="w-full py-space-xl bg-surface" data-section="5">
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                  <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                    {"Hassle-Free Care"}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1">
                    {"Four Steps to Your Consultation"}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    {
                      "\n          Secure, streamlined patient on-boarding designed to get you with the best provider in seconds.\n        "
                    }
                  </p>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-4 gap-space-lg relative">
                  <div className="hidden md:block absolute top-12 left-16 right-16 h-1 bg-surface-container-highest -z-0"></div>

                  <div className="relative z-10 flex flex-col items-center text-center bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold mb-space-sm ring-8 ring-surface">
                      {"\n            01\n          "}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                      {"Choose Specialist"}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {
                        "\n            Select by specialty, physician credentials, language spoken, or insurance network.\n          "
                      }
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold mb-space-sm ring-8 ring-surface">
                      {"\n            02\n          "}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                      {"Pick Date & Time"}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {
                        "\n            Review real-time calendar availability with direct slot reservation.\n          "
                      }
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-primary text-on-primary flex items-center justify-center font-headline-sm text-headline-sm font-bold mb-space-sm ring-8 ring-surface">
                      {"\n            03\n          "}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                      {"Enter Patient Info"}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {
                        "\n            Quick 60-second medical intake form with automated insurance policy verification.\n          "
                      }
                    </p>
                  </div>

                  <div className="relative z-10 flex flex-col items-center text-center bg-surface-container-lowest p-space-md rounded-2xl shadow-sm">
                    <div className="w-14 h-14 rounded-full bg-secondary text-on-secondary flex items-center justify-center font-headline-sm text-headline-sm font-bold mb-space-sm ring-8 ring-surface">
                      {"\n            04\n          "}
                    </div>
                    <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold mb-1">
                      {"Instant Pass"}
                    </h3>
                    <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                      {
                        "\n            Immediate confirmation via SMS, digital calendar invite, and QR check-in pass.\n          "
                      }
                    </p>
                  </div>
                </div>
              </div>
            </section>
          )}
          {(view === "home" || view === "doctors") && (
            <section
              className="w-full py-space-xl bg-surface-container-lowest"
              data-section="6"
            >
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                  <div>
                    <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                      {"World-Class Clinicians"}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1">
                      {"All the Top Doctors in One Place"}
                    </h2>
                  </div>

                  <div
                    className="flex flex-wrap items-center gap-space-xs"
                    id="doctor-filters"
                  >
                    <button
                      className="px-4 py-2 rounded-full font-label-md text-label-md bg-primary text-on-primary font-semibold transition-colors"
                      data-action="filter"
                      data-value="All Specialists"
                      type="button"
                      aria-pressed="true"
                    >
                      {"All Specialists"}
                    </button>
                    <button
                      className="px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
                      data-action="filter"
                      data-value="Cardiology"
                      type="button"
                      aria-pressed="false"
                    >
                      {"Cardiology"}
                    </button>
                    <button
                      className="px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
                      data-action="filter"
                      data-value="Neurology"
                      type="button"
                      aria-pressed="false"
                    >
                      {"Neurology"}
                    </button>
                    <button
                      className="px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
                      data-action="filter"
                      data-value="Pediatrics"
                      type="button"
                      aria-pressed="false"
                    >
                      {"Pediatrics"}
                    </button>
                    <button
                      className="px-4 py-2 rounded-full font-label-md text-label-md bg-surface-container-low text-on-surface-variant hover:bg-surface-container transition-colors"
                      data-action="filter"
                      data-value="Surgery"
                      type="button"
                      aria-pressed="false"
                    >
                      {"Surgery"}
                    </button>
                  </div>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-space-lg">
                  <div
                    className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                    data-doctor-card="0"
                    data-specialty="Cardiology"
                  >
                    <div className="relative h-64 w-full bg-surface-dim">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Portrait of senior male cardiologist Dr Marcus Vance wearing white clinical coat and stethoscope in modern clinical office"
                        src="/medico/stitch/image-05.png"
                        alt="Portrait of senior male cardiologist Dr Marcus Vance wearing white clinical coat and stethoscope in modern clinical office"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[14px] text-amber-500 fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        {" 4.9 (380)\n            "}
                      </span>
                    </div>
                    <div className="p-space-md flex flex-col flex-grow justify-between gap-space-md">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold tracking-wider">
                          {"Cardiology Lead"}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {"Dr. Marcus Vance, MD"}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {"18 Years Experience • Harvard Med"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          className="flex-1 py-2 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-tertiary transition-colors"
                          data-action="booking"
                          data-value="0"
                          type="button"
                        >
                          {"\n                Book Visit\n              "}
                        </button>
                        <button
                          aria-label="Call Doctor"
                          className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-dim text-on-surface flex items-center justify-center transition-colors"
                          data-action="call"
                          data-value="0"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"call"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                    data-doctor-card="1"
                    data-specialty="Pediatrics"
                  >
                    <div className="relative h-64 w-full bg-surface-dim">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Warm smiling female pediatrician Dr Elena Rostova holding clipboard in brightly lit pediatric clinic"
                        src="/medico/stitch/image-06.png"
                        alt="Warm smiling female pediatrician Dr Elena Rostova holding clipboard in brightly lit pediatric clinic"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[14px] text-amber-500 fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        {" 5.0 (420)\n            "}
                      </span>
                    </div>
                    <div className="p-space-md flex flex-col flex-grow justify-between gap-space-md">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold tracking-wider">
                          {"Pediatric Medicine"}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {"Dr. Elena Rostova, MD"}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {"12 Years Experience • Johns Hopkins"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          className="flex-1 py-2 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-tertiary transition-colors"
                          data-action="booking"
                          data-value="1"
                          type="button"
                        >
                          {"\n                Book Visit\n              "}
                        </button>
                        <button
                          aria-label="Call Doctor"
                          className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-dim text-on-surface flex items-center justify-center transition-colors"
                          data-action="call"
                          data-value="1"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"call"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                    data-doctor-card="2"
                    data-specialty="Neurology"
                  >
                    <div className="relative h-64 w-full bg-surface-dim">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Professional Asian male neurologist Dr David Chen reviewing MRI brain scans on high tech monitor"
                        src="/medico/stitch/image-07.png"
                        alt="Professional Asian male neurologist Dr David Chen reviewing MRI brain scans on high tech monitor"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[14px] text-amber-500 fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        {" 4.9 (290)\n            "}
                      </span>
                    </div>
                    <div className="p-space-md flex flex-col flex-grow justify-between gap-space-md">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold tracking-wider">
                          {"Neurology Dept"}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {"Dr. David Chen, MD, PhD"}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {"16 Years Experience • Stanford Health"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          className="flex-1 py-2 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-tertiary transition-colors"
                          data-action="booking"
                          data-value="2"
                          type="button"
                        >
                          {"\n                Book Visit\n              "}
                        </button>
                        <button
                          aria-label="Call Doctor"
                          className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-dim text-on-surface flex items-center justify-center transition-colors"
                          data-action="call"
                          data-value="2"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"call"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-low rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-all flex flex-col"
                    data-doctor-card="3"
                    data-specialty="Surgery"
                  >
                    <div className="relative h-64 w-full bg-surface-dim">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Female orthopedic surgeon Dr Sarah Jenkins in surgical scrubs smiling confidently with modern clinic lighting"
                        src="/medico/stitch/image-08.png"
                        alt="Female orthopedic surgeon Dr Sarah Jenkins in surgical scrubs smiling confidently with modern clinic lighting"
                        loading="lazy"
                      />
                      <span className="absolute top-3 right-3 bg-surface-container-lowest/90 backdrop-blur-md px-2.5 py-1 rounded-full font-label-sm text-label-sm text-primary font-bold flex items-center gap-1">
                        <span
                          className="material-symbols-outlined text-[14px] text-amber-500 fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        {" 4.8 (310)\n            "}
                      </span>
                    </div>
                    <div className="p-space-md flex flex-col flex-grow justify-between gap-space-md">
                      <div>
                        <span className="font-label-sm text-label-sm uppercase text-primary font-bold tracking-wider">
                          {"Orthopedic Surgery"}
                        </span>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold">
                          {"Dr. Sarah Jenkins, FACS"}
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-1">
                          {"14 Years Experience • Mayo Clinic"}
                        </p>
                      </div>
                      <div className="flex items-center gap-2 pt-2">
                        <button
                          className="flex-1 py-2 px-3 rounded-full bg-primary text-on-primary font-label-sm text-label-sm font-semibold hover:bg-tertiary transition-colors"
                          data-action="booking"
                          data-value="3"
                          type="button"
                        >
                          {"\n                Book Visit\n              "}
                        </button>
                        <button
                          aria-label="Call Doctor"
                          className="w-9 h-9 rounded-full bg-surface-container hover:bg-surface-dim text-on-surface flex items-center justify-center transition-colors"
                          data-action="call"
                          data-value="3"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"call"}
                          </span>
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section className="w-full py-space-xl bg-surface" data-section="7">
              <div className="max-w-[1440px] mx-auto px-margin">
                <div className="grid grid-cols-1 lg:grid-cols-12 gap-space-xl items-center">
                  <div className="lg:col-span-6 flex flex-col gap-space-md">
                    <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                      {"Telehealth & Connected Care"}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                      {
                        "\n            Seamless Care with Direct Doctor Messaging\n          "
                      }
                    </h2>
                    <p className="font-body-md text-body-md text-on-surface-variant leading-relaxed">
                      {
                        "\n            Never wait in uncertainty. Communicate instantly with your primary care provider or specialist through end-to-end encrypted telehealth channels.\n          "
                      }
                    </p>
                    <div className="flex flex-col gap-space-sm pt-2">
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[16px] font-bold">
                            {"check"}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface text-[17px] font-semibold">
                            {"24/7 Secure Medical Messaging"}
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {
                              "Send questions, log vitals, or update your treatment plan at any hour."
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[16px] font-bold">
                            {"check"}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface text-[17px] font-semibold">
                            {"Instant Prescription Refills"}
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {
                              "Physicians can renew essential medications directly to your preferred pharmacy."
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[16px] font-bold">
                            {"check"}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface text-[17px] font-semibold">
                            {"Rapid Lab Explanations"}
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {
                              "Get plain-language breakdowns of blood tests and radiology scans within hours."
                            }
                          </p>
                        </div>
                      </div>
                      <div className="flex items-start gap-3">
                        <div className="w-6 h-6 rounded-full bg-primary-fixed text-primary flex items-center justify-center flex-shrink-0 mt-0.5">
                          <span className="material-symbols-outlined text-[16px] font-bold">
                            {"check"}
                          </span>
                        </div>
                        <div>
                          <h4 className="font-headline-sm text-headline-sm text-on-surface text-[17px] font-semibold">
                            {"HIPAA-Compliant & Encrypted"}
                          </h4>
                          <p className="font-body-sm text-body-sm text-on-surface-variant">
                            {
                              "Bank-level 256-bit encryption protects all records, images, and communications."
                            }
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="lg:col-span-6 bg-surface-container-lowest rounded-2xl p-space-md shadow-xl border-none">
                    <div className="flex items-center justify-between pb-space-sm bg-surface-container-low p-space-sm rounded-xl mb-space-md">
                      <div className="flex items-center gap-3">
                        <div className="relative">
                          <img
                            className="w-11 h-11 rounded-full object-cover"
                            data-alt="Doctor Marcus Vance profile avatar"
                            src="/medico/stitch/image-09.png"
                            alt="Doctor Marcus Vance profile avatar"
                            loading="lazy"
                          />
                          <span className="w-3 h-3 bg-emerald-500 rounded-full absolute bottom-0 right-0 ring-2 ring-surface-container-low"></span>
                        </div>
                        <div>
                          <div className="font-headline-sm text-headline-sm text-[16px] text-on-surface font-bold">
                            {"Dr. Marcus Vance"}
                          </div>
                          <div className="font-label-sm text-label-sm text-primary font-medium">
                            {"Cardiology Lead • Active Now"}
                          </div>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          aria-label="Audio Call"
                          className="w-8 h-8 rounded-full bg-surface-container hover:bg-surface-dim flex items-center justify-center text-primary"
                          data-action="audio"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"call"}
                          </span>
                        </button>
                        <button
                          aria-label="Video Call"
                          className="w-8 h-8 rounded-full bg-primary text-on-primary flex items-center justify-center"
                          data-action="video"
                          type="button"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"videocam"}
                          </span>
                        </button>
                      </div>
                    </div>

                    <div
                      className="flex flex-col gap-space-sm py-2"
                      data-chat-body="true"
                      aria-live="polite"
                    >
                      <div className="flex items-end justify-end gap-2">
                        <div className="bg-primary text-on-primary rounded-2xl rounded-tr-none px-4 py-2.5 max-w-sm text-body-sm font-body-sm shadow-sm">
                          {
                            "\n                Hello Dr. Vance! I checked my morning BP reading and it was 118/76. Should I continue the same dosage of Lisinopril?\n                "
                          }
                          <div className="text-[10px] text-right mt-1 opacity-80 text-on-primary-container">
                            {"09:14 AM"}
                          </div>
                        </div>
                      </div>

                      <div className="flex items-start gap-2">
                        <div className="bg-surface-container-low text-on-surface rounded-2xl rounded-tl-none px-4 py-2.5 max-w-sm text-body-sm font-body-sm shadow-sm">
                          {
                            "\n                Good morning Emily! Those numbers look wonderful. Keep current dosage. I have attached your updated medication authorization note below.\n                "
                          }
                          <div className="text-[10px] text-on-surface-variant mt-1">
                            {"09:18 AM"}
                          </div>
                        </div>
                      </div>

                      <div className="ml-6 bg-surface-container-low rounded-xl p-3 flex items-center justify-between max-w-xs shadow-sm">
                        <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-lg bg-primary-container text-on-primary flex items-center justify-center">
                            <span className="material-symbols-outlined text-[20px]">
                              {"description"}
                            </span>
                          </div>
                          <div>
                            <div className="font-label-md text-label-md font-bold text-on-surface">
                              {"Rx_Prescription_Vance.pdf"}
                            </div>
                            <div className="font-label-sm text-label-sm text-on-surface-variant">
                              {"142 KB • Digital Signed"}
                            </div>
                          </div>
                        </div>
                        <button
                          className="w-8 h-8 rounded-full bg-primary-fixed text-on-primary-fixed flex items-center justify-center hover:bg-primary hover:text-on-primary transition-colors"
                          data-action="download"
                          type="button"
                          aria-label="Download sample attachment"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"download"}
                          </span>
                        </button>
                      </div>

                      <div className="bg-surface-container rounded-xl p-3 text-on-surface flex flex-col gap-2 mt-2">
                        <div className="flex items-center justify-between">
                          <span className="font-label-sm text-label-sm font-bold text-primary uppercase">
                            {"Upcoming Check-in"}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {"Tomorrow, 10:30 AM"}
                          </span>
                        </div>
                        <p className="font-body-sm text-body-sm text-on-surface">
                          {"30-minute Telehealth Review with Dr. Marcus Vance"}
                        </p>
                        <div className="flex items-center gap-2 pt-1">
                          <button
                            className="px-3 py-1 rounded bg-primary text-on-primary font-label-sm text-label-sm font-semibold"
                            data-action="confirm"
                            type="button"
                          >
                            {"Confirm Slot"}
                          </button>
                          <button
                            className="px-3 py-1 rounded bg-surface-container-high text-on-surface font-label-sm text-label-sm"
                            data-action="reschedule"
                            type="button"
                          >
                            {"Reschedule"}
                          </button>
                        </div>
                      </div>
                    </div>

                    <div className="flex items-center gap-2 pt-4">
                      <input
                        className="flex-grow h-10 px-4 rounded-full bg-surface-container-low text-on-surface font-body-sm text-body-sm focus:outline-none focus:ring-2 focus:ring-primary"
                        placeholder="Type a message or symptom description..."
                        type="text"
                        aria-label="Message"
                        maxLength={1000}
                        data-chat-input="true"
                      />
                      <button
                        aria-label="Send message"
                        className="w-10 h-10 rounded-full bg-primary text-on-primary flex items-center justify-center"
                        data-action="message"
                        type="button"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"send"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section
              className="w-full py-space-xl bg-surface-container-lowest"
              data-section="8"
            >
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col items-center text-center max-w-2xl mx-auto">
                  <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                    {"Transparent Care"}
                  </span>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold mt-1">
                    {"Preventive Health Packages"}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    {
                      "\n          Affordable, all-inclusive diagnostic screenings designed to catch conditions early and preserve lifelong vitality.\n        "
                    }
                  </p>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-3 gap-space-lg items-stretch">
                  <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold tracking-wider">
                        {"Essential Tier"}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">
                        {"Basic Wellness Checkup"}
                      </h3>
                      <div className="flex items-baseline gap-1 my-space-md">
                        <span className="font-headline-xl text-headline-xl font-bold text-on-surface">
                          {"$99"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {"/ individual assessment"}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface mb-space-lg">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Complete Blood Count (CBC) & Lipid Profile\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Fasting Blood Glucose & HbA1c Panel\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Vital Signs & BMI Biometrics Review\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                30-min General Physician Consultation\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2 text-on-surface-variant/60">
                          <span className="material-symbols-outlined text-[18px]">
                            {"cancel"}
                          </span>
                          {
                            "\n                Full Body Ultrasound & ECG\n              "
                          }
                        </li>
                      </ul>
                    </div>
                    <button
                      className="w-full py-3 rounded-full bg-surface-container text-primary hover:bg-surface-dim font-label-lg text-label-lg font-semibold transition-colors"
                      data-action="package"
                      data-value="0"
                      type="button"
                    >
                      {"\n            Select Package\n          "}
                    </button>
                  </div>

                  <div className="relative bg-primary text-on-primary rounded-2xl p-space-lg flex flex-col justify-between shadow-2xl transform lg:-translate-y-2">
                    <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 bg-secondary text-on-secondary px-4 py-1 rounded-full font-label-sm text-label-sm font-bold uppercase tracking-wider shadow-md">
                      {"\n            Most Popular\n          "}
                    </div>
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-primary-fixed font-bold tracking-wider">
                        {"Comprehensive Tier"}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-surface-container-lowest font-semibold mt-1">
                        {"Family Comprehensive"}
                      </h3>
                      <div className="flex items-baseline gap-1 my-space-md">
                        <span className="font-headline-xl text-headline-xl font-bold text-surface-container-lowest">
                          {"$249"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-primary-container">
                          {"/ family of 4 members"}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-primary-container mb-space-lg">
                        <li className="flex items-center gap-2 text-surface-container-lowest">
                          <span className="material-symbols-outlined text-[18px] text-primary-fixed">
                            {"check_circle"}
                          </span>
                          {
                            "\n                All Basic Wellness diagnostics included\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2 text-surface-container-lowest">
                          <span className="material-symbols-outlined text-[18px] text-primary-fixed">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Resting 12-Lead Electrocardiogram (ECG)\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2 text-surface-container-lowest">
                          <span className="material-symbols-outlined text-[18px] text-primary-fixed">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Complimentary Pediatric Growth Screen\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2 text-surface-container-lowest">
                          <span className="material-symbols-outlined text-[18px] text-primary-fixed">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Dental & Vision Preventive Screening\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2 text-surface-container-lowest">
                          <span className="material-symbols-outlined text-[18px] text-primary-fixed">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Dedicated Digital Family Health Locker\n              "
                          }
                        </li>
                      </ul>
                    </div>
                    <button
                      className="w-full py-3.5 rounded-full bg-surface-container-lowest text-primary hover:bg-surface-container-low font-label-lg text-label-lg font-bold shadow-lg transition-colors"
                      data-action="package"
                      data-value="1"
                      type="button"
                    >
                      {"\n            Book Family Package\n          "}
                    </button>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between shadow-sm">
                    <div>
                      <span className="font-label-sm text-label-sm uppercase text-on-surface-variant font-bold tracking-wider">
                        {"Advanced Care"}
                      </span>
                      <h3 className="font-headline-md text-headline-md text-on-surface font-semibold mt-1">
                        {"Executive & Senior Cardiac"}
                      </h3>
                      <div className="flex items-baseline gap-1 my-space-md">
                        <span className="font-headline-xl text-headline-xl font-bold text-on-surface">
                          {"$449"}
                        </span>
                        <span className="font-body-sm text-body-sm text-on-surface-variant">
                          {"/ premium assessment"}
                        </span>
                      </div>
                      <ul className="flex flex-col gap-3 font-body-sm text-body-sm text-on-surface mb-space-lg">
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Full Comprehensive Metabolic & Cardiac Panel\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Echocardiogram & Cardiac Stress Test\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Tumor Marker & Thyroid Ultrasound Panel\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                1-on-1 Chief Specialist Consultation\n              "
                          }
                        </li>
                        <li className="flex items-center gap-2">
                          <span className="material-symbols-outlined text-[18px] text-primary">
                            {"check_circle"}
                          </span>
                          {
                            "\n                Personalized 12-Month Longevity Protocol\n              "
                          }
                        </li>
                      </ul>
                    </div>
                    <button
                      className="w-full py-3 rounded-full bg-surface-container text-primary hover:bg-surface-dim font-label-lg text-label-lg font-semibold transition-colors"
                      data-action="package"
                      data-value="2"
                      type="button"
                    >
                      {"\n            Select Package\n          "}
                    </button>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section className="w-full py-space-xl bg-surface" data-section="9">
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                  <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                    {"The Medico Standard"}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1">
                    {"Why Families Entrust Us With Care"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-space-md">
                  <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {"biotech"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[18px] text-on-surface font-semibold mb-1">
                        {"Modern Diagnostic Lab"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {
                          "\n              Same-day automated molecular pathology results integrated directly into your mobile record.\n            "
                        }
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {"acute"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[18px] text-on-surface font-semibold mb-1">
                        {"24/7 Intensive Trauma Units"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {
                          "\n              Immediate resuscitation and board-certified ER surgeons ready on a moment's notice.\n            "
                        }
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {"sentiment_very_satisfied"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[18px] text-on-surface font-semibold mb-1">
                        {"99.4% Patient Approval"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {
                          "\n              Industry-leading patient satisfaction score based on independent third-party surveys.\n            "
                        }
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {"payments"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[18px] text-on-surface font-semibold mb-1">
                        {"40+ Insurance Networks"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {
                          "\n              Direct, cashless settlement across major insurance partners with 0% surprise out-of-pocket costs.\n            "
                        }
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {"clean_hands"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[18px] text-on-surface font-semibold mb-1">
                        {"Infection-Free Smart Facility"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {
                          "\n              HEPA-filtration cleanrooms, UV-C terminal disinfection, and hospital-acquired infection rate near 0%.\n            "
                        }
                      </p>
                    </div>
                  </div>
                  <div className="bg-surface-container-lowest p-space-md rounded-2xl shadow-sm flex items-start gap-4">
                    <div className="w-12 h-12 rounded-xl bg-primary-container text-on-primary flex items-center justify-center flex-shrink-0">
                      <span className="material-symbols-outlined text-[24px]">
                        {"handshake"}
                      </span>
                    </div>
                    <div>
                      <h3 className="font-headline-sm text-headline-sm text-[18px] text-on-surface font-semibold mb-1">
                        {"Personal Care Navigators"}
                      </h3>
                      <p className="font-body-sm text-body-sm text-on-surface-variant leading-relaxed">
                        {
                          "\n              Every patient receives an assigned clinical coordinator to organize follow-ups and prescriptions.\n            "
                        }
                      </p>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section
              className="w-full py-space-xl bg-surface-container-lowest"
              data-section="10"
            >
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col items-center text-center max-w-xl mx-auto">
                  <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                    {"Real Outcomes"}
                  </span>
                  <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1">
                    {"Stories of Restored Vitality"}
                  </h2>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                  <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between shadow-sm">
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex text-amber-400">
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface italic">
                        {
                          '\n              "The cardiac team at Medico performed my angioplasty with incredible precision. Within 48 hours I felt more energetic than I have in a decade. Truly exceptional doctors."\n            '
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-space-md">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        data-alt="Portrait of smiling older patient Robert Henderson who recovered successfully from cardiology treatment"
                        src="/medico/stitch/image-10.png"
                        alt="Portrait of smiling older patient Robert Henderson who recovered successfully from cardiology treatment"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-headline-sm text-headline-sm text-[16px] text-on-surface font-bold">
                          {"Robert Henderson"}
                        </div>
                        <div className="font-label-sm text-label-sm text-primary font-medium">
                          {"Cardiology Patient • Age 58"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between shadow-sm">
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex text-amber-400">
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface italic">
                        {
                          '\n              "Having a dedicated pediatric floor with friendly nurses made my toddler\'s emergency asthma treatment so much less scary. The app let me chat with her doctor right after we got home."\n            '
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-space-md">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        data-alt="Portrait of happy mother Maria Santos smiling with her healthy child in bright clinic garden"
                        src="/medico/stitch/image-11.png"
                        alt="Portrait of happy mother Maria Santos smiling with her healthy child in bright clinic garden"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-headline-sm text-headline-sm text-[16px] text-on-surface font-bold">
                          {"Maria Santos"}
                        </div>
                        <div className="font-label-sm text-label-sm text-primary font-medium">
                          {"Pediatric Mother • Brooklyn"}
                        </div>
                      </div>
                    </div>
                  </div>

                  <div className="bg-surface-container-low rounded-2xl p-space-lg flex flex-col justify-between shadow-sm">
                    <div className="flex flex-col gap-space-sm">
                      <div className="flex text-amber-400">
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                        <span
                          className="material-symbols-outlined text-[20px] fill-current"
                          style={{ fontVariationSettings: "'FILL' 1" }}
                        >
                          {"star"}
                        </span>
                      </div>
                      <p className="font-body-md text-body-md text-on-surface italic">
                        {
                          '\n              "The Executive Health Checkup identified an early thyroid imbalance that my regular GP had missed. The treatment protocol was immediate, clear, and totally life-changing."\n            '
                        }
                      </p>
                    </div>
                    <div className="flex items-center gap-3 pt-space-md">
                      <img
                        className="w-12 h-12 rounded-full object-cover"
                        data-alt="Portrait of corporate professional James Albright in business casual attire smiling with confidence"
                        src="/medico/stitch/image-12.png"
                        alt="Portrait of corporate professional James Albright in business casual attire smiling with confidence"
                        loading="lazy"
                      />
                      <div>
                        <div className="font-headline-sm text-headline-sm text-[16px] text-on-surface font-bold">
                          {"James Albright"}
                        </div>
                        <div className="font-label-sm text-label-sm text-primary font-medium">
                          {"Executive Screening • Age 44"}
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section
              className="w-full py-space-xl bg-surface"
              data-section="11"
            >
              <div className="max-w-[1440px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col md:flex-row md:items-end justify-between gap-space-md">
                  <div>
                    <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                      {"Clinical Education"}
                    </span>
                    <h2 className="font-headline-lg text-headline-lg text-on-surface font-semibold mt-1">
                      {"Latest Insights & Health Updates"}
                    </h2>
                  </div>
                  <a
                    className="inline-flex items-center gap-2 font-label-lg text-label-lg text-primary font-bold hover:underline"
                    href="?action=articles"
                    data-action="articles"
                  >
                    <span>{"Read All Medical Articles"}</span>
                    <span className="material-symbols-outlined text-[18px]">
                      {"arrow_forward"}
                    </span>
                  </a>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-space-lg">
                  <article
                    className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                    data-action="article"
                    data-value="0"
                    role="button"
                    tabIndex={0}
                    aria-label="Read Understanding Silent Hypertension: Early Warning Signs"
                  >
                    <div className="h-48 w-full bg-surface-dim">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Close up of medical stethoscope resting on patient medical journal with fresh fruits representing healthy heart nutrition"
                        src="/medico/stitch/image-13.png"
                        alt="Close up of medical stethoscope resting on patient medical journal with fresh fruits representing healthy heart nutrition"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-space-md flex flex-col flex-grow justify-between gap-space-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-on-primary-fixed font-label-sm text-label-sm font-bold">
                            {"Heart Health"}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {"5 min read"}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors">
                          {
                            "\n                Understanding Silent Hypertension: Early Warning Signs\n              "
                          }
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                          {
                            "\n                Why blood pressure remains the most overlooked cardiovascular risk factor and how routine ambulatory monitoring saves lives.\n              "
                          }
                        </p>
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant pt-2">
                        {"By Dr. Marcus Vance • May 14, 2025"}
                      </div>
                    </div>
                  </article>

                  <article
                    className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                    data-action="article"
                    data-value="1"
                    role="button"
                    tabIndex={0}
                    aria-label="Read Microbiome Optimization for Metabolic Resilience"
                  >
                    <div className="h-48 w-full bg-surface-dim">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Vibrant healthy organic vegetables and herbs arranged on a rustic clean clinical laboratory desk"
                        src="/medico/stitch/image-14.png"
                        alt="Vibrant healthy organic vegetables and herbs arranged on a rustic clean clinical laboratory desk"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-space-md flex flex-col flex-grow justify-between gap-space-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed-variant font-label-sm text-label-sm font-bold">
                            {"Nutrition Science"}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {"4 min read"}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors">
                          {
                            "\n                Microbiome Optimization for Metabolic Resilience\n              "
                          }
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                          {
                            "\n                Clinical evidence linking diverse gut bacterial populations to immune readiness and insulin sensitivity in adults.\n              "
                          }
                        </p>
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant pt-2">
                        {"By Dr. Elena Rostova • May 10, 2025"}
                      </div>
                    </div>
                  </article>

                  <article
                    className="bg-surface-container-lowest rounded-2xl overflow-hidden shadow-sm hover:shadow-lg transition-shadow flex flex-col"
                    data-action="article"
                    data-value="2"
                    role="button"
                    tabIndex={0}
                    aria-label="Read Seasonal Allergies vs Respiratory Infections in Children"
                  >
                    <div className="h-48 w-full bg-surface-dim">
                      <img
                        className="w-full h-full object-cover"
                        data-alt="Playful child holding an apple with a pediatrician gently smiling in the background"
                        src="/medico/stitch/image-15.png"
                        alt="Playful child holding an apple with a pediatrician gently smiling in the background"
                        loading="lazy"
                      />
                    </div>
                    <div className="p-space-md flex flex-col flex-grow justify-between gap-space-sm">
                      <div>
                        <div className="flex items-center gap-2 mb-2">
                          <span className="px-2.5 py-0.5 rounded-full bg-tertiary-fixed text-on-tertiary-fixed-variant font-label-sm text-label-sm font-bold">
                            {"Pediatric Care"}
                          </span>
                          <span className="font-label-sm text-label-sm text-on-surface-variant">
                            {"6 min read"}
                          </span>
                        </div>
                        <h3 className="font-headline-sm text-headline-sm text-on-surface font-semibold hover:text-primary transition-colors">
                          {
                            "\n                Seasonal Allergies vs Respiratory Infections in Children\n              "
                          }
                        </h3>
                        <p className="font-body-sm text-body-sm text-on-surface-variant mt-2 line-clamp-2">
                          {
                            "\n                How parents can identify key differences in symptoms, cough characteristics, and when to visit the emergency clinic.\n              "
                          }
                        </p>
                      </div>
                      <div className="font-label-sm text-label-sm text-on-surface-variant pt-2">
                        {"By Dr. Sarah Jenkins • May 04, 2025"}
                      </div>
                    </div>
                  </article>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section
              className="w-full py-space-xl bg-surface-container-lowest"
              data-section="12"
            >
              <div className="max-w-[1000px] mx-auto px-margin flex flex-col gap-space-lg">
                <div className="flex flex-col items-center text-center">
                  <span className="font-label-lg text-label-lg text-primary uppercase font-bold tracking-wider">
                    {"Common Inquiries"}
                  </span>
                  <h2 className="font-headline-xl text-headline-xl text-on-surface font-semibold mt-1">
                    {"Frequently Asked Questions"}
                  </h2>
                  <p className="font-body-md text-body-md text-on-surface-variant mt-2">
                    {
                      "\n          Everything you need to know about preparing for your clinical visit, appointments, and insurance.\n        "
                    }
                  </p>
                </div>

                <div className="flex flex-col gap-space-sm" id="faq-accordion">
                  <div className="faq-item bg-surface-container-low rounded-xl overflow-hidden transition-colors">
                    <button
                      className="faq-trigger w-full px-space-md py-4 flex items-center justify-between text-left font-headline-sm text-headline-sm text-[18px] text-on-surface font-medium hover:text-primary transition-colors"
                      type="button"
                      data-action="faq"
                      data-value="0"
                      aria-expanded="false"
                      aria-controls="stitch-answer-0"
                    >
                      <span>
                        {"How do I book an appointment with a specialist?"}
                      </span>
                      <span className="material-symbols-outlined text-[20px] transition-transform faq-icon">
                        {"expand_more"}
                      </span>
                    </button>
                    <div
                      className="faq-content px-space-md pb-4 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed hidden"
                      id="stitch-answer-0"
                    >
                      {
                        "\n            You can book an appointment directly through our online booking engine on this website, via the Medico mobile app, or by calling our 24/7 patient helpline at (800) 845-3342. Specialist slots can be booked up to 90 days in advance with instant digital hold.\n          "
                      }
                    </div>
                  </div>

                  <div className="faq-item bg-surface-container-low rounded-xl overflow-hidden transition-colors">
                    <button
                      className="faq-trigger w-full px-space-md py-4 flex items-center justify-between text-left font-headline-sm text-headline-sm text-[18px] text-on-surface font-medium hover:text-primary transition-colors"
                      type="button"
                      data-action="faq"
                      data-value="1"
                      aria-expanded="false"
                      aria-controls="stitch-answer-1"
                    >
                      <span>
                        {"What insurance providers are accepted at Medico?"}
                      </span>
                      <span className="material-symbols-outlined text-[20px] transition-transform faq-icon">
                        {"expand_more"}
                      </span>
                    </button>
                    <div
                      className="faq-content px-space-md pb-4 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed hidden"
                      id="stitch-answer-1"
                    >
                      {
                        "\n            Medico accepts over 40 major national and regional health plans, including BlueCross BlueShield, Aetna, Cigna, UnitedHealthcare, Medicare, and Medicaid. We offer instant pre-authorization verification before your appointment.\n          "
                      }
                    </div>
                  </div>

                  <div className="faq-item bg-surface-container-low rounded-xl overflow-hidden transition-colors">
                    <button
                      className="faq-trigger w-full px-space-md py-4 flex items-center justify-between text-left font-headline-sm text-headline-sm text-[18px] text-on-surface font-medium hover:text-primary transition-colors"
                      type="button"
                      data-action="faq"
                      data-value="2"
                      aria-expanded="false"
                      aria-controls="stitch-answer-2"
                    >
                      <span>
                        {
                          "Can I access my laboratory and diagnostic reports online?"
                        }
                      </span>
                      <span className="material-symbols-outlined text-[20px] transition-transform faq-icon">
                        {"expand_more"}
                      </span>
                    </button>
                    <div
                      className="faq-content px-space-md pb-4 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed hidden"
                      id="stitch-answer-2"
                    >
                      {
                        "\n            Yes. All blood panels, X-rays, MRI scans, and pathology conclusions are synced to your secure patient portal within 4 to 24 hours of completion. You can download encrypted PDF reports or share them with outside physicians anytime.\n          "
                      }
                    </div>
                  </div>

                  <div className="faq-item bg-surface-container-low rounded-xl overflow-hidden transition-colors">
                    <button
                      className="faq-trigger w-full px-space-md py-4 flex items-center justify-between text-left font-headline-sm text-headline-sm text-[18px] text-on-surface font-medium hover:text-primary transition-colors"
                      type="button"
                      data-action="faq"
                      data-value="3"
                      aria-expanded="false"
                      aria-controls="stitch-answer-3"
                    >
                      <span>
                        {"What should I bring for my first consultation?"}
                      </span>
                      <span className="material-symbols-outlined text-[20px] transition-transform faq-icon">
                        {"expand_more"}
                      </span>
                    </button>
                    <div
                      className="faq-content px-space-md pb-4 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed hidden"
                      id="stitch-answer-3"
                    >
                      {
                        "\n            Please bring a government-issued photo ID, your active insurance card, a current list of medications including supplements, and copies of any relevant medical records or radiology discs from the last 12 months.\n          "
                      }
                    </div>
                  </div>

                  <div className="faq-item bg-surface-container-low rounded-xl overflow-hidden transition-colors">
                    <button
                      className="faq-trigger w-full px-space-md py-4 flex items-center justify-between text-left font-headline-sm text-headline-sm text-[18px] text-on-surface font-medium hover:text-primary transition-colors"
                      type="button"
                      data-action="faq"
                      data-value="4"
                      aria-expanded="false"
                      aria-controls="stitch-answer-4"
                    >
                      <span>
                        {
                          "How does telehealth / online video consultation work?"
                        }
                      </span>
                      <span className="material-symbols-outlined text-[20px] transition-transform faq-icon">
                        {"expand_more"}
                      </span>
                    </button>
                    <div
                      className="faq-content px-space-md pb-4 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed hidden"
                      id="stitch-answer-4"
                    >
                      {
                        "\n            Upon scheduling a telehealth visit, you will receive a secure encrypted video link via SMS and email. Ten minutes prior to your slot, tap the link from any smartphone, tablet, or browser without needing to download external software.\n          "
                      }
                    </div>
                  </div>

                  <div className="faq-item bg-surface-container-low rounded-xl overflow-hidden transition-colors">
                    <button
                      className="faq-trigger w-full px-space-md py-4 flex items-center justify-between text-left font-headline-sm text-headline-sm text-[18px] text-on-surface font-medium hover:text-primary transition-colors"
                      type="button"
                      data-action="faq"
                      data-value="5"
                      aria-expanded="false"
                      aria-controls="stitch-answer-5"
                    >
                      <span>
                        {"What emergency protocols are available for walk-ins?"}
                      </span>
                      <span className="material-symbols-outlined text-[20px] transition-transform faq-icon">
                        {"expand_more"}
                      </span>
                    </button>
                    <div
                      className="faq-content px-space-md pb-4 pt-1 text-on-surface-variant font-body-md text-body-md leading-relaxed hidden"
                      id="stitch-answer-5"
                    >
                      {
                        "\n            Our Emergency Trauma Department operates 24/7/365 with triage times averaging under 8 minutes. Walk-ins experiencing chest pain, severe shortness of breath, acute neurological weakness, or trauma are admitted to resuscitation bays immediately.\n          "
                      }
                    </div>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section
              className="w-full py-space-md bg-surface"
              data-section="13"
            >
              <div className="max-w-[1440px] mx-auto px-margin">
                <div className="bg-primary text-on-primary rounded-3xl p-space-lg md:p-space-xl relative overflow-hidden shadow-2xl flex flex-col lg:flex-row lg:items-center justify-between gap-space-lg">
                  <div className="absolute -right-20 -bottom-20 w-80 h-80 bg-error/20 rounded-full blur-3xl pointer-events-none"></div>
                  <div className="flex flex-col gap-space-xs relative z-10">
                    <div className="inline-flex items-center gap-2 text-error-container">
                      <span className="w-3 h-3 rounded-full bg-red-400 animate-ping"></span>
                      <span className="font-label-lg text-label-lg font-bold tracking-wider uppercase">
                        {"Level 1 Emergency Triage Active"}
                      </span>
                    </div>
                    <h2 className="font-headline-lg text-headline-lg lg:text-headline-xl text-surface-container-lowest font-semibold">
                      {
                        "\n            Need Immediate Medical Attention?\n          "
                      }
                    </h2>
                    <p className="font-body-md text-body-md text-on-primary-container max-w-xl">
                      {
                        "\n            Our dispatch centers and pediatric emergency bays are staffed around the clock. Rapid ambulance dispatch available across all metro districts.\n          "
                      }
                    </p>
                  </div>
                  <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-space-md relative z-10">
                    <a
                      className="inline-flex items-center justify-center gap-3 bg-surface-container-lowest text-primary font-headline-sm text-headline-sm px-6 py-4 rounded-full shadow-lg hover:bg-surface-container-low transition-all"
                      href="?action=emergency"
                      data-action="emergency"
                    >
                      <span className="material-symbols-outlined text-[24px] text-error">
                        {"phone_in_talk"}
                      </span>
                      <span>{"(800) 555-0199"}</span>
                    </a>
                    <a
                      className="inline-flex items-center justify-center gap-2 bg-error text-on-error font-label-lg text-label-lg px-6 py-4 rounded-full shadow-lg hover:bg-red-700 transition-all"
                      href="?action=directions"
                      data-action="directions"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {"directions_car"}
                      </span>
                      <span>{"Navigate to Nearest ER"}</span>
                    </a>
                  </div>
                </div>
              </div>
            </section>
          )}
          {view === "home" && (
            <section
              className="w-full py-space-xl bg-surface-container-low"
              data-section="14"
            >
              <div className="max-w-[900px] mx-auto px-margin text-center flex flex-col items-center gap-space-md">
                <div className="w-12 h-12 rounded-full bg-primary-container text-on-primary flex items-center justify-center">
                  <span className="material-symbols-outlined text-[24px]">
                    {"mark_email_read"}
                  </span>
                </div>
                <div>
                  <h3 className="font-headline-lg text-headline-lg text-on-surface font-semibold">
                    {
                      "\n          Stay Informed with Trusted Medical Insights\n        "
                    }
                  </h3>
                  <p className="font-body-md text-body-md text-on-surface-variant max-w-lg mt-1">
                    {
                      "\n          Receive peer-reviewed wellness research, seasonal health guidelines, and clinical hospital updates directly to your inbox every Thursday.\n        "
                    }
                  </p>
                </div>

                <form
                  className="w-full max-w-md flex flex-col sm:flex-row items-center gap-2 mt-2"
                  data-newsletter="true"
                >
                  <input
                    className="w-full h-12 px-5 rounded-full bg-surface-container-lowest text-on-surface font-body-md text-body-md shadow-sm focus:outline-none focus:ring-2 focus:ring-primary"
                    placeholder="Enter your email address"
                    required
                    type="email"
                    aria-label="Newsletter email"
                    name="email"
                    maxLength={254}
                  />
                  <button
                    className="w-full sm:w-auto h-12 px-6 rounded-full bg-primary text-on-primary font-label-lg text-label-lg font-bold hover:bg-tertiary transition-colors flex-shrink-0"
                    type="submit"
                  >
                    {"\n          Subscribe Now\n        "}
                  </button>
                </form>
                <span className="font-label-sm text-label-sm text-on-surface-variant">
                  {
                    "We respect your privacy. No spam. One-click unsubscribe anytime."
                  }
                </span>
              </div>
            </section>
          )}
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
                  <a
                    className="block"
                    data-action="information"
                    data-value="Clinical Trials"
                    href="?action=information&item=Clinical Trials"
                  >
                    {"Clinical Trials"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Telehealth Access"
                    href="?action=information&item=Telehealth Access"
                  >
                    {"Telehealth Access"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Careers & Fellowships"
                    href="?action=information&item=Careers & Fellowships"
                  >
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
                  <a
                    className="block"
                    data-action="information"
                    data-value="Cardiology & Vascular"
                    href="?action=information&item=Cardiology & Vascular"
                  >
                    {"Cardiology & Vascular"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Neurology & Neurosurgery"
                    href="?action=information&item=Neurology & Neurosurgery"
                  >
                    {"Neurology & Neurosurgery"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Orthopedics & Sports Medicine"
                    href="?action=information&item=Orthopedics & Sports Medicine"
                  >
                    {"Orthopedics & Sports Medicine"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Pediatrics & Neonatal Care"
                    href="?action=information&item=Pediatrics & Neonatal Care"
                  >
                    {"Pediatrics & Neonatal Care"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Oncology Comprehensive Care"
                    href="?action=information&item=Oncology Comprehensive Care"
                  >
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
                  <a className="block" href="/how-it-works">
                    {"Patient Portal Guide"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Insurance & Financial Aid"
                    href="?action=information&item=Insurance & Financial Aid"
                  >
                    {"Insurance & Financial Aid"}
                  </a>
                </li>
                <li className="font-body-sm text-body-sm text-on-tertiary-container hover:text-on-primary cursor-pointer transition-colors">
                  <a
                    className="block"
                    data-action="information"
                    data-value="Visitor Guidelines & Hours"
                    href="?action=information&item=Visitor Guidelines & Hours"
                  >
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
                  aria-label="Share Medico"
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
                  aria-label="Contact Medico"
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
                  aria-label="Email Medico"
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
