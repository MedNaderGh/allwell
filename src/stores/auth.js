import { defineStore } from "pinia";
import { Loading, LocalStorage, Notify } from "quasar";
import { login, signup, sendEmail } from "../api/auth";
import { api } from "../boot/axios";

export const useAuthStore = defineStore("auth", {
  state: () => ({}),
  getters: {},
  actions: {
    async connectedUser(formData) {
      Loading.show();
      const authData = await login(formData);
      if (authData !== undefined) {
        this.setUser(authData);
        return true;
      } else {
        Loading.hide();
        return false;
      }
    },
    setUser(authData) {
      const tokenData = authData.response[0].token;
      const userData = authData.response[0].user;
      LocalStorage.set("user", userData);
      LocalStorage.set("token", tokenData);
      api.defaults.headers.common.Authorization =
        "Bearer " + LocalStorage.getItem("token").id_token;
      this.router.push("/mainApp");
      Loading.hide();
    },
    logoutUser() {
      Loading.show();
      this.router.push("/signin");
      LocalStorage.clear();
      api.defaults.headers.common.Authorization = "";
      Loading.hide();
    },
    async userSignup(ParamObj) {
      Loading.show();
      signup(ParamObj)
        .then(function () {
          Notify.create({
            type: "positive",
            message: " utilisateur ajouté avec succès",
          });
          Loading.hide();
        })
        .catch(function (error) {
          Notify.create({
            type: "negative",
            message:
              "Une erreur est survenue.\n Merci de contacter un administrateur",
          });
          Loading.hide();
        });
    },
    async send(ParamObj) {
      Loading.show();
      sendEmail(ParamObj)
        .then(function () {
          Notify.create({
            type: "positive",
            message: "Email sent successfully please check your inbox",
          });
          Loading.hide();
        })
        .catch(function (error) {
          Notify.create({
            type: "negative",
            message: "the entered email doesn't exist",
          });
          Loading.hide();
        });
    },
    async changePassword(ParamObj) {
      Loading.show();
      updatePassword(ParamObj)
        .then(function () {
          Notify.create({
            type: "positive",
            message: " utilisateur ajouté avec succès",
          });
          Loading.hide();
        })
        .catch(function (error) {
          Notify.create({
            type: "negative",
            message:
              "Une erreur est survenue.\n Merci de contacter un administrateur",
          });
          Loading.hide();
        });
    },
  },
});
