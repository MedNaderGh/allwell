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
          <div v-if="!signed">
            <p class="signup-header">Sign-up to your test app.</p>
            <q-card class="my-card">
              <q-card-section>
                <p class="signup-msg">Choose a user-id and a password</p>
                <q-input
                  outlined
                  type="email"
                  v-model="email"
                  label="choose a user ID (E-mail)"
                  class="q-my-md"
                />
                <q-input
                  outlined
                  v-model="password"
                  type="password"
                  label="choose a password"
                  class="q-my-md"
                />
                <q-btn
                  rounded
                  color="secondary"
                  label="Sign-up!"
                  class="signup"
                  @Click="signupFn()"
                />
              </q-card-section>
            </q-card>
          </div>
          <div v-else>
            <p class="signup-success">
              Congrats! you have successfully signed-up!
            </p>
            <q-btn
              rounded
              color="secondary"
              label="Click here to log-in into your app!"
              class="signup-success-btn"
              @Click="move()"
            />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { signup } from "../api/auth";
import { Loading, Notify } from "quasar";
import { useRouter } from "vue-router";
import { useMutation } from "vue-query";
export default defineComponent({
  name: "EssentialLink",
  props: {},
  setup() {
    let email = ref();
    let password = ref();
    let signed = ref(false);
    const router = useRouter();
    async function signupFn() {
      Loading.show();
      let user = { email: email.value, password: password.value };
      await userSignup.mutateAsync(user);
    }
    function move() {
      router.push({
        name: "login",
      });
    }
    const userSignup = useMutation((user) => signup(user), {
      onError: (error) => {
        Notify.create({
          type: "negative",
          message: "User already exists",
        });
        Loading.hide();
      },
      onSuccess: (data) => {
        Notify.create({
          type: "positive",
          message: "Account created successfully",
        });
        Loading.hide();
        signed.value = true;
      },
    });
    return {
      email,
      password,
      signed,
      signupFn,
      move,
    };
  },
});
</script>
