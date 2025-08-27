import { inngest } from "./client";
import { gemini, createAgent } from "@inngest/agent-kit";
export const helloWorld = inngest.createFunction(
  { id: "hello-world" },
  { event: "test/hello.world" },
  async ({ event }) => {
     const codeAgent = createAgent({
      name: "codeAgent",
      system: "You are an expert next.js developer.  You write readable and maintainable code. You write simple next.js & react snippets",
      model: gemini({ model: "gemini-2.0-flash" }),
    });
    const { output } = await codeAgent.run(`Write the code snippet: ${event.data.value}`)
    return {
      output
    }
  },
);
