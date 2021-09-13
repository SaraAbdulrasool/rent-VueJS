<template>
  <div app>
    <v-container fluid>
      <v-row class="pt-10 pl-10">
        <v-col cols="12">
          <span class="text-h6 blue-grey--text">RENTED PROPERTIES</span>
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
      <!-- Rented properties row info -->
      <v-row v-for="property in properties" :key="property.propertyID">
        <template v-if="property.ownerID == $store.state.loggedUserID">
          <v-col class="grey lighten-2" cols="6">
            <v-img
              max-height="300"
              max-width="1000"
              :src="property.pictures[0]"
            ></v-img
          ></v-col>
          <v-col class="grey lighten-4 pa-6" cols="6">
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
              <v-col cols="12" align="center" justify="center" class="mt-10">
                <v-dialog
                  transition="dialog-bottom-transition"
                  max-width="1000"
                  v-if="edit == false"
                >
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
                      >Show Details</v-btn
                    >
                  </template>
                  <template v-slot:default="dialog">
                    <v-card>
                      <v-toolbar flat color="blue-grey darken-3" dark
                        >Property Details
                        <v-spacer></v-spacer>
                        <v-toolbar-items>
                          <!-- Edit Property Section -->
                          <EditProperty
                            :propertyDetails="{
                              id: property.id,
                              propertyID: property.propertyID,
                              name: property.name,
                              type: property.type,
                              furnish: property.furnish,
                              bedroom: property.bedroom,
                              livingroom: property.livingroom,
                              bathroom: property.bathroom,
                              kitchen: property.kitchen,
                              parking: property.parking,
                              balcony: property.balcony,
                              size: property.size,
                              location: property.location,
                              price: property.price,
                              ownerNumber: property.ownerNumber,
                              description: property.description,
                              pictures: property.pictures,
                            }"
                          />
                        </v-toolbar-items>
                      </v-toolbar>
                      <!-- Property Details Card -->
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
                            <!-- property type -->
                            <v-col cols="6">
                              <v-icon>mdi-home</v-icon>
                              <span class="grey--text"> Property Type:</span>
                              {{ property.type }}
                            </v-col>
                            <!-- property furnish -->
                            <v-col cols="6">
                              <v-icon>mdi-sofa-single</v-icon>
                              <span class="grey--text"> Furnished: </span>
                              {{ property.furnish }}
                            </v-col>
                          </v-row>
                          <v-row>
                            <!-- property bedroom -->
                            <v-col cols="6">
                              <v-icon>mdi-bed-king</v-icon>
                              <span class="grey--text"> Bedroom:</span>
                              {{ property.bedroom }}
                            </v-col>
                            <!-- property livingroom -->
                            <v-col cols="6">
                              <v-icon>mdi-sofa</v-icon>
                              <span class="grey--text"> Livingroom:</span>
                              {{ property.livingroom }}
                            </v-col>
                          </v-row>
                          <v-row>
                            <!-- property bathroom -->
                            <v-col cols="6">
                              <v-icon>mdi-toilet</v-icon>
                              <span class="grey--text"> Bathroom:</span>
                              {{ property.bathroom }}
                            </v-col>
                            <!-- property kitchen -->
                            <v-col cols="6">
                              <v-icon>mdi-stove</v-icon>
                              <span class="grey--text"> Kitchen:</span>
                              {{ property.kitchen }}
                            </v-col>
                          </v-row>
                          <v-row>
                            <!-- property parking -->
                            <v-col cols="6">
                              <v-icon>mdi-car-back</v-icon>
                              <span class="grey--text"> Parking:</span>
                              {{ property.parking }}
                            </v-col>
                            <!-- property balcony -->
                            <v-col cols="6">
                              <v-icon>mdi-window-closed-variant</v-icon>
                              <span class="grey--text"> Balcony:</span>
                              {{ property.balcony }}
                            </v-col>
                          </v-row>
                          <v-row>
                            <!-- property size -->
                            <v-col cols="6">
                              <v-icon>mdi-arrow-split-vertical</v-icon>
                              <span class="grey--text"> Size:</span>
                              {{ property.size }} ft
                            </v-col>
                            <!-- property location -->
                            <v-col cols="6">
                              <v-icon>mdi-map-marker</v-icon>
                              <span class="grey--text"> Location:</span>
                              {{ property.location }}
                            </v-col>
                          </v-row>
                          <v-row>
                            <!-- property price -->
                            <v-col cols="6">
                              <v-icon>mdi-cash-multiple</v-icon>
                              <span class="grey--text"> Price:</span>
                              {{ property.price }} BHD / MONTHLY
                            </v-col>
                            <!-- owner phone number -->
                            <v-col cols="6">
                              <v-icon>mdi-cellphone</v-icon>
                              <span class="grey--text"> Phone Number:</span>
                              {{ property.ownerNumber }}
                            </v-col>
                          </v-row>
                          <v-row class="text-h6">
                            <!-- property description -->
                            <v-col cols="12" class="grey--text">
                              <v-icon>mdi-information-variant</v-icon>
                              Description:
                            </v-col>
                            <v-col class="text-subtitle-1">
                              {{ property.description }}
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
        </template>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import EditProperty from "../components/EditProperty.vue";
import db from "../firebase/firebaseInit";
export default {
  name: "RentedProperties",
  components: {
    EditProperty,
  },
  data() {
    return {
      properties: [],
      edit: false,
      sortBy: [{ type: "price" }, { type: "size" }, { type: "location" }],
    };
  },
  created() {
    db.collection("properties").onSnapshot((snapshot) => {
      let changes = snapshot.docChanges();
      changes.forEach((change) => {
        if (change.doc.data().ownerID == this.$store.state.loggedUserID) {
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
          };
          this.properties.push(property);
        }
      });
    });
  },
};
</script>