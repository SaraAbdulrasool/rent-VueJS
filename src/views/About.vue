<template>
  <div class="about">
    <!-- header -->
    <v-container fluid id="about-header">
      <v-row class="pa-16">
        <v-col cols="12" align="center" justify="center">
          <div class="text-h3 font-weight-medium white--text pb-1">
            About us
          </div>
          <div class="white--text text-h5 pb-16">
            One of the leading property brokerage companies based in the Kingdom
            of Bahrain.
          </div>
        </v-col>
      </v-row>
    </v-container>
    <!-- body -->
    <v-container>
      <v-row class="pt-16">
        <v-col cols="12" align="start" justify="center">
          <div
            class="blue-grey--text text--darken-2 font-weight-medium text-h4"
          >
            Why Us?
          </div>
          <div class="blue-grey--text font-weight-regular text-h6 pt-5">
            We offers you knowledge about the real estate market in Bahrain as
            it has represented some of the most extraordinary properties in the
            country in addition to other significant properties across the
            region.
          </div>
          <div class="blue-grey--text font-weight-regular text-h6 pt-5">
            Our international marketing programs allowed us to reach an elite
            international set of buyers who have faith in our exceptional
            superlative marketing strategies, discretion, and services.
          </div>
        </v-col>
      </v-row>
      <v-row class="px-2 pt-16">
        <v-col
          v-for="item in items"
          :key="item.id"
          cols="12"
          sm="12"
          md="12"
          lg="4"
          xl="4"
        >
          <div
            class="text-h5 blue-grey--text text--darken-2 font-weight-medium pb-4"
          >
            {{ item.title }}
          </div>
          <div class="blue-grey--text">
            {{ item.content }}
          </div>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "About",
  data() {
    return {
      items: [
        {
          id: 1,
          title: "Property Consultants in Bahrain",
          content:
            "Our Consultants are highly trained to find you the best deal that matches your need. Our consultants' goal is to make sure that you make the best decision. We assure our clients that we will only help them to make a decision and not push them to make so.",
        },
        {
          id: 2,
          title: "Bahrain's Top Property Portal",
          content:
            "Here is the perfect destination for investors and owners as it offers only qualified and genuine listings. We does not list unqualified listings. We have a strong set of values and quality measures to make sure we promote the best properties.",
        },
        {
          id: 3,
          title: "Bahrain Properties",
          content:
            "We welcome our clients locally and from around the world. We have agents specialized in assisting international real estate clients, whether they are moving here or investing from abroad.",
        },
      ],
    };
  },
};
</script>

<style>
#about-header {
  background-image: url("/about_banner.png");
  background-size: cover;
  background-repeat: no-repeat;
}
</style>
