<template>
  <div app>
    <!-- Header -->
    <v-container fluid id="dashHeader">
      <v-row class="px-16 py-10" align="center" justify="center">
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-row justify="center">
            <v-col cols="12">
              <span
                class="text-xl-h2 text-lg-h3 text-md-h4 text-sm-h5 text-h5 white--text text--darken-4 font-weight-medium"
                >PROPERTIES</span
              >
              <div
                class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-3 pt-5"
              >
                <v-icon color="blue-grey darken-4" large>mdi-home</v-icon>
                Track all your properties
              </div>
              <div
                class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-3 pt-5"
              >
                <v-icon color="blue-grey darken-4" large>mdi-pencil</v-icon>
                Manage and maintain your property
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="6" cols="12">
          <v-row justify="center">
            <v-img contain max-width="500" src="/dash.png"></v-img>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-16">
      <!-- Search bar and sort button -->
      <v-row>
        <!-- search bar -->
        <v-col xl="10" lg="10" md="10" sm="9" cols="8">
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
        <v-col
          xl="2"
          lg="2"
          md="2"
          sm="3"
          cols="4"
          class="align-end d-flex flex-column"
        >
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
        <v-col v-if="!exist" cols="12">
          <v-row align="center" justify="center">
            <span class="text-h5 py-10 blue-grey--text"
              >No data were found</span
            >
          </v-row>
        </v-col>
      </v-row>
      <!-- Rented properties row info -->
      <v-row v-for="property in filteredProperties" :key="property._id">
        <v-col class="grey lighten-2" xl="6" lg="6" md="6" sm="12" cols="12">
          <v-img
            max-height="300"
            max-width="1000"
            :src="property.images[0]"
          ></v-img
        ></v-col>
        <v-col
          class="grey lighten-4 pa-6"
          xl="6"
          lg="6"
          md="6"
          sm="12"
          cols="12"
        >
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
            <v-col cols="6" class="font-weight-medium green--text text--darken">
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
                          @loadData="load"
                          :propertyDetails="{
                            id: property._id,
                            ownerID: property.ownerID,
                            name: property.name,
                            type: property.type,
                            furnish: property.furnish,
                            bedrooms: property.bedrooms,
                            livingrooms: property.livingrooms,
                            bathrooms: property.bathrooms,
                            kitchen: property.kitchen,
                            parking: property.parking,
                            balcony: property.balcony,
                            size: property.size,
                            area: property.area,
                            price: property.price,
                            ownerPhoneNumber: property.ownerPhoneNumber,
                            description: property.description,
                            images: property.images,
                          }"
                        />
                      </v-toolbar-items>
                      <!-- delete property -->
                      <v-toolbar-items>
                        <v-btn
                          depressed
                          block
                          tile
                          height="50"
                          color="blue-grey darken-3"
                          class="white--text"
                          :loading="deleteLoading"
                          @click="
                            deleteProperty(property._id),
                              (dialog.value = dialogStatus)
                          "
                          >Delete</v-btn
                        >
                      </v-toolbar-items>
                    </v-toolbar>
                    <!-- Property Details Card -->
                    <v-card-text>
                      <div class="text-h5 pa-6 font-weight-medium">
                        {{ property.name }}
                      </div>
                      <!-- property images -->
                      <v-container>
                        <v-row>
                          <v-col>
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
                      <!-- property info -->
                      <v-container
                        class="pa-5 text-h6 blue-grey--text text--darken-1"
                      >
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
                          <!-- property type -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-home</v-icon>
                            <span class="grey--text"> Property Type:</span>
                            {{ property.type }}
                          </v-col>
                          <!-- property furnish -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-sofa-single</v-icon>
                            <span class="grey--text"> Furnished: </span>
                            {{ property.furnish }}
                          </v-col>
                        </v-row>
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
                          <!-- property bedroom -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-bed-king</v-icon>
                            <span class="grey--text"> Bedroom:</span>
                            {{ property.bedrooms }}
                          </v-col>
                          <!-- property livingroom -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-sofa</v-icon>
                            <span class="grey--text"> Livingroom:</span>
                            {{ property.livingrooms }}
                          </v-col>
                        </v-row>
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
                          <!-- property bathroom -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-toilet</v-icon>
                            <span class="grey--text"> Bathroom:</span>
                            {{ property.bathrooms }}
                          </v-col>
                          <!-- property kitchen -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-stove</v-icon>
                            <span class="grey--text"> Kitchen:</span>
                            {{ property.kitchen }}
                          </v-col>
                        </v-row>
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
                          <!-- property parking -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-car-back</v-icon>
                            <span class="grey--text"> Parking:</span>
                            {{ property.parking }}
                          </v-col>
                          <!-- property balcony -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-window-closed-variant</v-icon>
                            <span class="grey--text"> Balcony:</span>
                            {{ property.balcony }}
                          </v-col>
                        </v-row>
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
                          <!-- property size -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-arrow-split-vertical</v-icon>
                            <span class="grey--text"> Size:</span>
                            {{ property.size }} ft
                          </v-col>
                          <!-- property location -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-map-marker</v-icon>
                            <span class="grey--text"> Location:</span>
                            {{ property.area }}
                          </v-col>
                        </v-row>
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
                          <!-- property price -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-cash-multiple</v-icon>
                            <span class="grey--text"> Price:</span>
                            {{ property.price }} BHD / MONTHLY
                          </v-col>
                          <!-- owner phone number -->
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-cellphone</v-icon>
                            <span class="grey--text"> Phone Number:</span>
                            {{ property.ownerPhoneNumber }}
                          </v-col>
                        </v-row>
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
                          <!-- property description -->
                          <v-col cols="12" class="grey--text">
                            <v-icon>mdi-information-variant</v-icon>
                            Description:
                          </v-col>
                          <v-col class="text-subtitle-1">
                            {{ property.description }}
                          </v-col>
                        </v-row>
                        <!-- Calendar: reservation dates -->
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
                          <v-col cols="12" class="grey--text">
                            <v-icon>mdi-calendar</v-icon>
                            Reserved Months:
                          </v-col>
                          <v-col cols="12">
                            <v-date-picker
                              v-model="property.reservedDates"
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
  </div>
</template>

<script>
import EditProperty from "../components/EditProperty.vue";
import PropertyService from "../services/propertyService";
export default {
  name: "RentedProperties",
  components: {
    EditProperty,
  },
  data() {
    return {
      exist: true,
      deleteLoading: false,
      properties: [],
      edit: false,
      dialogStatus: true,
      search: "",
      sortBy: [
        { type: "price" },
        { type: "size" },
        { type: "location" },
        { type: "type" },
        { type: "rooms" },
      ],
    };
  },
  methods: {
    // change the status of the dialog
    load(value) {
      if (value) {
        this.loadData();
      }
    },
    // load the user properties
    async loadData() {
      this.exist = true; //reset value
      let user = JSON.parse(localStorage.user);
      try {
        const properties = await PropertyService.getUserProperties(user._id);
        this.properties = properties.properties;
        if (this.properties == "") {
          this.exist = false;
        }
      } catch (err) {
        console.log(err.message);
      }
    },
    // delete a property
    async deleteProperty(id) {
      try {
        this.deleteLoading = true;
        await PropertyService.deleteProperty(id);
        await this.loadData();
        this.deleteLoading = false;
        this.dialogStatus = false;
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
  async created() {
    await this.loadData();
    console.log(this.properties);
  },
};
</script>

<style>
#dashHeader {
  background-image: url("/dashBackground.gif");
  background-size: cover;
}
</style>
