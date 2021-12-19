<template>
  <v-app id="inspire">
    <!-- Navigation Drawer -->
    <v-navigation-drawer
      v-if="loggedIn"
      v-model="drawer"
      app
      class="blue-grey darken-3"
    >
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
            <span class="text-h5 blue--text text--lighten-1 font-weight-medium"
              >{{ user.fName }} {{ user.lName }}</span
            >
          </v-col>
        </v-row>
        <v-row v-if="user.role == 'Property owner'">
          <v-col cols="12" align="center" justify="center">
            <NewPropertyPopup />
          </v-col>
        </v-row>
        <!-- navigation drawer items -->
        <v-row align="center" justify="center">
          <v-list width="265">
            <div v-for="item in items" :key="item.id">
              <template v-if="item.role == user.role || item.role == 'all'">
                <v-list-item link :to="item.router">
                  <v-list-item-icon>
                    <v-icon color="blue lighten-1">{{ item.icon }}</v-icon>
                  </v-list-item-icon>
                  <v-list-item-content>
                    <v-list-item-title class="white--text">{{
                      item.title
                    }}</v-list-item-title>
                  </v-list-item-content>
                </v-list-item>
              </template>
            </div>
          </v-list>
        </v-row>
      </v-container>
    </v-navigation-drawer>
    <!-- Navigation Bar -->
    <v-app-bar app flat>
      <v-app-bar-nav-icon
        v-if="loggedIn"
        @click="drawer = !drawer"
      ></v-app-bar-nav-icon>
      <div class="pr-2">
        <v-img width="90" height="45" src="/logo.png"></v-img>
      </div>
      <v-toolbar-title class="blue-grey--text text--darken-1"
        >RENT A PROPERTY</v-toolbar-title
      >
      <v-spacer></v-spacer>
      <!-- Sign up button -->
      <v-btn
        v-if="!loggedIn"
        @click="
          $emit('login', true);
          $store.state.signUp = true;
        "
        to="/Login"
        depressed
        class="blue-grey--text text--darken-1"
      >
        <v-icon>mdi-account-plus</v-icon>
        Sign up
      </v-btn>
      <!-- Login button -->
      <v-btn
        v-if="!loggedIn"
        @click="
          $emit('login', true);
          $store.state.signUp = false;
        "
        to="/Login"
        depressed
        class="blue-grey--text text--darken-1"
      >
        <v-icon>mdi-login</v-icon>
        Login
      </v-btn>
      <!-- Logout button -->
      <v-btn
        v-if="loggedIn"
        @click="
          $emit('login', false);
          loggedIn = false;
          logout();
        "
        to="/"
        depressed
        class="blue-grey--text text--darken-1"
      >
        <v-icon>mdi-logout</v-icon>
        Logout
      </v-btn>
      <!-- navigation bar -->
      <template v-if="!loggedIn || user.role == 'Customer'" v-slot:extension>
        <v-tabs align-with-title>
          <v-tab v-if="user.role != 'Customer'" to="/">Home</v-tab>
          <v-tab to="/FindProperty">Find A Property</v-tab>
          <v-tab v-if="user.role != 'Customer'" to="/About">About</v-tab>
        </v-tabs>
      </template>
    </v-app-bar>
    <!-- Main Content -->
    <v-main class="blue-grey lighten-5">
      <router-view />
    </v-main>
  </v-app>
</template>

<script>
import NewPropertyPopup from "../components/NewPropertyPopup.vue";
export default {
  name: "NavBar",
  components: {
    NewPropertyPopup,
  },
  data() {
    return {
      loginStatus: false,
      loggedIn: false,
      user: "",
      drawer: false,
      items: [
        {
          id: 1,
          title: "Reservation",
          icon: "mdi-bookmark-check",
          router: "/Reservation",
          role: "Customer",
        },
        {
          id: 2,
          title: "Properties",
          icon: "mdi-home-city",
          router: "/Property",
          role: "Admin",
        },
        {
          id: 3,
          title: "Properties",
          icon: "mdi-home-city",
          router: "/RentedProperties",
          role: "Property owner",
        },
        {
          id: 4,
          title: "Applications",
          icon: "mdi-application",
          router: "/All-Applications",
          role: "Admin",
        },
        {
          id: 5,
          title: "Applications",
          icon: "mdi-application",
          router: "/Applications",
          role: "Property owner",
        },
        {
          id: 6,
          title: "Applications",
          icon: "mdi-application",
          router: "/Applications",
          role: "Customer",
        },
        {
          id: 7,
          title: "Financial Report",
          icon: "mdi-chart-box",
          router: "/Reports",
          role: "Admin",
        },
        {
          id: 8,
          title: "Account",
          icon: "mdi-account-box",
          router: "/Account",
          role: "all",
        },
      ],
    };
  },
  emit: ["login"],
  methods: {
    logout() {
      this.user = "";
      localStorage.removeItem("user");
      localStorage.removeItem("accessToken");
      localStorage.removeItem("refreshToken");
    },
  },
  created() {},
  mounted() {
    if (sessionStorage.loggedIn) {
      this.loggedIn = JSON.parse(sessionStorage.loggedIn);
    }
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
  },
  watch: {
    loginStatus(value) {
      sessionStorage.loginStatus = value;
    },
    loggedIn(value) {
      sessionStorage.loggedIn = value;
    },
  },
};
</script>
