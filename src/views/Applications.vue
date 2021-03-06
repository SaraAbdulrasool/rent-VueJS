<template>
  <div app>
    <!-- Header -->
    <v-container fluid id="appHeader">
      <v-row class="px-16 py-10" align="center" justify="end">
        <v-col lg="6" md="6" sm="6" cols="12">
          <v-row>
            <v-col cols="12">
              <span
                class="text-xl-h2 text-lg-h3 text-md-h4 text-sm-h5 text-h5 white--text font-weight-medium"
                >APPLICATIONS</span
              >
              <div
                class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--lighten-3 pt-5"
              >
                <v-icon color="blue-grey lighten-4" large>mdi-home</v-icon>
                Track all applications
              </div>
              <div
                class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--lighten-3 pt-5"
              >
                <v-icon color="blue-grey lighten-4" large>mdi-pencil</v-icon>
                Manage and maintain your applications
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col xl="6" lg="6" md="6" sm="6" cols="12">
          <v-row justify="center">
            <v-img contain max-width="500" src="/manageApps.png"></v-img>
          </v-row>
        </v-col>
      </v-row>
    </v-container>
    <!-- Card sections -->
    <v-container>
      <!-- subtitle -->
      <v-row class="px-5 pt-10">
        <v-col cols="12" class="pt-9">
          <div class="text-h5 blue-grey--text">
            Find and manage all your applications
          </div>
        </v-col>
      </v-row>
      <!-- Cards section -->
      <v-row align="center" justify="center">
        <v-col
          xl="4"
          lg="4"
          md="4"
          sm="12"
          cols="12"
          v-for="item in items"
          :key="item.name"
        >
          <v-card
            align="center"
            justify="center"
            class="mx-auto pa-2"
            max-width="500"
            max-height="500"
            :color="item.color"
          >
            <v-img :src="item.image" max-height="350" max-width="350"></v-img>

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
    <!-- Applications list -->
    <v-container class="pb-16">
      <!-- search bar and sort button -->
      <v-col v-if="exist" cols="12">
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
          <span class="text-h5 py-10 blue-grey--text">No data were found</span>
        </v-row>
      </v-col>
      <!-- application info -->
      <v-row>
        <v-col v-for="app in filteredApplications" :key="app._id" cols="12">
          <template v-if="app.status == type">
            <v-card flat tile>
              <v-card-title class="white subheading font-weight-bold">
                Application Date: {{ app.createdAt }}
              </v-card-title>

              <v-divider></v-divider>

              <v-container fluid class="grey lighten-4">
                <v-row>
                  <v-col cols="6" lg="6" md="12" sm="12">
                    <v-img
                      max-width="1000"
                      max-height="1000"
                      :src="app.property.images[0]"
                    ></v-img>
                  </v-col>
                  <v-col cols="6" lg="6" md="12" sm="12" class="pa-8">
                    <div class="text-h6 font-weight-medium primary--text">
                      {{ app.property.name }}
                    </div>
                    <!-- application date -->
                    <v-row class="text-h7 pt-10">
                      <v-col cols="6" md="6" sm="12">
                        <v-icon>mdi-clock</v-icon>
                        Reservation status:
                        <span
                          v-bind:class="[
                            app.status == 'Approved' ? 'approve' : '',
                            app.status == 'Rejected' ? 'reject' : '',
                            app.status == 'Waiting' ? 'waiting' : '',
                          ]"
                        >
                          {{ app.status }}</span
                        >
                      </v-col>
                      <!-- customer name -->
                      <v-col
                        v-if="user.role == 'Property owner'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-account</v-icon>
                        Customer:
                        <span class="primary--text"
                          >{{ app.user.fName }} {{ app.user.lName }}
                        </span>
                      </v-col>
                      <!-- property type -->
                      <v-col
                        v-if="user.role == 'Customer'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-home</v-icon>
                        Property type:
                        <span class="primary--text"
                          >{{ app.property.type }}
                        </span>
                      </v-col>
                    </v-row>
                    <v-row class="text-h7">
                      <!-- phone number -->
                      <v-col
                        v-if="user.role == 'Property owner'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-cellphone</v-icon>
                        Phone number:
                        <span class="primary--text">{{
                          app.user.phoneNumber
                        }}</span>
                      </v-col>
                      <!-- birth date -->
                      <v-col
                        v-if="user.role == 'Property owner'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-calendar</v-icon>
                        Birth date:
                        <span class="primary--text">{{
                          app.user.birthDate
                        }}</span>
                      </v-col>
                      <!-- property size -->
                      <v-col
                        v-if="user.role == 'Customer'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-arrow-split-vertical</v-icon>
                        Property size:
                        <span class="primary--text"
                          >{{ app.property.size }}
                        </span>
                      </v-col>
                      <!-- property price -->
                      <v-col
                        v-if="user.role == 'Customer'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-cash-100</v-icon>
                        Price:
                        <span class="primary--text"
                          >{{ app.property.price }} BHD
                        </span>
                      </v-col>
                    </v-row>
                    <v-row class="text-h7 pb-8">
                      <!-- email -->
                      <v-col
                        v-if="user.role == 'Property owner'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-email</v-icon>
                        E-mail:
                        <span class="primary--text">{{ app.user.email }}</span>
                      </v-col>
                      <!-- address -->
                      <v-col
                        v-if="user.role == 'Property owner'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-map-marker</v-icon>
                        Address:
                        <span class="primary--text">{{
                          app.user.address
                        }}</span>
                      </v-col>
                      <!-- property location -->
                      <v-col
                        v-if="user.role == 'Customer'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-map-marker</v-icon>
                        Area:
                        <span class="primary--text"
                          >{{ app.property.area }}
                        </span>
                      </v-col>
                      <!-- property furnish -->
                      <v-col
                        v-if="user.role == 'Customer'"
                        cols="6"
                        md="6"
                        sm="12"
                      >
                        <v-icon>mdi-sofa-single</v-icon>
                        Furnish:
                        <span class="primary--text"
                          >{{ app.property.furnish }}
                        </span>
                      </v-col>
                    </v-row>
                    <!-- reject and approve buttons -->
                    <v-row
                      v-if="
                        app.status == 'Waiting' && user.role == 'Property owner'
                      "
                    >
                      <!-- buttons -->
                      <v-col cols="6" class="pa-0">
                        <v-btn
                          depressed
                          block
                          tile
                          class="green lighten-2"
                          :loading="approveLoading"
                          @click="
                            approveRejectApp(
                              app._id,
                              app.user._id,
                              app.ownerID,
                              app.property._id,
                              app.dates,
                              'Approved',
                              app.property.price
                            )
                          "
                        >
                          Approve
                        </v-btn>
                      </v-col>
                      <v-col cols="6" class="pa-0">
                        <v-btn
                          block
                          depressed
                          tile
                          class="red lighten-3"
                          :loading="rejectLoading"
                          @click="
                            approveRejectApp(
                              app._id,
                              app.user._id,
                              app.ownerID,
                              app.property._id,
                              app.dates,
                              'Rejected',
                              app.property.price
                            )
                          "
                        >
                          Reject
                        </v-btn>
                      </v-col>
                    </v-row>
                    <!-- Dialog -->
                    <v-row class="">
                      <v-col class="pa-0">
                        <v-dialog
                          transition="dialog-bottom-transition"
                          max-width="1000"
                        >
                          <template v-slot:activator="{ on, attrs }">
                            <v-btn
                              depressed
                              block
                              tile
                              color="blue-grey darken-1"
                              class="py-8 white--text"
                              v-bind="attrs"
                              v-on="on"
                              >Application Details</v-btn
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
                                    v-if="user.role == 'Property owner'"
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
                                      {{ app.user.fName }}
                                      {{ app.user.lName }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-calendar</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Birth Date:</span
                                      >
                                      {{ app.user.birthDate }}
                                    </v-col>
                                  </v-row>
                                  <v-row
                                    v-if="user.role == 'Property owner'"
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
                                      {{ app.user.email }}
                                    </v-col>
                                    <v-col lg="6" md="6" sm="6" cols="12">
                                      <v-icon>mdi-map-marker-outline</v-icon>
                                      <span
                                        class="grey--text text--darken-2 font-weight-bold"
                                      >
                                        Address:</span
                                      >
                                      {{ app.user.address }}
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
    <!-- success message snackbar -->
    <v-snackbar timeout="3000" v-model="snackbar">
      Customer application {{ appStatus }} successfully
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
//import db from "../firebase/firebaseInit";
import ApplicationService from "../services/applicationService";
import PropertyService from "../services/propertyService";
import ReservationService from "../services/reservationService";
import RevenuesService from "../services/revenueService";
export default {
  name: "Applications",
  data() {
    return {
      user: "",
      snackbar: false,
      approveLoading: false,
      rejectLoading: false,
      appStatus: "",
      type: "",
      exist: true,
      search: "",
      apps: [],
      applications: [],
      sortBy: [{ type: "price" }, { type: "date" }, { type: "area" }],
      items: [
        {
          title: "Approved Application",
          description: "Find all acceptable forms",
          image: "/approved.png",
          color: "teal accent-4",
          type: "Approved",
        },
        {
          title: "Hold Application",
          description: "Find all pending forms",
          image: "/waiting.png",
          color: "yellow darken-2",
          type: "Waiting",
        },
        {
          title: "Rejected Application",
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
      this.applications = this.applications.filter((app) => {
        return app.status == type;
      });
      this.applications.sort((a, b) =>
        a["createdAt"] < b["createdAt"] ? -1 : 1
      );
      if (this.applications == "") {
        this.exist = false;
      }
    },
    calculateReservationTotalPrice(dates, price) {
      let total = 0;
      dates.forEach((date) => {
        total = total + parseInt(price);
      });
      return total;
    },
    async approveRejectApp(
      appID,
      customerID,
      ownerID,
      propertyID,
      dates,
      status,
      price
    ) {
      //reservation total price
      const totalPrice = this.calculateReservationTotalPrice(dates, price);
      //Add new reservation
      try {
        let res = {
          customerID: customerID,
          ownerID: ownerID,
          propertyID: propertyID,
          dates: dates,
          totalPrice: totalPrice,
        };
        if (status == "Approved") {
        } else {
        }

        if (status == "Approved") {
          this.approveLoading = true;
          this.appStatus = "approved";
          //check if the date is already taken
          let pro = await PropertyService.getProperty(propertyID);
          let taken = false;
          var bar = new Promise((resolve, reject) => {
            if (pro != null) {
              pro.property.reservedDates.forEach((date, index, array) => {
                dates.forEach((d) => {
                  if (d == date) {
                    taken = true;
                  }
                  if (index === array.length - 1) {
                    resolve();
                  }
                });
              });
            }
            resolve();
          });
          bar.then(() => {
            if (taken) {
              this.approveLoading = false;
              alert(
                "This date is already taken, you can reject the application"
              );
            } else {
              //Update application, add reservation
              ApplicationService.updateApplication(appID, status)
                .then((result) => {
                  // check if approved
                  if (status == "Approved") {
                    ReservationService.addReservation(res)
                      .then((result) => {
                        PropertyService.updatePropertyReservedDates(
                          propertyID,
                          "addDates",
                          dates
                        )
                          .then(async (result) => {
                            await this.addRevenue(ownerID, propertyID, price);
                          })
                          .catch((err) => console.log(err));
                      })
                      .catch((err) => console.log(err));
                  }
                  // cehck if rejected
                  else {
                  }
                })
                .catch((err) => console.log(err))
                .finally(() => {
                  this.snackbar = true;
                  this.approveLoading = false;
                });
            }
          });
        } else {
          //status == rejected
          this.rejectLoading = true;
          this.appStatus = "rejected";
          await ApplicationService.updateApplication(appID, status);
          this.rejectLoading = false;
          this.loadData();
        }
      } catch (err) {
        console.log(err);
      }
    },
    async addRevenue(ownerID, propertyID, price) {
      console.log(price);
      let total = price * 0.2;
      let date = new Date();
      let revenue = {
        total: total,
        date: date.toISOString().substring(0, 10),
        ownerID: ownerID,
        propertyID: propertyID,
      };

      try {
        await RevenuesService.addRevenue(revenue);
        await this.loadData();
      } catch (err) {
        console.log(err);
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
      this.exist = true;
      let user = JSON.parse(localStorage.user);
      this.user = user;
      try {
        if (user.role == "Property owner") {
          let apps = await ApplicationService.getUserApplications(user._id);
          this.applications = apps.applications;
        } else if (user.role == "Customer") {
          let apps = await ApplicationService.getCustomerApplications(user._id);
          this.applications = apps.applications;
        }
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
#appHeader {
  background-image: linear-gradient(to right, #0a3b66, #2f6da3);
}
</style>
