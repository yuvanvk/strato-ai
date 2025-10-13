import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
  try {
    // console.log("control here");

    const { message, model } = await req.json();

    if (!message || !model) {
      return NextResponse.json(
        {
          message: "Invalid inputs",
        },
        { status: 401 },
      );
    }

    const response = await axios.post(
      "https://kravixstudio.com/api/v1/chat",
      {
        message, 
        aiModel: model,
        outputType: "text", 
      },
      {
        headers: {
          "Content-Type": "application/json", 
          Authorization: "Bearer " + process.env.KRAVIXSTUDIO_API_KEY, 
        },
      },
    );

    return NextResponse.json(response.data);

  } catch (error) {
    console.log("[CHAT_API]", error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}
