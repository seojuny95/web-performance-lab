import { expect, test } from "@playwright/test";
import { performanceBudgets } from "./support/budgets";

test("makes all product sections available within the parallel data budget", async ({ page }) => {
  await page.goto("/", { waitUntil: "domcontentloaded" });
  await Promise.all([
    page.getByText("One speaker for a quieter room.").waitFor(),
    page.getByText("Every instrument stays clear, even at low volume.").waitFor(),
    page.getByRole("heading", { name: "Still Cable" }).waitFor(),
  ]);

  const dataReadyMilliseconds = await page.evaluate(() => performance.now());

  expect(
    dataReadyMilliseconds,
    `Expected all independent sections within ${performanceBudgets.dataReadyMilliseconds}ms, but they took ${dataReadyMilliseconds.toFixed(0)}ms.`,
  ).toBeLessThanOrEqual(performanceBudgets.dataReadyMilliseconds);
});
