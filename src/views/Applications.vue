<template>
  <div app>
    <v-container fluid>
      <v-row class="pt-10 pl-10">
        <v-col cols="12">
          <span class="text-h6 blue-grey--text">APPLICATIONS</span>
        </v-col>
      </v-row>
    </v-container>
    <v-container>
      <v-row>
        <v-col cols="12" class="pt-9">
          <div class="text-h5 blue-grey--text">
            Find and manage all your applications
          </div>
        </v-col>
      </v-row>
      <v-row align="center" justify="center">
        <v-col cols="4" v-for="item in items" :key="item.name">
          <v-card
            class="mx-auto pa-2"
            width="500"
            height="500"
            :color="item.color"
          >
            <v-img :src="item.image" height="350" width="350"></v-img>

            <v-card-title> {{ item.title }} </v-card-title>

            <v-card-subtitle> {{ item.description }} </v-card-subtitle>

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
      <v-row>
        <v-col v-for="app in applications" :key="app.appID" cols="12">
          <template v-if="app.status == type && app.customerID != $store.state.loggedUserID">
            <div v-for="user in users" :key="user.userID">
              <template v-if="app.customerID == user.userID">
                <div v-for="property in properties" :key="property.propertyID">
                  <template v-if="app.propertyID == property.propertyID">
                    <v-card flat tile>
                      <v-card-title class="white subheading font-weight-bold">
                        Application ID: {{ app.appID }}
                      </v-card-title>

                      <v-divider></v-divider>

                      <v-container fluid class="blue-grey lighten-4">
                        <v-row>
                          <v-col cols="6" lg="6" md="12" sm="12">
                            <v-img
                              max-width="1000"
                              max-height="1000"
                              :src="property.pictures[0]"
                            ></v-img>
                          </v-col>
                          <v-col cols="6" lg="6" md="12" sm="12" class="pa-8">
                            <div
                              class="text-h6 font-weight-medium primary--text"
                            >
                              {{ property.name }}
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
                              <v-col cols="6" md="6" sm="12">
                                <v-icon>mdi-calendar</v-icon>
                                Reservation date:
                                <span class="primary--text"
                                  >{{ app.dates }}
                                </span>
                              </v-col>
                              <!-- customer name -->
                              <v-col cols="6" md="6" sm="12">
                                <v-icon>mdi-account</v-icon>
                                Customer:
                                <span class="primary--text"
                                  >{{ user.name }}
                                </span>
                              </v-col>
                            </v-row>
                            <v-row class="text-h7">
                              <!-- phone number -->
                              <v-col cols="6" md="6" sm="12">
                                <v-icon>mdi-cellphone</v-icon>
                                Phone number:
                                <span class="primary--text">{{
                                  user.phoneNumber
                                }}</span>
                              </v-col>
                              <!-- birth date -->
                              <v-col cols="6" md="6" sm="12">
                                <v-icon>mdi-calendar</v-icon>
                                Birth date:
                                <span class="primary--text">{{
                                  user.birthDate
                                }}</span>
                              </v-col>
                            </v-row>
                            <v-row class="text-h7">
                              <!-- email -->
                              <v-col cols="6" md="6" sm="12">
                                <v-icon>mdi-email</v-icon>
                                E-mail:
                                <span class="primary--text">{{
                                  user.email
                                }}</span>
                              </v-col>
                              <!-- address -->
                              <v-col cols="6" md="6" sm="12">
                                <v-icon>mdi-map-marker</v-icon>
                                Address:
                                <span class="primary--text">{{
                                  user.address
                                }}</span>
                              </v-col>
                            </v-row>
                            <v-row class="pt-5">
                              <!-- buttons -->
                              <v-col>
                                <v-btn
                                  depressed
                                  tile
                                  class="blue-grey lighten-2"
                                  @click="
                                    approveRejectApp(
                                      'Approved',
                                      app.id,
                                      property.id,
                                      property.propertyID,
                                      user.userID,
                                      app.dates
                                    )
                                  "
                                >
                                  Approve
                                </v-btn>
                                <v-btn
                                  depressed
                                  tile
                                  class="blue-grey lighten-3"
                                  @click="
                                    approveRejectApp(
                                      'Rejected',
                                      app.id,
                                      property.id,
                                      property.propertyID,
                                      user.userID,
                                      app.dates
                                    )
                                  "
                                >
                                  Reject
                                </v-btn>
                              </v-col>
                            </v-row>
                          </v-col>
                        </v-row>
                      </v-container>
                    </v-card>
                  </template>
                </div>
              </template>
            </div>
          </template>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import db from "../firebase/firebaseInit";
export default {
  name: "Applications",
  data() {
    return {
      type: "",
      applications: [],
      users: [],
      properties: [],
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
  computed: {
    numberOfPages() {
      return Math.ceil(this.applications.length / this.itemsPerPage);
    },
    filteredKeys() {
      return this.keys.filter((key) => key !== "Name");
    },
  },
  methods: {
    nextPage() {
      if (this.page + 1 <= this.numberOfPages) this.page += 1;
    },
    formerPage() {
      if (this.page - 1 >= 1) this.page -= 1;
    },
    updateItemsPerPage(number) {
      this.itemsPerPage = number;
    },
    showApplication(type) {
      this.type = type;
    },
    approveRejectApp(status, appID, proid, propertyID, customerID, dates) {
      // ADD NEW RESERVATIONS
      let maxID = "";
      let reservation = "";
      db.collection("reservations")
        .get()
        .then((snapshot) => {
          if (status == "Approved") {
            snapshot.forEach((doc) => {
              maxID = doc.data().reservationID;
            });

            reservation = {
              reservationID: maxID + 1,
              customerID: customerID,
              propertyID: propertyID,
              date: dates,
            };
            db.collection("properties").doc(proid).update({
              reservedDates: dates,
            });
            db.collection("reservations").add(reservation);
            db.collection("applications").doc(appID).update({
              status: "Approved",
            });
          } else if (status == "Rejected") {
            db.collection("applications").doc(appID).update({
              status: "Rejected",
            });
          }
          this.loadData();
        });
    },
    loadData() {
      // fetching applications
      db.collection("applications")
        .where("customerID", "!=", parseInt(this.$store.state.loggedUserID))
        .onSnapshot((snapshot) => {
          let changes = snapshot.docChanges();
          this.applications = [];
          changes.forEach((change) => {
            if (change.type == "added" || change.type == "modified") {
              let doc = change.doc;
              const app = {
                id: doc.id,
                appID: doc.data().appID,
                customerID: doc.data().customerID,
                ownerID: doc.data().ownerID,
                propertyID: doc.data().propertyID,
                status: doc.data().status,
                dates: doc.data().dates,
              };
              this.applications.push(app);
            }
          });
        });
      // fetching user data
      this.users = [];
      db.collection("users")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const user = {
              id: doc.id,
              userID: doc.data().userID,
              name: doc.data().fName + " " + doc.data().lName,
              phoneNumber: doc.data().phoneNumber,
              birthDate: doc.data().birthDate,
              email: doc.data().email,
              address: doc.data().address,
            };
            this.users.push(user);
          });
        });

      // fetching properties
      this.properties = [];
      db.collection("properties")
        .get()
        .then((snapshot) => {
          snapshot.forEach((doc) => {
            const property = {
              id: doc.id,
              propertyID: doc.data().propertyID,
              name: doc.data().name,
              pictures: doc.data().pictures,
            };
            this.properties.push(property);
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