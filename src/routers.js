import {createRouter, createWebHistory} from "vue-router";
const routerHistory = createWebHistory();


import HomePage from "@/pages/HomePage";
import notFoundPage from "@/pages/NotFoundPage";
import ItemPost from "@/pages/PostPage"
import AdminPageMainSet from "@/pages/AdminPageMainSet";
import AdminPagePostSet from "@/pages/AdminPagePostSet";

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
                path: "/post/:post",
                name: "post",
                component: ItemPost,
                meta: {
                    title: ""
                }
            },
            {
                path: "/admin/main",
                name: "admin-main",
                component: AdminPageMainSet,
                meta: {
                    title: "Панель администратора"
                }
            },
            {
                path: "/admin/posts",
                name: "admin-post",
                component: AdminPagePostSet,
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