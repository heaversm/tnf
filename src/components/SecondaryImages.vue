<template>
  <section class="layout__container layout__4wide featured__images_container">
    <div
      class="layout__col layout__4wide_col"
      v-for="secondaryImages in $page.homepageContent.secondaryImages"
      :key="secondaryImages.id"
    >
      <g-image
        class="featured__images_img"
        :src="secondaryImages.file.url"
        width="380"
        :alt="secondaryImages.description"
      />
    </div>
  </section>
</template>

<script>
export default {
  props: ["secondaryImages"],
};
</script>
