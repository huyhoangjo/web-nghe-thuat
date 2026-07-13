export function filterWorks(works, chapter) {
  if (!Array.isArray(works)) return [];
  if (!chapter || chapter === "all") return works;
  const parsedChapter = Number(chapter);
  return works.filter(w => w && Number(w.chapter) === parsedChapter);
}

export function searchArchive(db, query, lang = "en") {
  if (!db || !query) return [];
  const cleanQuery = query.toLowerCase().trim();
  if (!cleanQuery) return [];

  const results = [];
  const match = (val) => val && String(val).toLowerCase().includes(cleanQuery);

  // Search Works
  if (Array.isArray(db.works)) {
    db.works.forEach(w => {
      if (match(w.titleEn) || match(w.titleVi) || match(w.materialEn) || match(w.materialVi) || match(w.descriptionEn) || match(w.descriptionVi) || match(w.year)) {
        results.push({ type: "work", item: w });
      }
    });
  }

  // Search Journal
  if (Array.isArray(db.journal)) {
    db.journal.forEach(j => {
      if (match(j.titleEn) || match(j.titleVi) || match(j.contentEn) || match(j.contentVi) || match(j.locationEn) || match(j.locationVi)) {
        results.push({ type: "journal", item: j });
      }
    });
  }

  // Search Field Notes
  if (Array.isArray(db.fieldNotes)) {
    db.fieldNotes.forEach(f => {
      if (match(f.titleEn) || match(f.titleVi) || match(f.contentEn) || match(f.contentVi) || match(f.locationEn) || match(f.locationVi) || match(f.countryEn) || match(f.countryVi)) {
        results.push({ type: "fieldNote", item: f });
      }
    });
  }

  // Search Archive
  if (Array.isArray(db.archive)) {
    db.archive.forEach(a => {
      if (match(a.titleEn) || match(a.titleVi) || match(a.descriptionEn) || match(a.descriptionVi) || match(a.date)) {
        results.push({ type: "archive", item: a });
      }
    });
  }

  return results;
}

export function formatDate(dateStr, lang = "en") {
  if (!dateStr) return "";
  try {
    const d = new Date(dateStr);
    if (Number.isNaN(d.getTime())) return dateStr;
    if (lang === "vi") {
      return `Tháng ${d.getMonth() + 1} / ${d.getFullYear()}`;
    }
    const options = { month: "short", year: "numeric" };
    return d.toLocaleDateString("en-US", options);
  } catch {
    return dateStr;
  }
}
