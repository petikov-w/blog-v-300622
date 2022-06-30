import {createRouter, createWebHistory} from "vue-router";
const routerHistory = createWebHistory();


import HomePage from "@/pages/HomePage";
import notFoundPage from "@/pages/NotFoundPage";
import Item from "@/pages/_itemAlias"
// import ThankYouPage from "@/pages/ThankYouPage";
// import AdminPage from "@/pages/AdminPage";
// import {site} from "@/_config";
const site = "Блог";

const routers = createRouter(
    {
        history: routerHistory,
        routes: [
            {
                path: "/",
                name: "home",
                component: HomePage,
                meta: {
                    title: "Главная"
                }
            },
            {
                path: "/:itemAlias",
                name: "itemAlias",
                component: Item,
                meta: {
                    title: null
                }
            },
            // {
            //     path: "/admin",
            //     name: "admin",
            //     component: AdminPage,
            //     meta: {
            //         title: "Панель администратора"
            //     }
            // },
            // {
            //     path: "/thankyou",
            //     name: "thankyou",
            //     component: ThankYouPage,
            //     meta: {
            //         title: "Страница благодарности"
            //     }
            // },
            {
                path: "/:CatchAll(.*)",
                name: "404",
                component: notFoundPage,
                meta: {
                    title: "404 - страница не найдена"
                }
            },
        ]
    }
)

routers.beforeEach((to,from, next) => {
    // document.title = `${site.title} - ${to.meta.title}`;
    document.title = `${site} - ${to.meta.title}`;
    next();
})

export default routers;