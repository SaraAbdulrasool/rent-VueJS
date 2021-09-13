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
              class="blue-grey--text text--darken-1 text-h3 pb-10"
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
                    editable
                    color="white blue-grey--text"
                    :complete="e1 > 1"
                    step="1"
                  >
                    Property descriptions
                  </v-stepper-step>

                  <v-divider></v-divider>

                  <v-stepper-step
                    editable
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
                      height="550px"
                      flat
                    >
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            prepend-icon="mdi-home"
                            v-model="pName"
                            label="name"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="pType"
                            :items="propertyType"
                            label="Type"
                            prepend-icon="mdi-domain"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pSize"
                            type="number"
                            label="Size"
                            prepend-icon="mdi-ruler-square"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="pArea"
                            :items="areas"
                            label="Area"
                            prepend-icon="mdi-map-marker"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pPrice"
                            type="number"
                            label="Price"
                            prepend-icon="mdi-cash-100"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-select
                            v-model="pFurniture"
                            :items="furniture"
                            label="Furniture"
                            prepend-icon="mdi-sofa-single"
                          ></v-select>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pPhoneNumber"
                            type="number"
                            label="Phone Number"
                            prepend-icon="mdi-cellphone"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-file-input
                            v-model="pPics"
                            show-size
                            counter
                            multiple
                            accept="image/*"
                            label="Upload property pictures"
                            @change="getFileName"
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
                        <v-col cols="6">
                          <v-select
                            v-model="pBalcony"
                            :items="balcony"
                            label="Balcony"
                            prepend-icon="mdi-window-closed-variant"
                          ></v-select>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pParking"
                            type="number"
                            label="Parking"
                            prepend-icon="mdi-car"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pBedroom"
                            type="number"
                            label="Bedroom"
                            prepend-icon="mdi-bed-king"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pLivingroom"
                            type="number"
                            label="Livingroom"
                            prepend-icon="mdi-sofa"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pBathroom"
                            type="number"
                            label="Bathroom"
                            prepend-icon="mdi-toilet"
                          ></v-text-field>
                        </v-col>
                        <v-col cols="6">
                          <v-text-field
                            v-model="pKitchen"
                            type="number"
                            label="Kitchen"
                            prepend-icon="mdi-stove"
                          ></v-text-field>
                        </v-col>
                      </v-row>
                      <v-row>
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
                    <v-btn class="white-text" @click="nextStepper">
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
    </v-dialog>
    <!-- Snackbar section -->
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
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
      propertyType: ["House", "Villa", "Apartment"],
      furniture: ["Semi-Furnished", "Furnished"],
      balcony: ["Available", "Not Available"],
      rules: {
        required: (value) => !!value || "Required.",
        counter: (value) => value.length >= 10 || "Min 10 characters",
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
      this.property = {
        propertyID: "12",
        name: this.pName,
        desription: this.pDescription,
        type: this.pType,
        furnish: this.pFurniture,
        bedroom: this.pBedroom,
        livingroom: this.pLivingroom,
        bathroom: this.pBathroom,
        kitchen: this.pKitchen,
        parking: this.pParking,
        balcony: this.pBalcony,
        size: this.pSize,
        location: this.pArea,
        price: this.pPrice,
        ownerNumber: this.pPhoneNumber,
        pictures: this.images,
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
        this.pPics != ""
      ) {
        this.e1 = 2;
      } else {
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
        db.collection("properties").add(this.property);
        //this.$store.commit("addProperty", this.property);
        this.dialog = false;
        this.clearTextFields();
        this.e1 = 1;
      } else {
        this.snackbar = true;
      }
    },
    getFileName(e) {
      while (this.x < e.length) {
        this.images[this.x] = URL.createObjectURL(e[this.x]);
        this.x++;
      }
    },
  },
};
</script>