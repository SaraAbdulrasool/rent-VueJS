<template>
  <v-dialog transition="dialog-bottom-transition" max-width="1000">
    <template v-slot:activator="{ on, attrs }">
      <v-btn
        depressed
        block
        tile
        height="50"
        color="blue-grey darken-3"
        class="white--text"
        v-bind="attrs"
        v-on="on"
        >Edit</v-btn
      >
    </template>
    <template v-slot:default="dialog">
      <v-card>
        <v-toolbar flat color="blue-grey darken-3" dark
          >Property Details
          <v-spacer></v-spacer>
          <v-toolbar-items>
            <!-- Edit Property Section -->
            <v-btn
              dark
              text
              :loading="loading"
              @click="saveEditedProperty(), (dialog.value = dialogStatus)"
              :disabled="!change"
            >
              Save
            </v-btn>
            <v-btn dark text @click="dialog.value = false"> Cancel </v-btn>
          </v-toolbar-items>
        </v-toolbar>
        <v-card-text>
          <!-- property info -->
          <v-container>
            <v-row>
              <!-- property name -->
              <v-col cols="6">
                <v-text-field
                  prepend-icon="mdi-home"
                  v-model="propertyDetails.name"
                  label="name"
                  @change="change = true"
                ></v-text-field>
              </v-col>
              <!-- property type -->
              <v-col cols="6">
                <v-select
                  v-model="propertyDetails.type"
                  :items="propertyType"
                  label="Type"
                  prepend-icon="mdi-domain"
                  @change="change = true"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <!-- property size -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.size"
                  label="Size"
                  prepend-icon="mdi-ruler-square"
                  @change="change = true"
                ></v-text-field>
              </v-col>
              <!-- property location -->
              <v-col cols="6">
                <v-select
                  v-model="propertyDetails.area"
                  :items="areas"
                  label="Area"
                  prepend-icon="mdi-map-marker"
                  @change="change = true"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <!-- property price -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.price"
                  type="number"
                  label="Price"
                  prepend-icon="mdi-cash-100"
                  @change="change = true"
                ></v-text-field>
              </v-col>
              <!-- property furniture -->
              <v-col cols="6">
                <v-select
                  v-model="propertyDetails.furnish"
                  :items="furniture"
                  label="Furniture"
                  prepend-icon="mdi-sofa-single"
                  @change="change = true"
                ></v-select>
              </v-col>
            </v-row>
            <v-row>
              <!-- owner number -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.ownerPhoneNumber"
                  type="number"
                  label="Phone Number"
                  prepend-icon="mdi-cellphone"
                  @change="change = true"
                ></v-text-field>
              </v-col>
              <!-- property images -->
              <v-col cols="6">
                <v-file-input
                  v-model="propertyDetails.images"
                  show-size
                  counter
                  multiple
                  accept="image/*"
                  label="Upload property pictures"
                  @change="
                    getFileName();
                    change = true;
                  "
                ></v-file-input>
              </v-col>
            </v-row>
            <v-row>
              <!-- property balcony -->
              <v-col cols="6">
                <v-select
                  v-model="propertyDetails.balcony"
                  :items="balcony"
                  label="Balcony"
                  prepend-icon="mdi-window-closed-variant"
                  @change="change = true"
                ></v-select>
              </v-col>
              <!-- property park -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.parking"
                  type="number"
                  label="Parking"
                  prepend-icon="mdi-car"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- property bedroom -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.bedrooms"
                  type="number"
                  label="Bedroom"
                  prepend-icon="mdi-bed-king"
                  @change="change = true"
                ></v-text-field>
              </v-col>
              <!-- property livingroom -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.livingrooms"
                  type="number"
                  label="Livingroom"
                  prepend-icon="mdi-sofa"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- property bathroom -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.bathrooms"
                  type="number"
                  label="Bathroom"
                  prepend-icon="mdi-toilet"
                  @change="change = true"
                ></v-text-field>
              </v-col>
              <!-- property kitchen -->
              <v-col cols="6">
                <v-text-field
                  v-model="propertyDetails.kitchen"
                  type="number"
                  label="Kitchen"
                  prepend-icon="mdi-stove"
                  @change="change = true"
                ></v-text-field>
              </v-col>
            </v-row>
            <v-row>
              <!-- property description -->
              <v-col cols="12">
                <v-textarea
                  v-model="propertyDetails.description"
                  name="input-7-1"
                  label="Description"
                  prepend-icon="mdi-clipboard-text"
                  @change="change = true"
                ></v-textarea>
              </v-col>
            </v-row>
          </v-container>
        </v-card-text>
      </v-card>
      <!-- snackbar value saved -->
      <v-snackbar timeout="3000" v-model="snackbarValueSaved">
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
      <!-- snackbar phone number value -->
      <v-snackbar timeout="3000" v-model="phoneSnackbar">
        Phone number length must be equal to eight numbers
        <template v-slot:action="{ attrs }">
          <v-btn
            color="blue-grey lighten-3"
            text
            v-bind="attrs"
            @click="phoneSnackbar = false"
          >
            Close
          </v-btn>
        </template>
      </v-snackbar>
    </template>
  </v-dialog>
</template>

<script>
import PropertyService from "../services/propertyService";
export default {
  name: "EditProperty",
  data() {
    return {
      loading: false,
      close: false,
      snackbarValueSaved: false,
      phoneSnackbar: false,
      change: false,
      dialogStatus: true,
      propertyType: ["House", "Villa", "Apartment"],
      furniture: ["Semi-Furnished", "Furnished"],
      balcony: ["Available", "Not Available"],
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
  props: ["propertyDetails"],
  methods: {
    getFileName(e) {
      let x = 0;
      while (x < e.length) {
        this.images[x] = URL.createObjectURL(e[x]);
        x++;
      }
    },
    async saveEditedProperty() {
      if (
        this.change == true &&
        this.propertyDetails.ownerPhoneNumber.length == 8
      ) {
        try {
          this.loading = true;
          await PropertyService.updateProperty({
            id: this.propertyDetails.id,
            ownerID: this.propertyDetails.ownerID,
            name: this.propertyDetails.name,
            description: this.propertyDetails.description,
            type: this.propertyDetails.type,
            bedrooms: this.propertyDetails.bedrooms,
            livingrooms: this.propertyDetails.livingrooms,
            bathrooms: this.propertyDetails.bathrooms,
            kitchen: this.propertyDetails.kitchen,
            parking: this.propertyDetails.parking,
            balcony: this.propertyDetails.balcony,
            size: this.propertyDetails.size,
            area: this.propertyDetails.area,
            price: this.propertyDetails.price,
            ownerPhoneNumber: this.propertyDetails.ownerPhoneNumber,
            images: this.propertyDetails.images,
          });
          this.loading = false;
          this.$emit("loadData", true);
          this.change = false;
          this.snackbarValueSaved = true;
          this.dialogStatus = false;
        } catch (err) {
          console.log(err.message);
        }
      } else {
        this.phoneSnackbar = true;
      }
    },
  },
  $emit: ["loadData"],
};
</script>
