declare module 'tailwindcss/stubs/config.full.js' {
  const tailwindConfig: TailwindConfig;
  interface TailwindConfig {
    theme: {
      spacing: Record<number | string, string>;
    };
  }
  export default tailwindConfig;
}
