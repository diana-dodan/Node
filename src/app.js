import router from "./routes.js";
import routeMatcher from "./utils/route-matcher.js";
import getRequestData from "./utils/get-request-data.js";

const requestHandler = async (req, res) => {
  const { method, url } = req;
  const { address, port } = req.socket.server.address();
  const incomingUrl = `http://${address}:${port}${url}`;

  // Verify if there is any route that match the request url
  const matches = routeMatcher(router, incomingUrl, method);
  if (matches.length > 0) {
    for (const { handler, params } of matches) {
      req.params = params;

      // If there is a request body, this is processed
      if (req.headers["content-length"] > 0) {
        req.body = await getRequestData(req);
      }

      // Call each matching handler
      handler(req, res);
    }
  } else {
    // Handle unmatched route
    res.statusCode = 404;
    res.end();
  }
};

export default requestHandler;
