const MONTHS = ['Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec'];

/** 'YYYY-MM' -> 'Sep 2026', 'YYYY' -> '2026' */
export function formatMonth(d: string): string {
  const [y, m] = d.split('-');
  return m ? `${MONTHS[+m - 1]} ${y}` : y;
}

export function formatRange(e: { start?: string; end?: string; when?: string }): string {
  if (e.when) return e.when;
  if (!e.start) return '';
  return `${formatMonth(e.start)} – ${e.end ? formatMonth(e.end) : 'present'}`;
}

export function year(d: string): string {
  return d.split('-')[0];
}
