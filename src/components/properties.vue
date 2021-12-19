<template>
  <div>
    <v-container v-if="type != ''" class="pb-16">
      <v-row class="pb-10">
        <v-col cols="12">
          <p
            class="
              text-lg-h3 text-md-h3 text-sm-h3 text-h5 text-center
              blue--text
              text--lighten-1
            "
          >
            Find our available {{ type }}s
          </p>
        </v-col>
      </v-row>
      <!-- search bar and sort button -->
      <v-row v-if="exist">
        <!-- search bar -->
        <v-col cols="10">
          <v-text-field
            v-model="search"
            append-icon="mdi-magnify"
            label="Search"
            outlined
            dense
            background-color="white"
            color="blue-grey"
          ></v-text-field>
        </v-col>
        <!--Sort by type -->
        <v-col cols="2" class="align-end d-flex flex-column">
          <v-menu open-on-hover offset-y top>
            <template v-slot:activator="{ on, attrs }">
              <v-btn depressed color="white" v-bind="attrs" v-on="on">
                Sort By
              </v-btn>
            </template>
            <v-list>
              <v-list-item
                v-for="type in sortBy"
                :key="type.type"
                link
                @click="sortByType(type.type)"
              >
                <v-list-item-title>{{ type.type }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <!-- exist message -->
      <!-- Exist message -->
      <v-col v-if="!exist" cols="12">
        <v-row justify="center" align="center">
          <span class="text-h5 py-10 blue-grey--text">No data were found</span>
        </v-row>
      </v-col>
      <!-- Property rows infor -->
      <v-row v-for="property in filteredProperties" :key="property.id">
        <!-- check the type of the property -->
        <template v-if="property.type == type">
          <v-col
            class="blue-grey lighten-4"
            xl="12"
            lg="6"
            md="6"
            sm="12"
            cols="12"
          >
            <v-img
              max-height="300"
              max-width="1000"
              :src="property.images[0]"
            ></v-img
          ></v-col>
          <v-col class="grey lighten-4 pa-6" lg="6" md="6" sm="12" cols="12">
            <v-row>
              <v-col class="font-weight-bold pt-6 text-h6">
                {{ property.name }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-icon small color="blue darken-2"> mdi-map-marker </v-icon>
                {{ property.area }}
              </v-col>
              <v-col cols="6">
                <v-icon small color="blue darken-2"> mdi-sofa-single </v-icon>
                {{ property.furnish }}
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="6">
                <v-icon small color="blue darken-2"> mdi-cellphone</v-icon>
                {{ property.ownerPhoneNumber }}
              </v-col>
              <v-col
                cols="6"
                class="font-weight-medium green--text text--darken"
              >
                <v-icon small color="blue darken-2"> mdi-cash-multiple</v-icon>
                {{ property.price }} BHD / MONTHLY
              </v-col>
            </v-row>
            <v-row>
              <v-col cols="12" align="center" justify="center" class="mt-6">
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="1000"
                >
                  <template v-slot:activator="{ on, attrs }">
                    <v-btn
                      depressed
                      block
                      tile
                      color="blue lighten-2"
                      class="py-8 white--text"
                      v-bind="attrs"
                      v-on="on"
                      @click="
                        fetchPropertyReservedDates(property.reservedDates)
                      "
                      >Show Details</v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar flat color="blue lighten-1" dark
                        >Property Details</v-toolbar
                      >
                      <v-card-text>
                        <div class="text-h5 pa-6 font-weight-medium">
                          {{ property.name }}
                        </div>
                        <v-container>
                          <v-row>
                            <v-col cols="12">
                              <v-carousel hide-delimiters>
                                <v-carousel-item
                                  v-for="pic in property.images"
                                  :key="pic"
                                  :src="pic"
                                >
                                  <v-img contain :src="pic"></v-img>
                                </v-carousel-item>
                              </v-carousel>
                            </v-col>
                          </v-row>
                        </v-container>
                        <v-divider></v-divider>
                        <v-container class="pa-5">
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              blue--text
                              lighten-1
                              font-weight-regular
                            "
                          >
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-home</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Property Type:</span
                              >
                              {{ property.type }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-sofa-single</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Furnished:
                              </span>
                              {{ property.furnish }}
                            </v-col>
                          </v-row>
                          <!-- bedroom and living room -->
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              blue--text
                              lighten-1
                              font-weight-regular
                            "
                          >
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-bed-king</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Bedroom:</span
                              >
                              {{ property.bedrooms }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-sofa</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Livingroom:</span
                              >
                              {{ property.livingrooms }}
                            </v-col>
                          </v-row>
                          <!-- bathroom and kitchen -->
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              blue--text
                              lighten-1
                              font-weight-regular
                            "
                          >
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-toilet</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Bathroom:</span
                              >
                              {{ property.bathrooms }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-stove</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Kitchen:</span
                              >
                              {{ property.kitchen }}
                            </v-col>
                          </v-row>
                          <!-- parking and balcony -->
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              blue--text
                              lighten-1
                              font-weight-regular
                            "
                          >
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-car-back</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Parking:</span
                              >
                              {{ property.parking }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-window-closed-variant</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Balcony:</span
                              >
                              {{ property.balcony }}
                            </v-col>
                          </v-row>
                          <!-- size and area -->
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              blue--text
                              lighten-1
                              font-weight-regular
                            "
                          >
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-arrow-split-vertical</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Size:</span
                              >
                              {{ property.size }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-map-marker</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Location:</span
                              >
                              {{ property.area }}
                            </v-col>
                          </v-row>
                          <!-- price and phone number -->
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              blue--text
                              lighten-1
                              font-weight-regular
                            "
                          >
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-cash-multiple</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Price:</span
                              >
                              <span class="green--text font-weight-medium"
                                >{{ property.price }} BHD / MONTHLY</span
                              >
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-cellphone</v-icon>
                              <span
                                class="grey--text text--darken-2 font-weight-medium"
                              >
                                Phone Number:</span
                              >
                              {{ property.ownerPhoneNumber }}
                            </v-col>
                          </v-row>
                          <!-- Description -->
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              font-weight-regular
                            "
                          >
                            <v-col
                              cols="12"
                              class="grey--text text--darken-2 font-weight-medium"
                            >
                              <v-icon>mdi-information-variant</v-icon>
                              Description:
                            </v-col>
                            <v-col class="blue--text lighten-1 text-subtitle-1">
                              {{ property.description }}
                            </v-col>
                          </v-row>
                          <!-- Calendar -->
                          <v-row
                            class="
                              text-lg-h6
                              text-md-h6
                              text-sm-subtitle-1
                              text-subtitle-1
                              font-weight-regular
                            "
                          >
                            <v-col
                              cols="12"
                              class="grey--text text--darken-2 font-weight-medium"
                            >
                              <v-icon>mdi-calendar-range</v-icon>
                              Available months:
                            </v-col>
                            <v-col cols="12">
                              <v-date-picker
                                v-model="dates"
                                type="month"
                                multiple
                                reactive
                                color="blue lighten-1"
                                full-width
                                :allowed-dates="getAllowedDates"
                              ></v-date-picker>
                            </v-col>
                          </v-row>
                        </v-container>
                      </v-card-text>
                      <v-card-actions class="justify-end">
                        <v-btn
                          v-if="user != ''"
                          :loading="loading"
                          class="blue--text text--lighten-1"
                          v-model="propertyID"
                          text
                          @click="
                            createNewApplication({
                              customerID: user._id,
                              propertyID: property._id,
                              ownerID: property.ownerID,
                              dates: dates,
                              status: 'Waiting',
                            })
                          "
                          >Book</v-btn
                        >
                        <v-btn
                          class="blue--text text--lighten-1"
                          text
                          @click="dialog.value = false"
                          >Close</v-btn
                        >
                      </v-card-actions>
                    </v-card>
                  </template>
                </v-dialog>
              </v-col>
            </v-row>
          </v-col>
        </template>
      </v-row>
    </v-container>
    <!-- Error Snackbar -->
    <v-snackbar v-model="snackbar">
      Please make sure to select the months you wish to reserve on
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue-grey lighten-1"
          text
          timeout="5000"
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
    <!-- Successful Snackbar -->
    <v-snackbar v-model="bookingSnackbar">
      Your application has been added successfully, Please wait for the owner
      response
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue-grey lighten-1"
          text
          timeout="6000"
          v-bind="attrs"
          @click="bookingSnackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import Reservation from "../views/Reservation.vue";
import ApplicationService from "../services/applicationService";
import PropertyService from "../services/propertyService";

export default {
  name: "Home",
  components: {
    Reservation,
  },
  emit: ["Reservation"],
  props: ["type"],
  data() {
    return {
      user: "",
      search: "",
      loading: false,
      snackbar: false,
      bookingSnackbar: false,
      exist: true,
      dates: [],
      reservedDates: [],
      x: ["2021-08-11", "2021-08-12"],
      propertyID: "",
      properties: [],
      sortBy: [
        { type: "price" },
        { type: "type" },
        { type: "area" },
        { type: "rooms" },
      ],
    };
  },
  methods: {
    getAllowedDates(value) {
      let valid = true;
      let date = new Date();
      if (
        this.reservedDates.includes(value) ||
        date.toISOString().substring(0, 7) > value
      ) {
        valid = false;
      }
      return valid;
    },
    fetchPropertyReservedDates(reservedDates) {
      this.reservedDates = [];
      this.reservedDates = reservedDates;
    },
    async createNewApplication(app) {
      try {
        // Check if the user have select a particular date
        if (this.dates != "") {
          this.loading = true;
          await ApplicationService.addAplication(app);
          this.loading = false;
          this.bookingSnackbar = true;
          this.dates = [];
        } else {
          this.snackbar = true;
        }
      } catch (err) {
        console.log(err.message);
        this.loading = false;
      }
    },
    async loadData(type) {
      try {
        this.exist = true;
        this.type = type;
        this.properties = await PropertyService.getProperties();
        this.properties = this.properties.properties.filter((pro) => {
          return pro.type == type;
        });
        if (this.properties == "") {
          this.exist = false;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    sortByType(type) {
      if (type == "area") {
        this.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "size") {
        this.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "price") {
        this.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "type") {
        this.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "rooms") {
        this.properties.sort((a, b) =>
          a["bedrooms"] < b["bedrooms"] ? -1 : 1
        );
      }
    },
  },
  computed: {
    filteredProperties() {
      return this.properties.filter((property) => {
        return property.name.toLowerCase().includes(this.search.toLowerCase());
      });
    },
  },
  mounted() {
    if (localStorage.user) {
      this.user = JSON.parse(localStorage.user);
    }
  },
};
</script>
