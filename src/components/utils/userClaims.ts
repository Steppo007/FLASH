/**
 * Extracts initials from user claims data.
 *
 * @param parameters - The user claims object containing name information
 * @param parameters.givenName - The user's first name
 * @param parameters.familyName - The user's last name
 * @param parameters.name - The user's full name (used as fallback if given/family names aren't available)
 *
 * @returns A string containing up to 2 uppercase initials derived from the name data, or null if no valid name data is available
 *
 * @remarks
 * All input strings are sanitized to remove any characters that are not letters, numbers, or whitespace
 * using Unicode-aware regular expressions. This ensures that only valid alphanumeric characters are used
 * for generating initials.
 *
 * @example
 * // Returns "JD"
 * getInitialsFromUserClaims({ givenName: "John", familyName: "Doe" });
 *
 * @example
 * // Returns "JD"
 * getInitialsFromUserClaims({ name: "John Doe" });
 *
 * @example
 * // Returns "JD" (first and last parts of multi-part name)
 * getInitialsFromUserClaims({ name: "John Middle Doe" });
 *
 * @example
 * // Returns "ÁK" (special characters are removed during sanitization)
 * getInitialsFromUserClaims({ givenName: "$Á$rpád", familyName: "[Kálmán]" });
 */
export function getInitialsFromUserClaims(parameters: {
  givenName?: string;
  familyName?: string;
  name?: string;
}): string | null {
  const { givenName, familyName, name } = parameters;
  let result = null;

  // Helper function to sanitize strings
  const sanitize = (str: string): string => {
    return str.replace(/[^\p{L}\p{N}\s]/gu, '');
  };

  if (givenName && familyName) {
    const sanitizedGivenName = sanitize(givenName);
    const sanitizedFamilyName = sanitize(familyName);

    if (sanitizedGivenName.length > 0 && sanitizedFamilyName.length > 0) {
      result = sanitizedGivenName[0] + sanitizedFamilyName[0];
    }
  } else if (name) {
    const sanitizedName = sanitize(name).trim();
    const nameParts = sanitizedName.split(/\s+/);

    if (
      nameParts.length >= 2 &&
      nameParts[0].length > 0 &&
      nameParts[nameParts.length - 1].length > 0
    ) {
      result = nameParts[0][0] + nameParts[nameParts.length - 1][0];
    } else if (sanitizedName.length > 0) {
      result =
        sanitizedName.length > 2 ? sanitizedName.slice(0, 2) : sanitizedName;
    }
  }

  return result?.toUpperCase() ?? null;
}
