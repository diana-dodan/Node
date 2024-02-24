import { URLPattern } from "urlpattern-polyfill";

export const router = [];

/**
 *
 * @param {string} method
 * @param {string} pattern
 * @param {(req: IncomingMessage, res: ServerResponse) => void} handler
 */
export const defineRoute = (method, pattern, handler) => {
  const urlPattern = new URLPattern({ pathname: pattern });

  router.push({ method, pattern, urlPattern, handler });
};
