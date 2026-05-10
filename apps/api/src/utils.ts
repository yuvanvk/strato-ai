import axios, { AxiosError } from "axios";

export async function getChatCompletion(
  model: string,
  converstions?: {role: string, content: string}[],
) {
  try {
    const response = await axios.post(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        model: "baidu/cobuddy:free",
        messages: converstions,
      },
      {
        headers: {
          "Content-Type": "application/json",
          Authorization: `Bearer ${process.env.OPENROUTER_API_KEY}`,
        },
        responseType: "stream"
      },
    );

    return response.data
  } catch (error) {
    if (error instanceof AxiosError) {
      console.log(error.message);
    }
  }
}
