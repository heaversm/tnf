<template>
  <header :class="['site-header', mobileNavActive ? 'active' : '']">
    <h1 class="site-header__logo">
      <g-link to="/">
        <img
          class="site-header__logo_img"
          src="~/assets/images/tnf-logo.svg"
          svg-inline
        />
      </g-link>
    </h1>
    <button
      :class="[
        'hamburger hamburger--squeeze',
        mobileNavActive ? 'is-active' : '',
      ]"
      type="button"
      v-on:click="onHamburgerClicked"
    >
      <span class="hamburger-box">
        <span class="hamburger-inner"></span>
      </span>
    </button>
    <nav
      :class="[
        'site-header__nav',
        mobileNavVisible ? 'visible' : '',
        mobileNavActive ? 'active' : '',
      ]"
    >
      <ul class="site-header__nav_list">
        <li
          v-for="(collectionItem, index) in firstCollection.collectionItem"
          :class="[
            'site-header__nav_item',
            !isSubPage &&
            firstCollection.collectionItem[appState.state.collectionIndex]
              .id === firstCollection.collectionItem[index].id
              ? 'active'
              : '',
          ]"
          :key="collectionItem.id"
        >
          <a
            class="site-header__nav_link"
            href="#"
            v-on:click="emitCollectionChanged(index, $event)"
          >
            {{ collectionItem.title }}
          </a>
        </li>
        <li :class="['site-header__nav_item']">
          <a
            href="#"
            :class="['site-header__nav_link', isSubPage ? 'active' : '']"
            \href="#"
            v-on:click="emitCollectionChanged(null, $event, 'collaborators')"
          >
            Collaborators
          </a>
        </li>
      </ul>
      <FooterNav />
    </nav>
  </header>
</template>

<static-query>
query {
  allSeasons: contentfulAllSeasons(id:"7k4q78ucK5iahwunMQgBrH"){
    allCollections: season {
      collectionItem: collectionOrder {
        id,
        title,
      }
    }
  }
}

</static-query>

<script>
import AppState from "../app-state.js";
import { EventBus } from "../event-bus.js";
import FooterNav from "./FooterNav";

export default {
  components: {
    FooterNav,
  },
  props: {
    isSubPage: {
      type: Boolean,
      default: false,
    },
  },
  data() {
    return {
      appState: AppState,
      mobileNavActive: false, //toggles the display of the nav itself
      mobileNavVisible: false, //animates the showing of the nav
    };
  },
  computed: {
    firstCollection: function() {
      return this.$static.allSeasons.allCollections[0];
    },
  },
  methods: {
    emitCollectionChanged(collectionIndex, e, nextRoute = null) {
      e.preventDefault();
      this.hideMobileNav(collectionIndex, nextRoute);
    },
    onHamburgerClicked(e) {
      if (!this.mobileNavActive) {
        //show mobile nav
        this.showMobileNav();
      } else {
        this.hideMobileNav();
      }
    },
    navigateToRoute(route = "") {
      this.$router.push({ path: `/${route}` });
    },
    showMobileNav() {
      document.body.classList.toggle("nav-active", true);
      this.mobileNavVisible = true;
      setTimeout(() => {
        this.mobileNavActive = true;
      }, 20);
    },
    hideMobileNav(collectionIndex = null, nextRoute = null) {
      this.mobileNavActive = false;
      document.body.classList.toggle("nav-active", false);
      setTimeout(() => {
        this.mobileNavVisible = false;
        if (collectionIndex !== null) {
          if (this.isSubPage) {
            this.$router.push({ path: `/?collection=${collectionIndex}` });
          } else {
            EventBus.$emit("collectionChanged", collectionIndex);
          }
        } else if (nextRoute) {
          this.navigateToRoute(nextRoute);
        } else {
          console.log(
            "if you see this, you are probably missing an unhandled navigation use case"
          );
        }
      }, 510); //duration must be >= sass animation duration
    },
  },
};
</script>
