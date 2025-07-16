// packages/xmcp/src/types/tool.ts
import { z } from "zod";

export interface ToolAnnotations {
  /** Human-readable title for the tool */
  title?: string;
  /** If true, the tool does not modify its environment */
  readOnlyHint?: boolean;
  /** If true, the tool may perform destructive updates */
  destructiveHint?: boolean;
  /** If true, repeated calls with same args have no additional effect */
  idempotentHint?: boolean;
  /** If true, tool interacts with external entities */
  openWorldHint?: boolean;
  [key: string]: any;
}

export interface ToolMetadata {
  /** Unique identifier for the tool */
  name: string;
  /** Human-readable description */
  description: string;
  /** Optional hints about tool behavior */
  annotations?: ToolAnnotations;
}

export interface Tool {
  type: string;
  handler: (args: any) => any;
  metadata: ToolMetadata;
  schema: Record<string, z.ZodType>;
}

export type ToolSchema = Record<
  string,
  z.ZodType<unknown, z.ZodTypeDef, unknown>
>;

export type InferSchema<T extends ToolSchema> = {
  [K in keyof T]: z.infer<T[K]>;
};
