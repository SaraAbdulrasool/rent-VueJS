<template>
  <div class="blue-grey lighten-5">
    <v-container class="pt-16">
      <v-row class="pt-16 px-5">
        <v-col align="center" justify="center" cols="12">
          <p class="text-h2 font-weight-medium blue-grey--text text--darken-3">
            Welcome {{ user.fName }} {{ user.lName }}
          </p>
        </v-col>
      </v-row>
      <v-row class="px-5">
        <v-col align="center" justify="center" cols="12">
          <p class="blue-grey--text text--lighten-2 text-h5">
            We have assembled some links to get you started!
          </p>
        </v-col>
      </v-row>
      <!-- Cards section -->
      <v-row align="center" justify="center">
        <v-col
          xl="4"
          lg="4"
          md="4"
          sm="12"
          cols="12"
          v-for="item in items"
          :key="item.name"
        >
          <template v-if="user.role == item.role || item.role == 'all'">
            <v-card
              align="center"
              justify="center"
              class="mx-auto pa-2"
              max-width="500"
              max-height="500"
              :color="item.color"
            >
              <v-img :src="item.image" max-height="350" max-width="350"></v-img>

              <v-card-title> {{ item.title }} </v-card-title>

              <v-card-subtitle align="left">
                {{ item.description }}
              </v-card-subtitle>

              <v-card-actions>
                <v-btn :to="item.router" color="white" text>
                  SHOW
                </v-btn>
              </v-card-actions>
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
export default {
  name: "UserHomepage",
  components: {},
  data() {
    return {
      user: "",
      items: [
        {
          title: "Properties",
          description: "Find all your properties",
          image: "/UserHomepage/properties.png",
          color: "cyan",
          role: "Property owner",
          router: "/RentedProperties",
        },
        {
          title: "Properties",
          description: "Find all available properties",
          image: "/UserHomepage/properties.png",
          color: "cyan",
          role: "Admin",
          router: "/Property",
        },
        {
          title: "Reservations",
          description: "Track your reservations",
          image: "/UserHomepage/reservation.png",
          color: "cyan darken-3",
          role: "Customer",
          router: "/Reservation",
        },
        {
          title: "Applications",
          description: "View your current applications",
          image: "/UserHomepage/application.png",
          color: "pink darken-2",
          role: "Customer",
          router: "/Applications",
        },
        {
          title: "Applications",
          description: "Manage customers applications",
          image: "/UserHomepage/application.png",
          color: "pink darken-2",
          role: "Property owner",
          router: "/Applications",
        },
        {
          title: "Financial Reports",
          description: "Find and calculate the profit of the company",
          image: "/UserHomepage/reports.png",
          color: "teal lighten-3",
          role: "Admin",
          router: "/Reports",
        },
        {
          title: "Account",
          description: "Manage your personal data",
          image: "/UserHomepage/account.png",
          color: "teal accent-4",
          role: "all",
          router: "/Account",
        },
      ],
    };
  },
  mounted() {
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
      this.items = this.items.filter((object) => {
        if (object.role == this.user.role || object.role == "all") {
          return object;
        }
      });
    }
  },
};
</script>

<style></style>
