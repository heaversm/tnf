<template>
  <Layout>
    <Header />
    <div class="content-container">
      <Hero
        :title="$page.homepageContent.title"
        :summary="$page.homepageContent.summary"
        :leadImage="$page.homepageContent.leadImage"
        :leadImageMobile="$page.homepageContent.leadImageMobile"
      />
      <section class="layout__container layout__4wide collections__tall_images_section">
        <div 
          class="layout__col layout__4wide_col collections__tall_image_container"
          v-for="(collectionInfluencerTallImages, index) in firstCollection.collectionItem[appState.state.collectionIndex].collectionInfluencerTallImages"
          :key="`collection__tall_container-${collectionInfluencerTallImages.id}`"
        >
          <g-image
              class="caption__img"
              :src="collectionInfluencerTallImages.file.url"
              :alt="collectionInfluencerTallImages.description"
              width="378"
            />
        </div>
      </section>
      <section
        class="layout__container layout__2wide collections__list_section"
      >
        <div
          :class="[
            'collections__list_content_container stretch layout__col layout__col layout__2wide_col layout__content_center',
            isDark,
          ]"
          :style="`background-color: ${accentColor}`"
        >
          <div class="collections__list_content layout__content_inset">
            <h3 class="collections__list_title">COLLECTIONS</h3>
            <nav class="collections__list_nav">
              <ul class="collections__list">
                <li
                  :class="[
                    'collections__list_item',
                    firstCollection.collectionItem[
                      appState.state.collectionIndex
                    ].id === firstCollection.collectionItem[index].id
                      ? 'active'
                      : '',
                  ]"
                  v-for="(collectionItem,
                  index) in firstCollection.collectionItem"
                  :key="collectionItem.id"
                >
                  <a
                    href="#"
                    class="collections__link"
                    v-on:click="emitCollectionChanged(index, $event)"
                    @mouseover="handleCollectionHover(index, $event)"
                    @mouseleave="handleCollectionHoverLeave($event)"
                    >{{ collectionItem.collectionName }}</a
                  >
                </li>
              </ul>
            </nav>
          </div>
        </div>
        <div
          class="caption__layout_container layout__container layout__col layout__2wide_col inset"
        >
          <div class="caption_and_img_container">
            <g-image
              class="caption__img"
              :src="hoverItemRef.collectionMenuImage.file.url"
              :alt="hoverItemRef.collectionMenuImage.description"
              width="544"
            />
            <div class="caption__container">
              <p class="caption__title">{{ hoverItemRef.collectionName }}:</p>
              <p class="caption__content">
                {{ hoverItemRef.collectionSummary }}
              </p>
            </div>
          </div>
        </div>
      </section>
      <section
        :class="[
          'collection__overview_section layout__container layout__2wide',
          !preloaded ? 'inactive' : '',
        ]"
      >
        <div
          id="Collection"
          class="collection__overview_content_container stretch layout__col layout__col layout__2wide_col layout__content_center"
        >
          <div class="collection__overview_content layout__content_inset">
            <h3 class="collection__overview_title">
              {{
                firstCollection.collectionItem[appState.state.collectionIndex]
                  .collectionName
              }}
            </h3>
            <p class="collection__overview_summary">
              {{
                firstCollection.collectionItem[appState.state.collectionIndex]
                  .collectionSummary
              }}
            </p>
          </div>
        </div>
        <div
          class="collection__overview_img_container layout__col layout__2wide_col"
        >
          <div class="collection__overview_carousel_container">
            <ClientOnly>
              <carousel :perPage="1" :paginationPadding="0">
                <slide
                  v-for="collectionCarousel in firstCollection.collectionItem[
                    appState.state.collectionIndex
                  ].collectionCarousel"
                  :key="collectionCarousel.id"
                >
                  <g-image
                    class="collection__overview_img cover"
                    :src="collectionCarousel.file.url"
                    :alt="collectionCarousel.description"
                    width="500"
                  />
                </slide>
              </carousel>
            </ClientOnly>
          </div>
        </div>
      </section>
      <section
        :class="[
          'collection__products layout__2wide',
          !preloaded ? 'inactive' : '',
        ]"
      >
        <div
          v-for="(products, index) in firstCollection.collectionItem[
            appState.state.collectionIndex
          ].products"
          :class="[
            'collection__product stretch layout__container layout__col layout__2wide_col inset',
            isDark,
          ]"
          :style="`--bg-color: ${accentColor}`"
          :key="products.id"
        >
          <div class="caption_and_img_container">
            <ClientOnly>
              <carousel
                :perPage="1"
                :paginationPadding="0"
                class="collection__product_carousel"
              >
                <slide
                  v-for="hotspotImages in products.hotspotImages"
                  :key="hotspotImages.id"
                >
                  <div class="collection__product_container">
                    <g-image
                      class="collection__product_img caption__img"
                      :src="hotspotImages.image.file.url"
                      :alt="hotspotImages.image.description"
                      width="543"
                    />
                    <div
                      v-for="hotspots in hotspotImages.hotspots"
                      :key="hotspots.id"
                      :class="[
                        'collection__product_hotspot_container',
                        selectedHotspot ===
                        `${products.id}-${hotspotImages.id}-${hotspots.id}`
                          ? 'active'
                          : '',
                        hotspots.hotspotColor && hotspots.hotspotColor,
                        hotspots.hotspotLeft < 10
                          ? 'left'
                          : hotspots.hotspotLeft > 90
                          ? 'right'
                          : '',
                        hotspots.hotspotTop < 10
                          ? 'top'
                          : hotspots.hotspotTop > 90
                          ? 'bottom'
                          : '',
                      ]"
                      :style="{
                        top: hotspots.hotspotTop + '%',
                        left: hotspots.hotspotLeft + '%',
                      }"
                    >
                      <div class="collection__product_hotspot_inner">
                        <div
                          class="collection__product_hotspot"
                          @mouseover="
                            hotspotClicked(
                              `${products.id}-${hotspotImages.id}-${
                                hotspots.id
                              }`
                            )
                          "
                          @mouseleave="selectedHotspot = null;"
                          @click="
                            hotspotClicked(
                              `${products.id}-${hotspotImages.id}-${
                                hotspots.id
                              }`
                            )
                          "
                        />
                        <transition name="fade">
                          <div
                            class="collection__product_hotspot_text"
                            v-if="
                              selectedHotspot ===
                                `${products.id}-${hotspotImages.id}-${
                                  hotspots.id
                                }`
                            "
                          >
                            {{ hotspots.hotspotText }}
                          </div>
                        </transition>
                      </div>
                    </div>
                  </div>
                </slide>
              </carousel>
            </ClientOnly>
            <div
              class="collection__product_caption_container caption__container"
            >
              <h3 class="caption__title">{{ products.productTitle }}</h3>
              <div class="caption__content">
                ${{ products.productPrice }} | {{ products.productSummary }}
              </div>
            </div>
          </div>
        </div>
        <div
          class="layout__container layout__col layout__2wide_col stretch"
          v-if="
            firstCollection.collectionItem[appState.state.collectionIndex]
              .portraitImage
          "
        >
          <g-image
            class="caption__img cover"
            :src="
              firstCollection.collectionItem[appState.state.collectionIndex]
                .portraitImage.file.url
            "
            width="756"
            :alt="
              firstCollection.collectionItem[appState.state.collectionIndex]
                .portraitImage.description
            "
          />
        </div>
      </section>
      <section
        class="layout__full"
        v-if="
          firstCollection.collectionItem[appState.state.collectionIndex]
            .landscapeImage
        "
      >
        <g-image
          class="caption__img zoom-pan"
          :src="
            firstCollection.collectionItem[appState.state.collectionIndex]
              .landscapeImage.file.url
          "
          :alt="
            firstCollection.collectionItem[appState.state.collectionIndex]
              .landscapeImage.description
          "
          width="1400"
        />
      </section>
      <section
        :class="[
          'collection__influencer_section layout__container layout__2wide',
          firstCollection.collectionItem[appState.state.collectionIndex]
            .influencerPhotoOnRight
            ? 'reverse'
            : '',
        ]"
      >
        <div
          class="collection__influencer_img_container layout__col layout__2wide_col"
        >
          <g-link to="/collaborators/">
            <g-image
              class="collection__influencer_img cover"
              :src="
                firstCollection.collectionItem[appState.state.collectionIndex]
                  .influencerGettingToKnowImage.file.url
              "
              :alt="
                firstCollection.collectionItem[appState.state.collectionIndex]
                  .influencerGettingToKnowImage.description
              "
              width="500"
            />
          </g-link>
        </div>
        <div
          :class="[
            'collection__influencer_container layout__col layout__col layout__2wide_col layout__content_center stretch',
            isDark,
          ]"
          :style="`background-color: ${accentColor}`"
        >
          <div class="collection__influencer_content layout__content_inset">
            <h3 class="collection__influencer_title">
              <g-link to="/collaborators/"
                >Get to know our Collaborators</g-link
              >
            </h3>
          </div>
        </div>
      </section>
      <AllCollectionsSection
        :collectionItems="firstCollection.collectionItem"
        :isSubPage="false"
      />
    </div>
    <Footer />
    <transition name="fade">
      <div class="section_preload__container" v-if="!preloaded">
        <div class="spinner">
          <div class="rect1"></div>
          <div class="rect2"></div>
          <div class="rect3"></div>
          <div class="rect4"></div>
          <div class="rect5"></div>
        </div>
      </div>
    </transition>
  </Layout>
</template>

<page-query>


query {
  homepageContent: contentfulHomepage(id: "509W5Q6qdKAVjYZ0BbCPRZ"){
    id
    title
    summary
    leadImage {
      id
      file {
        url (width: 1400)
      }
      title
      description
    }
    leadImageMobile {
      id
      file {
        url (width: 756)
      }
      title
      description
    }
  }
  allSeasons: contentfulAllSeasons(id:"7k4q78ucK5iahwunMQgBrH"){
    allCollections: season {
      collectionItem: collectionOrder {
        id,
        title,
        collectionName,
        collectionAccentColor,
        accentIsDark,
        collectionSummary,
        collectionInfluencerTallImages {
          id
          title
          description
          file {
            url
          }
        }
        collectionMenuImage {
          file {
            url
          }
          title
          description
        },
        collectionLinkThumbnail {
          id
          title
          description
          file {
            url
          }
        }
        collectionCarousel {
          id
          title
          description
          file {
            url
          }
        }
        landscapeImage {
          id
          description
          file {
            url
          }
        }
        portraitImage {
          id
          description
          file {
            url
          }
        }
        products {
          id,
          productTitle,
          productPrice,
          productSummary,
          hotspotImages {
            id
            image {
              file {
                url
              }
              title
              description
            }
            hotspots {
              id
              hotspotText
              hotspotTop
              hotspotLeft
              hotspotColor
            }
          }
        }
        influencerGettingToKnowImage {
          id
          title
          description
          file {
            url
          }
        }
        influencerPhotoOnRight

      }
    }
  }
}

</page-query>

<script>
import AppState from "../app-state.js";
import Hero from "../components/Hero";
import SecondaryImages from "../components/SecondaryImages";
import { EventBus } from "../event-bus.js";
import Header from "../components/Header";
import Footer from "../components/Footer";
import AllCollectionsSection from "../components/AllCollectionsSection";

export default {
  name: "home",
  metaInfo: {
    title: "The North Face Preview | Home",
    meta: [{ name: "author", content: "The North Face" }],
  },
  components: {
    AllCollectionsSection,
    Hero,
    Header,
    SecondaryImages,
    Footer,
    Carousel: () =>
      import("vue-carousel")
        .then((m) => m.Carousel)
        .catch(),
    Slide: () =>
      import("vue-carousel")
        .then((m) => m.Slide)
        .catch(),
  },
  computed: {
    hoverItemRef: function() {
      if (this.hoverItem) {
        return this.hoverItem;
      } else if (this.appState.state.collectionIndex) {
        return this.firstCollection.collectionItem[
          this.appState.state.collectionIndex
        ];
      } else {
        return this.firstCollection.collectionItem[0];
      }
    },
    isDark: function() {
      return this.firstCollection.collectionItem[
        this.appState.state.collectionIndex
      ].accentIsDark
        ? "dark"
        : "";
    },
    firstCollection: function() {
      return this.$page.allSeasons.allCollections[0];
    },
    accentColor: function() {
      return this.firstCollection.collectionItem[
        this.appState.state.collectionIndex
      ].collectionAccentColor;
    },
  },
  data() {
    return {
      appState: AppState,
      selectedHotspot: null,
      hoverItem: null, //for storing the image being hovered in the collections menu
      preloaded: true, //for use in preloading new collections
      tooltipHover: false, 
    };
  },
  mounted() {
    this.checkInitialParams();
    this.addListeners();
    this.addSmoothScroll();
    this.addZooming();
  },
  methods: {
    addListeners() {
      window.onpopstate = this.handlePopState;
    },
    addSmoothScroll() {
      if (process.isClient) {
        const SmoothScroll = require("smooth-scroll");
        this.smoothScroll = new SmoothScroll('a[href*="#"]', {
          speed: 500,
          speedAsDuration: true,
          easing: "easeOutQuad",
        });
        this.collectionAchor = document.getElementById("Collection");
      }

      EventBus.$on("collectionChanged", (collectionIndex) => {
        //allows us to listen to collection changes from other components and perform animated scroll
        this.handleCollectionChanged(collectionIndex);
      });
    },
    addZooming() {
      if (process.isClient) {
        const Zooming = require("zooming").default;
        this.zooming = new Zooming({
          //customSize: '200%'
        });
        this.zooming.listen(".zoom-pan");
      }
    },
    handlePreloadCollection(collectionIndex) {
      this.preloaded = false;
      const imagesToPreload = [];
      this.firstCollection.collectionItem[
        collectionIndex
      ].collectionCarousel.forEach((collectionCarouselItem) => {
        imagesToPreload.push(collectionCarouselItem.file.url);
      });
      if (imagesToPreload) {
        this.$images.preload(imagesToPreload, () => {
          this.handleCollectionReady(collectionIndex);
        });
      } else {
        this.handleCollectionReady(collectionIndex);
      }
      if (this.smoothScroll && this.collectionAchor) {
        this.smoothScroll.animateScroll(this.collectionAchor);
      }
    },
    handleCollectionReady(collectionIndex) {
      this.preloadMinTimeout = setTimeout(() => {
        //give some time to see the loader regardless of how long loading took (takes at least X ms to smooth scroll down)
        this.preloaded = true;
        this.appState.setCollectionIndex(collectionIndex);
        this.resetHoverItem();
      }, 2000);
    },
    handlePopState(e) {
      e.preventDefault();
      const newCollectionIndex = new URL(location.href).searchParams.get(
        "collection"
      );
      if (
        newCollectionIndex &&
        newCollectionIndex !== this.appState.state.collectionIndex
      ) {
        this.appState.state.collectionIndex = newCollectionIndex;
      }
    },
    checkInitialParams() {
      const initialCollectionIndex = new URL(location.href).searchParams.get(
        "collection"
      );
      if (initialCollectionIndex) {
        this.appState.setCollectionIndex(initialCollectionIndex);
      }
    },
    hotspotClicked(hotspotID) {
      if (this.selectedHotspot === hotspotID) {
        this.selectedHotspot = null;
      } else {
        this.selectedHotspot = hotspotID;
      }
    },
    handleCollectionHover(hoverIndex, e) {
      this.hoverItem = this.firstCollection.collectionItem[hoverIndex];
    },
    handleCollectionHoverLeave(e) {
      this.resetHoverItem();
    },
    resetHoverItem(){
      this.hoverItem = this.firstCollection.collectionItem[
        this.appState.state.collectionIndex
      ];
    },
    emitCollectionChanged(collectionIndex, e) {
      e.preventDefault();
      this.handleCollectionChanged(collectionIndex);
    },
    handleCollectionChanged(collectionIndex) {
      this.handlePreloadCollection(collectionIndex);
    },
  },
};
</script>
