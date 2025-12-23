<script setup lang="ts">
import { Publication } from "../models/publications";
import { onMounted, ref, type Ref, nextTick } from "vue";
import { gsap } from "gsap";
import { ScrollTrigger } from "gsap/ScrollTrigger";
import publicationService from "../service/publicationService";
import publicationFeed from "../components/accueilComponent/publicationFeed.vue";

gsap.registerPlugin(ScrollTrigger);
const listPost: Ref<Publication[]> = ref([]);

// Permet la détection de la fin de la page pour refresh
const sentinel: Ref<HTMLElement | null> = ref(null);
const detector: Ref<ScrollTrigger | null> = ref(null);

async function getPost() {
  const postDejaVue: Ref<number[]> = ref([]);
  listPost.value.forEach((post: Publication) => {
    postDejaVue.value.push(post.getId());
  });
  const data = await publicationService.getFeed(postDejaVue.value);
  const posts = data.map(
    (post: any) =>
      new Publication(
        post.id,
        post.image_url,
        post.username,
        post.profile_picture,
        post.nbLike,
        post.nbComment,
        post.hasLiked,
        post.comment
      )
  );

  posts.forEach((post: Publication) => {
    listPost.value.push(post);
  });
  if (detector.value) {
    await nextTick();
    detector.value.refresh();
  }
}

onMounted(() => {
  if (sentinel.value) {
    detector.value = ScrollTrigger.create({
      trigger: sentinel.value,
      start: "top bottom",
      onEnter: () => getPost(),
    });
  }
});
</script>
<template>
  <div class="w-full pt-15 pb-16 flex flex-col items-center">
    <publicationFeed v-for="post in listPost" :post="post" />
    <div ref="sentinel"></div>
  </div>
</template>
