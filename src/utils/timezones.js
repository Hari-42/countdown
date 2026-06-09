export const TIMEZONES = [
  { value: "UTC",                   label: "UTC ±0:00" },
  { value: "Europe/London",         label: "London (GMT/BST)" },
  { value: "Europe/Lisbon",         label: "Lissabon (WET)" },
  { value: "Europe/Berlin",         label: "Berlin (MEZ)" },
  { value: "Europe/Paris",          label: "Paris (MEZ)" },
  { value: "Europe/Vienna",         label: "Wien (MEZ)" },
  { value: "Europe/Zurich",         label: "Zürich (MEZ)" },
  { value: "Europe/Rome",           label: "Rom (MEZ)" },
  { value: "Europe/Madrid",         label: "Madrid (MEZ)" },
  { value: "Europe/Warsaw",         label: "Warschau (MEZ)" },
  { value: "Europe/Athens",         label: "Athen (OEZ)" },
  { value: "Europe/Helsinki",       label: "Helsinki (OEZ)" },
  { value: "Europe/Istanbul",       label: "Istanbul (TRT)" },
  { value: "Europe/Moscow",         label: "Moskau (MSK)" },
  { value: "Asia/Dubai",            label: "Dubai (GST)" },
  { value: "Asia/Kolkata",          label: "Mumbai/Delhi (IST)" },
  { value: "Asia/Dhaka",            label: "Dhaka (BST)" },
  { value: "Asia/Bangkok",          label: "Bangkok (ICT)" },
  { value: "Asia/Singapore",        label: "Singapur (SGT)" },
  { value: "Asia/Shanghai",         label: "Shanghai (CST)" },
  { value: "Asia/Tokyo",            label: "Tokio (JST)" },
  { value: "Asia/Seoul",            label: "Seoul (KST)" },
  { value: "Australia/Perth",       label: "Perth (AWST)" },
  { value: "Australia/Adelaide",    label: "Adelaide (ACST)" },
  { value: "Australia/Sydney",      label: "Sydney (AEST)" },
  { value: "Pacific/Auckland",      label: "Auckland (NZST)" },
  { value: "Pacific/Honolulu",      label: "Honolulu (HST)" },
  { value: "America/Anchorage",     label: "Anchorage (AKST)" },
  { value: "America/Los_Angeles",   label: "Los Angeles (PT)" },
  { value: "America/Denver",        label: "Denver (MT)" },
  { value: "America/Chicago",       label: "Chicago (CT)" },
  { value: "America/New_York",      label: "New York (ET)" },
  { value: "America/Sao_Paulo",     label: "São Paulo (BRT)" },
  { value: "America/Argentina/Buenos_Aires", label: "Buenos Aires (ART)" },
];

/** Gibt die aktuelle Uhrzeit + Datum in der angegebenen Zeitzone zurück. */
export function getNowInTimezone(timezone) {
  const formatter = new Intl.DateTimeFormat("en-CA", {
    timeZone: timezone,
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
    hour: "2-digit",
    minute: "2-digit",
    hour12: false,
  });
  const parts = Object.fromEntries(
    formatter.formatToParts(new Date()).map((p) => [p.type, p.value])
  );
  return {
    date: `${parts.year}-${parts.month}-${parts.day}`,
    hour: parseInt(parts.hour, 10) % 24, // "24" → 0 absichern
    minute: parseInt(parts.minute, 10),
  };
}

/** Erkennt die lokale Zeitzone des Browsers. */
export function getLocalTimezone() {
  return Intl.DateTimeFormat().resolvedOptions().timeZone;
}
