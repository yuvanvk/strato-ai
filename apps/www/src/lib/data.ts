import { DeepSeek, Gemini, GPT, Grok } from "@/components/svgs/icons";

export const MODELS = [
  {
    value: "gemini-2.5-flash",
    name: "Gemini 2.5 Flash",
    isPremium: false,
    icon: Gemini
  },
  {
    value: "Gemini 2.5 pro",
    name: "Gemini 2.5 pro",
    isPremium: true,
    icon: Gemini
  },
  {
    value: "Deepseek-R1",
    name: "Deepseek R1",
    isPremium: true,
    icon: DeepSeek
  },
  {
    value: "gpt-5",
    name: "GPT-5",
    isPremium: true,
    icon: GPT
  },
  {
    value: "gpt-5-mini",
    name: "GPT-5 mini",
    isPremium: true,
    icon: GPT
  },
  {
    value: "gpt-5-nano",
    name: "GPT-5 nano",
    isPremium: true,
    icon: GPT
  },
  {
    value: "gpt-4-mini",
    name: "GPT-4 mini",
    isPremium: true,
    icon: GPT
  },
  {
    value: "gpt-4.1",
    name: "GPT-4.1",
    isPremium: true,
    icon: GPT
  },
  {
    value: "grok-3-mini",
    name: "Grok-3 mini",
    isPremium: true,
    icon: Grok
  }
];
