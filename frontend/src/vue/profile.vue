<script setup lang="ts">
import profileHeader from "../components/profileComponent/profileHeader.vue";
import profileBody from "../components/profileComponent/profileBody.vue";
import userService from "../service/userService";
import { Publication } from "../models/publications";
import { watch, ref, type Ref } from "vue";
import { useRoute, useRouter } from "vue-router";

const userPublications: Ref<Publication[]> = ref([]);
const username: Ref<string> = ref("");
const profile_picture: Ref<string> = ref("");
const nbFollow: Ref<number> = ref(0);
const nbFollower: Ref<number> = ref(0);
const nbPost: Ref<number> = ref(0);
const route = useRoute();
const router = useRouter();

async function initUser() {
  userPublications.value = [];
  const res = await userService.user(route.params.username);
  if (res.error) {
    router.push({ name: "accueil" });
  }
  username.value = res.username;
  profile_picture.value = res.profile_picture;
  nbFollow.value = res.nbFollow;
  nbFollower.value = res.nbFollower;
  nbPost.value = res.nbPost;

  res.posts.map((post: any) => {
    userPublications.value.push(
      new Publication(
        post.id,
        post.image_url,
        username.value,
        profile_picture.value,
        0,
        0
      )
    );
  });
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
  <div class="pt-15 pb-20 flex flex-col gap-5">
    <profileHeader
      :username="username"
      :profile_picture="profile_picture"
      :nb-follow="nbFollow"
      :nb-follower="nbFollower"
      :nb-post="nbPost"
    />
    <profileBody :posts="userPublications" />
  </div>
</template>
