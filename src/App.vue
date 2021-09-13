<template>
  <v-app>
    <Login v-if="$store.state.loginStatus == false"/>
    <NavBar v-if="$store.state.loginStatus"/> 
    <Footer></Footer>
  </v-app>
</template>

<script>
import Login from './views/Login.vue'
import NavBar from './components/NavBar.vue'
import Footer from './components/Footer.vue'
export default {
  name: 'App',
  components:{
    NavBar,
    Login,
    Footer,
  },
  data: () => ({

  }),
  methods:{

  }
};
</script>
