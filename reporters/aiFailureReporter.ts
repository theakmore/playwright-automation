// This log helps confirm Playwright actually loads our custom reporter
console.log("AI Failure Reporter loaded");

import type {
  FullConfig,
  Reporter,
  TestCase,
  TestResult,
  FullResult,
} from "@playwright/test/reporter";

import { generateFailureReport } from "../ai/failureAnalyzer";

/**
 * Custom Playwright Reporter
 * Purpose:
 * Whenever a test fails → ask AI to analyze failure → generate markdown report
 */
class AIFailureReporter implements Reporter {

  // We store async tasks because Playwright ends execution immediately after tests
  // If we don't wait — AI calls may get killed before finishing
  private pendingReports: Promise<void>[] = [];

  // Runs once at the beginning of execution
  onBegin(config: FullConfig) {
    console.log("AI Failure analysis enabled for this run");
  }

  // Runs after EACH test
  onTestEnd(test: TestCase, result: TestResult) {
    console.log(`Test Finished -> ${test.title} : ${result.status}`);

    // Only care about failures / timeouts / interrupted tests
    if (result.status !== "passed" && result.status !== "skipped") {

      // Sometimes Playwright gives message, sometimes stack, sometimes nothing
      // so we safely pick whatever exists
      const errorMessage =
        result.error?.message ||
        result.error?.stack ||
        `Test ended with status: ${result.status}`;

      // Call AI analyzer (async)
      const reportPromise = generateFailureReport(test.title, errorMessage)
        .catch(err => console.log("AI report generation error:", err));

      // store promise so we can wait later
      this.pendingReports.push(reportPromise);
    }
  }

  // Runs once after all tests
  async onEnd(result: FullResult) {
    console.log(`Waiting for ${this.pendingReports.length} AI reports...`);

    // wait for all AI responses to finish before Playwright exits
    await Promise.allSettled(this.pendingReports);

    console.log("All AI failure reports generated");
  }
}

export default AIFailureReporter;
