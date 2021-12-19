<template>
  <div>
    <!-- start of home page -->
    <v-container class="blue-grey lighten-5" fluid id="background">
      <div class="px-8">
        <v-row align="center" justify="center" class="py-5">
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-row>
              <v-col cols="12">
                <div
                  class="
              text-xl-h2 text-lg-h3 text-md-h4 text-sm-h4 text-h5 
              white--text 
              font-weight-bold
              px-5 pb-3
            "
                >
                  Renting a new place with us is the start of something great
                </div>
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12">
                <div
                  class="white--text px-5 pb-5 text-xl-h5 text-lg-h6 text-md-body-1 text-sm-h7 text-body-1 font-weight-light"
                >
                  Renting a property is a big step, while Buying a property is a
                  bigger step. At Rent a property, we aim to make this process
                  as easy as possible for you
                </div>
              </v-col>
            </v-row>
            <v-row class="px-5">
              <v-col cols="12" align="left" justify="center">
                <v-btn
                  rounded
                  depressed
                  @click="
                    $store.state.loginStatus = true;
                    $store.state.signUp = true;
                  "
                  to="/FindProperty"
                  class="py-7 px-16 orange accent-2 white--text"
                >
                  Get stated
                </v-btn>
              </v-col>
            </v-row>
          </v-col>
          <v-col cols="12" sm="12" md="6" lg="6" xl="6">
            <v-img src="/hi.png" max-height="1000" max-width="1200"></v-img>
          </v-col>
        </v-row>
      </div>
    </v-container>
    <!-- Second part -->
    <v-container fluid class="py-16 blue lighten-4">
      <v-row align="center" justify="center" class="pt-10">
        <v-col cols="10">
          <div class="white rounded-xl">
            <!-- first row -->
            <v-row class="pa-16">
              <v-col cols="12" align="center" justify="center">
                <div
                  class="
              text-lg-h3 text-md-h4 text-sm-h5 text-h5
              grey--text
              text--darken-3
              font-weight-medium
            "
                >
                  Rental services you can take advantage of during your journal
                </div>
              </v-col>
            </v-row>
            <!-- cards -->
            <v-row class="px-10 pb-10">
              <v-col
                v-for="x in content"
                :key="x.name"
                cols="12"
                sm="12"
                md="12"
                lg="6"
                xl="6"
                class="px-5"
              >
                <v-hover>
                  <v-card
                    flat
                    height="550px"
                    class="rounded-xl"
                    :color="x.color"
                  >
                    <v-row class="pt-10">
                      <v-col cols="12" align="center" justify="center">
                        <v-img
                          position="center"
                          max-width="425"
                          max-height="280"
                          :src="x.image"
                        >
                        </v-img>
                      </v-col>
                      <v-col cols="12" align="center" justify="center">
                        <div
                          class="pt-10 font-weight-medium white--text   text-xl-h4 text-lg-h4 text-md-h4 text-sm-h4 text-h6"
                        >
                          {{ x.name }}
                        </div>
                      </v-col>
                      <v-col cols="12" align="center" justify="center">
                        <div
                          class="pt-5 px-10 font-weight-light white--text  text-xl-h5 text-lg-h5 text-md-h5 text-sm-h5 text-h6"
                        >
                          {{ x.description }}
                        </div>
                      </v-col>
                    </v-row>
                  </v-card>
                </v-hover>
              </v-col>
            </v-row>
          </div>
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
      content: [
        {
          name: "Add property",
          image: "/buy-now.png",
          description:
            "Input details of your property and publish it in public",
          color: "teal lighten-2",
        },
        {
          name: "Rent property",
          image: "/sell-house.png",
          description: "Explore the avilable property for period of time",
          color: "light-blue lighten-1",
        },
      ],
    };
  },
  created() {
    localStorage.removeItem("user");
    localStorage.removeItem("accessToken");
    localStorage.removeItem("refreshToken");
  },
};
</script>

<style>
#background {
  background-image: url("/background.gif");
  background-size: cover;
}
</style>
