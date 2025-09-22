export type DailyEntry = {
  date: string; // YYYY-MM-DD
  value: number; // kg CO2
  savedAt: number; // epoch ms
};

export const POINTS_EVENT = "carbon:points:update";

// User scoping helpers
export const getCurrentUserId = (): string => {
  try {
    const v = localStorage.getItem("auth:userId");
    return v && v.trim().length > 0 ? v : "anon";
  } catch {
    return "anon";
  }
};

export const scopedKey = (base: string): string => `${base}::${getCurrentUserId()}`;

const getEntriesKey = () => scopedKey("carbon:entries");
const getPointsKey = () => scopedKey("carbon:points");

const toISODate = (d: Date) => d.toISOString().slice(0, 10);

const getStartOfDay = (d = new Date()) => {
  const dt = new Date(d);
  dt.setHours(0, 0, 0, 0);
  return dt;
};

export const getEntries = (): DailyEntry[] => {
  try {
    const raw = localStorage.getItem(getEntriesKey());
    if (!raw) return [];
    const parsed = JSON.parse(raw) as DailyEntry[];
    if (!Array.isArray(parsed)) return [];
    return parsed
      .filter(e => typeof e?.date === "string" && typeof e?.value === "number" && typeof e?.savedAt === "number")
      .sort((a, b) => a.date.localeCompare(b.date));
  } catch {
    return [];
  }
};

const setEntries = (entries: DailyEntry[]) => {
  try {
    localStorage.setItem(getEntriesKey(), JSON.stringify(entries));
  } catch {}
};

export const getPoints = (): number => {
  try {
    return parseInt(localStorage.getItem(getPointsKey()) || "0", 10) || 0;
  } catch {
    return 0;
  }
};

export const addPoints = (delta: number): number => {
  const current = getPoints();
  const next = Math.max(0, current + delta);
  try {
    localStorage.setItem(getPointsKey(), String(next));
    if (typeof window !== "undefined") {
      const evt = new CustomEvent(POINTS_EVENT, { detail: { points: next } });
      window.dispatchEvent(evt);
    }
  } catch {}
  return next;
};

export const getCooldownRemainingMs = (): number => {
  const entries = getEntries();
  const today = toISODate(new Date());
  const todayEntry = entries.find(e => e.date === today);
  if (!todayEntry) return 0;
  const elapsed = Date.now() - todayEntry.savedAt;
  const remaining = 24 * 60 * 60 * 1000 - elapsed;
  return remaining > 0 ? remaining : 0;
};

export const saveTodayEmissions = (value: number): { saved: boolean; reason?: string; remainingMs?: number; awardedPoints?: number; comparison?: "improved" | "worsened" | "same" | "none" } => {
  if (!Number.isFinite(value) || value <= 0) {
    return { saved: false, reason: "invalid" };
  }
  const entries = getEntries();
  const now = Date.now();
  const today = toISODate(new Date());
  const todayIdx = entries.findIndex(e => e.date === today);
  if (todayIdx >= 0) {
    const remainingMs = getCooldownRemainingMs();
    if (remainingMs > 0) {
      return { saved: false, reason: "cooldown", remainingMs };
    }
    // Cooldown passed but same calendar day: update value and timestamp
    entries[todayIdx] = { date: today, value, savedAt: now };
  } else {
    entries.push({ date: today, value, savedAt: now });
  }

  // Determine consecutive yesterday entry
  const yesterdayDate = (() => {
    const d = new Date();
    d.setDate(d.getDate() - 1);
    return toISODate(d);
  })();
  const yesterday = entries.find(e => e.date === yesterdayDate);

  let awardedPoints = 0;
  let comparison: "improved" | "worsened" | "same" | "none" = "none";
  if (yesterday) {
    if (value < yesterday.value) {
      awardedPoints = 10;
      comparison = "improved";
    } else if (value > yesterday.value) {
      awardedPoints = -5;
      comparison = "worsened";
    } else {
      awardedPoints = -5; // treat same as no improvement per requirement
      comparison = "same";
    }
    if (awardedPoints !== 0) addPoints(awardedPoints);
  }

  setEntries(entries);
  return { saved: true, awardedPoints, comparison };
};

export type WeeklyDatum = { label: string; date: string; value: number };

// Returns data for current week Monday..Sunday
export const getWeeklyData = (): WeeklyDatum[] => {
  const entries = getEntries();
  const today = new Date();
  // Find Monday of current week
  const dayOfWeek = (today.getDay() + 6) % 7; // Monday=0
  const monday = new Date(getStartOfDay(today));
  monday.setDate(monday.getDate() - dayOfWeek);

  const labels = ["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"];
  return labels.map((label, i) => {
    const d = new Date(monday);
    d.setDate(monday.getDate() + i);
    const iso = toISODate(d);
    const val = entries.find(e => e.date === iso)?.value ?? 0;
    return { label, date: iso, value: val };
  });
};
