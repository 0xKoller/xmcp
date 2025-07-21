import dotenv from "dotenv";
export { type Middleware } from "./types/middleware";
dotenv.config();

export type { ToolMetadata, ToolSchema, InferSchema } from "./types/tool";

export type { XmcpConfigOuputSchema as XmcpConfig } from "./compiler/config";
export { apiKeyAuthMiddleware } from "./auth/api-key";
export { jwtAuthMiddleware } from "./auth/jwt";
export type { OAuthConfigOptions } from "./auth/oauth";
import "./types/declarations";
