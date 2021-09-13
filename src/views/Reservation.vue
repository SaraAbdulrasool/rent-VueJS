<template>
  <div class="blue-grey lighten-5">
    <v-container fluid id="resHeader">
      <v-row class="px-16" align="center" justify="cente">
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-row class="pa-16">
            <v-col cols="12">
              <span class="text-lg-h3 text-md-h4 text-sm-h5 text-h5 white--text font-weight-medium"
                >RESERVATIONS</span
              >
              <div class="text-lg-h5 text-md-h6 text-sm-h7  blue-grey--text text--darken-4 pt-5">
                <v-icon color="white" large>mdi-book</v-icon>
                Keep up with your current reservations
              </div>
              <div class="text-lg-h5 text-md-h6 text-sm-h7  blue-grey--text text--darken-4 pt-5">
                <v-icon color="white" large>mdi-account-details</v-icon>
                Find all the important details
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col lg="6" md="6" sm="6" cols="12" class="py-6" align="center" justify="cente">
          <v-img contain max-width="1000" src="/reservation.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-16">
      <v-row>
        <!--Sort by type -->
        <v-col cols="12" class="align-end d-flex flex-column">
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
                @click="$store.commit('sortByType', type.type)"
              >
                <v-list-item-title>{{ type.type }}</v-list-item-title>
              </v-list-item>
            </v-list>
          </v-menu>
        </v-col>
      </v-row>
      <!-- Property row info -->
      <v-row v-for="property in properties" :key="property.propertyID">
        <v-col class="blue-grey lighten-4" cols="6">
          <v-img
            max-height="300"
            max-width="1000"
            :src="property.pictures[0]"
          ></v-img
        ></v-col>
        <v-col class="grey lighten-4 pa-6" cols="6">
          <v-row>
            <v-col cols="8" class="font-weight-bold pt-6 text-h6">
              {{ property.name }}
            </v-col>
            <v-col cols="4" class="align-end d-flex flex-column">
              <v-btn
                class="mx-2"
                depressed
                fab
                small
                color="grey lighten-4"
                @click="
                  deleteReservation(property.reservationID);
                  snackbar = true;
                "
              >
                <v-icon dark> mdi-delete </v-icon>
              </v-btn>
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-map-marker </v-icon>
              {{ property.location }}
            </v-col>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-sofa-single </v-icon>
              {{ property.furnish }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-cellphone</v-icon>
              {{ property.ownerNumber }}
            </v-col>
            <v-col cols="6" class="font-weight-medium green--text text--darken">
              <v-icon small color="blue darken-2"> mdi-cash-multiple</v-icon>
              {{ property.price }} BHD / MONTHLY
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" align="center" justify="center" class="mt-10">
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
                        {{ property.name }}
                      </div>
                      <v-container>
                        <v-row>
                          <v-col>
                            <v-carousel hide-delimiters>
                              <v-carousel-item
                                v-for="pic in property.pictures"
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
                      <v-container
                        class="pa-5 text-h6 blue-grey--text text--darken-1"
                      >
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-home</v-icon>
                            <span class="grey--text"> Property Type:</span>
                            {{ property.type }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-sofa-single</v-icon>
                            <span class="grey--text"> Furnished: </span>
                            {{ property.furnish }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-bed-king</v-icon>
                            <span class="grey--text"> Bedtoom:</span>
                            {{ property.bedroom }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-sofa</v-icon>
                            <span class="grey--text"> Livingroom:</span>
                            {{ property.livingroom }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-toilet</v-icon>
                            <span class="grey--text"> Bathroom:</span>
                            {{ property.bathroom }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-stove</v-icon>
                            <span class="grey--text"> Kitchen:</span>
                            {{ property.kitchen }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-car-back</v-icon>
                            <span class="grey--text"> Parking:</span>
                            {{ property.parking }}
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-window-closed-variant</v-icon>
                            <span class="grey--text"> Balcony:</span>
                            {{ property.balcony }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-arrow-split-vertical</v-icon>
                            <span class="grey--text"> Size:</span>
                            {{ property.size }} ft
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-map-marker</v-icon>
                            <span class="grey--text"> Location:</span>
                            {{ property.location }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="6">
                            <v-icon>mdi-cash-multiple</v-icon>
                            <span class="grey--text"> Price:</span>
                            {{ property.price }} BHD / MONTHLY
                          </v-col>
                          <v-col cols="6">
                            <v-icon>mdi-cellphone</v-icon>
                            <span class="grey--text"> Phone Number:</span>
                            {{ property.ownerNumber }}
                          </v-col>
                        </v-row>
                        <v-row class="text-h6">
                          <v-col cols="12" class="grey--text">
                            <v-icon>mdi-information-variant</v-icon>
                            Description:
                          </v-col>
                          <v-col class="text-subtitle-1">
                            {{ property.description }}
                          </v-col>
                        </v-row>
                        <v-row>
                          <v-col cols="12">
                            <v-date-picker
                              v-model="property.date"
                              multiple
                              color="blue-grey lighten-1"
                              full-width
                              disabled
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
    <v-snackbar timeout="2000" v-model="snackbar">
      Your reservation cancelled successfully
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
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
export default {
  name: "Reservation",
  data() {
    return {
      snackbar: false,
      reservations: [],
      properties: [],
      sortBy: [{ type: "price" }, { type: "size" }, { type: "location" }],
    };
  },
  methods: {
    deleteReservation(id) {
      db.collection("reservations").doc(id).delete();
      this.loadData();
    },
    loadData() {
      // reservations
      this.reservations = [];
      db.collection("reservations").onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (
            change.doc.data().customerID == this.$store.state.loggedUserID &&
            change.type == "added"
          ) {
            let doc = change.doc;
            const res = {
              id: doc.id,
              reservationID: doc.data().reservationID,
              propertyID: doc.data().propertyID,
              customerID: doc.data().customerID,
              status: doc.data().status,
              date: doc.data().date,
            };
            this.reservations.push(res);
          }
        });
      });

      // properties
      this.properties = [];
      db.collection("properties").onSnapshot((snapshot) => {
        let changes = snapshot.docChanges();
        changes.forEach((change) => {
          if (change.type == "added") {
            let x = 0;
            let doc = change.doc;

            this.reservations.forEach((res) => {
              if (doc.data().propertyID == res.propertyID) {
                const property = {
                  id: doc.id,
                  reservationID: res.id,
                  propertyID: doc.data().propertyID,
                  ownerID: doc.data().ownerID,
                  name: doc.data().name,
                  description: doc.data().description,
                  type: doc.data().type,
                  furnish: doc.data().furnish,
                  bedroom: doc.data().bedroom,
                  livingroom: doc.data().livingroom,
                  bathroom: doc.data().bathroom,
                  kitchen: doc.data().kitchen,
                  parking: doc.data().parking,
                  balcony: doc.data().balcony,
                  size: doc.data().size,
                  location: doc.data().location,
                  price: doc.data().price,
                  ownerNumber: doc.data().ownerNumber,
                  pictures: doc.data().pictures,
                  date: res.date,
                };
                this.properties.push(property);
              }
            });
          }
        });
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
  background-image: linear-gradient(to right, #5a717c, #b0bec5);
}
</style>