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
            <p class="signup-header">Reset your password.</p>
            <q-card class="my-card">
              <q-card-section>
                <p class="signup-msg">Have you forgot your password?</p>
                <p>
                  Do not worry, insert here your email and we will send you a
                  link to reset your password.
                </p>
                <q-input
                  outlined
                  type="email"
                  label="E-mail"
                  class="q-my-md"
                  v-model="email"
                />
                <q-btn
                  rounded
                  color="secondary"
                  label="Reset your password"
                  class="signup"
                  @click="sendMail()"
                />
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
  name: "EssentialLink",
  setup() {
    let email = ref();
    function sendMail() {
      const authStore = useAuthStore();
      let mailObj = { email: email.value };
      authStore.send(mailObj);
    }
    return { email, sendMail };
  },
});
</script>
