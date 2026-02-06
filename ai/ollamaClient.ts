/**
 * Simple client to talk with local Ollama LLM
 * We send Playwright failure message and get debugging suggestion
 */

export async function askOllama(prompt: string): Promise<string> {
  // Ollama runs locally like a small AI server
  const response = await fetch("http://localhost:11434/api/generate", {
    method: "POST",
    headers: { "Content-Type": "application/json" },

    // model + prompt = basically asking AI a question
    body: JSON.stringify({
      model: "llama3",
      prompt: prompt,
      stream: false, // wait for full answer instead of token streaming
    }),
  });

  // if AI service not running / failed
  if (!response.ok) {
    const errorText = await response.text();
    throw new Error(`Ollama error ${response.status}: ${errorText}`);
  }

  // Ollama returns { response: "text" }
  const data = (await response.json()) as { response?: string };

  // clean output
  return (data.response || "").trim();
}
