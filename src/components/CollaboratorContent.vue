<template>
  <div
    :class="[
      'collection__influencer_container stretch layout__col layout__col layout__2wide_col layout__content_center',
    ]"
  >
    <div class="collection__influencer_content layout__content_inset">
      <h3 class="influencer__title">{{ name }}</h3>
      <div class="influencer__content" v-html="content" />
      <div class="influencer__links" v-if="links.length">
        <ul class="influencer__link_list">
          <li
            class="influencer__link_item"
            v-for="link in links"
            :key="link.collaboratorLink.id"
          >
            <a
              :href="link.collaboratorLink"
              class="influencer__link"
              target="_blank"
              rel="noopener noreferrer"
            >
              <g-image
                class="influencer__link_img"
                :alt="link.collaboratorLinkTitle"
                size="50"
                :src="link.collaboratorLinkIcon.file.url"
              />
            </a>
          </li>
        </ul>
      </div>
    </div>
  </div>
</template>

<script>
export default {
  name: "collaboratorContent",
  props: ["name", "content", "links"],
};
</script>
