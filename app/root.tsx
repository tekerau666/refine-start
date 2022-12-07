import type { MetaFunction } from "@remix-run/node";
import {
  Links,
  LiveReload,
  Meta,
  Outlet,
  Scripts,
  ScrollRestoration,
} from "@remix-run/react";

import { Refine } from "@pankod/refine-core";
import {
  notificationProvider,
  Layout,
  ReadyPage,
  ErrorComponent,
} from "@pankod/refine-antd";

import routerProvider from "@pankod/refine-remix-router";

import dataProvider from "@pankod/refine-nestjsx-crud";
import resetStyle from "@pankod/refine-antd/dist/reset.min.css";
import antdStyle from "@pankod/refine-antd/dist/antd.min.css";
import { PostList, PostCreate, PostEdit, PostShow } from "~/components/posts";

const API_URL = "https://api.nestjsx-crud.refine.dev";

export const meta: MetaFunction = () => ({
  charset: "utf-8",
  title: "New Remix + Refine App",
  viewport: "width=device-width,initial-scale=1",
});

export default function App() {
  return (
    <html lang="en">
      <head>
        <Meta />
        <Links />
      </head>
      <body>
        <Refine
          routerProvider={routerProvider}
          dataProvider={dataProvider(API_URL)}
          notificationProvider={notificationProvider}
          Layout={Layout}
          ReadyPage={ReadyPage}
          catchAll={<ErrorComponent />}
          resources={[
            {
              name: "posts",
              list: PostList,
              create: PostCreate,
              edit: PostEdit,
              show: PostShow,
            },
          ]}
        >
          <Outlet />
        </Refine>

        <ScrollRestoration />
        <Scripts />
        <LiveReload />
      </body>
    </html>
  );
}

export function links() {
  return [
    { rel: "stylesheet", href: antdStyle },
    { rel: "stylesheet", href: resetStyle },
  ];
}
