<template>
  <li :class="['all_collections__item', active ? 'active' : '']">
    <a
      class="all_collections__link scalable"
      href="#"
      v-on:click="emitCollectionChanged(index, $event)"
    >
      <g-image
        class="all_collections__link_img"
        :src="collectionItem.collectionLinkThumbnail.file.url"
        :alt="collectionItem.collectionLinkThumbnail.description"
        width="235"
      />
      <p>{{ collectionItem.collectionName }}</p>
    </a>
  </li>
</template>

<script>
import AppState from "../app-state.js";
import { EventBus } from "../event-bus.js";
export default {
  props: ["collectionItem", "index", "active", "isSubPage"],
  data() {
    return {
      appState: AppState,
    };
  },
  methods: {
    emitCollectionChanged(collectionIndex, e) {
      e.preventDefault();
      if (this.isSubPage === true) {
        this.$router.push({ path: `/?collection=${collectionIndex}` });
      } else {
        EventBus.$emit("collectionChanged", collectionIndex);
      }
    },
  },
};
</script>
