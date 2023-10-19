import { Strapi } from "@strapi/strapi";

export default {
  acceptLocale:
    (config, { strapi }: { strapi: Strapi }) =>
    async (ctx, next) => {
      const { id } = ctx.params;
      const { locale }: { locale: string } = ctx.request.query;

      if (id && locale) {
        const requestedLocale = await findLocalization(ctx, strapi, id, locale);

        if (requestedLocale && requestedLocale.publishedAt) {
          ctx.params.id = requestedLocale.id;
        }
      }

      await next();
    },
};

async function findLocalization(
  ctx: any,
  strapi: Strapi,
  id: string | number,
  locale: string
) {
  const { apiName }: { apiName: string } = ctx.state.route.info;

  const contentTypeUID = Object.values(strapi.contentTypes).find(
    (ct) => ct.apiName === apiName
  ).uid;

  const { localizations } = await strapi.query(contentTypeUID).findOne({
    select: [],
    where: { id },
    populate: { localizations: true },
  });

  const requestedLocale = localizations.find((l) => l.locale === locale);

  return requestedLocale;
}
