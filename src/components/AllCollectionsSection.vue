<template>
  <section class="all_collections layout__full">
    <div class="all_collections__content">
      <img
        class="home__hero_tnf_logo"
        src="~/assets/images/tnf-logo.svg"
        svg-inline
      />

      <p class="all_collections__more_info">
        For more info on these collections
        <a href target="_blank" rel="noopener">visit thenorthface.com</a>
      </p>

    </div>
    <nav class="all_collections__links_container">
      <h4 class="all_collections__nav_title">Get To know our Collections: </h4>
      <ul class="all_collections__list">
        <AllCollectionsLink
          v-for="(collectionItem, index) in collectionItems"
          :key="collectionItem.id"
          :index="index"
          :active="
            collectionItems[appState.state.collectionIndex].id ===
              collectionItems[index].id
          "
          :isSubPage="isSubPage"
          :collectionItem="collectionItem"
        />
      </ul>
    </nav>
  </section>
</template>

<script>
import AppState from "../app-state.js";
import AllCollectionsLink from "../components/AllCollectionsLink";
export default {
  props: ["collectionItems", "isSubPage"],
  components: {
    AllCollectionsLink,
  },
  data() {
    return {
      appState: AppState,
    };
  },
};
</script>
