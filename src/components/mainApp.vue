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
      <div>
        <div class="text-center" v-if="!signedoff">
          <div>
            <p class="mainapp-msg">This is your beautiful test app!</p>
            <p class="main-app-msg">
              This app let's you change the color of the button below from green
              to red each time you click it! isnt' that amazing?
              <q-btn
                rounded
                :color="change ? 'negative' : 'secondary'"
                label="Change the color of this button now"
                class="change-color-btn"
                @click="change = !change"
              />
            </p>
          </div>
          <q-btn
            rounded
            color="secondary"
            label="Log-out"
            class="logout-btn"
            @click="logout()"
          />
        </div>
        <div class="text-center" v-else>
          <div>
            <p class="mainapp-msg">You logged out!</p>
            <q-btn
              rounded
              color="secondary"
              label="Click here to Access your app again!"
              class="redirect-btn"
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
import { useRouter } from "vue-router";
export default defineComponent({
  name: "EssentialLink",
  props: {},
  setup() {
    let signedoff = ref(false);
    const router = useRouter();
    function logout() {
      Loading.show();
      LocalStorage.clear();
      signedoff.value = true;
      Loading.hide();
    }
    function move() {
      router.push({
        name: "login",
      });
    }
    return {
      change: ref(false),
      logout,
      signedoff,
      move,
    };
  },
});
</script>
