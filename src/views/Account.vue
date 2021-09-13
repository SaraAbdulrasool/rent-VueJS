<template>
  <div app>
    <v-container fluid id="accountHeader">
      <v-row class="px-16" align="center" justify="cente">
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-row class="pa-16">
            <v-col cols="12">
              <span
                class="
                  text-lg-h3 text-md-h4 text-sm-h5 text-h5
                  blue-grey--text
                  text--lighten-4
                  font-weight-medium
                "
                >ACCOUNT</span
              >
              <div class="text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-4 pt-5">
                <v-icon color="blue-grey lighten-4" large>mdi-account</v-icon>
                Fidn all your personal information
              </div>
              <div class="text-lg-h5 text-md-h6 text-sm-h7 blue-grey--text text--darken-4 pt-5">
                <v-icon color="blue-grey lighten-4" large
                  >mdi-account-edit</v-icon
                >
                Edit your existing details
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-img contain max-width="700" src="/profile.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pa-16">
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
              >{{ $store.state.loggedUserFName }}
              {{ $store.state.loggedUserLName }}</span
            >
            !
          </div>
          <div
            class="
              text-h5
              pb-5
              font-weight-medium
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
          <v-card max-width="1100" class="mx-auto">
            <v-row id="accountRowHeader" class="pa-2" no-gutters align="center">
              <v-col cols="8">
                <div class="white--text text-h4 pl-5">
                  <v-icon large color="white">mdi-account</v-icon>
                  {{ $store.state.loggedUserFName }}
                  {{ $store.state.loggedUserLName }}
                </div>
              </v-col>
              <v-col cols="4" class="align-end d-flex flex-column pr-5">
                <v-img width="80" height="80" src="/user.png"></v-img>
              </v-col>
            </v-row>
            <v-list two-line>
              <!-- phone number -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-phone </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>(650) 555-1234</v-list-item-title>
                  <v-list-item-subtitle>Mobile</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>

              <!-- email -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-email </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>aliconnors@example.com</v-list-item-title>
                  <v-list-item-subtitle>Personal</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>

              <!-- address -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-map-marker </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>1400 Main Street</v-list-item-title>
                  <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>

              <!-- birthdate -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-calendar-range </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>1400 Main Street</v-list-item-title>
                  <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
                </v-list-item-icon>
              </v-list-item>

              <v-divider inset></v-divider>

              <!-- name -->
              <v-list-item>
                <v-list-item-icon>
                  <v-icon color="blue-grey"> mdi-account </v-icon>
                </v-list-item-icon>

                <v-list-item-content>
                  <v-list-item-title>1400 Main Street</v-list-item-title>
                  <v-list-item-subtitle>Orlando, FL 79938</v-list-item-subtitle>
                </v-list-item-content>
                <v-list-item-icon>
                  <v-icon>mdi-pencil</v-icon>
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
export default {
  name: "Account",
  components: {},
  data() {
    return {};
  },
};
</script>
<style>
#accountHeader {
  background-image: linear-gradient(to right, #b45353, #e2bbbb);
}

#accountRowHeader {
  background-image: linear-gradient(to right, #3c4c53, #51656d);
}
</style>