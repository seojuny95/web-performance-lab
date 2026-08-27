import { expect, test } from "@playwright/test";

const videoPath = "/speaker-demo.mp4";

test("does not request the offscreen video before the story enters the viewport", async ({ page }) => {
  const videoRequests: string[] = [];
  let videoLoadedSuccessfully = false;

  page.on("request", (request) => {
    if (new URL(request.url()).pathname === videoPath) {
      videoRequests.push(request.url());
    }
  });

  page.on("response", (response) => {
    if (new URL(response.url()).pathname === videoPath && response.ok()) {
      videoLoadedSuccessfully = true;
    }
  });

  await page.goto("/", { waitUntil: "domcontentloaded" });

  const story = page.locator("#story");
  const video = story.locator("video");

  await expect(
    story,
    "Expected the story section to begin outside the initial viewport.",
  ).not.toBeInViewport({ ratio: 0.1 });

  await expect(video).toHaveAttribute("width", "1920");
  await expect(video).toHaveAttribute("height", "1080");
  await expect(video).toHaveAttribute(
    "poster",
    "/speaker-demo-poster.jpg",
  );

  const aspectRatio = await video.evaluate((element) => {
    const { width, height } = element.getBoundingClientRect();

    return width / height;
  });

  expect(
    aspectRatio,
    "Expected the video to reserve its 16:9 layout before loading.",
  ).toBeCloseTo(16 / 9, 2);

  await page.waitForTimeout(750);

  expect(
    videoRequests,
    `Expected no video request above the fold, but received: ${videoRequests.join(", ")}`,
  ).toHaveLength(0);

  await story.scrollIntoViewIfNeeded();
  await expect(story).toBeInViewport({ ratio: 0.1 });

  await expect
    .poll(() => videoRequests.length, {
      message: "Expected the video to load after the story entered the viewport.",
    })
    .toBeGreaterThan(0);

  await expect
    .poll(() => videoLoadedSuccessfully, {
      message: "Expected the deferred video request to succeed.",
    })
    .toBe(true);
});
