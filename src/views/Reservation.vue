<template>
  <div class="blue-grey lighten-5">
    <!-- Header -->
    <v-container fluid id="resHeader">
      <v-row class="px-16" align="center" justify="center">
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-row class="pa-16">
            <v-col cols="12">
              <span
                class="
                  text-lg-h3 text-md-h4 text-sm-h5 text-h5
                  white--text
                  font-weight-medium
                "
                >RESERVATIONS</span
              >
              <div
                class="
                  text-lg-h5 text-md-h6 text-sm-h7
                  blue-grey--text
                  text--darken-4
                  pt-5
                "
              >
                <v-icon color="white" large>mdi-book</v-icon>
                Keep up with your current reservations
              </div>
              <div
                class="
                  text-lg-h5 text-md-h6 text-sm-h7
                  blue-grey--text
                  text--darken-4
                  pt-5
                "
              >
                <v-icon color="white" large>mdi-account-details</v-icon>
                Find all the important details
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col
          lg="6"
          md="6"
          sm="6"
          cols="12"
          class="py-6"
          align="center"
          justify="cente"
        >
          <v-img contain max-width="1000" src="/reservation.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-16">
      <!-- Exist row -->
      <v-row v-if="!exist" align="center" justify="center">
        <v-col cols="12" align="center" justify="center">
          <span class="blue-grey--text text-h5"
            >There are no reservations currently</span
          >
        </v-col>
      </v-row>
      <!-- Calendar -->
      <v-row align="center" justify="center" class="pb-16">
        <v-date-picker
          readonly
          v-if="exist"
          type="month"
          full-width
          v-model="date1"
          :events="arrayEvents"
          event-color="green lighten-1"
          header-color="amber accent-2"
          color="blue-grey"
        ></v-date-picker>
      </v-row>
      <!--Sort by type -->
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
        <!-- sort button -->
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
                @click="sortBy(type.type)"
              >
                <v-list-item-title>{{ type.type }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <!-- Property row info -->
      <v-row
        v-for="property in filteredReservations"
        :key="property._id"
        class="px-3"
      >
        <v-col
          class="blue-grey lighten-4"
          cols="12"
          md="12"
          sm="12"
          lg="6"
          xl="6"
        >
          <v-img
            max-height="300"
            max-width="1000"
            :src="property.property.images[0]"
          ></v-img
        ></v-col>
        <v-col
          class="grey lighten-4 pa-6"
          cols="12"
          md="12"
          sm="12"
          lg="6"
          xl="6"
        >
          <v-row>
            <v-col cols="8" class="font-weight-bold pt-6 text-h6">
              {{ property.property.name }}
            </v-col>
            <v-col cols="4" class="align-end d-flex flex-column">
              <v-btn
                class="mx-2"
                depressed
                fab
                small
                color="grey lighten-4"
                @click="
                  deleteReservation(
                    property._id,
                    property.property._id,
                    property.dates,
                    property.property.reservedDates
                  )
                "
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-map-marker </v-icon>
              {{ property.property.area }}
            </v-col>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-home </v-icon>
              {{ property.property.type }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-cellphone</v-icon>
              {{ property.property.ownerPhoneNumber }}
            </v-col>
            <v-col cols="6" class="font-weight-medium green--text text--darken">
              <v-icon small color="blue darken-2"> mdi-cash-multiple</v-icon>
              {{ property.totalPrice }} BHD
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" align="center" justify="center" class="mt-10">
              <!-- Dialog -->
              <v-dialog transition="dialog-bottom-transition" max-width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    block
                    tile
                    height="50"
                    color="blue-grey darken-3"
                    class="white--text mt-4"
                    v-bind="attrs"
                    v-on="on"
                    >Show Details</v-btn
                  >
                </template>
                <template v-slot:default="dialog">
                  <v-card>
                    <v-toolbar flat color="blue-grey darken-3" dark
                      >Property Details</v-toolbar
                    >
                    <v-card-text>
                      <div class="text-h5 pa-6 font-weight-medium">
                        {{ property.property.name }}
                      </div>
                      <!-- property images -->
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-carousel hide-delimiters>
                              <v-carousel-item
                                v-for="pic in property.property.images"
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
                      <!-- reservation info  -->
                      <v-container
                        class="pa-5 text-h6 blue-grey--text text--darken-1"
                      >
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-home</v-icon>
                            <span class="grey--text"> Property Type:</span>
                            {{ property.property.type }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-sofa-single</v-icon>
                            <span class="grey--text"> Furnished: </span>
                            {{ property.property.furnish }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-bed-king</v-icon>
                            <span class="grey--text"> Bedtoom:</span>
                            {{ property.property.bedrooms }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-sofa</v-icon>
                            <span class="grey--text"> Livingroom:</span>
                            {{ property.property.livingrooms }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-toilet</v-icon>
                            <span class="grey--text"> Bathroom:</span>
                            {{ property.property.bathrooms }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-stove</v-icon>
                            <span class="grey--text"> Kitchen:</span>
                            {{ property.property.kitchen }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-car-back</v-icon>
                            <span class="grey--text"> Parking:</span>
                            {{ property.property.parking }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-window-closed-variant</v-icon>
                            <span class="grey--text"> Balcony:</span>
                            {{ property.property.balcony }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-arrow-split-vertical</v-icon>
                            <span class="grey--text"> Size:</span>
                            {{ property.property.size }} ft
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-map-marker</v-icon>
                            <span class="grey--text"> Location:</span>
                            {{ property.property.area }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-cash-multiple</v-icon>
                            <span class="grey--text"> Price:</span>
                            <span class="green--text"
                              >{{ property.property.price }} BHD / MONTHLY</span
                            >
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-cellphone</v-icon>
                            <span class="grey--text"> Owner Number:</span>
                            {{ property.property.ownerPhoneNumber }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-cash-multiple</v-icon>
                            <span class="grey--text"> Total Price:</span>
                            <span class="green--text"
                              >{{ property.totalPrice }} BHD</span
                            >
                          </v-col>
                        </v-row>
                        <v-row class="text-h6">
                          <v-col cols="12" class="grey--text">
                            <v-icon>mdi-information-variant</v-icon>
                            Description:
                          </v-col>
                          <v-col class="text-subtitle-1">
                            {{ property.property.description }}
                          </v-col>
                        </v-row>
                        <!-- Calendar: reservation dates -->
                        <v-row>
                          <v-col cols="12">
                            <v-date-picker
                              v-model="property.dates"
                              type="month"
                              multiple
                              color="blue-grey lighten-1"
                              full-width
                              readonly
                            ></v-date-picker>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-end">
                      <v-btn
                        class="blue-grey--text text--darken-3"
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
      </v-row>
    </v-container>
    <!-- Cancel snackbar -->
    <v-snackbar timeout="2000" v-model="snackbar">
      Your reservation cancelled successfully
      <template v-slot:action="{ attrs }">
        <v-btn
          color="blue-grey lighten-1"
          text
          timeout="3000"
          v-bind="attrs"
          @click="snackbar = false"
        >
          Close
        </v-btn>
      </template>
    </v-snackbar>
  </div>
</template>

<script>
import ReservationService from "../services/reservationService";
import PropertyService from "../services/propertyService";
export default {
  name: "Reservation",
  data() {
    return {
      snackbar: false,
      exist: false,
      search: "",
      reservations: [],
      arrayEvents: [],
      date1: new Date(Date.now() - new Date().getTimezoneOffset() * 60000)
        .toISOString()
        .substr(0, 10),
      sortBy: [
        { type: "price" },
        { type: "size" },
        { type: "area" },
        { type: "type" },
      ],
    };
  },
  methods: {
    async deleteReservation(reservationID, propertyID, dates, proDates) {
      //filtiring the property reserved dates
      dates.map((date) => {
        console.log(date);
        proDates = proDates.filter((value) => {
          return date != value;
        });
      });

      try {
        let valid = await ReservationService.deleteReservation(reservationID);
        if (valid.status) {
          let done = false;
          done = await PropertyService.updatePropertyReservedDates(
            propertyID,
            "deleteDates",
            proDates
          );
          if (done.status) {
            this.snackbar = true;
            await this.loadData();
          }
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    sortByType(type) {
      if (type == "area") {
        this.reservations.sort((a, b) => (a.p[type] < b.p[type] ? -1 : 1));
      } else if (type == "size") {
        this.reservations.sort((a, b) => (a.p[type] < b.p[type] ? -1 : 1));
      } else if (type == "price") {
        this.reservations.sort((a, b) => (a.p[type] < b.p[type] ? -1 : 1));
      } else if (type == "type") {
        this.reservations.sort((a, b) => (a.p[type] < b.p[type] ? -1 : 1));
      }
    },
    async loadData() {
      this.arrayEvents = []; //reset data
      try {
        let user = JSON.parse(localStorage.user);
        ReservationService.getUserReservations(user._id).then((result) => {
          result.reservations.map((result) => {
            result.dates.map((date) => {
              this.arrayEvents.push(date);
            });
          });
          this.reservations = result.reservations;
          // check if there are reservations
          if (this.reservations != "") {
            this.exist = true;
          }
        });
      } catch (err) {
        console.log(err);
      }
    },
  },
  computed: {
    filteredReservations() {
      return this.reservations.filter((reservation) => {
        return reservation.property.name
          .toLowerCase()
          .includes(this.search.toLowerCase());
      });
    },
  },
  created() {
    this.loadData();
  },
};
</script>

<style>
#resHeader {
  background-image: url("/reservation.gif");
  background-size: cover;
}
</style>
