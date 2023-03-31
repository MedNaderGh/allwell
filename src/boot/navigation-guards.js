import { LocalStorage } from "quasar";
import routes from "../router/routes";
import { Notify } from "quasar";

export default ({ router }) => {
  router.beforeEach((to, from, next) => {
    const user = LocalStorage.getItem("user");
    const token = LocalStorage.getItem("token");
    let expirationDate;
    if (token !== null) {
      expirationDate = token.expires_in;
    }
    let currentDate = new Date();
    if (
      (user === null || expirationDate <= currentDate) &&
      to.path !== "/signin" &&
      to.path !== "/confirmPassword" &&
      to.path !== "/resetPassword" &&
      to.path !== "/"
    ) {
      next("/signin");
      Notify.create({
        type: "negative",
        message: "You need to Sign in first",
      });
    }
    if (
      to.path !== "/signin" ||
      to.path !== "/confirmPassword" ||
      to.path !== "/resetPassword" ||
      to.path !== "/"
    ) {
      next();
    }
  });
};
