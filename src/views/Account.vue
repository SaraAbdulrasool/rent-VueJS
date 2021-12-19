<template>
  <div app>
    <!-- header -->
    <v-container fluid id="accountHeader">
      <v-row class="px-16 py-10" align="center" justify="center">
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-col cols="12">
            <span
              class="
                  text-xl-h2 text-lg-h3 text-md-h4 text-sm-h5 text-h5
                  white--text
                  text--lighten-4
                  font-weight-medium
                "
              >ACCOUNT</span
            >
            <div
              class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-4 pt-5"
            >
              <v-icon color="white lighten-4" large>mdi-account</v-icon>
              Fidn all your personal information
            </div>
            <div
              class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 blue-grey--text text--darken-4 pt-5"
            >
              <v-icon color="white lighten-4" large>mdi-account-edit</v-icon>
              Edit your existing details
            </div>
          </v-col>
        </v-col>
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-row justify="center">
            <v-img contain max-width="500" src="/profile.png"></v-img>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-16">
      <!-- subtitles -->
      <v-row align="center" justify="center">
        <v-col cols="12">
          <div
            class="
              text-h5
              pb-1
              font-weight-medium
              blue-grey--text
              text--darken-3
            "
          >
            Welcom
            <span class="text-uppercase"
              >{{ user.fName }} {{ user.lName }}</span
            >
            !
          </div>
          <div
            class="
              text-h6
              pb-5
              font-weight-thin
              blue-grey--text
              text--darken-3
            "
          >
            You can manage your account down below
          </div>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <!-- card section -->
          <v-card flat max-width="1700" class="mx-auto">
            <v-list two-line>
              <!-- name -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-account-circle </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title
                    >{{ user.fName }} {{ user.lName }}</v-list-item-title
                  >
                  <v-list-item-subtitle>Username</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <EditUser @loadData="load" />
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>
              <!-- phone number -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-phone </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ user.phoneNumber }}</v-list-item-title>
                  <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <EditUser @loadData="load" />
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>

              <!-- email -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-email </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ user.email }}</v-list-item-title>
                  <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <EditUser @loadData="load" />
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>

              <!-- address -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-map-marker </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ user.address }}</v-list-item-title>
                  <v-list-item-subtitle>Address</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <EditUser @loadData="load" />
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>

              <!-- birthdate -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-calendar-range </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>{{ user.birthDate }}</v-list-item-title>
                  <v-list-item-subtitle>Birth date</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <EditUser @loadData="load" />
                </v-list-item-icon>
              </v-list-item>
            </v-list>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import UserService from "../services/userService";
import EditUser from "../components/EditUser.vue";
export default {
  name: "Account",
  components: {
    EditUser,
  },
  data() {
    return {
      user: {},
      changed: false,
    };
  },
  methods: {
    // change the status of the dialog
    load(value) {
      if (value) {
        this.changed = true;
        this.loadData();
      }
    },
    async loadData() {
      let id = JSON.parse(localStorage.user);
      let user = await UserService.getUser(id._id);
      localStorage.user = JSON.stringify(user.user[0]);
      this.user = user.user[0];
    },
  },
  watch: {
    changed(value) {
      localStorage.user = JSON.stringify(value);
    },
  },
  created() {
    this.loadData();
  },
};
</script>
<style>
#accountHeader {
  background-image: url("/profile.gif");
  background-size: cover;
}
</style>
