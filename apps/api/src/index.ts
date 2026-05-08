import { Hono } from "hono";
import auth from "@/routes/auth";
import ai from "@/routes/ai";

const app = new Hono({
  strict: false,
});

const routes = [
  { path: "/auth", router: auth },
  { path: "/ai", router: ai },
];

const api = app.basePath("/api/v1");
routes.forEach(({ path, router }) => api.route(path, router));

export default {
  port: 8080,
  fetch: app.fetch,
};
