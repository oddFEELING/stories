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
      route("/library", "./routes/library.tsx"),
    ]),
  ]),
] satisfies RouteConfig;
