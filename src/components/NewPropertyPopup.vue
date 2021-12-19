<template>
  <div>
    <v-dialog
      v-model="dialog"
      fullscreen
      hide-overlay
      transition="dialog-bottom-transition"
    >
      <template v-slot:activator="{ on, attrs }">
        <v-btn
          depressed
          v-bind="attrs"
          v-on="on"
          class="blue lighten-1 white--text"
          >Add New Property</v-btn
        >
      </template>
      <v-card>
        <v-toolbar tile dark color="blue-grey darken-3">
          <v-btn icon dark @click="dialog = false">
            <v-icon>mdi-close</v-icon>
          </v-btn>
          <v-toolbar-title>Add New Property</v-toolbar-title>
        </v-toolbar>
        <v-container class="pa-15">
          <v-row>
            <v-col
              cols="12"
              align="center"
              justify="center"
              class="blue-grey--text text--darken-1 text-xl-h2 text-lg-h3 text-md-h4 text-sm-h5 text-h6 pb-10"
            >
              List your property with us
              <v-icon large> mdi-check </v-icon>
            </v-col>
          </v-row>
          <!-- stepper start -->
          <v-row>
            <v-col cols="12">
              <v-stepper
                class="blue-grey lighten-1 mt-5"
                flat
                tile
                v-model="e1"
              >
                <v-stepper-header>
                  <v-stepper-step
                    color="white blue-grey--text"
                    :complete="e1 > 1"
                    step="1"
                  >
                    Property descriptions
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    color="white blue-grey--text"
                    :complete="e1 > 2"
                    step="2"
                  >
                    Property sections
                  </v-stepper-step>
                  <v-divider></v-divider>
                </v-stepper-header>

                <v-stepper-items>
                  <!-- First stepper -->
                  <v-stepper-content step="1">
                    <v-card
                      class="pa-16 mb-10"
                      color="grey lighten-5"
                      max-height="820px"
                      flat
                    >
                      <v-row>
                        <!-- name -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            clearable
                            prepend-icon="mdi-home"
                            v-model="pName"
                            label="name"
                          ></v-text-field>
                        </v-col>
                        <!-- type -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-select
                            v-model="pType"
                            :items="propertyType"
                            label="Type"
                            prepend-icon="mdi-domain"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <!-- size -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            clearable
                            suffix="ft"
                            v-model="pSize"
                            type="number"
                            label="Size"
                            prepend-icon="mdi-ruler-square"
                          ></v-text-field>
                        </v-col>
                        <!-- area -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-select
                            v-model="pArea"
                            :items="areas"
                            label="Area"
                            prepend-icon="mdi-map-marker"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <!-- price -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            clearable
                            prefix="BD"
                            v-model="pPrice"
                            type="number"
                            label="Price"
                            prepend-icon="mdi-cash-100"
                          ></v-text-field>
                        </v-col>
                        <!-- furnish -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-select
                            v-model="pFurniture"
                            :items="furniture"
                            label="Furniture"
                            prepend-icon="mdi-sofa-single"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <!-- phone number -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            clearable
                            counter="8"
                            v-model="pPhoneNumber"
                            type="number"
                            label="Phone Number"
                            prepend-icon="mdi-cellphone"
                          ></v-text-field>
                        </v-col>
                        <!-- images  -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-file-input
                            v-model="pPics"
                            show-size
                            counter
                            multiple
                            accept="image/*"
                            label="Upload property pictures"
                          ></v-file-input>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-btn class="white-text" depressed @click="nextStepper">
                      Continue
                    </v-btn>
                  </v-stepper-content>
                  <!-- Second Stepper -->
                  <v-stepper-content step="2">
                    <v-card
                      class="mb-12 pa-16"
                      color="grey lighten-5"
                      height="550px"
                      flat
                    >
                      <v-row>
                        <!-- balcony -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-select
                            v-model="pBalcony"
                            :items="balcony"
                            label="Balcony"
                            prepend-icon="mdi-window-closed-variant"
                          ></v-select>
                        </v-col>
                        <!-- parking -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            v-model="pParking"
                            type="number"
                            label="Parking"
                            prepend-icon="mdi-car"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <!-- bedroom -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            v-model="pBedroom"
                            type="number"
                            label="Bedroom"
                            prepend-icon="mdi-bed-king"
                          ></v-text-field>
                        </v-col>
                        <!-- living room -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            v-model="pLivingroom"
                            type="number"
                            label="Livingroom"
                            prepend-icon="mdi-sofa"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <!-- bathroom -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            v-model="pBathroom"
                            type="number"
                            label="Bathroom"
                            prepend-icon="mdi-toilet"
                          ></v-text-field>
                        </v-col>
                        <!-- kitchen -->
                        <v-col cols="12" sm="6" md="6" lg="6" xl="6">
                          <v-text-field
                            v-model="pKitchen"
                            type="number"
                            label="Kitchen"
                            prepend-icon="mdi-stove"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <!-- description -->
                        <v-col cols="12">
                          <v-textarea
                            v-model="pDescription"
                            name="input-7-1"
                            label="Description"
                            prepend-icon="mdi-clipboard-text"
                          ></v-textarea>
                        </v-col>
                      </v-row>
                    </v-card>
                    <v-btn
                      :loading="loading"
                      class="white-text"
                      @click="submitProperty"
                    >
                      Continue
                    </v-btn>
                  </v-stepper-content>
                </v-stepper-items>
              </v-stepper>
              <!-- stepper end -->
            </v-col>
          </v-row>
        </v-container>
      </v-card>
      <!-- fields value -->
      <v-snackbar v-model="snackbar">
        Please make sure to fill all the fields
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue-grey lighten-1"
            text
            v-bind="attrs"
            @click="snackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
      <!-- pass length -->
      <v-snackbar v-model="passSnackbar">
        Please make sure phone number length is equal to 8 numbers
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue-grey lighten-1"
            text
            v-bind="attrs"
            @click="passSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </v-dialog>
    <!-- Snackbar section -->
  </div>
</template>

<script>
import PropertyService from "../services/propertyService";
export default {
  name: "NewPropertyPopup",
  data() {
    return {
      x: 0,
      images: [],
      e1: 1,
      dialog: false,
      notifications: false,
      sound: true,
      widgets: false,
      snackbar: false,
      passSnackbar: false,
      loading: false,

      // property variables
      pName: "",
      pType: "",
      pFurniture: "",
      pBalcony: "",
      pBedroom: "",
      pLivingroom: "",
      pBathroom: "",
      pKitchen: "",
      pParking: "",
      pSize: "",
      pPrice: "",
      pArea: "",
      pPhoneNumber: "",
      pPics: [],
      pDescription: "",
      property: {},
      propertyType: ["House", "Apartment", "Studio"],
      furniture: ["Semi-Furnished", "Furnished"],
      balcony: ["Available", "Not Available"],
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length == 10 || "equal 8 characters",
      },
      areas: [
        "Manama",
        "Riffa",
        "Muharraq",
        "Hamad Town",
        "Aali",
        "Isa Town",
        "Sitra",
        "Budaiya",
        "Jidhafs",
        "Al-Malikiyah ",
        "Jid Ali",
        "Sanabis",
        "Tubli",
        "Saar",
        "Al Dur",
        "Qudaibiya",
        "Salmabad",
        "Jurdab",
        "Diyar Al Muharraq",
        "Amwaj",
        "Hidd",
        "Arad",
        "Busaiteen",
        "Janabiyah",
        "Samaheej",
        "Aldair",
      ],
    };
  },
  methods: {
    addNewProperty() {
      let user = JSON.parse(localStorage.user);
      this.property = {
        ownerID: user._id,
        name: this.pName,
        description: this.pDescription,
        type: this.pType,
        furnish: this.pFurniture,
        bedrooms: this.pBedroom,
        livingrooms: this.pLivingroom,
        bathrooms: this.pBathroom,
        kitchen: this.pKitchen,
        parking: this.pParking,
        balcony: this.pBalcony,
        size: this.pSize,
        area: this.pArea,
        price: this.pPrice,
        ownerPhoneNumber: this.pPhoneNumber,
        images: this.pPics,
      };
    },
    nextStepper() {
      if (
        this.pName != "" &&
        this.pType != "" &&
        this.pFurniture != "" &&
        this.pSize != "" &&
        this.pArea != "" &&
        this.pPrice != "" &&
        this.pPhoneNumber != "" &&
        this.pPics != "" &&
        this.pPhoneNumber.length == 8
      ) {
        this.e1 = 2;
      } else {
        if (this.pPhoneNumber.length != 8) {
          this.passSnackbar = true;
        }
        this.snackbar = true;
      }
    },
    clearTextFields() {
      this.pName = "";
      this.pType = "";
      this.pFurniture = "";
      this.pBalcony = "";
      this.pBedroom = "";
      this.pLivingroom = "";
      this.pBathroom = "";
      this.pKitchen = "";
      this.pParking = "";
      this.pSize = "";
      this.pPrice = "";
      this.pArea = "";
      this.pPhoneNumber = "";
      this.pPics = [];
      this.pDescription = "";
    },
    submitProperty() {
      if (
        this.pBedroom != "" &&
        this.pLivingroom != "" &&
        this.pBathroom != "" &&
        this.pKitchen != "" &&
        this.pParking != "" &&
        this.pBalcony != "" &&
        this.pDescription != ""
      ) {
        this.addNewProperty(); // this method will assign all the data within the property variable
        return this.$store
          .dispatch("uploads", this.property.images)
          .then((result) => {
            //this.loading = true;
            //console.log(localStorage.user._id);
            //console.log(result);
            // PropertyService.addProperty(this.property)
            //   .then(() => {
            //     this.loading = false;
            //     this.dialog = false;
            //     this.clearTextFields();
            //     this.e1 = 1;
            //   })
            //   .catch((err) => console.log(err.message));
          })
          .catch((err) => console.log(err));
      } else {
        this.snackbar = true;
      }
    },
    // getFileName(e) {
    //   while (this.x < e.length) {
    //     this.images[this.x] = URL.createObjectURL(e[this.x]);
    //     this.x++;
    //   }
    // },
  },
};
</script>
