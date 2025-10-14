"use client";

import { MessageContext } from "@/context/MessageContext"
import { useContext } from "react"

export const ChatMessages = () => {

    const { messages } = useContext(MessageContext)

    return (
        <div className="max-w-4xl mx-auto py-10">
            Hi from ChatMessages
        </div>
    )
}