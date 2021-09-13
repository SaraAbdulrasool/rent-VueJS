<template>
  <v-container fluid class="pa-10 blue-grey lighten-5">
    <v-row class="pa-16" align="center" justify="center">
      <v-col sm="12" md="4" lg="4" cols="12">
        <v-row>
          <v-col
            cols="12"
            align="center"
            justify="center"
            class="
              text-lg-h1
              text-md-h2
              text-sm-h2
              text-h3
              font-weight-medium
              blue-grey--text
              text--blue-grey text--darken-1
              pb-10
            "
          >
            RENT A PROPERTY
          </v-col>
        </v-row>
        <v-row>
          <v-col
            cols="12"
            align="center"
            justify="center"
            class="text-h5 font-weight-thin grey--text text--darken-1 pb-16"
          >
            MULTIPLE UNIQUE OPTIONS FOR ALL TYPE OF PROPERTIES
          </v-col>
        </v-row>
        <v-row>
          <v-col cols="12" align="center" justify="center">
            <!-- login in dialog -->
            <v-dialog transition="dialog-bottom-transition" max-width="800">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="blue-grey darken-3 white--text"
                  depressed
                  rounded
                  large
                  width="150"
                  v-bind="attrs"
                  v-on="on"
                  >LOGIN</v-btn
                >
              </template>
              <template v-slot:default="dialog">
                <v-card align="center" justify="center">
                  <v-toolbar flat color="blue-grey lighten-1" dark
                    >LOGIN</v-toolbar
                  >
                  <v-card-text>
                    <div class="text-lg-h4 text-md-h4 text-sm-h4 text-h6 pt-12">WELCOM BACK AGAIN!</div>
                    <div class="text-h6 blue-grey--text font-weight-thin">
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
                        <div v-if="$store.state.errorMessage" class="red--text">
                          The username or password you entered is inncorrect.
                          please try again.
                        </div>
                      </v-col>
                    </v-row>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn text to="/Home" @click="login">Login</v-btn>
                    <v-btn
                      text
                      @click="
                        $store.state.errorMessage = false;
                        dialog.value = false;
                      "
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
        <v-row>
          <!-- Register dialog -->
          <v-col cols="12" align="center" justify="center">
            <v-dialog transition="dialog-bottom-transition" max-width="800">
              <template v-slot:activator="{ on, attrs }">
                <v-btn
                  class="blue-grey darken-3 white--text"
                  depressed
                  rounded
                  large
                  width="150"
                  v-bind="attrs"
                  v-on="on"
                  >SIGN UP</v-btn
                >
              </template>
              <template v-slot:default="dialog">
                <v-card align="center" justify="center">
                  <v-toolbar flat color="blue-grey lighten-1" dark
                    >SIGN UP</v-toolbar
                  >
                  <v-card-text>
                    <div class="text-lg-h4 text-md-h4 text-sm-h5 text-h6 pt-12">CREATE YOUR RENTAL ACCOUNT</div>
                    <div class="text-h6 blue-grey--text font-weight-thin">
                      Please fill all the below fields to start
                    </div>
                  </v-card-text>
                  <v-container fluid>
                    <v-row align="center" justify="center">
                      <v-col lg="7" md="7" sm="7" cols="10">
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
                        <!-- Password textfield -->
                        <v-text-field
                          label="Password"
                          outlined
                          type="number"
                          append-icon="mdi-lock"
                          v-model="pass"
                          color="blue-grey"
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
                        <!-- Email textfield -->
                        <v-text-field
                          label="E-mail"
                          outlined
                          append-icon="mdi-email"
                          v-model="email"
                          color="blue-grey"
                        ></v-text-field>
                        <v-text-field
                          label="Address"
                          outlined
                          append-icon="mdi-map-marker"
                          v-model="address"
                          color="blue-grey"
                        ></v-text-field>
                      </v-col>
                    </v-row>
                    <div class="red--text" v-if="$store.state.errorMessage">
                      This e-mail is already exists.
                    </div>
                  </v-container>
                  <v-card-actions class="justify-end">
                    <v-btn text to="/Home" @click="createNewUser()"
                      >Submit</v-btn
                    >
                    <v-btn
                      text
                      @click="
                        clearTextFields;
                        $store.state.errorMessage = false;
                        dialog.value = false;
                      "
                      >Close</v-btn
                    >
                  </v-card-actions>
                </v-card>
              </template>
            </v-dialog>
          </v-col>
        </v-row>
      </v-col>
      <v-col sm="12" md="8" lg="8" cols="12" align="center" justify="center" class="pt-10">
        <v-img max-width="1000" src="/housedealer.png"></v-img>
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
import db from "../firebase/firebaseInit";
export default {
  name: "Login",
  data() {
    return {
      snackbar: false,
      show: false,
      users: [],

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
    };
  },
  methods: {
    clearTextFields() {
      this.fName = "";
      this.lName = "";
      this.pass = "";
      this.phoneNumber = "";
      this.birthDate = "";
      this.email = "";
      this.address = "";
    },
    login() {
      if (this.mail != "" && this.password != null) {
        let user = {
          email: this.mail,
          password: this.password,
        };
        this.$store.commit("login", user);
      } else {
        this.snackbar = true;
      }
    },
    createNewUser() {
      if (
        this.fName != "" &&
        this.lName != "" &&
        this.pass != "" &&
        this.phoneNumber != "" &&
        this.birthDate != "" &&
        this.email != "" &&
        this.address != ""
      ) {
        let user = {
          fName: this.fName,
          lName: this.lName,
          password: this.pass,
          phoneNumber: this.phoneNumber,
          birthDate: this.birthDate,
          email: this.email,
          address: this.address,
        };
        this.$store.commit("addNewUser", user);
      } else {
        this.snackbar = true;
      }
      this.clearTextFields();
    },
    loadData() {
      this.users = [];
      db.collection("users")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            let user = {
              id: doc.id,
              userID: doc.data().userID,
              fName: doc.data().fName,
              lName: doc.data().lName,
              email: doc.data().email,
              password: doc.data().password,
            };

            this.$store.state.users.push(user);
          });
        });
    },
  },
  created() {
    this.loadData();
  },
  $emit: ["Login"],
};
</script>