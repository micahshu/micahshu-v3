/** Year professional web development work began. */
const CAREER_START_YEAR = 2021

/**
 * Returns the number of full years of professional experience,
 * calculated from CAREER_START_YEAR to the current year.
 */
export function getYearsExperience(): number {
  return new Date().getFullYear() - CAREER_START_YEAR
}

/**
 * Converts a number to its English word form (1–20).
 * Falls back to the numeral string for values outside that range.
 */
const WORDS = [
  '', 'One', 'Two', 'Three', 'Four', 'Five', 'Six', 'Seven', 'Eight', 'Nine',
  'Ten', 'Eleven', 'Twelve', 'Thirteen', 'Fourteen', 'Fifteen', 'Sixteen',
  'Seventeen', 'Eighteen', 'Nineteen', 'Twenty',
]

export function toWord(n: number): string {
  return WORDS[n] ?? String(n)
}
