<template>
  <v-container fluid class="pa-10 blue-grey lighten-5">
    <!-- First column -->
    <v-row class="pa-5" align="center" justify="center">
      <v-col
        sm="12"
        md="12"
        lg="6"
        cols="12"
        align="center"
        justify="center"
        class="pt-10"
      >
        <div class="pa-5">
          <div class="primary--text text-h3 pb-5">Rent a property</div>
          <div class="grey--text text--darken-3 font-weight-thin text-h6 pb-5">
            Sign in or create an account
          </div>
        </div>
        <v-img max-height="600" max-width="900" src="/login.png"></v-img>
      </v-col>
      <!-- Second column -->
      <v-col sm="12" md="12" lg="6" cols="12">
        <!-- Login part -->
        <v-row>
          <v-col cols="12" align="center" justify="center">
            <!-- login card -->
            <v-card
              v-if="!$store.state.signUp"
              flat
              align="center"
              justify="center"
            >
              <v-card-text>
                <div
                  class="primary--text text-lg-h4 text-md-h4 text-sm-h4 text-h6 pt-12"
                >
                  WELCOM BACK AGAIN!
                </div>
                <div class="text-h6 primary--text font-weight-thin">
                  Enter your email and password
                </div>
              </v-card-text>
              <v-container fluid>
                <v-row align="center" justify="center">
                  <v-col lg="8" md="8" sm="7" cols="10">
                    <v-text-field
                      label="Email"
                      outlined
                      append-icon="mdi-account"
                      v-model="mail"
                    ></v-text-field>
                    <v-text-field
                      label="Password"
                      outlined
                      :append-icon="show ? 'mdi-eye' : 'mdi-eye-off'"
                      :type="show ? 'text' : 'password'"
                      hint="At least 8 characters"
                      @click:append="show = !show"
                      counter
                      v-model="password"
                    ></v-text-field>
                    <div
                      v-if="$store.state.errorMessage"
                      class="red--text pb-4"
                    >
                      {{ $store.state.errorMessage }}
                    </div>
                    <div>
                      New user?
                      <v-btn
                        depressed
                        plain
                        color="white"
                        class="primary--text font-weight-medium"
                        @click="
                          $store.state.signUp = true;
                          $store.state.errorMessage = '';
                        "
                        >Create an account</v-btn
                      >
                    </div>
                  </v-col>
                </v-row>
              </v-container>
              <v-card-actions class="justify-end">
                <v-btn
                  text
                  to="/User-Homepage"
                  @click="login"
                  :loading="loading"
                  >Login</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
        <!-- Sign up card -->
        <v-row>
          <v-col md="12" cols="12" align="center" justify="center">
            <v-card
              v-if="$store.state.signUp"
              flat
              align="center"
              justify="center"
            >
              <v-card-text>
                <div
                  class="primary--text text-xl-h4 text-lg-h4 text-md-h5 text-sm-h5 text-h6 pt-12"
                >
                  CREATE YOUR RENTAL ACCOUNT
                </div>
                <div class="text-h6 blue-grey--text font-weight-thin">
                  Please fill all the below fields to start
                </div>
              </v-card-text>
              <v-container>
                <v-row align="center" justify="center">
                  <v-col xl="9" lg="9" md="7" sm="7" cols="12">
                    <!-- First name textfield -->
                    <v-text-field
                      label="First Name"
                      outlined
                      append-icon="mdi-account"
                      v-model="fName"
                      color="blue-grey"
                    ></v-text-field>
                    <!-- Last name textfield -->
                    <v-text-field
                      label="Last Name"
                      outlined
                      append-icon="mdi-account"
                      v-model="lName"
                      color="blue-grey"
                    ></v-text-field>
                    <!-- Email textfield -->
                    <v-text-field
                      label="E-mail"
                      outlined
                      append-icon="mdi-email"
                      v-model="email"
                      color="blue-grey"
                    ></v-text-field>
                    <!-- Password textfield -->
                    <v-text-field
                      label="Password"
                      outlined
                      append-icon="mdi-lock"
                      v-model="pass"
                      color="blue-grey"
                      :type="show ? 'text' : 'password'"
                      @click:append="show = !show"
                      counter
                    ></v-text-field>
                    <!-- Phone number textfield -->
                    <v-text-field
                      label="Phone Number"
                      outlined
                      type="number"
                      append-icon="mdi-cellphone"
                      v-model="phoneNumber"
                      color="blue-grey"
                    ></v-text-field>
                    <!-- Birth date textfield -->
                    <v-menu
                      :close-on-content-click="false"
                      :nudge-right="40"
                      transition="scale-transition"
                      offset-y
                      min-width="auto"
                    >
                      <template v-slot:activator="{ on, attrs }">
                        <v-text-field
                          outlined
                          v-model="birthDate"
                          label="Birth Date"
                          append-icon="mdi-calendar"
                          color="blue-grey"
                          readonly
                          v-bind="attrs"
                          v-on="on"
                        ></v-text-field>
                      </template>
                      <v-date-picker
                        color="blue-grey"
                        v-model="birthDate"
                        @input="menu2 = false"
                      ></v-date-picker>
                    </v-menu>
                    <!-- Address -->
                    <v-text-field
                      label="Address"
                      outlined
                      append-icon="mdi-map-marker"
                      v-model="address"
                      color="blue-grey"
                    ></v-text-field>
                    <v-select
                      :items="['Customer', 'Property owner']"
                      label="User type"
                      v-model="role"
                      outlined
                    ></v-select>
                  </v-col>
                </v-row>
                <div class="red--text" v-if="$store.state.errorMessage">
                  {{ $store.state.errorMessage }}
                </div>
                <div>
                  Already have an account?
                  <v-btn
                    depressed
                    plain
                    color="white"
                    class="primary--text font-weight-medium"
                    @click="
                      $store.state.signUp = false;
                      $store.state.errorMessage = '';
                    "
                    >Sign in</v-btn
                  >
                </div>
              </v-container>
              <v-card-actions class="justify-end">
                <v-btn
                  :loading="loading"
                  text
                  to="/User-Homepage"
                  @click="createNewUser()"
                  >Submit</v-btn
                >
              </v-card-actions>
            </v-card>
          </v-col>
        </v-row>
      </v-col>
    </v-row>
    <!-- Snackbar -->
    <v-snackbar top timeout="4000" v-model="snackbar">
      Please fill all the fields to continue
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue-grey lighten-3"
          text
          v-bind="attrs"
          @click="
            snackbar = false;
            clearTextFields;
          "
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </v-container>
</template>

<script>
import UserService from "../services/userService";
export default {
  name: "Login",
  data() {
    return {
      snackbar: false,
      show: false,
      loading: false,

      // login
      mail: "",
      password: "",

      // register
      fName: "",
      lName: "",
      pass: "",
      phoneNumber: "",
      birthDate: "",
      email: "",
      address: "",
      role: "",
    };
  },
  emit: ["login"],
  methods: {
    // CLEAR ALL TEXTFIELDS METHOD
    clearTextFields() {
      this.fName = "";
      this.lName = "";
      this.pass = "";
      this.phoneNumber = "";
      this.birthDate = "";
      this.email = "";
      this.address = "";
      (this.role = ""), (this.$store.state.errorMessage = "");
    },
    // LOGIN METHOD
    async login() {
      if (this.mail != "" && this.password != "") {
        // setting the loading status to true
        this.loading = true;
        // create user object
        const user = {
          email: this.mail,
          password: this.password,
        };
        const [login, loginErr] = await UserService.login(user);
        if (!loginErr) {
          localStorage.setItem("user", JSON.stringify(login.user));
          localStorage.accessToken = login.accessToken;
          localStorage.refreshToken = login.refreshToken;
          const current = new Date();
          const time = `${current.getHours()}-${current.getMinutes() +
            5}-${current.getSeconds()}`;
          localStorage.tokenPeriod = time;
          this.$emit("login", false);
          sessionStorage.loggedIn = true;
        } else {
          if (loginErr.response.data.message.email != "") {
            this.$store.state.errorMessage =
              loginErr.response.data.message.email;
          } else if (
            loginErr.response.data.message.email != "" &&
            loginErr.response.data.message.password != ""
          ) {
            this.$store.state.errorMessage =
              loginErr.response.data.message.email +
              " / " +
              loginErr.response.data.message.password;
          } else {
            this.$store.state.errorMessage =
              loginErr.response.data.message.password;
          }
        }
        this.loading = false;
      } else {
        this.snackbar = true;
      }
    },
    // ADD USER METHOD
    async createNewUser() {
      if (
        this.fName != "" &&
        this.lName != "" &&
        this.pass != "" &&
        this.phoneNumber != "" &&
        this.birthDate != "" &&
        this.email != "" &&
        this.address != "" &&
        this.role != ""
      ) {
        this.loading = true;
        let user = {
          fName: this.fName,
          lName: this.lName,
          password: this.pass,
          phoneNumber: this.phoneNumber,
          birthDate: this.birthDate,
          email: this.email,
          address: this.address,
          role: this.role,
        };

        const [signup, error] = await UserService.addUser(user);
        if (!error) {
          localStorage.setItem("user", JSON.stringify(signup.user));
          localStorage.accessToken = signup.accessToken;
          localStorage.refreshToken = signup.refreshToken;
          const current = new Date();
          const time = `${current.getHours()}-${current.getMinutes() +
            5}-${current.getSeconds()}`;
          localStorage.tokenPeriod = time;
          this.$emit("login", false);
          sessionStorage.loggedIn = true;
        } else {
          this.$store.state.errorMessage = error.response.data.error;
        }
      } else {
        this.snackbar = true;
      }
      this.loading = false;
    },
    yourCallBackFunction() {
      console.log("hellow world");
    },
  },
  mounted() {
    document.addEventListener("backbutton", this.yourCallBackFunction, false);
  },
  created() {
    this.$store.loginStatus = true;
    this.clearTextFields();
  },
  beforeDestroy() {
    document.removeEventListener("backbutton", this.yourCallBackFunction);
  },
};
</script>
