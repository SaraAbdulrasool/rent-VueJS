<template>
  <div class="blue-grey lighten-5">
    <v-container fluid id="search" class="pt-16">
      <v-row class="pt-16 px-5">
        <v-col align="center" justify="center" cols="12">
          <p class="text-h2 font-weight-medium blue-grey--text text--darken-3">
            Find your fresh start
          </p>
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col align="center" justify="center" cols="12">
          <p class="white--text text-h5">
            Houses, condos, and apartments for rent
          </p>
        </v-col>
      </v-row>
      <v-row>
        <v-col align="center" justify="center" cols="12">
          <v-img
            src="/search.png"
            max-height="600"
            max-width="1100"
            position="center"
          ></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-16">
      <v-row align="center" justify="center">
        <v-col cols="12">
          <p
            class="text-lg-h3 text-md-h3 text-sm-h3 text-h4 text-center blue-grey--text text--darken-1"
          >
            See what we have provide for you!
          </p>
        </v-col>
      </v-row>
      <!-- Start Of The Three Cards Section -->
      <v-row>
        <v-col
          lg="4"
          md="4"
          sm="12"
          cols="12"
          v-for="item in cardsContent"
          :key="item.title"
        >
          <v-card
            :color="item.color"
            class="mx-auto mb-12"
            max-width="400"
            flat
          >
            <template slot="progress">
              <v-progress-linear
                color="deep-purple"
                height="10"
                indeterminate
              ></v-progress-linear>
            </template>
            <v-img height="250" :src="item.image"></v-img>
            <v-card-title>{{ item.title }}</v-card-title>
            <v-card-text>
              <v-row align="center" class="mx-0">
                <v-rating
                  :value="4.5"
                  color="amber"
                  dense
                  half-increments
                  readonly
                  size="14"
                ></v-rating>
                <div class="grey--text py-4">4.5 (413)</div>
              </v-row>
              <div>
                {{ item.description }}
              </div>
            </v-card-text>
            <v-divider class="mx-4"></v-divider>
            <v-card-title>{{ item.features[0] }}</v-card-title>
            <v-card-title>{{ item.features[1] }}</v-card-title>
            <v-card-title>{{ item.features[2] }}</v-card-title>
            <v-card-actions>
              <v-btn
                color="blue-grey darken-1"
                text
                @click="$refs.propertyChild.loadData(item.title), scrollDown()"
              >
                Search
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
      <!-- End Of Three Cards Section -->
    </v-container>
    <v-container>
      <properties id="properties" :type="type" ref="propertyChild" />
    </v-container>
  </div>
</template>

<script>
import properties from "../components/properties.vue";
export default {
  name: "FindProperty",
  components: {
    properties,
  },
  data() {
    return {
      show: false,
      type: "",
      property: [],
      cardsContent: [
        {
          image: "/house.jpg",
          title: "House",
          color: "white",
          description:
            "Find sweet deals on houses for rent in our most popular locations.",
          features: [
            "Amazing Deals",
            "More then 2000 House",
            "Different locations and origins",
          ],
        },
        {
          image: "/department.png",
          title: "Apartment",
          color: "white",
          description:
            "Find multiple uniques department with reasonable priceses.",
          features: [
            "Standard Prices",
            "More than 1000 department",
            "Different locations and origins",
          ],
        },
        {
          image: "/studio.jpg",
          title: "Studio",
          color: "white",
          description: "Find the perfect studio for you with an amazing deal.",
          features: [
            "Reasonable Prices",
            "More than 500 studio",
            "Different locations and origins",
          ],
        },
      ],
    };
  },
  methods: {
    scrollDown() {
      let div = document.getElementById("properties");
      div.scrollIntoView(true);
    },
  },
};
</script>

<style>
#search {
  background-image: linear-gradient(to right, #78909c, #b0bec5);
}
</style>
