<script setup lang="ts">
import profileHeader from "../components/profileComponent/profileHeader.vue";
import profileBody from "../components/profileComponent/profileBody.vue";
import userService from "../service/userService";
import { Publication } from "../models/publications";
import { User } from "../models/user";
import { watch, ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const userPublications: Ref<Publication[]> = ref([]);
const user: Ref<User | undefined> = ref(undefined);
const route = useRoute();
const router = useRouter();

async function initUser() {
  userPublications.value = [];
  const res = await userService.user(route.params.username);
  if (res.error) {
    router.push({ name: "accueil" });
  }
  user.value = new User(
    res.id,
    res.username,
    res.profile_picture,
    res.nbFollow,
    res.nbFollower,
    res.nbPost,
    res.follow
  );
  if (user.value) {
    res.posts.map((post: any) => {
      userPublications.value.push(
        new Publication(
          post.id,
          post.image_url,
          String(user.value?.getUsername()),
          String(user.value?.getImg()),
          0,
          0,
          false,
          []
        )
      );
    });
  }
}
initUser();
watch(
  () => route.params.username,
  (newUsername) => {
    if (newUsername) {
      initUser();
    }
  }
);
</script>

<template>
  <div class="pt-15 pb-20 flex flex-col gap-5" v-if="user">
    <profileHeader :user="user" />
    <profileBody :posts="userPublications" />
  </div>
</template>
