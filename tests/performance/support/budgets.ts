const KILOBYTE = 1024;

export const performanceBudgets = {
  heroImageBytes: 500 * KILOBYTE,
  relatedProductImageBytes: 300 * KILOBYTE,
  dataReadyMilliseconds: 1_800,
} as const;

export function formatBytes(bytes: number) {
  return `${(bytes / KILOBYTE).toFixed(0)} KB`;
}
