import type { LoaderFunction } from "@remix-run/node";
import { json } from "@remix-run/node";
import { parseTableParams } from "@pankod/refine-core";
import {
  RemixRouteComponent,
  handleRefineParams,
} from "@pankod/refine-remix-router";

import dataProvider from "@pankod/refine-nestjsx-crud";
const API_URL = "https://api.nestjsx-crud.refine.dev";

export const loader: LoaderFunction = async ({ params, request }) => {
  const refineSplatParams = handleRefineParams(params["*"]);

  const {
    resource = undefined,
    action = undefined,
    id = undefined,
  } = { ...refineSplatParams, ...params };

  const url = new URL(request.url);

  try {
    if (resource && action === "show" && id) {
      const data = await dataProvider(API_URL).getOne({
        resource: `${resource}`.slice(`${resource}`.lastIndexOf("/") + 1),
        id,
      });

      return json({ initialData: data });
    } else if (resource && !action && !id) {
      const { parsedCurrent, parsedPageSize, parsedSorter, parsedFilters } =
        parseTableParams(url.search);

      const data = await dataProvider(API_URL).getList({
        resource: `${resource}`.slice(`${resource}`.lastIndexOf("/") + 1),
        filters: parsedFilters,
        pagination: {
          current: parsedCurrent || 1,
          pageSize: parsedPageSize || 10,
        },
        sort: parsedSorter,
      });

      return json({ initialData: data });
    }

    return null;
  } catch (error) {
    return json({});
  }
};

export default RemixRouteComponent;

/**
 * To define a custom initial route for refine to redirect and start with:
 *
 * Bind the `initialRoute` value to the `RemixRouteComponent` like the following:
 *
 * export default RemixRouteComponent.bind({ initialRoute: "/posts" });
 *
 **/
