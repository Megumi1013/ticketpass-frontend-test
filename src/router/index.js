import { createRouter, createWebHistory } from "vue-router"
import { useStore } from "@/store"

const routes = [

  {
    path: "/",
    component: () => import("@/layouts/Default.vue"),
    children: [

      {
        path: "/events",
        alias: "",
        name: "EventsList",
        component: () => import("@/views/EventsList.vue"),
        props: (route) => ({
          page: route.query.page ? Number(route.query.page) : null,
        }),
      },

      {
        path: "/events/:id(\\d+)",
        name: "EventDetail",
        component: () => import("@/views/EventDetail.vue"),
        props: (route) => ({
          id: route.params.id ? Number(route.params.id) : null,
        }),
      },

      {
        path: "/events/create",
        name: "CreateEvent",
        component: () => import("@/views/CreateEvent.vue"),
        meta: {
          requiresAuth: true,
        },
      },

    ]
  },
  {
    path: "/login",
    name: "Login",
    component: () => import("@/views/Login.vue"),
  },
  {
    path: "/:catchAll(.*)",
    name: 'NotFound',
    component: () => import('@/views/404.vue'),
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes,
  scrollBehavior() {
    document.getElementById('app').scrollIntoView();
  }
})

router.beforeEach((to, from, next) => {

  const store = useStore()

  if ("requiresAuth" in to.meta && to.meta.requiresAuth) {

    if (store.isLoggedIn) {

      next()

    } else {

      next({ name: "Login" })

    }
  } else {

    next()
  }
})

export default router