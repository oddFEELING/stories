import {
  index,
  layout,
  route,
  type RouteConfig,
} from "@react-router/dev/routes";

export default [
  layout("./components/layouts/app-layout.tsx", [
    // ~ ======= landing layout -->
    layout("./components/layouts/landing-layout.tsx", [
      index("./routes/home.tsx"),
      route("/create", "./routes/create.tsx"),
      route("/explore", "./routes/explore.tsx"),
      layout("./routes/protected/protected.tsx", [
        route("/library", "./routes/protected/library.tsx"),
      ]),
      route("/stories/:story_id", "./routes/stories.story_id.tsx"),
    ]),

    // ~ ======= now reading route  -->
    route("/now-reading/:story_id", "./routes/now-reading.tsx"),
  ]),
] satisfies RouteConfig;
