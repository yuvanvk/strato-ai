import { auth } from "./auth";
import { headers } from "next/headers";

export const getServerSession = async () => {
    const session = auth.api.getSession({
        headers: await headers()
    })

    return session;
}