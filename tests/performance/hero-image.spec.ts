import { expect, test } from "@playwright/test";
import { formatBytes, performanceBudgets } from "./support/budgets";

test.describe("Hero image", () => {
  test("delivers the hero image within the byte budget", async ({ page }) => {
    const heroResponse = page.waitForResponse((response) => {
      const requestURL = new URL(response.url());

      return (
        requestURL.pathname === "/speaker-hero.png" ||
        requestURL.searchParams.get("url") === "/speaker-hero.png"
      );
    });

    await page.goto("/");

    const response = await heroResponse;
    expect(response.ok(), "Expected the hero image request to succeed.").toBe(true);

    const responseBody = await response.body();
    const deliveredBytes = responseBody.byteLength;

    expect(
      deliveredBytes,
      `Expected the hero image to be at most ${formatBytes(performanceBudgets.heroImageBytes)}, but the browser received ${formatBytes(deliveredBytes)}.`,
    ).toBeLessThanOrEqual(performanceBudgets.heroImageBytes);
  });

  test("declares a stable aspect ratio for the hero image", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const heroImage = page.getByRole("img", { name: "Still One wireless speaker" });
    const reservesAspectRatio = await heroImage.evaluate((image) => {
      const width = Number(image.getAttribute("width"));
      const height = Number(image.getAttribute("height"));
      const imageAspectRatio = getComputedStyle(image).aspectRatio;
      const mediaContainer = image.closest(".hero-media");
      const containerAspectRatio = mediaContainer
        ? getComputedStyle(mediaContainer).aspectRatio
        : "auto";

      return (
        (width > 0 && height > 0) ||
        imageAspectRatio !== "auto" ||
        containerAspectRatio !== "auto"
      );
    });

    expect(
      reservesAspectRatio,
      "Expected intrinsic image dimensions or a CSS aspect ratio on the image or its media container.",
    ).toBe(true);
  });

  test("loads the above-the-fold hero image eagerly", async ({ page }) => {
    await page.goto("/", { waitUntil: "domcontentloaded" });

    const heroImage = page.getByRole("img", { name: "Still One wireless speaker" });

    await expect(
      heroImage,
      "Expected the LCP candidate to start loading without lazy-loading deferral.",
    ).toHaveAttribute("loading", "eager");
  });
});
