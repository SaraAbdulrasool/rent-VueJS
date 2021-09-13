<template>
  <div>
    <!-- slider part -->
    <!-- <v-carousel height="400" hide-delimiter-background show-arrows-on-hover>
      <v-carousel-item
        class="blue-grey lighten-5"
        v-for="slide in slides"
        :key="slide.number"
        :to="slide.router"
      >
        <v-sheet :color="slide.color" height="100%"> -->
    <!-- first slide -->
    <!-- <v-row
            v-if="slide.name == 'First'"
            class="fill-height"
            align="center"
            justify="center"
          >
            <v-container fluid>
              <v-row>
                <v-col cols="8" class="py-16" align="center" justify="center">
                  <div class="pt-16 text-h2 font-weight-medium" id="title">
                    Check our avaliable uniques properties
                  </div>
                  <div class="text-h5 pt-5 blue-grey--text text--lighten-4">
                    DIFFERENT CITIES, MODERN STYLES, RESONABLE PRICES
                  </div>
                </v-col>
                <v-col cols="4">
                  <v-img max-width="400" src="slide1.png"></v-img>
                </v-col>
              </v-row>
            </v-container>
          </v-row> -->
    <!-- second slide -->
    <!-- <v-row>
            <v-col> hi </v-col>
          </v-row>
        </v-sheet>
      </v-carousel-item>
    </v-carousel> -->
    <!-- end of slider part -->
    <!-- start of home page -->
    <v-container class="blue-grey lighten-5" fluid>
      <div id="background" class="">
        <v-row align="center" justify="center">
          <p
            class="
              text-center text-lg-h2 text-md-h2 text-sm-h3 text-h4
              blue-grey--text
              text--darken-3
              font-weight-light
            "
          >
            Welcom To Our Rental Website
          </p>
        </v-row>
        <v-row align="center" justify="center" class="pt-7 px-10">
          <div
            class="
              text-lg-h3 text-md-h3 text-sm-h4 text-h5 text-center
              white--text
              font-weight-medium
              primary
              pa-8
              rounded-pill
            "
          >
            Renting a new place is the start of something great
          </div>
        </v-row>
        <v-row class="pt-10 pb-16">
          <v-col cols="12" align="center" justify="center">
            <v-img
              src="/buy-now.png"
              max-height="800"
              max-width="900"
              position="center"
            ></v-img>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <v-container fluid class="py-16 teal lighten-5">
      <v-row class="pt-10">
        <v-col cols="12" align="center" justify="center">
          <div
            class="
              text-lg-h4 text-md-h4 text-sm-h4 text-h5
              grey--text
              text--darken-2
              font-weight-bold
            "
          >
            Let us help you navigate the renting experience
          </div>
        </v-col>
      </v-row>

      <v-row align="center" justify="center" class="pt-10">
        <v-col cols="12">
          <v-card class="mx-auto" max-width="1000">
            <v-img
              class="white--text align-end"
              height="350px"
              src="/world.jpg"
            >
              <v-card-title
                >We’ve got Homes and Apartments for Rent in Popular
                Cities</v-card-title
              >
            </v-img>
            <v-simple-table height="400">
              <template v-slot:default>
                <thead>
                  <tr>
                    <th class="text-left">Name</th>
                    <th class="text-left">Type</th>
                  </tr>
                </thead>
                <tbody>
                  <tr v-for="country in countries" :key="country.name">
                    <td>{{ country.name }}</td>
                    <td>{{ country.type }}</td>
                  </tr>
                </tbody>
              </template>
            </v-simple-table>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Home",
  data() {
    return {
      slides: [
        {
          name: "First",
          router: "/FindProperty",
          color: "teal lighten-1",
        },
        {
          name: "Second",
          router: "/FindProperty",
          color: 'blue-grey darken-3"',
        },
        {
          name: "Third",
          router: "/FindProperty",
          color: 'blue darken-3"',
        },
        {
          name: "Fourth",
          router: "/FindProperty",
          color: 'blue-grey darken-3"',
        },
        {
          name: "Fifth",
          router: "/FindProperty",
          color: 'blue darken-3"',
        },
      ],
      countries: [
        { name: "Atlanta Apartments", type: "Apartment" },
        { name: "Austin Houses", type: "House" },
        { name: "Baltemore Apartments", type: "Department" },
        { name: "Atlenta Apartments", type: "Apartment" },
        { name: "Austen Houses", type: "House" },
        { name: "Baltimore Apartments", type: "Department" },
        { name: "Atlonta Apartments", type: "Apartment" },
        { name: "Auston Houses", type: "House" },
        { name: "Baltamore Apartments", type: "Department" },
      ],
    };
  },
};
</script>

<style>
#title {
  animation-name: example;
  animation-duration: 4s;
  animation-iteration-count: infinite;
}
@keyframes example {
  from {
    color: rgb(65, 64, 64);
  }
  to {
    color: rgb(241, 224, 163);
  }
}
#background {
  background-image: url("/background.gif");
  width: 100%;
  height: 100%;
}
</style>
