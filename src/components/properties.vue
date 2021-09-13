<template>
  <div>
    <v-container class="pb-16">
      <v-row class="pb-10">
        <v-col cols="12">
          <p class="text-lg-h3 text-md-h3 text-sm-h3 text-h5 text-center blue--text text--lighten-1">
            Find our available {{ type }}s
          </p>
        </v-col>
      </v-row>
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
      <!-- Property rows infor -->
      <v-row v-for="property in properties" :key="property.id">
        <!-- check the type of the property -->
        <template v-if="property.type == type">
          <v-col class="blue-grey lighten-4" lg="6" md="6" sm="12" cols="12">
            <v-img
              max-height="300"
              max-width="1000"
              :src="property.pictures[0]"
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
                      @click="fetchPropertyReservedDates(property.reservedDates)"
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
                        <v-container class="pa-5">
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 blue--text lighten-1 font-weight-regular">
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-home</v-icon>
                              <span class="grey--text"> Property Type:</span>
                              {{ property.type }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-sofa-single</v-icon>
                              <span class="grey--text"> Furnished: </span>
                              {{ property.furnish }}
                            </v-col>
                          </v-row>
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 blue--text lighten-1 font-weight-regular">
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-bed-king</v-icon>
                              <span class="grey--text"> Bedtoom:</span>
                              {{ property.bedroom }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-sofa</v-icon>
                              <span class="grey--text"> Livingroom:</span>
                              {{ property.livingroom }}
                            </v-col>
                          </v-row>
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 blue--text lighten-1 font-weight-regular">
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-toilet</v-icon>
                              <span class="grey--text"> Bathroom:</span>
                              {{ property.bathroom }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-stove</v-icon>
                              <span class="grey--text"> Kitchen:</span>
                              {{ property.kitchen }}
                            </v-col>
                          </v-row>
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 blue--text lighten-1 font-weight-regular">
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-car-back</v-icon>
                              <span class="grey--text"> Parking:</span>
                              {{ property.parking }}
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-window-closed-variant</v-icon>
                              <span class="grey--text"> Balcony:</span>
                              {{ property.balcony }}
                            </v-col>
                          </v-row>
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 blue--text lighten-1 font-weight-regular">
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-arrow-split-vertical</v-icon>
                              <span class="grey--text"> Size:</span>
                              {{ property.size }} ft
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-map-marker</v-icon>
                              <span class="grey--text"> Location:</span>
                              {{ property.location }}
                            </v-col>
                          </v-row>
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 blue--text lighten-1 font-weight-regular">
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-cash-multiple</v-icon>
                              <span class="grey--text"> Price:</span>
                              {{ property.price }} BHD / MONTHLY
                            </v-col>
                            <v-col lg="6" md="6" sm="6" cols="12">
                              <v-icon>mdi-cellphone</v-icon>
                              <span class="grey--text"> Phone Number:</span>
                              {{ property.ownerNumber }}
                            </v-col>
                          </v-row>
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 font-weight-regular">
                            <v-col cols="12" class="grey--text">
                              <v-icon>mdi-information-variant</v-icon>
                              Description:
                            </v-col>
                            <v-col class="blue--text lighten-1 text-subtitle-1">
                              {{ property.description }}
                            </v-col>
                          </v-row>
                          <v-row class="text-lg-h6 text-md-h6 text-sm-subtitle-1 text-subtitle-1 font-weight-regular">
                            <v-col cols="12" class="grey--text">
                              <v-icon>mdi-calendar-range</v-icon>
                              Available days:
                            </v-col>
                            <v-col cols="12">
                              <v-date-picker
                                v-model="dates"
                                multiple
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
                          class="blue--text text--lighten-1"
                          v-model="propertyID"
                          text
                          @click="
                            $store.commit('createNewApplication', {
                              propertyID: property.id,
                              ownerID: property.ownerID,
                              date: dates,
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
  </div>
</template>

<script>
import Reservation from "../views/Reservation.vue";
import db from "../firebase/firebaseInit";
export default {
  name: "Home",
  components: {
    Reservation,
  },
  emit: ["Reservation"],
  props: ["type"],
  data() {
    return {
      dates: [],
      reservedDates: [],
      x: ['2021-08-11', '2021-08-12'],
      propertyID: "",
      properties: [],
      sortBy: [{ type: "price" }, { type: "size" }, { type: "location" }],
    };
  },
  methods:{
    getAllowedDates(value){
      let valid = true
      if(this.reservedDates.includes(value)){
        valid = false
      }
      return valid
    },
    fetchPropertyReservedDates(reservedDates){
      this.reservedDates = []
      this.reservedDates = reservedDates
    }
  },
  created() {
    db.collection("properties").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.type == "added") {
          let doc = change.doc;
          const property = {
            id: doc.id,
            propertyID: doc.data().id,
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
            reservedDates: doc.data().reservedDates,
          };
          this.properties.push(property);
        }
      });
    });
  },
};
</script>