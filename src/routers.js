import {createRouter, createWebHistory} from "vue-router";
const routerHistory = createWebHistory();


import HomePage from "@/pages/HomePage";
import notFoundPage from "@/pages/NotFoundPage";
import ItemPost from "@/pages/PostPage"
// import AdminPageMainSet from "@/pages/AdminPageMainSet";
// import AdminPagePostSet from "@/pages/AdminPagePostSet";
import AdminPanel from "@/components/AdminPanel";

 // import {useStore} from "vuex";


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
                path: "/admin",
                name: "admin",
                // component: AdminPageMainSet,
                component: AdminPanel,
                meta: {
                    title: "Панель администратора"
                }
            },
            {
                path: "/admin/main",
                name: "admin-main",
                // component: AdminPageMainSet,
                component: AdminPanel,
                meta: {
                    title: "Панель администратора"
                }
            },
            {
                path: "/admin/posts",
                name: "admin-posts-list",
                //name: "admin-new-post",
                component: AdminPanel,
                meta: {
                    title: "Панель администратора"
                }
            },
            {
                path: "/admin/posts/new",
                name: "admin-post-new",
                component: AdminPanel,
                meta: {
                    title: "Панель администратора"
                }
            },
            {
                path: "/admin/posts/update",
                name: "admin-post-update",
                component: AdminPanel,
                meta: {
                    title: "Панель администратора"
                }
            },
            {
                path: "/admin/media",
                name: "admin-media",
                component: AdminPanel,
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
 // const store = useStore();


routers.beforeEach((to,from, next) => {
    if (`${to.name}`=== "post") document.title = `${process.env.VUE_APP_TITLE} - ${to.params.title}`
    else document.title = `${process.env.VUE_APP_TITLE} - ${to.meta.title}`;
    // store.dispatch('setCurrentRoute', `${to.name}`);
    next();
})

export default routers;