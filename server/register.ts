import { Strapi } from "@strapi/strapi";
import { Route, Router } from "@strapi/types/dist/types/core/common/router";

export default ({ strapi }: { strapi: Strapi }) => {
  insertMiddlewares(strapi, ["plugin::i18n-expanded-query.acceptLocale"]);
};

function insertMiddlewares(strapi: Strapi, middlewares: string[]) {
  const routes = parseApiRoutesList(strapi);

  const localizedCTs = getLocalizedContentTypes(strapi);

  const localizedRoutes = Object.entries(routes)
    .filter(([key]) => localizedCTs.some((ct) => ct.apiName === key))
    .flatMap(([_, value]) => value);

  for (const route of localizedRoutes) {
    if (!route.config) route.config = {};
    const { config } = route;

    if (!config.middlewares) config.middlewares = [];
    config.middlewares.push(...middlewares);
  }
}

function parseApiRoutesList(strapi: Strapi): Record<string, Route[]> {
  const result: Record<string, Route[]> = {};

  Object.entries(strapi.api)
    .map(([apiName, api]) => [apiName, api.routes])
    .forEach((apiRouters) => {
      const [apiName, routers] = apiRouters as [string, Record<string, Router>];

      for (const router of Object.values(routers)) {
        if (!result[apiName]) result[apiName] = [];
        result[apiName].push(...router.routes);
      }
    });

  return result;
}

function getLocalizedContentTypes(strapi: Strapi) {
  const { contentTypes } = strapi;

  // @ts-ignore
  const { isLocalizedContentType } = strapi.service(
    "plugin::i18n.content-types"
  );

  return Object.values(contentTypes).filter(isLocalizedContentType);
}
