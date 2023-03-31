<template>
  <q-layout>
    <q-header bordered class="bg-white text-primary q-mt-md">
      <q-toolbar>
        <q-toolbar-title>
          <img
            src="../assets/uk4cxqxyllk1jw1egkwf.webp"
            height="50"
            width="198"
          />
        </q-toolbar-title>
      </q-toolbar>
    </q-header>
    <q-page-container>
      <div class="row q-mt-xl">
        <div class="col">
          <img src="../assets/login.png" height="635" width="570" />
        </div>
        <div class="col">
          <div>
            <p class="signup-header">Access your test app.</p>
            <q-card class="my-card">
              <q-card-section>
                <p class="signup-msg">Insert your credentials</p>
                <q-input
                  outlined
                  type="email"
                  label="E-mail"
                  class="q-my-md"
                  v-model="email"
                />
                <q-input
                  outlined
                  type="password"
                  label="choose a password"
                  class="q-my-md"
                  v-model="password"
                />
                <p>
                  <b
                    >have you forgot your password?
                    <router-link to="/resetPassword">Click here</router-link></b
                  >
                </p>
                <q-btn
                  rounded
                  color="secondary"
                  label="Log In"
                  class="signup"
                  @click="signin()"
                />
                <br />
                <p>
                  <b
                    >You don't have a profile yet?
                    <router-link to="/">Sign up here</router-link></b
                  >
                </p>
              </q-card-section>
            </q-card>
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { useAuthStore } from "src/stores/auth";
export default defineComponent({
  name: "signIn",
  setup() {
    let email = ref();
    let password = ref();
    function signin() {
      let user = { email: email.value, password: password.value };
      const authStore = useAuthStore();
      authStore.connectedUser(user);
    }
    return { email, password, signin };
  },
});
</script>
