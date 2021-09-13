<template>
  <div app>
    <v-container fluid id="settingHeader">
      <v-row class="px-16" align="center" justify="cente">
        <v-col cols="6">
          <v-row class="pa-16">
            <v-col cols="12">
              <span class="text-h3 white--text font-weight-medium"
                >SETTINGS</span
              >
              <div class="text-h4 blue-grey--text text--darken-4 pt-5">
                <v-icon color="white" large>mdi-update</v-icon>
                Update your account settings
              </div>
              <div class="text-h4 blue-grey--text text--darken-4 pt-5">
                <v-icon color="white" large>mdi-card-account-details-star</v-icon>
                Adjust your account with our features
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="py-6" align="center" justify="cente">
          <v-img contain max-width="1000" src="/settings.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-16"> </v-container>
  </div>
</template>

<script>
export default {
  name: "Settings",
  components: {},
  data() {
    return {};
  },
};
</script>
<style>
#settingHeader {
  background-image: linear-gradient(to right, #247a69, #89c2b6);
}
</style>