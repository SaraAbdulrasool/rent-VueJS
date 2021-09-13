<template>
  <div class="blue-grey lighten-5">
    <v-container fluid id="dashHeader">
      <v-row class="px-16 py-4" align="center" justify="center">
        <v-col lg="6" md="6" sm="6" cols="12">
            <v-col cols="12">
              <span class="text-lg-h3 text-md-h4 text-sm-h5 text-h5 blue-grey--text text--darken-4 font-weight-medium"
                >DASHBOARD</span
              >
              <div class="text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-3 pt-5">
                <v-icon color="blue-grey darken-4" large>mdi-text-box</v-icon>
                Track all your applications
              </div>
              <div class="text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-3 pt-5">
                <v-icon color="blue-grey darken-4" large>mdi-home-city</v-icon>
                Find all your rented properties
              </div>
            </v-col>
        </v-col>
        <v-col lg="6" md="6" sm="6" cols="12" class="py-6">
          <v-img contain max-width="700" src="/dash.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-16">
      <v-row>
        <v-col cols="12">
          <div class="text-h5 pb-5 font-weight-medium blue-grey--text text--darken-3">Learn more information about your trading</div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <!-- card column -->
        <v-col cols="12">
          <v-row>
            <v-col lg="6" md="6" sm="12" cols="12" v-for="item in items" :key="item.title">
              <v-card
                :color="item.color"
                class="mx-auto"
                max-width="500"
                max-height="600"
                
              >
                <v-list-item three-line>
                  <v-list-item-content>
                    <v-img height="300" :src="item.image"></v-img>
                    <div class="text-overline mb-4">{{ item.overline }}</div>
                    <v-list-item-title
                      class="text-h5 mb-1 white--text"
                    >
                      {{ item.title }}
                    </v-list-item-title>
                    <v-list-item-subtitle>{{
                      item.subtitle
                    }}</v-list-item-subtitle>
                  </v-list-item-content>
                </v-list-item>

                <v-card-actions class="pa-6">
                  <v-btn
                    :to="item.router"
                    outlined
                    rounded
                    text
                    class="blue-grey darken-1 white--text"
                  >
                    Open
                  </v-btn>
                </v-card-actions>
              </v-card>
            </v-col>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "Dashboard",
  components: {},
  data() {
    return {
      items: [
        {
          overline: "overline",
          title: "Properties For Rent",
          subtitle: "Find your own rented property under here.",
          router: "/RentedProperties",
          image: '/slide1.png',
          color: 'grey lighten-1',
        },
        {
          overline: "overline",
          title: "Applications",
          subtitle:
            "Find the available applications for your rented properties here.",
          router: "/Applications",
          image: '/application.png',
          color: 'red lighten-2',
        },
      ],
    };
  },
  methods: {
    signOut() {
      this.$emit("signOut");
    },
  },
};
</script>
<style>
#dashHeader {
  background-image: linear-gradient(to right, #c2ad4f, #ecddaa);
}
</style>