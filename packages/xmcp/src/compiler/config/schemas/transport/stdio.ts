import { z } from "zod";

// ------------------------------------------------------------
// stdio transport config schema
// ------------------------------------------------------------
export const stdioTransportConfigSchema = z
  .union([
    z.boolean(),
    z.object({
      debug: z.boolean().default(false),
    }),
  ])
  .optional();

export type StdioTransportConfig = z.infer<typeof stdioTransportConfigSchema>;
