<template>
  <div class="collection__influencer_img_container layout__col layout__2wide_col">
    <g-image
      class="collection__influencer_img cover"
      :src="url"
      :alt="description"
      width="500"
    />
  </div>
</template>

<script>
export default {
  name: "collaboratorImage",
  props: ["url","description"],
};
</script>
