import Vue from "vue";
import VueRouter from "vue-router";
import Home from "../views/Home.vue";
import FindProperty from "../views/FindProperty.vue";
import About from "../views/About.vue";
import Login from "../views/Login.vue";
import Reservation from "../views/Reservation.vue";
import RentedProperties from "../views/RentedProperties.vue";
import Account from "../views/Account.vue";
import Applications from "../views/Applications.vue";
import Reports from "../views/Reports.vue";
import Property from "../views/Property.vue";
import AllApplications from "../views/AllApplications";
import UserHomepage from "../views/UserHomepage";

Vue.use(VueRouter);

const routes = [
  {
    path: "/Login",
    name: "Login",
    component: Login,
  },
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/FindProperty",
    name: "FindProperty",
    component: FindProperty,
  },
  {
    path: "/About",
    name: "About",
    component: About,
  },
  {
    path: "/Reservation",
    name: "Reservation",
    component: Reservation,
  },
  {
    path: "/RentedProperties",
    name: "RentedProperties",
    component: RentedProperties,
  },
  {
    path: "/Account",
    name: "Account",
    component: Account,
  },
  {
    path: "/Applications",
    name: "Applications",
    component: Applications,
  },
  {
    path: "/Reports",
    name: "Reports",
    component: Reports,
  },
  {
    path: "/Property",
    name: "Property",
    component: Property,
  },
  {
    path: "/All-Applications",
    name: "All-Applications",
    component: AllApplications,
  },
  {
    path: "/User-Homepage",
    name: "UserHomepage",
    component: UserHomepage,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
