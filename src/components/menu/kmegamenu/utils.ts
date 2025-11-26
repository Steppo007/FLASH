/**
 * Extracts the numeric pixel value from a string containing CSS pixel units.
 *
 * @param stringValue - A string potentially containing a numeric value (e.g., "16px", "100", "24px solid")
 * @returns The extracted numeric value as an integer, or NaN if no numeric value is found
 */
export function extractPxValueFromString(stringValue?: string): number {
  const match = (stringValue ?? '').match(/(\d+)/);
  return match ? parseInt(match[1], 10) : NaN;
}
