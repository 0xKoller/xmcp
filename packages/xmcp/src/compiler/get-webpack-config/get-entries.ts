import { runtimeFolderPath } from "@/utils/constants";
import { XmcpParsedConfig } from "@/compiler/parse-xmcp-config";
import path from "path";

/** Get what packages are gonna be built by xmcp */
export function getEntries(
  xmcpConfig: XmcpParsedConfig
): Record<string, string> {
  const entries: Record<string, string> = {};
  if (xmcpConfig.stdio) {
    entries.stdio = path.join(runtimeFolderPath, "stdio.js");
  }
  if (xmcpConfig["http"]) {
    // non adapter mode
    if (!xmcpConfig.experimental?.adapter) {
      entries["http"] = path.join(runtimeFolderPath, "http.js");
    }

    // adapter mode enabled
    if (xmcpConfig.experimental?.adapter === "express") {
      entries["adapter"] = path.join(runtimeFolderPath, "adapter-express.js");
    }
    if (xmcpConfig.experimental?.adapter === "nextjs") {
      entries["adapter"] = path.join(runtimeFolderPath, "adapter-nextjs.js");
    }
  }
  return entries;
}
