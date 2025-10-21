import { NextRequest, NextResponse } from "next/server";
import axios from "axios";
import { getServerSession } from "@/lib/server";
import prisma from "@/lib/prisma";

export async function POST(req: NextRequest) {
  try {
    
    const session = await getServerSession();
    if(!session) {
        return NextResponse.json({
            message: "Unauthorized"
        }, { status: 401 })
    }
    

    const { message, model, id } = await req.json();
    console.log(message, model, id);
    

    if (!message || !model || !id) {
      return NextResponse.json(
        {
          message: "Invalid inputs",
        },
        { status: 400 },
      );
    }
    
    await prisma.message.create({
      data: {
        content: message[0].content,
        chatId: id,
        model,
        role: "USER"
      }
    });
    
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

    await prisma.message.create({
      data: {
        model,
        chatId: id,
        role: "AI",
        content: response.data.aiResponse
      }
    })
    
    return NextResponse.json(response.data);

  } catch (error: any) {
    console.log("[CHAT_API]",error?.response?.data || error.message || error);
    return NextResponse.json(
      {
        message: "Internal server error",
      },
      { status: 500 },
    );
  }
}


export async function GET(req: NextRequest) {
  try {
    const user = await getServerSession();
    if(!user) {
      return NextResponse.json({ message: "Unauthorized"}, { status: 401 })
    }

    const chats = await prisma.chat.findMany({ where: { userId: user.session.userId }});

    return NextResponse.json({ chats })
  } catch (error) {
    console.log("[GET_CHATS]", error);
    
  }
}


export async function DELETE(req: NextRequest) {
  try {
      const user = await getServerSession();
      if(!user) {
        return NextResponse.json({ message: "Unauthorized" }, { status: 401 })
      }

      const searchParams = req.nextUrl.searchParams;
      const id = searchParams.get("id");

      if(!id) {
        return NextResponse.json({ message: "Id not provided" }, { status: 411 })
      }

      await prisma.chat.delete({
        where: {
          userId: user.session.userId,
          id
        }
      });

      return NextResponse.json({ message: "Deleted successfully" });
  } catch (error) {
    console.log("[DELETE_CHAT]", error)
  }
}


export async function PATCH(req: NextRequest) {
    try {
        const user = await getServerSession();
        if(!user) {
          return NextResponse.json({ message: "Unauthorized"}, { status: 401 })
        }

        const { id, rename } = await req.json();
        
        const chat = await prisma.chat.update({
         where: {
          id,
          userId: user.session.userId
         },
         data: {
          title: rename
         }
        })

        return NextResponse.json({ message: "Changed successfully"});
        
    } catch (error) {
      console.log("[CHAT_PATCH]", error);
      
    }
}
