import { expect, test } from "@playwright/test";

test("does not load an external stylesheet on the critical path", async ({ page, baseURL }) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL is required for the font loading test.");
  }

  const applicationOrigin = new URL(baseURL).origin;
  const externalStylesheetURLs: string[] = [];

  await page.route("**/*", async (route) => {
    const request = route.request();
    const requestURL = new URL(request.url());

    if (request.resourceType() === "stylesheet" && requestURL.origin !== applicationOrigin) {
      externalStylesheetURLs.push(request.url());
      await route.abort("blockedbyclient");
      return;
    }

    await route.continue();
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });

  expect(
    externalStylesheetURLs,
    `Expected no external stylesheet on the critical path, but received: ${externalStylesheetURLs.join(", ")}`,
  ).toHaveLength(0);
});
