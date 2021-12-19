<template>
  <v-app>
    <Login @login="login" v-if="loginStatus" />
    <NavBar @login="login" v-if="loginStatus == false" />
    <Footer></Footer>
  </v-app>
</template>

<script>
import Login from "./views/Login.vue";
import NavBar from "./components/NavBar.vue";
import Footer from "./components/Footer.vue";
export default {
  name: "App",
  components: {
    NavBar,
    Login,
    Footer,
  },
  data: () => ({
    loginStatus: false,
  }),
  created() {},
  mounted() {
    if (sessionStorage.loginStatus) {
      this.loginStatus = JSON.parse(sessionStorage.loginStatus);
    }
  },
  methods: {
    login(value) {
      this.loginStatus = value;
    },
  },
  watch: {
    loginStatus(data) {
      sessionStorage.loginStatus = data;
    },
  },
};
</script>
