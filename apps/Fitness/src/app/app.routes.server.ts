import {RenderMode, ServerRoute} from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
    {
        path: ":lang/main/about",
        renderMode: RenderMode.Prerender,
    },
    {
        path: ":lang/main/details",
        renderMode: RenderMode.Client,
    },
    {
        path: "**",
        renderMode: RenderMode.Server,
    },
];
