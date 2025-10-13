import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "@/lib/server";

export async function POST(req: NextRequest) {
  try {
    
    const session = await getServerSession();
    if(!session) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 400 })
    }
    console.log(session);
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
