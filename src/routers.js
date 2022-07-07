import {createRouter, createWebHistory} from "vue-router";
const routerHistory = createWebHistory();


import HomePage from "@/pages/HomePage";
import notFoundPage from "@/pages/NotFoundPage";
import ItemPost from "@/pages/PostPage"
import AdminPage from "@/pages/AdminPage";

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
                path: "/:post",
                name: "post",
                component: ItemPost,
                meta: {
                    title: null
                }
            },
            {
                path: "/admin",
                name: "admin",
                component: AdminPage,
                meta: {
                    title: "Панель администратора"
                }
            },
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