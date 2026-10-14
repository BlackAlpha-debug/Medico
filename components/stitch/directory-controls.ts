import doctors from "./directory.json";
export function filterDirectory(root: HTMLElement) {
  const cards = Array.from(
    root.querySelectorAll<HTMLElement>("[data-directory-card]"),
  );
  if (!cards.length) return;
  const query =
    root
      .querySelector<HTMLInputElement>("[data-query]")
      ?.value.toLowerCase()
      .trim() || "";
  const specialty =
    root.querySelector<HTMLSelectElement>('[data-directory-select="specialty"]')
      ?.value || "";
  const campus =
    root.querySelector<HTMLSelectElement>('[data-directory-select="campus"]')
      ?.value || "";
  const checks = new Set(
    Array.from(
      root.querySelectorAll<HTMLInputElement>("[data-directory-check]:checked"),
    ).map((e) => Number(e.dataset.directoryCheck)),
  );
  const gender =
    root.querySelector<HTMLInputElement>(
      '[data-directory-radio="gender"]:checked',
    )?.value || "all";
  const rating = Math.max(
    Number(root.dataset.minimumRating || 0),
    Number(
      root.querySelector<HTMLInputElement>(
        '[data-directory-radio="rating"]:checked',
      )?.value || 0,
    ),
  );
  const fee = root.querySelector<HTMLElement>(
    '[data-action="directory-fee"][aria-pressed="true"]',
  )?.dataset.value;
  const languages = Array.from(
    root.querySelectorAll<HTMLElement>(
      '[data-action="directory-language"][aria-pressed="true"]',
    ),
  ).map((e) => e.dataset.value!);
  const langCodes: Record<string, string> = {
    English: "EN",
    Spanish: "ES",
    Mandarin: "ZH",
    French: "FR",
    Arabic: "AR",
  };
  const specialties = [
    "Cardiology",
    "Pediatrics",
    "Neurology",
    "Orthopedics",
    "Dermatology",
    "Gynecology & OB",
    "General Medicine",
  ];
  const specMap: Record<string, string> = {
    cardio: "Cardiology",
    peds: "Pediatrics",
    neuro: "Neurology",
    ortho: "Orthopedics",
    derma: "Dermatology",
    obgyn: "Gynecology & OB",
  };
  const chosen = Array.from(checks)
    .filter((i) => i < 7)
    .map((i) => specialties[i]);
  const sort = root.querySelector<HTMLSelectElement>(
    "[data-directory-sort]",
  )?.value;
  cards.sort((a, b) => {
    const x = doctors[Number(a.dataset.directoryCard)],
      y = doctors[Number(b.dataset.directoryCard)];
    return sort === "Highest Rated"
      ? y.rating - x.rating
      : sort === "Years of Experience"
        ? y.experience - x.experience
        : sort === "Consultation Fee: Low to High"
          ? x.fee - y.fee
          : sort === "Earliest Availability"
            ? Number(y.today) - Number(x.today)
            : Number(a.dataset.directoryCard) - Number(b.dataset.directoryCard);
  });
  let count = 0;
  for (const card of cards) {
    const d = doctors[Number(card.dataset.directoryCard)];
    const show =
      (!query ||
        `${d.name} ${d.specialty} ${d.description}`
          .toLowerCase()
          .includes(query)) &&
      (!specialty || d.specialty === specMap[specialty]) &&
      (!campus || d.campus === campus) &&
      (!chosen.length || chosen.includes(d.specialty)) &&
      (!checks.has(7) || d.today) &&
      (!checks.has(8) || d.week) &&
      (!checks.has(10) || d.accepting) &&
      (!checks.has(9) || d.weekend) &&
      (!checks.has(13) || d.homeVisit) &&
      (!(checks.has(11) || checks.has(12)) ||
        (checks.has(11) && d.mode === "Clinic") ||
        (checks.has(12) && d.mode === "Video")) &&
      (gender === "all" || d.gender === gender) &&
      d.rating >= rating &&
      (!fee ||
        (fee === "Under $100"
          ? d.fee < 100
          : fee === "$100 - $200"
            ? d.fee >= 100 && d.fee <= 200
            : d.fee > 200)) &&
      (!languages.length ||
        languages.some((l) => d.languages.split(", ").includes(langCodes[l])));
    card.hidden = !show;
    if (show) count++;
    card.parentElement?.append(card);
  }
  const heading = root.querySelector("[data-directory-count]");
  if (heading)
    heading.textContent = `${count} Specialist${count === 1 ? "" : "s"}`;
  const summary = root.querySelector("[data-directory-summary]");
  if (summary)
    summary.textContent = count
      ? `Showing 1–${count} of ${count} doctors`
      : "No matching doctors";
  const empty = root.querySelector<HTMLElement>("[data-directory-empty]");
  if (empty) empty.hidden = count > 0;
  const pills = root.querySelector("[data-directory-pills]");
  if (pills) {
    pills.replaceChildren();
    const labels = [
      query && `Search: ${query}`,
      specialty && specMap[specialty],
      campus,
      ...chosen,
      checks.has(7) && "Available Today",
      checks.has(8) && "Available This Week",
      checks.has(9) && "Weekend",
      checks.has(10) && "New patients",
      checks.has(11) && "In-Clinic",
      checks.has(12) && "Video",
      checks.has(13) && "Home Visit",
      gender !== "all" && gender,
      rating && `Rating ${rating}+`,
      fee,
      ...languages,
    ].filter(Boolean);
    for (const label of labels) {
      const b = document.createElement("button");
      b.type = "button";
      b.className = "stitch-filter-pill";
      b.dataset.action = "directory-reset";
      b.textContent = `${label} ×`;
      b.setAttribute("aria-label", `Clear filters: ${label}`);
      pills.append(b);
    }
  }
}
export function directoryAction(
  root: HTMLElement,
  name: string,
  value: string | undefined,
  button: HTMLElement,
) {
  if (
    !name.startsWith("directory-") ||
    name === "directory-profile" ||
    name === "directory-book"
  )
    return false;
  if (name === "directory-reset") {
    delete root.dataset.minimumRating;
    root
      .querySelectorAll<HTMLInputElement>(
        "[data-directory-check],[data-directory-radio]",
      )
      .forEach((e) => (e.checked = e.value === "all"));
    root
      .querySelectorAll<HTMLInputElement>("[data-query],[data-filter-search]")
      .forEach((e) => (e.value = ""));
    root
      .querySelectorAll<HTMLSelectElement>("[data-directory-select]")
      .forEach((e) => (e.value = ""));
    root
      .querySelectorAll<HTMLElement>(
        '[data-action="directory-fee"],[data-action="directory-language"]',
      )
      .forEach((e) => e.setAttribute("aria-pressed", "false"));
    root
      .querySelectorAll<HTMLElement>("aside label")
      .forEach((e) => (e.hidden = false));
  } else if (name === "directory-quick") {
    const map: Record<string, string> = {
      Cardiology: "cardio",
      Pediatrics: "peds",
      Neurology: "neuro",
      Orthopedics: "ortho",
    };
    if (value && map[value]) {
      const select = root.querySelector<HTMLSelectElement>(
        '[data-directory-select="specialty"]',
      );
      if (select) select.value = map[value];
    } else {
      const selector = value?.includes("Available")
        ? '[data-directory-check="7"]'
        : value?.includes("Female")
          ? '[data-directory-radio="gender"][value="female"]'
          : '[data-directory-radio="rating"][value="4.8"]';
      const input = root.querySelector<HTMLInputElement>(selector);
      if (input) input.checked = true;
      if (value?.includes("4.9")) {
        const query = root.querySelector<HTMLInputElement>("[data-query]");
        if (query) query.value = "";
        root.dataset.minimumRating = "4.9";
      }
    }
  } else if (name === "directory-fee" || name === "directory-language") {
    const active = button.getAttribute("aria-pressed") !== "true";
    if (name === "directory-fee")
      root
        .querySelectorAll('[data-action="directory-fee"]')
        .forEach((e) => e.setAttribute("aria-pressed", "false"));
    button.setAttribute("aria-pressed", String(active));
  } else if (name === "directory-view") {
    root
      .querySelector<HTMLElement>("[data-directory-grid]")
      ?.classList.toggle("stitch-list-view", value === "List View");
    root
      .querySelectorAll<HTMLElement>('[data-action="directory-view"]')
      .forEach((e) => e.setAttribute("aria-pressed", String(e === button)));
    return true;
  } else if (name === "directory-collapse") {
    const section = button.parentElement?.parentElement;
    section?.querySelectorAll<HTMLElement>(":scope > div").forEach((e) => {
      if (!e.contains(button)) e.hidden = !e.hidden;
    });
    return true;
  }
  filterDirectory(root);
  return true;
}
