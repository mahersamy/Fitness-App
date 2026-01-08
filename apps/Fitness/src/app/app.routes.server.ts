import {RenderMode, ServerRoute} from "@angular/ssr";

export const serverRoutes: ServerRoute[] = [
    {
        path: ":lang/main/about",
        renderMode: RenderMode.Prerender,
    },
    {
        path: "**",
        renderMode: RenderMode.Server,
    },
];
