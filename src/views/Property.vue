<template>
  <div>
    <v-container fluid>
      <v-row class="pt-10 pl-10">
        <v-col cols="12">
          <span class="text-h6 blue-grey--text">AVAILABLE PROPERTIES</span>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="pb-10">
      <v-row>
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
      <!-- Property rows infor -->
      <v-row v-for="property in filteredProperties" :key="property.id">
        <!-- Outside -->
        <v-col class="blue-grey lighten-4" lg="6" md="6" sm="12" cols="12">
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
              <v-icon small color="blue darken-2"> mdi-account</v-icon>
              {{ property.user.fName }} {{ property.user.lName }}
            </v-col>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-phone</v-icon>
              {{ property.ownerPhoneNumber }}
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="6">
              <v-icon small color="blue darken-2"> mdi-map-marker </v-icon>
              {{ property.area }}
            </v-col>
            <v-col cols="6" class="font-weight-medium green--text text--darken">
              <v-icon small color="blue darken-2"> mdi-cash-multiple</v-icon>
              {{ property.price }} BHD / MONTHLY
            </v-col>
          </v-row>
          <v-row>
            <v-col cols="12" align="center" justify="center" class="mt-6">
              <v-dialog transition="dialog-bottom-transition" max-width="1000">
                <template v-slot:activator="{ on, attrs }">
                  <v-btn
                    depressed
                    block
                    tile
                    color="blue lighten-2"
                    class="py-8 white--text"
                    v-bind="attrs"
                    v-on="on"
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
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Property Type:</span
                            >
                            {{ property.type }}
                          </v-col>
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-sofa-single</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
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
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Bedroom:</span
                            >
                            {{ property.bedrooms }}
                          </v-col>
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-sofa</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
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
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Bathroom:</span
                            >
                            {{ property.bathrooms }}
                          </v-col>
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-stove</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
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
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Parking:</span
                            >
                            {{ property.parking }}
                          </v-col>
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-window-closed-variant</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
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
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Size:</span
                            >
                            {{ property.size }}
                          </v-col>
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-map-marker</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
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
                              class="grey--text text--darken-2 font-weight-bold"
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
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Phone Number:</span
                            >
                            {{ property.ownerPhoneNumber }}
                          </v-col>
                        </v-row>
                        <!-- Owner Information -->
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
                            <v-icon>mdi-account</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Owner Name:</span
                            >
                            {{ property.user.fName }}
                            {{ property.user.lName }}
                          </v-col>
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-calendar</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Birth Date:</span
                            >
                            {{ property.user.birthDate }}
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
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-email</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Email:</span
                            >
                            {{ property.user.email }}
                          </v-col>
                          <v-col lg="6" md="6" sm="6" cols="12">
                            <v-icon>mdi-map-marker-outline</v-icon>
                            <span
                              class="grey--text text--darken-2 font-weight-bold"
                            >
                              Address:</span
                            >
                            {{ property.user.address }}
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
                            class="grey--text text--darken-2 font-weight-bold"
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
                            class="grey--text text--darken-2 font-weight-bold"
                          >
                            <v-icon>mdi-calendar-range</v-icon>
                            Booked Months:
                          </v-col>
                          <!-- Calendar -->
                          <v-col cols="12">
                            <v-date-picker
                              readonly
                              multiple
                              full-width
                              v-model="property.reservedDates"
                              type="month"
                              color="blue lighten-1"
                            ></v-date-picker>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card-text>
                    <v-card-actions class="justify-end">
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
      </v-row>
    </v-container>
  </div>
</template>

<script>
import PropertyService from "../services/propertyService";
export default {
  name: "Property",
  components: {},
  data() {
    return {
      propertyID: "",
      properties: [],
      sortBy: [{ type: "price" }, { type: "size" }, { type: "area" }],
      search: "",
    };
  },
  methods: {
    sortByType(type) {
      if (type == "area") {
        this.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "size") {
        this.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "price") {
        this.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
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
    try {
      let properties = await PropertyService.getPropertiesWithOwner();
      this.properties = properties.properties;
    } catch (err) {
      console.log(err.message);
    }
  },
};
</script>

<style scoped></style>
