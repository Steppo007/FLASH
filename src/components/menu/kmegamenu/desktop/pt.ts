/**
 * Generates PrimeReact passthrough options for the overlay panel
 *
 * @param options - Configuration options for the overlay
 * @returns PrimeReact passthrough object for styling and behavior
 */
export function getOverlayPTOptions(options: {
  isSimpleItemSelected: boolean;
}) {
  return {
    root: {
      className: 'kro-d-megamenu-panel',
      style: {
        display: options.isSimpleItemSelected ? 'none' : 'block',
      },
    },
  };
}
