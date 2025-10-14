"use client";

import { MessageContext } from "@/context/MessageContext"
import { useContext } from "react"

export const ChatMessages = () => {

    const { messages } = useContext(MessageContext)

    return (
        <div className="max-w-4xl mx-auto py-10">
            {messages.length > 0 && messages.map((message) => (
                <div className={`${message.role === "ai" ? "bg-blue-500" : "bg-lime-500"}`}>{message.message}</div>
            ))}
        </div>
    )
}