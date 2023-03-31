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
          <div v-if="!changed">
            <p class="signup-header">Create new password.</p>
            <q-card class="my-card">
              <q-card-section>
                <p class="signup-msg">Create here a new password:</p>
                <q-input
                  outlined
                  v-model="password"
                  type="password"
                  label="Insert new password"
                  class="q-my-md"
                />
                <q-input
                  outlined
                  v-model="repassword"
                  :rules="[
                    (val) =>
                      val == password || 'the two passwords do not match',
                  ]"
                  type="password"
                  label="Confirm new password"
                  class="q-my-md"
                  lazy-rules
                />
                <q-btn
                  rounded
                  color="secondary"
                  label="Create new password"
                  class="signup"
                  @click="changePassword()"
                />
              </q-card-section>
            </q-card>
          </div>
          <div v-else>
            <p class="signup-success">
              your password has been successfully changed!
            </p>
            <q-btn
              rounded
              color="secondary"
              label="Click here to Access your app again!"
              class="signup-success-btn"
              @click="move()"
            />
          </div>
        </div>
      </div>
    </q-page-container>
  </q-layout>
</template>

<script>
import { defineComponent, ref } from "vue";
import { Loading, Notify, LocalStorage } from "quasar";
import { useRoute, useRouter } from "vue-router";
import { useMutation, useQueryClient } from "vue-query";
import { updatePassword } from "src/api/auth";
export default defineComponent({
  name: "EssentialLink",
  setup() {
    let password = ref();
    let repassword = ref();
    let changed = ref(false);
    const router = useRouter();
    const route = useRoute();
    if (!route.query.email) {
      router.push("/signin");
    } else {
    }
    async function changePassword() {
      let user = { email: atob(route.query.email), password: password.value };
      Loading.show();
      await updatePasswordMutation.mutateAsync(user);
    }
    function move() {
      router.push({
        name: "login",
      });
    }
    const updatePasswordMutation = useMutation(updatePassword, {
      onSuccess: () => {
        Notify.create({
          type: "positive",
          message: "Your password has been reset",
        });
        Loading.hide();
        changed.value = true;
      },
      onError: (error) => {
        Notify.create({
          type: "negative",
          message: "An error has occurred",
        });
        Loading.hide();
      },
    });
    return { password, repassword, changePassword, changed, move };
  },
});
</script>
