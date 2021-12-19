<template>
  <v-dialog transition="dialog-bottom-transition" max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn fab depressed small color="white" v-bind="attrs" v-on="on">
        <v-icon color="grey">mdi-pencil</v-icon>
      </v-btn>
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar flat color="blue-grey darken-3" dark
          >User Details
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- Edit Property Section -->
            <v-btn
              dark
              text
              :loading="loading"
              @click="saveEditedUser(), (dialog.value = dialogStatus)"
              :disabled="!change"
            >
              Save
            </v-btn>
            <v-btn dark text @click="(dialog.value = false), loadData()">
              Cancel
            </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <v-container>
            <v-row>
              <!-- user first name -->
              <v-col cols="12">
                <v-text-field
                  prepend-icon="mdi-account"
                  v-model="user.fName"
                  label="First name"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- user last name -->
              <v-col cols="12">
                <v-text-field
                  v-model="user.lName"
                  label="Last name"
                  prepend-icon="mdi-account"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- user phone number -->
              <v-col cols="12">
                <v-text-field
                  v-model="user.phoneNumber"
                  label="Phone number"
                  prepend-icon="mdi-phone"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- user email -->
              <v-col cols="12">
                <v-text-field
                  v-model="user.email"
                  label="Email address"
                  prepend-icon="mdi-email"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- address-->
              <v-col cols="12">
                <v-text-field
                  v-model="user.address"
                  label="Address"
                  prepend-icon="mdi-map-marker"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- birth date -->
              <v-col cols="12">
                <v-icon>mdi-calendar-range</v-icon>
                Birth date:
              </v-col>
              <v-col cols="12">
                <v-date-picker
                  v-model="user.birthDate"
                  color="blue-grey darken-3"
                  full-width
                ></v-date-picker>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <!-- snackbar value saved -->
      <v-snackbar timeout="4000" v-model="snackbarValueSaved">
        Your changes saved successfully
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue-grey lighten-3"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <!-- phone number length -->
      <v-snackbar timeout="4000" v-model="snackbarPhone">
        Phone number length must not be less than 8 numbers.
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue-grey lighten-3"
            text
            v-bind="attrs"
            @click="snackbarPhone = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-dialog>
</template>

<script>
import UserService from "../services/userService";
export default {
  name: "EditUser",
  data() {
    return {
      user: {},
      close: false,
      snackbarValueSaved: false,
      snackbarPhone: false,
      change: false,
      dialogStatus: true,
      loading: false,
    };
  },
  methods: {
    async saveEditedUser() {
      if (this.change == true) {
        if (this.user.phoneNumber.length >= 8) {
          try {
            this.loading = true;
            let user = {
              _id: this.user._id,
              fName: this.user.fName,
              lName: this.user.lName,
              phoneNumber: this.user.phoneNumber,
              address: this.user.address,
              birthDate: this.user.birthDate,
              email: this.user.email,
              role: this.user.role,
            };
            await UserService.updateUser(user);
            this.dialogStatus = false;
            localStorage.user = JSON.stringify(user);
            this.$emit("loadData", true);
            this.loading = false;
            this.change = false;
            this.snackbarValueSaved = true;
          } catch (err) {
            console.log(err.message);
          }
        } else {
          this.snackbarPhone = true;
        }
      }
    },
    loadData() {
      let userInfo = JSON.parse(localStorage.user);
      this.user = {
        _id: userInfo._id,
        fName: userInfo.fName,
        lName: userInfo.lName,
        phoneNumber: userInfo.phoneNumber,
        address: userInfo.address,
        birthDate: userInfo.birthDate,
        email: userInfo.email,
        role: userInfo.role,
      };
    },
  },
  $emit: ["loadData"],
  created() {
    this.loadData();
  },
};
</script>
