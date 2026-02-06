import fs from "fs";
import path from "path";
import { askOllama } from "./ollamaClient";

/**
 * Playwright errors contain ANSI color characters (red/green terminal colors).
 * Those look ugly inside markdown reports.
 * So we remove them before sending to AI or writing to file.
 */
function cleanTerminalFormatting(text: string) {
  return text.replace(/\u001b\[[0-9;]*m/g, "");
}

/**
 * Main function called by reporter when any test fails.
 * Responsibilities:
 * 1) Create a markdown report file
 * 2) Ask LLM for root cause + fix
 * 3) Append AI suggestion to same report
 */
export async function generateFailureReport(testTitle: string, errorMessage: string) {
  // create safe filename (remove spaces & symbols)
  const fileName = testTitle.replace(/[^a-zA-Z0-9-_]/g, "_");
  const reportPath = path.join(process.cwd(), "ai-reports", `${fileName}.md`);

  // remove colored logs from playwright error
  const cleanedError = cleanTerminalFormatting(errorMessage);

  /**
   * Step 1 — Write initial report immediately
   * We write basic failure first so report exists even if AI fails
   */
  fs.writeFileSync(
    reportPath,
`# 🤖 AI Failure Report

## Test
${testTitle}

## Error
\`\`\`
${cleanedError}
\`\`\`

## AI Analysis
`,
    "utf-8"
  );

  /**
   * Step 2 — Build prompt for LLM
   * We strictly control format so output stays consistent
   */
  const prompt = `
You are a Senior QA Automation Engineer specializing in Playwright.

Analyze this failure and respond ONLY in this format:

Category: <Assertion|Locator|Wait/Timeout|Navigation|Data|Environment|API|Other>
Probable Cause: <one line reason>
Fix Steps:
1) <step>
2) <step>
3) <step>
Code Snippet (Playwright):
<max 8 lines>

Failure:
${cleanedError}
`;

  try {
    // Step 3 — Ask local LLM (Ollama)
    const aiResponse = await askOllama(prompt);

    // fallback if model returns nothing
    const analysis =
      aiResponse && aiResponse.trim().length > 0
        ? aiResponse.trim()
        : `Category: Other
Probable Cause: Model returned empty response
Fix Steps:
1) Verify ollama service is running
Code Snippet (Playwright):
// no suggestion`;

    // Step 4 — Append AI analysis to same report
    fs.appendFileSync(reportPath, analysis + "\n", "utf-8");

    console.log(`🧠 AI analysis added -> ${reportPath}`);

  } catch (error) {
    // If AI fails, still keep report usable
    fs.appendFileSync(
      reportPath,
`Category: Other
Probable Cause: AI service error
Fix Steps:
1) Check ollama server
2) Verify model downloaded
Code Snippet (Playwright):
// AI unavailable
`,
      "utf-8"
    );

    console.log("❌ AI analysis failed:", error);
  }
}
