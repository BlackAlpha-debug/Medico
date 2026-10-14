/* eslint-disable @next/next/no-img-element, @next/next/no-html-link-for-pages */
export function DoctorsMarkup() {
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
          <section className="relative bg-primary text-on-primary overflow-hidden pb-16 pt-8">
            <div className="absolute -top-32 -right-32 w-96 h-96 rounded-full bg-primary-fixed/10 blur-3xl pointer-events-none"></div>
            <div className="absolute bottom-0 -left-20 w-80 h-80 rounded-full bg-secondary/15 blur-3xl pointer-events-none"></div>
            <div className="max-w-[1440px] mx-auto px-margin relative z-10 flex flex-col gap-6">
              <nav className="flex items-center gap-space-xs text-on-primary-container font-label-md text-label-md">
                <a
                  className="hover:text-on-primary transition-colors flex items-center gap-1"
                  href="/"
                >
                  <span className="material-symbols-outlined text-[15px]">
                    {"home"}
                  </span>
                  {" Home\n        "}
                </a>
                <span>{"/"}</span>
                <a
                  className="hover:text-on-primary transition-colors"
                  href="/doctors"
                >
                  {"Doctors"}
                </a>
                <span>{"/"}</span>
                <span className="text-on-primary font-semibold">
                  {"Find a Specialist"}
                </span>
              </nav>

              <div className="max-w-3xl flex flex-col gap-3">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/20 text-primary-fixed font-label-sm text-label-sm w-fit backdrop-blur-sm">
                  <span className="material-symbols-outlined text-[14px]">
                    {"verified_user"}
                  </span>
                  {"\n          Accredited Clinical Directory\n        "}
                </div>
                <h1 className="font-headline-xl text-headline-xl text-on-primary tracking-tight">
                  {
                    "\n          Find the Right Specialist for Your Care\n        "
                  }
                </h1>
                <p className="font-body-lg text-body-lg text-on-primary-container leading-relaxed">
                  {
                    "\n          Browse over 150+ board-certified medical doctors, clinical specialists, and surgeons. Book online or in-person consultations instantly with real-time schedule tracking.\n        "
                  }
                </p>
              </div>

              <div className="w-full bg-surface-container-lowest text-on-surface rounded-2xl shadow-xl p-3 md:p-4 mt-2">
                <form
                  className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-12 gap-3 items-center"
                  data-directory-search="true"
                >
                  <div className="lg:col-span-4 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container-low focus-within:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      {"search"}
                    </span>
                    <input
                      className="w-full bg-transparent border-0 outline-none font-body-md text-body-md text-on-surface placeholder:text-on-surface-variant/70"
                      placeholder="Doctor name, condition, or procedure..."
                      type="text"
                      aria-label="Search doctors"
                      data-query="true"
                    />
                  </div>

                  <div className="lg:col-span-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container-low focus-within:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      {"stethoscope"}
                    </span>
                    <select
                      className="w-full bg-transparent border-0 outline-none font-body-md text-body-md text-on-surface cursor-pointer"
                      aria-label="Filter by specialty"
                      data-directory-select="specialty"
                    >
                      <option value="">{"All Specialties"}</option>
                      <option value="cardio">{"Cardiology & Vascular"}</option>
                      <option value="neuro">
                        {"Neurology & Neurosurgery"}
                      </option>
                      <option value="ortho">{"Orthopedics & Sports"}</option>
                      <option value="peds">{"Pediatrics & Neonatology"}</option>
                      <option value="derma">{"Dermatology"}</option>
                      <option value="obgyn">{"Gynecology & Obstetrics"}</option>
                    </select>
                  </div>

                  <div className="lg:col-span-3 flex items-center gap-2 px-3 py-2.5 rounded-xl bg-surface-container-low focus-within:bg-surface-container transition-all">
                    <span className="material-symbols-outlined text-primary text-[22px]">
                      {"location_on"}
                    </span>
                    <select
                      className="w-full bg-transparent border-0 outline-none font-body-md text-body-md text-on-surface cursor-pointer"
                      aria-label="Filter by campus"
                      data-directory-select="campus"
                    >
                      <option value="">{"All Clinics & Campuses"}</option>
                      <option value="main">{"Main Hospital Campus"}</option>
                      <option value="north">{"North Outpatient Wing"}</option>
                      <option value="west">{"West Pediatric Center"}</option>
                      <option value="telehealth">
                        {"Telehealth / Virtual Clinic"}
                      </option>
                    </select>
                  </div>

                  <div className="lg:col-span-2">
                    <button
                      className="w-full flex items-center justify-center gap-2 bg-primary hover:bg-tertiary active:translate-y-[1px] text-on-primary py-3 px-4 rounded-xl font-label-lg text-label-lg transition-all shadow-md"
                      type="submit"
                    >
                      <span className="material-symbols-outlined text-[20px]">
                        {"search"}
                      </span>
                      <span>{"Search"}</span>
                    </button>
                  </div>
                </form>

                <div className="mt-3 pt-3 flex flex-wrap items-center gap-2">
                  <span className="font-label-sm text-label-sm text-on-surface-variant font-medium">
                    {"Popular:"}
                  </span>
                  <button
                    className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors"
                    type="button"
                    data-action="directory-quick"
                    data-value="Cardiology"
                  >
                    {"Cardiology"}
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors"
                    type="button"
                    data-action="directory-quick"
                    data-value="Pediatrics"
                  >
                    {"Pediatrics"}
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors"
                    type="button"
                    data-action="directory-quick"
                    data-value="Neurology"
                  >
                    {"Neurology"}
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors"
                    type="button"
                    data-action="directory-quick"
                    data-value="Orthopedics"
                  >
                    {"Orthopedics"}
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-secondary-fixed text-on-secondary-fixed hover:bg-secondary hover:text-on-secondary font-label-sm text-label-sm transition-colors flex items-center gap-1"
                    type="button"
                    data-action="directory-quick"
                    data-value="bolt Available Today"
                  >
                    <span className="material-symbols-outlined text-[13px]">
                      {"bolt"}
                    </span>
                    {" Available Today\n          "}
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors"
                    type="button"
                    data-action="directory-quick"
                    data-value="Female Doctors"
                  >
                    {"Female Doctors"}
                  </button>
                  <button
                    className="px-3 py-1 rounded-full bg-surface-container-low hover:bg-primary-fixed hover:text-on-primary-fixed text-on-surface-variant font-label-sm text-label-sm transition-colors flex items-center gap-1"
                    type="button"
                    data-action="directory-quick"
                    data-value="star Top Rated 4.9+"
                  >
                    <span className="material-symbols-outlined text-[13px] text-amber-500 fill-current">
                      {"star"}
                    </span>
                    {" Top Rated 4.9+\n          "}
                  </button>
                </div>
              </div>
            </div>
          </section>

          <section className="max-w-[1440px] mx-auto w-full px-margin py-10">
            <div className="grid grid-cols-12 gap-8 items-start">
              <aside className="col-span-12 lg:col-span-3 sticky top-24 self-start">
                <div className="bg-surface-container-lowest rounded-2xl shadow-sm p-5 flex flex-col gap-6 max-h-[calc(100vh-120px)] overflow-y-auto">
                  <div className="flex items-center justify-between pb-3">
                    <div className="flex items-center gap-2">
                      <span className="material-symbols-outlined text-primary text-[20px]">
                        {"tune"}
                      </span>
                      <h3 className="font-headline-sm text-headline-sm text-on-surface">
                        {"Filter By"}
                      </h3>
                    </div>
                    <button
                      className="font-label-md text-label-md text-secondary hover:underline cursor-pointer"
                      type="button"
                      data-action="directory-reset"
                    >
                      {"Reset All"}
                    </button>
                  </div>

                  <div className="relative">
                    <input
                      className="w-full bg-surface-container-low rounded-lg pl-8 pr-3 py-2 font-body-sm text-body-sm text-on-surface placeholder:text-on-surface-variant/60 outline-none"
                      placeholder="Search filters..."
                      type="text"
                      aria-label="Search filter options"
                      data-filter-search="true"
                    />
                    <span className="material-symbols-outlined absolute left-2.5 top-2.5 text-[16px] text-on-surface-variant">
                      {"search"}
                    </span>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between">
                      {"\n              Specialty\n              "}
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        {"expand_less"}
                      </span>
                    </span>
                    <div className="flex flex-col gap-2 text-on-surface-variant font-body-sm text-body-sm">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded text-primary focus:ring-primary accent-primary"
                            type="checkbox"
                            aria-label="Cardiology"
                            data-directory-check="0"
                          />
                          <span>{"Cardiology"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                          {"1"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded text-primary accent-primary"
                            type="checkbox"
                            aria-label="Pediatrics"
                            data-directory-check="1"
                          />
                          <span>{"Pediatrics"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                          {"1"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded text-primary accent-primary"
                            type="checkbox"
                            aria-label="Neurology"
                            data-directory-check="2"
                          />
                          <span>{"Neurology"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                          {"1"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded text-primary accent-primary"
                            type="checkbox"
                            aria-label="Orthopedics"
                            data-directory-check="3"
                          />
                          <span>{"Orthopedics"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                          {"1"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded text-primary accent-primary"
                            type="checkbox"
                            aria-label="Dermatology"
                            data-directory-check="4"
                          />
                          <span>{"Dermatology"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                          {"1"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded text-primary accent-primary"
                            type="checkbox"
                            aria-label="Gynecology & OB"
                            data-directory-check="5"
                          />
                          <span>{"Gynecology & OB"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                          {"1"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded text-primary accent-primary"
                            type="checkbox"
                            aria-label="General Medicine"
                            data-directory-check="6"
                          />
                          <span>{"General Medicine"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm text-on-surface-variant">
                          {"1"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold flex items-center justify-between">
                      {"\n              Availability\n              "}
                      <span className="material-symbols-outlined text-[16px] text-on-surface-variant">
                        {"expand_less"}
                      </span>
                    </span>
                    <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded accent-primary"
                            type="checkbox"
                            aria-label="Available Today"
                            data-directory-check="7"
                          />
                          <span>{"Available Today"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm">
                          {"5"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded accent-primary"
                            type="checkbox"
                            aria-label="Available This Week"
                            data-directory-check="8"
                          />
                          <span>{"Available This Week"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm">
                          {"8"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded accent-primary"
                            type="checkbox"
                            aria-label="Weekend Availability"
                            data-directory-check="9"
                          />
                          <span>{"Weekend Availability"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm">
                          {"0"}
                        </span>
                      </label>
                      <label className="flex items-center justify-between cursor-pointer group">
                        <span className="flex items-center gap-2 group-hover:text-primary transition-colors">
                          <input
                            className="w-4 h-4 rounded accent-primary"
                            type="checkbox"
                            aria-label="Accepting New Patients"
                            data-directory-check="10"
                          />
                          <span>{"Accepting New Patients"}</span>
                        </span>
                        <span className="px-2 py-0.5 rounded-full bg-surface-container font-label-sm text-label-sm">
                          {"8"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {"Consultation Mode"}
                    </span>
                    <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="w-4 h-4 rounded accent-primary"
                          type="checkbox"
                          aria-label="domain In-Clinic Visit"
                          data-directory-check="11"
                        />
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-primary">
                            {"domain"}
                          </span>
                          {" In-Clinic Visit"}
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="w-4 h-4 rounded accent-primary"
                          type="checkbox"
                          aria-label="videocam Video Consultation"
                          data-directory-check="12"
                        />
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-secondary">
                            {"videocam"}
                          </span>
                          {" Video Consultation"}
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="w-4 h-4 rounded accent-primary"
                          type="checkbox"
                          aria-label="home_pin Home Visit"
                          data-directory-check="13"
                        />
                        <span className="flex items-center gap-1.5">
                          <span className="material-symbols-outlined text-[16px] text-tertiary">
                            {"home_pin"}
                          </span>
                          {" Home Visit"}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {"Doctor Gender"}
                    </span>
                    <div className="grid grid-cols-3 gap-1 p-1 bg-surface-container-low rounded-xl text-center font-label-sm text-label-sm">
                      <label className="py-1.5 rounded-lg bg-surface-container-lowest font-semibold text-primary shadow-xs cursor-pointer">
                        <input
                          className="sr-only"
                          name="gender"
                          type="radio"
                          value="all"
                          aria-label="All"
                          data-directory-radio="gender"
                          defaultChecked
                        />
                        {" All\n              "}
                      </label>
                      <label className="py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface cursor-pointer">
                        <input
                          className="sr-only"
                          name="gender"
                          type="radio"
                          value="female"
                          aria-label="Female"
                          data-directory-radio="gender"
                        />
                        {" Female\n              "}
                      </label>
                      <label className="py-1.5 rounded-lg text-on-surface-variant hover:text-on-surface cursor-pointer">
                        <input
                          className="sr-only"
                          name="gender"
                          type="radio"
                          value="male"
                          aria-label="Male"
                          data-directory-radio="gender"
                        />
                        {" Male\n              "}
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {"Patient Rating"}
                    </span>
                    <div className="flex flex-col gap-2 font-body-sm text-body-sm text-on-surface-variant">
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="accent-primary sr-only"
                          name="rating"
                          type="radio"
                          aria-label="star 4.8 & Above (Exceptional)"
                          data-directory-radio="rating"
                          value="4.8"
                        />
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                            {"star"}
                          </span>
                          {
                            "\n                  4.8 & Above (Exceptional)\n                "
                          }
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="accent-primary sr-only"
                          name="rating"
                          type="radio"
                          aria-label="star 4.5 & Above (Very Good)"
                          data-directory-radio="rating"
                          value="4.5"
                        />
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                            {"star"}
                          </span>
                          {
                            "\n                  4.5 & Above (Very Good)\n                "
                          }
                        </span>
                      </label>
                      <label className="flex items-center gap-2 cursor-pointer">
                        <input
                          className="accent-primary sr-only"
                          name="rating"
                          type="radio"
                          aria-label="star 4.0 & Above"
                          data-directory-radio="rating"
                          value="4"
                        />
                        <span className="flex items-center gap-1">
                          <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                            {"star"}
                          </span>
                          {"\n                  4.0 & Above\n                "}
                        </span>
                      </label>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {"Consultation Fee"}
                    </span>
                    <div className="flex flex-wrap gap-2">
                      <button
                        className="px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface-variant hover:bg-primary-fixed"
                        type="button"
                        data-action="directory-fee"
                        data-value="Under $100"
                        aria-pressed="false"
                      >
                        {"Under $100"}
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-lg bg-primary-container text-on-primary font-label-sm text-label-sm font-semibold shadow-xs"
                        type="button"
                        data-action="directory-fee"
                        data-value="$100 - $200"
                        aria-pressed="false"
                      >
                        {"$100 - $200"}
                      </button>
                      <button
                        className="px-3 py-1.5 rounded-lg bg-surface-container font-label-sm text-label-sm text-on-surface-variant hover:bg-primary-fixed"
                        type="button"
                        data-action="directory-fee"
                        data-value="$200+"
                        aria-pressed="false"
                      >
                        {"$200+"}
                      </button>
                    </div>
                  </div>

                  <div className="flex flex-col gap-2.5">
                    <span className="font-label-lg text-label-lg text-on-surface font-semibold">
                      {"Languages"}
                    </span>
                    <div className="flex flex-wrap gap-1.5 font-label-sm text-label-sm">
                      <span
                        className="px-2.5 py-1 rounded-full bg-primary-fixed/40 text-primary font-medium cursor-pointer"
                        data-action="directory-language"
                        data-value="English"
                        role="button"
                        tabIndex={0}
                        aria-pressed="false"
                      >
                        {"English"}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant cursor-pointer hover:bg-surface-container"
                        data-action="directory-language"
                        data-value="Spanish"
                        role="button"
                        tabIndex={0}
                        aria-pressed="false"
                      >
                        {"Spanish"}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant cursor-pointer hover:bg-surface-container"
                        data-action="directory-language"
                        data-value="Mandarin"
                        role="button"
                        tabIndex={0}
                        aria-pressed="false"
                      >
                        {"Mandarin"}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant cursor-pointer hover:bg-surface-container"
                        data-action="directory-language"
                        data-value="French"
                        role="button"
                        tabIndex={0}
                        aria-pressed="false"
                      >
                        {"French"}
                      </span>
                      <span
                        className="px-2.5 py-1 rounded-full bg-surface-container-low text-on-surface-variant cursor-pointer hover:bg-surface-container"
                        data-action="directory-language"
                        data-value="Arabic"
                        role="button"
                        tabIndex={0}
                        aria-pressed="false"
                      >
                        {"Arabic"}
                      </span>
                    </div>
                  </div>

                  <button
                    className="w-full py-2.5 bg-primary text-on-primary font-label-lg text-label-lg rounded-xl shadow-md hover:bg-tertiary transition-all active:translate-y-[1px]"
                    type="button"
                    data-action="directory-apply"
                  >
                    {"\n            Apply Filters\n          "}
                  </button>
                </div>
              </aside>

              <main className="col-span-12 lg:col-span-9 flex flex-col gap-6">
                <div className="bg-surface-container-lowest rounded-2xl shadow-xs p-4 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
                  <div className="flex flex-col gap-1.5">
                    <div className="flex items-center gap-2">
                      <span
                        className="font-headline-sm text-headline-sm text-on-surface font-bold"
                        data-directory-count="true"
                      >
                        {"8 Specialists"}
                      </span>
                      <span className="font-body-sm text-body-sm text-on-surface-variant">
                        {"Found matching criteria"}
                      </span>
                    </div>

                    <div
                      className="flex flex-wrap items-center gap-1.5"
                      data-directory-pills="true"
                    ></div>
                  </div>

                  <div className="flex items-center gap-3 w-full sm:w-auto justify-between sm:justify-end">
                    <div className="flex items-center gap-1 text-on-surface-variant font-label-md text-label-md">
                      <span className="hidden md:inline">{"Sort:"}</span>
                      <select
                        className="bg-surface-container-low px-3 py-1.5 rounded-xl font-label-md text-label-md text-on-surface outline-none cursor-pointer"
                        aria-label="Sort doctors"
                        data-directory-sort="true"
                        defaultValue="Recommended"
                      >
                        <option>{"Recommended"}</option>
                        <option>{"Highest Rated"}</option>
                        <option>{"Earliest Availability"}</option>
                        <option>{"Years of Experience"}</option>
                        <option>{"Consultation Fee: Low to High"}</option>
                      </select>
                    </div>

                    <div className="flex items-center bg-surface-container-low rounded-xl p-1 gap-1">
                      <button
                        aria-label="Grid View"
                        className="p-1 rounded-lg bg-surface-container-lowest text-primary shadow-xs"
                        type="button"
                        data-action="directory-view"
                        data-value="Grid View"
                        aria-pressed="true"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"grid_view"}
                        </span>
                      </button>
                      <button
                        aria-label="List View"
                        className="p-1 rounded-lg text-on-surface-variant hover:text-on-surface"
                        type="button"
                        data-action="directory-view"
                        data-value="List View"
                        aria-pressed="false"
                      >
                        <span className="material-symbols-outlined text-[18px]">
                          {"view_list"}
                        </span>
                      </button>
                    </div>
                  </div>
                </div>

                <div
                  className="grid grid-cols-1 md:grid-cols-2 gap-6"
                  data-directory-grid="true"
                >
                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="0"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Distinguished mature male cardiologist in white doctor coat with stethoscope, soft teal clinic background, warm clinical lighting, confident and empathetic expression."
                            src="/medico/stitch/page-image-12.png"
                            alt="Distinguished mature male cardiologist in white doctor coat with stethoscope, soft teal clinic background, warm clinical lighting, confident and empathetic expression."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                              {"Top Rated"}
                            </span>
                            <button
                              aria-label="Save Dr. Marcus Vance, MD"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="0"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. Marcus Vance, MD"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Senior Cardiologist • Heart & Vascular"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"4.9"}
                            </span>
                            <span>{"(382 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 18 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" Harvard Med Affiliate\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN, ES\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Today at 2:30 PM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          {"In-Clinic"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$120"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="0"
                          aria-label="View profile of Dr. Marcus Vance, MD"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="0"
                          aria-label="Book visit with Dr. Marcus Vance, MD"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="1"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Professional female pediatric specialist with glasses and welcoming smile in bright pediatric clinic with gentle teal ambient hues."
                            src="/medico/stitch/page-image-13.png"
                            alt="Professional female pediatric specialist with glasses and welcoming smile in bright pediatric clinic with gentle teal ambient hues."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
                              {"Dept Chief"}
                            </span>
                            <button
                              aria-label="Save Dr. Elena Rostova, MD"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="1"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. Elena Rostova, MD"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Pediatric Specialist • Child Health Unit"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"5.0"}
                            </span>
                            <span>{"(419 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 14 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" Stanford Children's\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN, RU\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Tomorrow at 9:00 AM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          {"Video Call"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$110"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="1"
                          aria-label="View profile of Dr. Elena Rostova, MD"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="1"
                          aria-label="Book visit with Dr. Elena Rostova, MD"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="2"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Asian male neurosurgeon in scrub attire smiling thoughtfully, clean high-tech clinical environment, cool teal lighting, confident professional portrait."
                            src="/medico/stitch/page-image-14.png"
                            alt="Asian male neurosurgeon in scrub attire smiling thoughtfully, clean high-tech clinical environment, cool teal lighting, confident professional portrait."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                              {"Neuro Fellow"}
                            </span>
                            <button
                              aria-label="Save Dr. David Chen, MD, PhD"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="2"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. David Chen, MD, PhD"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Neurosurgeon • Spine & Brain Institute"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"4.9"}
                            </span>
                            <span>{"(294 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 21 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" Johns Hopkins Fellow\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN, ZH\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Today at 4:00 PM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          {"In-Clinic"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$180"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="2"
                          aria-label="View profile of Dr. David Chen, MD, PhD"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="2"
                          aria-label="Book visit with Dr. David Chen, MD, PhD"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="3"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Experienced female orthopedic surgeon in modern medical office, blue surgical coat, stethoscope, warm daylight, professional and caring demeanor."
                            src="/medico/stitch/page-image-15.png"
                            alt="Experienced female orthopedic surgeon in modern medical office, blue surgical coat, stethoscope, warm daylight, professional and caring demeanor."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                              {"Top Rated"}
                            </span>
                            <button
                              aria-label="Save Dr. Sarah Jenkins, FACS"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="3"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. Sarah Jenkins, FACS"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Orthopedic Surgeon • Joint Reconstruction"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"4.8"}
                            </span>
                            <span>{"(312 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 16 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" Mayo Clinic Trained\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN, DE\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Wed at 11:30 AM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          {"In-Clinic"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$150"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="3"
                          aria-label="View profile of Dr. Sarah Jenkins, FACS"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="3"
                          aria-label="Book visit with Dr. Sarah Jenkins, FACS"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="4"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Male general physician with pleasant smile in crisp modern medical clinic, deep teal accent wall behind, soft clinical illumination."
                            src="/medico/stitch/page-image-16.png"
                            alt="Male general physician with pleasant smile in crisp modern medical clinic, deep teal accent wall behind, soft clinical illumination."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-emerald-100 text-emerald-800 font-label-sm text-label-sm font-semibold">
                              {"Available Today"}
                            </span>
                            <button
                              aria-label="Save Dr. Julian Thorne, MD"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="4"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. Julian Thorne, MD"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Internal Medicine • Preventive Care"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"4.7"}
                            </span>
                            <span>{"(218 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 10 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" Medico Central Wing\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Today at 3:15 PM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          {"Video Call"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$90"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="4"
                          aria-label="View profile of Dr. Julian Thorne, MD"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="4"
                          aria-label="Book visit with Dr. Julian Thorne, MD"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="5"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Compassionate South Asian female obstetrician in clean hospital environment wearing turquoise medical scrubs, friendly professional portrait."
                            src="/medico/stitch/page-image-17.png"
                            alt="Compassionate South Asian female obstetrician in clean hospital environment wearing turquoise medical scrubs, friendly professional portrait."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-primary-fixed text-primary font-label-sm text-label-sm font-semibold">
                              {"Top Rated"}
                            </span>
                            <button
                              aria-label="Save Dr. Priya Patel, MBBS, MD"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="5"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. Priya Patel, MBBS, MD"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Gynecology & Obstetrics • Women's Health"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"4.9"}
                            </span>
                            <span>{"(450 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 15 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" Columbia University\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN, HI\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Today at 5:00 PM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          {"In-Clinic"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$135"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="5"
                          aria-label="View profile of Dr. Priya Patel, MBBS, MD"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="5"
                          aria-label="Book visit with Dr. Priya Patel, MBBS, MD"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="6"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Senior male dermatologist examining diagnostic records, professional clinic setting with soft botanical and clinical teal accents, clear daylight."
                            src="/medico/stitch/page-image-18.png"
                            alt="Senior male dermatologist examining diagnostic records, professional clinic setting with soft botanical and clinical teal accents, clear daylight."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-surface-container-high text-on-surface font-label-sm text-label-sm font-semibold">
                              {"Dermatology"}
                            </span>
                            <button
                              aria-label="Save Dr. Robert Sterling, DO"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="6"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. Robert Sterling, DO"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Consultant Dermatologist • Skin Cancer Center"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"4.8"}
                            </span>
                            <span>{"(185 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 13 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" NYU Langone\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Thu at 10:00 AM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-secondary font-semibold">
                          {"Video Call"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$125"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="6"
                          aria-label="View profile of Dr. Robert Sterling, DO"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="6"
                          aria-label="Book visit with Dr. Robert Sterling, DO"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>

                  <div
                    className="bg-surface-container-lowest rounded-2xl shadow-sm hover:shadow-md transition-all p-5 flex flex-col justify-between group"
                    data-directory-card="7"
                  >
                    <div>
                      <div className="flex items-start justify-between gap-4">
                        <div className="relative">
                          <img
                            className="w-20 h-20 rounded-2xl object-cover bg-surface-container"
                            data-alt="Young female Asian oncologist physician with tablet computer in high-end medical research hospital wing, teal architectural detailing."
                            src="/medico/stitch/page-image-19.png"
                            alt="Young female Asian oncologist physician with tablet computer in high-end medical research hospital wing, teal architectural detailing."
                            loading="lazy"
                          />
                          <span className="absolute -bottom-1 -right-1 p-1 bg-surface-container-lowest rounded-full shadow-xs">
                            <span className="material-symbols-outlined text-[16px] text-secondary fill-current">
                              {"verified"}
                            </span>
                          </span>
                        </div>
                        <div className="flex-1 flex flex-col min-w-0">
                          <div className="flex items-center justify-between">
                            <span className="px-2.5 py-0.5 rounded-full bg-secondary-fixed text-on-secondary-fixed font-label-sm text-label-sm font-semibold">
                              {"Oncology Lead"}
                            </span>
                            <button
                              aria-label="Save Dr. Maya Lin, MD"
                              className="text-outline-variant hover:text-error transition-colors"
                              type="button"
                              data-action="toggle"
                              data-value="7"
                              aria-pressed="false"
                            >
                              <span className="material-symbols-outlined text-[20px]">
                                {"favorite"}
                              </span>
                            </button>
                          </div>
                          <h2 className="font-headline-sm text-headline-sm text-on-surface font-semibold truncate mt-1">
                            {"Dr. Maya Lin, MD"}
                          </h2>
                          <span className="font-body-sm text-body-sm text-primary font-medium truncate">
                            {"Medical Oncologist • Cancer Research"}
                          </span>
                          <div className="flex items-center gap-1.5 mt-1 text-on-surface-variant font-label-md text-label-md">
                            <span className="material-symbols-outlined text-[16px] text-amber-500 fill-current">
                              {"star"}
                            </span>
                            <span className="font-semibold text-on-surface">
                              {"4.9"}
                            </span>
                            <span>{"(360 reviews)"}</span>
                          </div>
                        </div>
                      </div>

                      <div className="mt-4 flex flex-wrap gap-2 text-on-surface-variant font-label-sm text-label-sm">
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"school"}
                          </span>
                          {" 17 Years Exp\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"apartment"}
                          </span>
                          {" Memorial Sloan\n                "}
                        </span>
                        <span className="px-2 py-1 rounded-lg bg-surface-container-low flex items-center gap-1">
                          <span className="material-symbols-outlined text-[14px]">
                            {"translate"}
                          </span>
                          {" EN, ZH, FR\n                "}
                        </span>
                      </div>

                      <div className="mt-4 p-3 rounded-xl bg-surface-container-low flex items-center justify-between">
                        <div className="flex items-center gap-2 font-label-md text-label-md">
                          <span className="relative flex h-2 w-2">
                            <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                            <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                          </span>
                          <span className="text-on-surface font-medium">
                            {"Next Slot: Today at 1:45 PM"}
                          </span>
                        </div>
                        <span className="font-label-sm text-label-sm text-primary font-semibold">
                          {"In-Clinic"}
                        </span>
                      </div>
                    </div>

                    <div className="mt-5 pt-4 flex items-center justify-between gap-3">
                      <div>
                        <span className="font-label-sm text-label-sm text-on-surface-variant block">
                          {"Consultation Fee"}
                        </span>
                        <span className="font-headline-sm text-headline-sm text-on-surface font-bold">
                          {"$160"}
                        </span>
                      </div>
                      <div className="flex items-center gap-2">
                        <button
                          className="p-2.5 rounded-xl bg-surface-container hover:bg-surface-container-high text-primary transition-colors"
                          title="View Profile"
                          type="button"
                          data-action="directory-profile"
                          data-value="7"
                          aria-label="View profile of Dr. Maya Lin, MD"
                        >
                          <span className="material-symbols-outlined text-[18px]">
                            {"account_circle"}
                          </span>
                        </button>
                        <button
                          className="px-4 py-2.5 rounded-xl bg-primary text-on-primary hover:bg-tertiary transition-all font-label-lg text-label-lg shadow-sm"
                          type="button"
                          data-action="directory-book"
                          data-value="7"
                          aria-label="Book visit with Dr. Maya Lin, MD"
                        >
                          {"\n                  Book Visit\n                "}
                        </button>
                      </div>
                    </div>
                  </div>
                </div>
                <p data-directory-empty="true" hidden>
                  {
                    "No specialists match these filters. Try Reset All or broaden your search."
                  }
                </p>

                <div className="bg-surface-container-lowest rounded-2xl shadow-xs p-4 flex flex-col sm:flex-row items-center justify-between gap-4 mt-2">
                  <div
                    className="font-body-sm text-body-sm text-on-surface-variant"
                    data-directory-summary="true"
                  >
                    {"Showing 1–8 of 8 doctors"}
                  </div>
                  <div className="flex items-center gap-1.5">
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors disabled:opacity-40"
                      disabled
                      type="button"
                    >
                      <span className="material-symbols-outlined text-[16px]">
                        {"chevron_left"}
                      </span>
                      {" Previous\n            "}
                    </button>
                    <div className="flex items-center gap-1">
                      <button
                        className="w-8 h-8 rounded-xl bg-primary text-on-primary font-label-md text-label-md font-semibold"
                        type="button"
                        aria-current="page"
                        disabled
                      >
                        {"1"}
                      </button>
                    </div>
                    <button
                      className="flex items-center gap-1 px-3 py-1.5 rounded-xl bg-surface-container-low text-on-surface-variant hover:bg-surface-container font-label-md text-label-md transition-colors"
                      type="button"
                      disabled
                    >
                      {"\n              Next "}
                      <span className="material-symbols-outlined text-[16px]">
                        {"chevron_right"}
                      </span>
                    </button>
                  </div>
                </div>
              </main>
            </div>
          </section>

          <section className="max-w-[1440px] mx-auto w-full px-margin pb-16">
            <div className="relative bg-gradient-to-r from-primary to-tertiary rounded-3xl p-8 md:p-12 text-on-primary overflow-hidden shadow-xl">
              <div className="absolute -right-20 -bottom-20 w-80 h-80 rounded-full bg-primary-fixed/15 blur-2xl pointer-events-none"></div>
              <div className="relative z-10 grid grid-cols-1 lg:grid-cols-12 gap-8 items-center">
                <div className="lg:col-span-8 flex flex-col gap-3">
                  <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full bg-primary-fixed/20 text-primary-fixed font-label-sm text-label-sm w-fit backdrop-blur-sm">
                    <span className="material-symbols-outlined text-[16px]">
                      {"support_agent"}
                    </span>
                    {"\n            Need Clinical Guidance?\n          "}
                  </div>
                  <h2 className="font-headline-lg text-headline-lg text-on-primary tracking-tight">
                    {
                      "\n            Unsure which specialist is right for your symptoms?\n          "
                    }
                  </h2>
                  <p className="font-body-md text-body-md text-on-primary-container max-w-2xl leading-relaxed">
                    {
                      "\n            Let our experienced registered nurses and clinical navigators guide you. We analyze your medical needs, insurance coverage, and urgent timelines to match you with the ideal physician in minutes.\n          "
                    }
                  </p>
                  <div className="flex flex-wrap items-center gap-6 mt-2">
                    <div className="flex items-center gap-2 text-on-primary">
                      <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                        {"schedule"}
                      </span>
                      <span className="font-label-md text-label-md">
                        {"Average match time: < 3 mins"}
                      </span>
                    </div>
                    <div className="flex items-center gap-2 text-on-primary">
                      <span className="material-symbols-outlined text-[20px] text-primary-fixed">
                        {"verified"}
                      </span>
                      <span className="font-label-md text-label-md">
                        {"100% Free Patient Service"}
                      </span>
                    </div>
                  </div>
                </div>
                <div className="lg:col-span-4 flex flex-col sm:flex-row lg:flex-col gap-3 justify-end">
                  <a
                    className="inline-flex items-center justify-center gap-2 bg-secondary text-on-secondary px-6 py-3.5 rounded-2xl font-label-lg text-label-lg shadow-lg hover:bg-secondary-container transition-all active:translate-y-[1px]"
                    href="/login"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {"chat"}
                    </span>
                    <span>{"Start Triage Chat"}</span>
                  </a>
                  <a
                    className="inline-flex items-center justify-center gap-2 bg-surface-container-lowest/10 hover:bg-surface-container-lowest/20 backdrop-blur-md text-on-primary px-6 py-3.5 rounded-2xl font-label-lg text-label-lg transition-all"
                    href="?action=call"
                    data-action="call"
                  >
                    <span className="material-symbols-outlined text-[20px]">
                      {"call"}
                    </span>
                    <span>{"Call: +1 (800) 845-3342"}</span>
                  </a>
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
