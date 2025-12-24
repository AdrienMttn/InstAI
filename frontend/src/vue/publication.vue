<script setup lang="ts">
import { ref, type Ref } from "vue";
import publicationFeed from "../components/accueilComponent/publicationFeed.vue";
import commentComponent from "../components/publicationComponent/commentComponent.vue";
import { Publication } from "../models/publications";
import publicationService from "../service/publicationService";
import { useRoute } from "vue-router";
import { Comment } from "../models/comment";
import { useUserStore } from "../stores/userStores";

const route = useRoute();
const message: Ref<string> = defineModel("message", { required: true });
const publication: Ref<Publication | undefined> = ref(undefined);
const comments: Ref<Comment[]> = ref([]);

async function initPublication() {
  const data = await publicationService.getPublication(
    Number(route.params?.idPost)
  );
  comments.value = data.comments.map(
    (comment: any) =>
      new Comment(comment.username, comment.profile_picture, comment.message)
  );
  publication.value = new Publication(
    data.id,
    data.image_url,
    data.username,
    data.profile_picture,
    data.nbLike,
    data.nbComment,
    data.hasLiked,
    comments.value
  );
  console.log(publication.value);
}
initPublication();
</script>

<template>
  <div
    v-if="publication"
    class="w-full flex flex-col items-center min-h-screen justify-center pb-20 pt-15"
  >
    <publicationFeed :post="publication" />
    <div
      class="flex flex-col h-[20vh] overflow-y-scroll md:w-[50vw] lg:w-[40vw] xl:w-[25vw] mt-10"
    >
      <div class="flex flex-col h-[90vh] gap-5">
        <commentComponent
          :comment="comment"
          v-for="comment in publication.getListComment()"
        />
      </div>
    </div>
    <div
      v-if="useUserStore().isLogin"
      class="flex flex-row gap-2 mt-5 items-start border-t border-base-300 p-3 w-full md:w-[50vw] lg:w-[40vw] xl:w-[25vw]"
    >
      <div class="avatar">
        <div class="w-8 rounded-full">
          <img :src="useUserStore().user?.getImg()" />
        </div>
      </div>
      <textarea
        v-model="message"
        class="textarea resize-none w-full border-none outline-none"
        placeholder="Add comment ..."
      ></textarea>
      <button
        class="button hover:underline cursor-pointer font-bold self-center"
        v-if="message"
        @click="
          () => {
            publication?.addComment(message);
            message = '';
          }
        "
      >
        Post
      </button>
    </div>
  </div>
</template>
