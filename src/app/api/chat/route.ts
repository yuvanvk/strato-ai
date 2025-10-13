import { NextRequest, NextResponse } from "next/server";
import axios from "axios";

export async function POST(req: NextRequest) {
    try {
        

        const response = await axios.post("https://kravixstudio.com/api/v1/chat", {
            message: [{ role: "user", content: "Hi" }],
            aiModel: "gpt-5",
            outputType: "text"
        });

        
    } catch (error) {
        console.log("[CHAT_API]", error);
        return NextResponse.json({
            message: "Internal server error"
        }, { status: 500 })
    }
}