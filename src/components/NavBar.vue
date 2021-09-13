<template>
  <v-app id="inspire">
    <!-- Navigation Drawer -->
    <v-navigation-drawer v-model="drawer" app class="blue-grey darken-3">
      <v-container>
        <v-row>
          <v-col cols="12" align="center" justify="center" class="px-16 pt-16">
            <v-avatar size="130">
              <v-img src="/user.png"></v-img>
            </v-avatar>
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align="center" justify="center">
            <span
              class="text-h5 blue--text text--lighten-1 font-weight-medium"
              >{{ username }}</span
            >
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align="center" justify="center">
            <NewPropertyPopup />
          </v-col>
        </v-row>
        <v-row align="center" justify="center">
          <v-list width="265">
            <v-list-item
              v-for="item in items"
              :key="item.title"
              link
              :to="item.router"
            >
              <v-list-item-icon>
                <v-icon color="blue lighten-1">{{ item.icon }}</v-icon>
              </v-list-item-icon>
              <v-list-item-content>
                <v-list-item-title class="white--text">{{
                  item.title
                }}</v-list-item-title>
              </v-list-item-content>
            </v-list-item>
          </v-list>
          <template v-slot:append>
            <div class="pa-2">
              <v-btn block> Logout </v-btn>
            </div>
          </template>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <!-- Navigation Bar -->
    <v-app-bar app>
      <v-app-bar-nav-icon @click="drawer = !drawer"></v-app-bar-nav-icon>
      <v-toolbar-title class="blue-grey--text text--darken-1"
        >RENT A PROPERTY</v-toolbar-title
      >
      <v-spacer></v-spacer>

      <v-btn
        to="/Reservation"
        depressed
        class="blue-grey--text text--darken-1"
        @click="resetBadge"
      >
        <v-icon>mdi-bookmark-check</v-icon>
        RESERVATIONS
        <v-badge
          inline
          v-if="$store.state.badge"
          :content="$store.state.reservationsNumber"
          color="blue-grey"
        >
        </v-badge>
      </v-btn>

      <v-btn
        @click="$store.state.loginStatus = false"
        to="/Login"
        depressed
        class="blue-grey--text text--darken-1"
      >
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
      <template v-slot:extension>
        <v-tabs align-with-title>
          <v-tab to="/Home">Home</v-tab>
          <v-tab to="/FindProperty">Find A Property</v-tab>
          <v-tab to="/About">About</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <!-- Main Content -->
    <v-main class="blue-grey lighten-5">
      <router-view/>
    </v-main>
  </v-app>
</template>

<script>
import Home from '../views/Home.vue'
import Reservation from "../views/Reservation.vue";
import NewPropertyPopup from "../components/NewPropertyPopup.vue";
export default {
  name: "NavBar",
  components: {
    Reservation,
    NewPropertyPopup,
    Home,
  },
  data() {
    return {
      badge: false,
      drawer: false,
      items: [
        {
          title: "Dashboard",
          icon: "mdi-view-dashboard",
          router: "/Dashboard",
        },
        { title: "Account", icon: "mdi-account-box", router: "/Account" },
        {
          title: "Reservation",
          icon: "mdi-bookmark-check",
          router: "/Reservation",
        },
        { title: "Settings", icon: "mdi-cog", router: "/Settings" },
      ],
    };
  },
  methods: {
    resetBadge() {
      this.$store.state.badge = false;
      this.$store.state.reservationsNumber = 0;
    },
  },
  computed: {
    username() {
      return (
        this.$store.state.loggedUserFName +
        " " +
        this.$store.state.loggedUserLName
      );
    },
  },
};
</script>
