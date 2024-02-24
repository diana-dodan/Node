const routeMatcher = (router, url, method) => {
  return router.reduce((matchingRoutes, route) => {
    const { urlPattern, method: routeMethod, handler } = route;
    if (urlPattern.test(url) && method === routeMethod) {
      const params = urlPattern.exec(url).pathname.groups;

      matchingRoutes.push({ handler, params });
    }

    return matchingRoutes;
  }, []);
};

export default routeMatcher;
