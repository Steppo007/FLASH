export type PackageLock = Package;

interface Package {
  version: string;
  packages: Record<string, Package>;
}
