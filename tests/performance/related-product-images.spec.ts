import { expect, test } from "@playwright/test";
import { formatBytes, performanceBudgets } from "./support/budgets";

const relatedProductImages = [
  "/still-stand.png",
  "/still-remote.png",
  "/still-cable.png",
];

test("delivers responsive, deferred related product images", async ({ page }) => {
  const imageResponses = relatedProductImages.map((source) =>
    page.waitForResponse((response) => {
      const requestURL = new URL(response.url());

      return (
        requestURL.pathname === source || requestURL.searchParams.get("url") === source
      );
    }),
  );

  await page.goto("/");

  const collection = page.locator("#collection");
  const images = collection.getByRole("img");

  await expect(images).toHaveCount(relatedProductImages.length);

  for (const image of await images.all()) {
    await expect(image).toHaveAttribute("loading", "lazy");
    await expect(image).toHaveAttribute("srcset", /_next\/image/);
    await expect(image).toHaveAttribute("sizes", /vw/);
  }

  await collection.scrollIntoViewIfNeeded();

  for (const response of await Promise.all(imageResponses)) {
    const requestURL = new URL(response.url());
    const deliveredBytes = (await response.body()).byteLength;

    expect(response.ok(), "Expected the product image request to succeed.").toBe(true);
    expect(
      requestURL.pathname,
      "Expected Next.js to optimize the related product image.",
    ).toBe("/_next/image");
    expect(
      deliveredBytes,
      `Expected each related product image to be at most ${formatBytes(performanceBudgets.relatedProductImageBytes)}, but the browser received ${formatBytes(deliveredBytes)}.`,
    ).toBeLessThanOrEqual(performanceBudgets.relatedProductImageBytes);
  }
});
