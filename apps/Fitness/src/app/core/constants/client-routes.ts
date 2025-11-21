export const CLIENT_ROUTES = {
    root: "",

    main: {
        base: "main",
        home: "home",
        about: "about",
        classes: "classes",
        meals: "meals",
        account: "account",
    },
    auth: {
        base: "auth",
        login: "login",
    },
} as const;

export type ClientRoutes = typeof CLIENT_ROUTES;
