import { expect, test } from "@playwright/test";

const shellContent = "One speaker for a quieter room.";
const delayedContent = "Every instrument stays clear, even at low volume.";

function expectArrivalTime(
  arrivalTime: number | undefined,
  message: string,
): asserts arrivalTime is number {
  expect(arrivalTime, message).toBeDefined();
}

function removeScriptContent(html: string) {
  return html.replace(/<script\b[^>]*>[\s\S]*?(?:<\/script>|$)/gi, "");
}

test("streams primary product content before delayed reviews", async ({ baseURL }) => {
  if (!baseURL) {
    throw new Error("Playwright baseURL is required for the streaming test.");
  }

  const response = await fetch(new URL("/", baseURL));
  expect(response.ok, "Expected the product page to return a successful response.").toBe(true);

  const reader = response.body?.getReader();

  if (!reader) {
    throw new Error("Expected the page response to expose a readable stream.");
  }

  const decoder = new TextDecoder();
  const startedAt = performance.now();
  let receivedHTML = "";
  let shellReceivedAt: number | undefined;
  let delayedContentReceivedAt: number | undefined;

  while (true) {
    const { done, value } = await reader.read();

    if (done) {
      receivedHTML += decoder.decode();
      break;
    }

    receivedHTML += decoder.decode(value, { stream: true });
    const renderableHTML = removeScriptContent(receivedHTML);
    const elapsed = performance.now() - startedAt;

    if (shellReceivedAt === undefined && renderableHTML.includes(shellContent)) {
      shellReceivedAt = elapsed;
    }

    if (delayedContentReceivedAt === undefined && renderableHTML.includes(delayedContent)) {
      delayedContentReceivedAt = elapsed;
    }
  }

  expectArrivalTime(shellReceivedAt, "Expected primary product content in the streamed response.");
  expectArrivalTime(delayedContentReceivedAt, "Expected review content in the streamed response.");

  expect(
    delayedContentReceivedAt,
    "Expected primary product content to arrive before delayed reviews.",
  ).toBeGreaterThan(shellReceivedAt);
});
