import {
  getResolvedHttpConfig,
  getResolvedCorsConfig,
  getResolvedPathsConfig,
  getResolvedOAuthConfig,
} from "./utils";
import { HttpTransportConfig } from "./schemas/transport/http";

export function injectHttpVariables(
  httpConfig: HttpTransportConfig | boolean,
  mode: string
) {
  const resolvedConfig = getResolvedHttpConfig(httpConfig);
  if (!resolvedConfig) return {};

  return {
    HTTP_CONFIG: JSON.stringify({
      port: resolvedConfig.port,
      host: resolvedConfig.host,
      bodySizeLimit: resolvedConfig.bodySizeLimit,
      endpoint: resolvedConfig.endpoint,
      stateless: true,
      debug: mode === "development",
    }),
  };
}

export type HttpVariables = ReturnType<typeof injectHttpVariables>;

export function injectCorsVariables(httpConfig: HttpTransportConfig | null) {
  const corsConfig = getResolvedCorsConfig(httpConfig);

  return {
    HTTP_CORS_CONFIG: JSON.stringify({
      origin: corsConfig.origin ?? "",
      methods: corsConfig.methods ?? "",
      allowedHeaders: corsConfig.allowedHeaders ?? "",
      exposedHeaders: corsConfig.exposedHeaders ?? "",
      credentials: corsConfig.credentials ?? false,
      maxAge: corsConfig.maxAge ?? 0,
    }),
  };
}

export type CorsVariables = ReturnType<typeof injectCorsVariables>;

export function injectOAuthVariables(userConfig: any) {
  const oauthConfig = getResolvedOAuthConfig(userConfig);

  return {
    OAUTH_CONFIG: JSON.stringify(oauthConfig),
  };
}

export type OAuthVariables = ReturnType<typeof injectOAuthVariables>;

export function injectPathsVariables(userConfig: any) {
  const pathsConfig = getResolvedPathsConfig(userConfig);

  return {
    TOOLS_PATH: JSON.stringify(pathsConfig.tools),
  };
}

export type PathsVariables = ReturnType<typeof injectPathsVariables>;

export function injectStdioVariables(stdioConfig: any) {
  if (!stdioConfig) return {};

  const debug = typeof stdioConfig === "object" ? stdioConfig.debug : false;

  return {
    STDIO_DEBUG: debug,
  };
}

export type StdioVariables = ReturnType<typeof injectStdioVariables>;

export type InjectedVariables =
  | HttpVariables
  | CorsVariables
  | OAuthVariables
  | PathsVariables
  | StdioVariables;
