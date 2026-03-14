/**
 * Normalize text for fuzzy matching:
 * - lowercase
 * - remove dots, hyphens, special chars
 * - expand common abbreviations
 */

const ALIASES: Record<string, string[]> = {
  "btech": ["b.tech", "b tech", "bachelor of technology"],
  "mtech": ["m.tech", "m tech", "master of technology"],
  "bcom": ["b.com", "b com", "bachelor of commerce"],
  "mcom": ["m.com", "m com", "master of commerce"],
  "bsc": ["b.sc", "b sc", "bachelor of science"],
  "msc": ["m.sc", "m sc", "master of science"],
  "ba": ["b.a", "b a", "bachelor of arts"],
  "ma": ["m.a", "m a", "master of arts"],
  "bba": ["b.b.a", "bachelor of business administration"],
  "mba": ["m.b.a", "master of business administration"],
  "bdes": ["b.des", "b des", "bachelor of design"],
  "mdes": ["m.des", "m des", "master of design"],
  "bpharm": ["b.pharm", "b pharm", "bachelor of pharmacy"],
  "mpharm": ["m.pharm", "m pharm", "master of pharmacy"],
  "bed": ["b.ed", "b ed", "bachelor of education"],
  "med": ["m.ed", "m ed", "master of education"],
  "llb": ["l.l.b", "ll.b", "bachelor of law"],
  "llm": ["l.l.m", "ll.m", "master of law"],
  "bca": ["b.c.a", "bachelor of computer applications"],
  "mca": ["m.c.a", "master of computer applications"],
  "phd": ["ph.d", "doctorate"],
  "cs": ["computer science"],
  "it": ["information technology"],
  "ee": ["electrical engineering"],
  "me": ["mechanical engineering"],
  "ce": ["civil engineering"],
  "ece": ["electronics"],
  "cse": ["computer science engineering", "computer science and engineering"],
};

function normalize(text: string): string {
  return text.toLowerCase().replace(/[.\-\/\\,()]/g, " ").replace(/\s+/g, " ").trim();
}

/**
 * Check if a course field matches the query using fuzzy/NLP matching.
 */
export function fuzzyMatch(text: string, query: string): boolean {
  const normText = normalize(text);
  const normQuery = normalize(query);

  // Direct substring match
  if (normText.includes(normQuery)) return true;

  // Remove all spaces for compact matching (e.g., "btech" matches "b tech")
  const compactText = normText.replace(/\s/g, "");
  const compactQuery = normQuery.replace(/\s/g, "");
  if (compactText.includes(compactQuery)) return true;

  // Check aliases: if query matches an alias key, check if text contains any of its expansions
  for (const [key, expansions] of Object.entries(ALIASES)) {
    if (compactQuery.includes(key) || key.includes(compactQuery)) {
      for (const exp of expansions) {
        if (normText.includes(normalize(exp))) return true;
      }
      // Also check if normalized text contains the key
      if (compactText.includes(key)) return true;
    }
    // Reverse: if text contains an alias, check if query matches
    for (const exp of expansions) {
      if (normalize(exp).includes(normQuery) || normQuery.includes(normalize(exp))) {
        if (compactText.includes(key) || expansions.some(e => normText.includes(normalize(e)))) return true;
      }
    }
  }

  // Word-level matching: all query words must appear somewhere
  const queryWords = normQuery.split(" ").filter(Boolean);
  if (queryWords.length > 1 && queryWords.every(w => normText.includes(w))) return true;

  return false;
}

/**
 * Filter courses using fuzzy search across name, category, description.
 */
export function fuzzyFilterCourses<T extends { name: string; category: string; description: string }>(
  courses: T[],
  query: string
): T[] {
  if (!query.trim()) return courses;
  return courses.filter(
    (c) => fuzzyMatch(c.name, query) || fuzzyMatch(c.category, query) || fuzzyMatch(c.description, query)
  );
}
