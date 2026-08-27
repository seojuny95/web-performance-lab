import { expect, test } from "@playwright/test";

const productTagline = "One speaker for a quieter room.";

test.use({ javaScriptEnabled: false });

test("renders primary product content without client-side JavaScript", async ({ page, baseURL }) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL is required for the server rendering test.");
  }

  const applicationOrigin = new URL(baseURL).origin;

  await page.route("**/*", async (route) => {
    const requestOrigin = new URL(route.request().url()).origin;

    if (requestOrigin !== applicationOrigin) {
      await route.abort("blockedbyclient");
      return;
    }

    await route.continue();
  });

  const response = await page.goto("/", { waitUntil: "domcontentloaded" });

  expect(response?.ok(), "Expected the product page to return a successful response.").toBe(true);
  await expect(
    page.getByText(productTagline),
    "Expected the product tagline to be visible without client-side JavaScript.",
  ).toBeVisible({ timeout: 1_000 });
});
