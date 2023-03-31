const routes = [
  {
    path: "/",
    component: () => import("src/components/signup.vue"),
    children: [{ path: "", component: () => import("pages/IndexPage.vue") }],
  },
  {
    path: "/signin",
    name: "login",
    component: () => import("components/signin.vue"),
  },
  {
    path: "/resetPassword",
    component: () => import("components/resetPassword.vue"),
  },
  {
    path: "/confirmPassword",
    component: () => import("components/confirmPassword.vue"),
  },
  {
    path: "/mainApp",
    name: "mainApp",
    component: () => import("components/mainApp.vue"),
  },

  // Always leave this as last one,
  // but you can also remove it
  {
    path: "/:catchAll(.*)*",
    component: () => import("pages/ErrorNotFound.vue"),
  },
];

export default routes;
