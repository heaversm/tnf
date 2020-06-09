<template>
  <Layout>
    <Header :isSubPage="true" />
    <div class="content-container">
      <div
        class="collection__influencer_section layout__container layout__2wide stretch"
        v-for="(currentCollaborators, index) in $page
          .contentfulCurrentCollaborators.currentCollaborators"
        :key="currentCollaborators.id"
      >
        <template v-if="index % 2 === 0">
          <CollaboratorContent
            :name="currentCollaborators.collaboratorName"
            :content="currentCollaborators.collaboratorContent"
            :links="currentCollaborators.collaboratorLinks"
          />
          <CollaboratorImage
            :url="currentCollaborators.collaboratorImage.file.url"
            :description="currentCollaborators.collaboratorImage.description"
          />
        </template>
        <template v-else>
          <CollaboratorImage
            :url="currentCollaborators.collaboratorImage.file.url"
            :description="currentCollaborators.collaboratorImage.description"
          />
          <CollaboratorContent
            :name="currentCollaborators.collaboratorName"
            :content="currentCollaborators.collaboratorContent"
            :links="currentCollaborators.collaboratorLinks"
          />
        </template>
      </div>
      <AllCollectionsSection
        :collectionItems="firstCollection.collectionItem"
        :isSubPage="true"
      />
    </div>
    <Footer/>
  </Layout>
</template>

<page-query>
query {
  contentfulCurrentCollaborators(id: "X6wZONgHyeZXtNgQw077N"){
    currentCollaborators {
      id
      collaboratorName
      collaboratorContent(html: true)
      collaboratorImage {
        id
        description
        file {
          url
        }
      }
      collaboratorLinks {
        id
        collaboratorLink
        collaboratorLinkTitle
        collaboratorLinkIcon {
          file {
            url
          }
          id
          description

        }
      }
    }
  }
  allSeasons: contentfulAllSeasons(id:"7k4q78ucK5iahwunMQgBrH"){
    allCollections: season {
      collectionItem: collectionOrder {
        id,
        title,
        collectionName,
        collectionLinkThumbnail {
          id
          title
          description
          file {
            url
          }
        }
      }
    }
  }
}
</page-query>

<script>
import CollaboratorImage from "../components/CollaboratorImage";
import CollaboratorContent from "../components/CollaboratorContent";
import Header from "../components/Header";
import AllCollectionsSection from "../components/AllCollectionsSection";
import Footer from "../components/Footer";

export default {
  name: "collaborators",
  components: {
    AllCollectionsSection,
    CollaboratorImage,
    CollaboratorContent,
    Header,
    Footer,
  },
  computed: {
    firstCollection: function() {
      return this.$page.allSeasons.allCollections[0];
    },
  },
  metaInfo: {
    title: "The North Face Preview | Collaborators",
    meta: [{ name: "author", content: "The North Face" }],
  },
};
</script>
