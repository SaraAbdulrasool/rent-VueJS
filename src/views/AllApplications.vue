<template>
  <div app>
    <!-- title -->
    <v-container fluid>
      <v-row class="pt-10 pl-10">
        <v-col cols="12">
          <span class="text-h6 blue-grey--text">APPLICATIONS</span>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <!-- Cards section -->
      <v-row align="center" justify="center">
        <v-col
          cols="12"
          sm="4"
          md="4"
          lg="4"
          xl="4"
          v-for="item in items"
          :key="item.name"
        >
          <v-card
            class="pa-2"
            max-width="500"
            max-height="500"
            :color="item.color"
          >
            <v-row align="center" justify="center" class="py-5">
              <v-col cols="12">
                <v-img
                  :src="item.image"
                  max-height="350"
                  max-width="350"
                ></v-img>
              </v-col>
            </v-row>

            <v-card-title> {{ item.title }} </v-card-title>

            <v-card-subtitle align="left">
              {{ item.description }}
            </v-card-subtitle>

            <v-card-actions>
              <v-btn @click="showApplication(item.type)" color="white" text>
                SHOW
              </v-btn>
            </v-card-actions>
          </v-card>
        </v-col>
      </v-row>
    </v-container>
    <!-- Applications -->
    <v-container class="pb-16 pt-10">
      <v-row>
        <!-- serahc bar and sort button -->
        <v-col cols="12">
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
            <v-col xl="2" lg="2" md="2" sm="3" cols="4">
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
        </v-col>
        <!-- Exist message -->
        <v-col v-if="!exist && type != ''" cols="12">
          <v-row align="center" justify="center">
            <span class="text-h5 py-10 blue-grey--text"
              >No data were found</span
            >
          </v-row>
        </v-col>
        <!-- Applications list -->
        <v-col v-for="app in filteredApplications" :key="app._id" cols="12">
          <template v-if="app.status == type">
            <v-card flat tile>
              <v-card-title class="white subheading font-weight-bold">
                Application Date: {{ app.createdAt }}
              </v-card-title>

              <v-divider></v-divider>

              <v-container fluid class="grey lighten-4">
                <v-row>
                  <!-- image side -->
                  <v-col class="grey lighten-2" cols="6" lg="6" md="12" sm="12">
                    <v-img
                      max-width="1000"
                      max-height="300"
                      :src="app.property.images[0]"
                    ></v-img>
                  </v-col>
                  <!-- details side -->
                  <v-col cols="6" lg="6" md="12" sm="12" class="pa-8">
                    <div class="text-h6 font-weight-medium primary--text">
                      {{ app.property.name }}
                    </div>
                    <!-- application status -->
                    <div class="pb-7">
                      <v-icon small>mdi-clock</v-icon>
                      <span
                        v-bind:class="[
                          app.status == 'Approved' ? 'approve' : '',
                          app.status == 'Rejected' ? 'reject' : '',
                          app.status == 'Waiting' ? 'waiting' : '',
                        ]"
                      >
                        {{ app.status }}</span
                      >
                    </div>
                    <!-- application date -->
                    <v-row class="text-h7">
                      <!-- customer name -->
                      <v-col cols="6" md="6" sm="12">
                        <v-icon>mdi-account</v-icon>
                        Customer:
                        <span class="primary--text"
                          >{{ app.customer.fName }} {{ app.customer.lName }}
                        </span>
                      </v-col>
                      <!-- phone number -->
                      <v-col cols="6" md="6" sm="12">
                        <v-icon>mdi-cellphone</v-icon>
                        Phone number:
                        <span class="primary--text">{{
                          app.customer.phoneNumber
                        }}</span>
                      </v-col>
                    </v-row>
                    <v-row class="text-h7">
                      <!-- email -->
                      <v-col cols="6" md="6" sm="12">
                        <v-icon>mdi-email</v-icon>
                        E-mail:
                        <span class="primary--text">{{
                          app.customer.email
                        }}</span>
                      </v-col>
                      <!-- address -->
                      <v-col cols="6" md="6" sm="12">
                        <v-icon>mdi-map-marker</v-icon>
                        Address:
                        <span class="primary--text">{{
                          app.customer.address
                        }}</span>
                      </v-col>
                    </v-row>
                    <!-- Dialog -->
                    <v-row class="pt-2">
                      <v-col>
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
                                  {{ app.property.name }}
                                </div>
                                <v-container>
                                  <v-row>
                                    <v-col cols="12">
                                      <v-carousel hide-delimiters>
                                        <v-carousel-item
                                          v-for="pic in app.property.images"
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
                                      {{ app.property.type }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-sofa-single</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Furnished:
                                      </span>
                                      {{ app.property.furnish }}
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
                                      {{ app.property.bedrooms }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-sofa</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Livingroom:</span
                                      >
                                      {{ app.property.livingrooms }}
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
                                      {{ app.property.bathrooms }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-stove</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Kitchen:</span
                                      >
                                      {{ app.property.kitchen }}
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
                                      {{ app.property.parking }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-window-closed-variant</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Balcony:</span
                                      >
                                      {{ app.property.balcony }}
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
                                      {{ app.property.size }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-map-marker</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Location:</span
                                      >
                                      {{ app.property.area }}
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
                                      <span
                                        class="green--text font-weight-medium"
                                        >{{ app.property.price }} BHD /
                                        MONTHLY</span
                                      >
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-cellphone</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Phone Number:</span
                                      >
                                      {{ app.property.ownerPhoneNumber }}
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
                                      {{ app.owner.fName }}
                                      {{ app.owner.lName }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-calendar</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Birth Date:</span
                                      >
                                      {{ app.owner.birthDate }}
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
                                      {{ app.owner.email }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-map-marker-outline</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Address:</span
                                      >
                                      {{ app.customer.address }}
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
                                    <v-col
                                      class="blue--text lighten-1 text-subtitle-1"
                                    >
                                      {{ app.property.description }}
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
                                        v-model="app.dates"
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
            </v-card>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
//import db from "../firebase/firebaseInit";
import ApplicationService from "../services/applicationService";
export default {
  name: "AllApplications",
  data() {
    return {
      sortBy: [{ type: "date" }, { type: "price" }, { type: "area" }],
      search: "",
      type: "",
      exist: true,
      apps: [],
      applications: [],
      items: [
        {
          title: "Approved Applications",
          description: "Find all acceptable forms",
          image: "/approved.png",
          color: "teal accent-4",
          type: "Approved",
        },
        {
          title: "Holded Applications",
          description: "Find all pending forms",
          image: "/waiting.png",
          color: "yellow darken-2",
          type: "Waiting",
        },
        {
          title: "Rejected Applications",
          description: "Find all denied forms",
          image: "/rejected.png",
          color: "red darken-4",
          type: "Rejected",
        },
      ],
    };
  },
  methods: {
    async showApplication(type) {
      this.type = type;
      await this.loadData();
      this.applications = this.apps.filter((app) => {
        return app.status == type;
      });
      this.applications.sort((a, b) =>
        a["createdAt"] > b["createdAt"] ? -1 : 1
      );
      if (this.applications == "") {
        this.exist = false;
      }
    },
    sortByType(type) {
      if (type == "area") {
        this.applications.sort((a, b) =>
          a.property[type] < b.property[type] ? -1 : 1
        );
      } else if (type == "date") {
        this.applications.sort((a, b) =>
          a["createdAt"] > b["createdAt"] ? -1 : 1
        );
      } else if (type == "price") {
        this.applications.sort((a, b) =>
          a.property[type] < b.property[type] ? -1 : 1
        );
      }
    },
    async loadData() {
      try {
        let app = await ApplicationService.getApplications();
        this.apps = app.applications;
      } catch (err) {
        console.log(err.message);
      }
    },
  },
  computed: {
    filteredApplications() {
      return this.applications.filter((application) => {
        return application.property.name
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
.approve {
  color: rgb(58, 173, 119);
}
.reject {
  color: rgb(150, 23, 23);
}
.waiting {
  color: rgb(201, 163, 39);
}
</style>
