import { Hono } from "hono";
import { auth } from "@workspace/better-auth/server";
import { Bindings } from "@/types";

const router = new Hono<{ Bindings: Bindings }>({ strict: false });

router.on(["POST", "GET", "OPTIONS"], '/*', (c) => {
    return auth(c.env).handler(c.req.raw)
});

export default router;