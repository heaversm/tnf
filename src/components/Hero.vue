<template>
  <section
    class="hero__container layout__container layout__2wide layout__content_center"
  >
    <div class="hero__content_container layout__col layout__2wide_col">
      <div class="hero__content layout__content_inset">
        <img
          class="home__hero_tnf_logo"
          src="~/assets/images/tnf-logo.svg"
          svg-inline
        />
        <h2 class="hero__title" v-html="title"></h2>
        <p v-html="summary"></p>
      </div>
    </div>
    <div class="layout__container layout__col layout__2wide_col">
       <picture>
          <source 
            :media="`(max-width:${APP_CONSTS.bpMobile-1}px)`" 
            :srcset="leadImageMobile.file.url"
          >
          <img 
            :src="leadImage.file.url" 
            :alt="leadImage.description"
          >
        </picture> 
    </div>
  </section>
</template>

<script>

import APP_CONSTS from "../consts.js";

export default {
  props: ["leadImage", "leadImageMobile", "title", "summary"],
  data() {
    return {
      APP_CONSTS: APP_CONSTS,
    }
  },
};
</script>
