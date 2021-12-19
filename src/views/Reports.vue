<template>
  <div app>
    <!-- header -->
    <v-container fluid id="reportHeader">
      <v-row class="px-16" align="center" justify="center">
        <v-col cols="6">
          <v-row class="pa-16">
            <v-col cols="12">
              <span
                class="text-xl-h2 text-lg-h3 text-md-h4 text-sm-h5 text-h5 white--text text--darken-4 font-weight-medium"
                >FINANCIAL REPORT</span
              >
              <div
                class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-3 pt-5"
              >
                <v-icon color="blue-grey darken-4" large
                  >mdi-currency-usd</v-icon
                >
                Track company profit
              </div>
              <div
                class="text-xl-h4 text-lg-h5 text-md-h6 text-sm-h7 text-h7 blue-grey--text text--darken-3 pt-5"
              >
                <v-icon color="blue-grey darken-4" large>mdi-cash-100</v-icon>
                Find company total earnings
              </div>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="6" class="py-6" align="center" justify="cente">
          <v-img contain max-width="600" src="/settings.png"></v-img>
        </v-col>
      </v-row>
    </v-container>
    <v-container class="py-16">
      <!-- Sort by -->
      <v-row align="center" justify="center">
        <span class="pb-6">Filter by:</span>
        <v-col cols="8">
          <!-- room no -->
          <v-row>
            <v-col cols="4">
              <v-select
                :items="[1, 2, 3, 4, 5, 6, 7, 8, 9, 10]"
                v-model="roomNo"
                background-color="white"
                label="Rooms No"
                outlined
                dense
                @change="sortRevenuesBy('Rooms No')"
              ></v-select>
            </v-col>
            <!-- location -->
            <v-col cols="4">
              <v-select
                :items="locations"
                v-model="location"
                background-color="white"
                label="Location"
                outlined
                dense
                @change="sortRevenuesBy('location')"
              ></v-select>
            </v-col>
            <!-- type -->
            <v-col cols="4">
              <v-select
                :items="['House', 'Apartment']"
                v-model="type"
                background-color="white"
                label="Type"
                outlined
                dense
                @change="sortRevenuesBy('type')"
              ></v-select>
            </v-col>
          </v-row>
        </v-col>
        <v-col cols="1" class="pb-10">
          <v-btn depressed color="blue-grey lighten-5" @click="reset()">
            reset
          </v-btn>
        </v-col>
      </v-row>
      <!-- company total and average earning -->
      <v-row align="center" justify="center" class="pa-3">
        <!-- total earning -->
        <v-col cols="5" class="pa-5 mx-1 white">
          <v-card class="mx-auto" max-width="500" flat>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Company Earning
                </div>
                <v-list-item-title class="text-h5 mb-1 teal--text">
                  Total Earning
                </v-list-item-title>
                <v-list-item-subtitle
                  >This indictaed how much the company has earned
                  currently</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-avatar
                tile
                size="100"
                class="rounded-circle"
                color="teal lighten-3"
                >{{
                  parseFloat(totalEarningInYear).toFixed(3)
                }}BD</v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </v-col>
        <v-col cols="5" class="white mx-1 pa-5">
          <!-- average earning -->
          <v-card class="mx-auto" max-width="500" flat>
            <v-list-item three-line>
              <v-list-item-content>
                <div class="text-overline mb-4">
                  Company Earning
                </div>
                <v-list-item-title
                  class="text-h5 mb-1 yellow--text text--darken-1"
                >
                  Average Earning
                </v-list-item-title>
                <v-list-item-subtitle
                  >This indictaed how much the company has earned
                  currently</v-list-item-subtitle
                >
              </v-list-item-content>
              <v-list-item-avatar
                tile
                size="100"
                class="rounded-circle"
                color="yellow lighten-3"
                >{{
                  parseFloat(averageEarning).toFixed(3)
                }}BD</v-list-item-avatar
              >
            </v-list-item>
          </v-card>
        </v-col>
      </v-row>
      <!-- company earning per year -->
      <v-row>
        <v-col cols="12">
          <span class="text-h6 blue-grey--text">Earning per Year</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="12">
          <v-data-table
            dense
            :headers="yearHeaders"
            :items="totalYear"
            item-key="name"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
      <!-- company earning per month -->
      <v-row>
        <v-col cols="12">
          <span class="text-h6 blue-grey--text">Earning per Month</span>
        </v-col>
      </v-row>
      <v-row>
        <v-col cols="2">
          <v-select
            :items="selectYear"
            v-model="selectedYear"
            background-color="white"
            label="Year"
            outlined
            dense
            @change="calculatingEarningPerMonth(selectedYear)"
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-data-table
            dense
            :headers="monthHeaders"
            :items="totalMonth"
            item-key="name"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
      <!-- company earning per week -->
      <v-row class="pa-3">
        <v-col cols="12">
          <span class="text-h6 blue-grey--text">Earning per Week</span>
        </v-col>
      </v-row>
      <v-row>
        <!-- select year -->
        <v-col cols="2">
          <v-select
            :items="selectYear"
            v-model="weeklySelectedYear"
            background-color="white"
            label="Year"
            outlined
            dense
            @change="
              calculatingEarningPerWeek(weeklySelectedYear, selectedMonth)
            "
          ></v-select>
        </v-col>
        <!-- Select month -->
        <v-col cols="2">
          <v-select
            :items="months"
            v-model="selectedMonth"
            background-color="white"
            label="Month"
            outlined
            dense
            @change="
              calculatingEarningPerWeek(weeklySelectedYear, selectedMonth)
            "
          ></v-select>
        </v-col>
        <v-col cols="12">
          <v-data-table
            dense
            :headers="weekHeaders"
            :items="totalWeek"
            item-key="name"
            class="elevation-1"
          ></v-data-table>
        </v-col>
      </v-row>
    </v-container>
  </div>
</template>

<script>
import revenueService from "../services/revenueService";
export default {
  name: "Reports",
  components: {},
  data() {
    return {
      revenues: [],
      revenuesWithProperty: [],
      totalEarningInYear: 0,
      averageEarning: 0,
      totalYear: [],
      totalMonth: [],
      totalWeek: [],

      //chart data
      yearValue: [],

      //combo box for month table
      selectedYear: "",
      weeklySelectedYear: "",
      selectedMonth: "",
      selectYear: [],
      months: [
        "01",
        "02",
        "03",
        "04",
        "05",
        "06",
        "07",
        "08",
        "09",
        "10",
        "11",
        "12",
      ],
      //sort by
      roomNo: 0,
      location: "",
      type: "",
      locations: [
        "Manama",
        "Riffa",
        "Muharraq",
        "Hamad Town",
        "Aali",
        "Isa Town",
        "Sitra",
        "Budaiya",
        "Jidhafs",
        "Al-Malikiyah ",
        "Jid Ali",
        "Sanabis",
        "Tubli",
        "Saar",
        "Al Dur",
        "Qudaibiya",
        "Salmabad",
        "Jurdab",
        "Diyar Al Muharraq",
        "Amwaj",
        "Hidd",
        "Arad",
        "Busaiteen",
        "Janabiyah",
        "Samaheej",
        "Aldair",
      ],

      yearHeaders: [
        {
          text: "Year",
          align: "start",
          sortable: false,
          value: "year",
        },
        { text: "Total Earning", value: "total" },
        { text: "Average Earning", value: "average" },
      ],

      monthHeaders: [
        {
          text: "Month",
          align: "start",
          sortable: false,
          value: "month",
        },
        { text: "Total Earning", value: "total" },
        { text: "Average Earning", value: "average" },
      ],

      weekHeaders: [
        {
          text: "week",
          align: "start",
          sortable: false,
          value: "week",
        },
        { text: "From", value: "from" },
        { text: "Till", value: "till" },
        { text: "Total Earning", value: "total" },
        { text: "Average Earning", value: "average" },
      ],
    };
  },
  methods: {
    async loadData() {
      try {
        let revenue = await revenueService.getRevenues();
        this.revenues = revenue.revenues;
        let revenuesWithProperty = await revenueService.getSortedRevenue();
        this.revenuesWithProperty = revenuesWithProperty.revenues;
      } catch (err) {
        console.log(err);
      }
    },
    calculateTotal() {
      let x = 0;
      this.totalEarningInYear = 0;
      while (x < this.revenues.length) {
        this.totalEarningInYear += this.revenues[x].total;
        x += 1;
      }
    },
    calculateAverage() {
      let x = 0;
      let total = 0;
      this.averageEarning = 0;
      while (x < this.revenues.length) {
        total += this.revenues[x].total;
        x += 1;
      }
      this.averageEarning = total / x;
    },
    calculateEarningPerYear() {
      // defines the available years
      let x = 0;
      let years = [];
      while (x < this.revenues.length) {
        let year = this.revenues[x].date;
        year = year.substring(0, 4);
        if (!years.includes(year)) {
          years.push(year);
          this.selectYear.push(year);
        }
        x += 1;
      }
      //calculate the total for each years
      let y = 0;
      while (y < years.length) {
        let year = years[y];
        let a = 0;
        let total = 0;
        let average = 0;
        let avgNum = 0;
        while (a < this.revenues.length) {
          if (this.revenues[a].date.substring(0, 4) == year) {
            total += this.revenues[a].total;
            this.yearValue.push(this.revenues[a].total);
            avgNum += 1;
          }
          a += 1;
        }

        average = total / avgNum;

        this.totalYear.push({
          year: year,
          total: total.toFixed(3) + "BHD",
          average: average.toFixed(3) + "BHD",
        });
        y += 1;
      }
    },
    calculatingEarningPerMonth(year) {
      this.totalMonth = []; //reset
      //defines month which has profits
      let x = 0;
      let months = [];
      while (x < this.revenues.length) {
        if (this.revenues[x].date.substring(0, 4) == year) {
          let month = this.revenues[x].date.substring(0, 7);
          if (!months.includes(month)) {
            months.push(month);
          }
        }
        x += 1;
      }

      //define profit for each month
      let y = 0;
      while (y < months.length) {
        let p = 0;
        let m = months[y];
        let total = 0;
        let average = 0;
        let avgNum = 0;
        while (p < this.revenues.length) {
          if (this.revenues[p].date.substring(0, 7) == m) {
            total += this.revenues[p].total;
            avgNum += 1;
          }
          p += 1;
        }
        average = total / avgNum;
        this.totalMonth.push({
          month: m.substring(5, 7),
          total: total.toFixed(3) + "BHD",
          average: average.toFixed(3) + "BHD",
        });
        y += 1;
      }
    },
    //Calculating profits per week in specific date
    calculatingEarningPerWeek(year, month) {
      this.totalWeek = []; //reset
      if (year != "" && month != "") {
        let firstDayDate = `${year}-${month}-01`;

        let date = new Date(firstDayDate);
        let first = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate()
        );
        let next = new Date(
          date.getFullYear(),
          date.getMonth(),
          date.getDate() + 7
        );
        let last = new Date(date.getFullYear(), date.getMonth() + 1, 0);

        //get number of weeks
        let startDateNum = this.getDate(firstDayDate);
        let weekNum = this.weekCount(year, month, startDateNum);

        let x = 1;
        let final = [];
        let dates = [];
        while (first <= last && x <= weekNum) {
          if (first < next) {
            dates.push(first);
          }

          //increase date
          first = new Date(
            first.getFullYear(),
            first.getMonth(),
            first.getDate() + 1
          );
          if (first >= next) {
            next = new Date(
              next.getFullYear(),
              next.getMonth(),
              next.getDate() + 7
            );

            final.push({
              week: x,
              dates: dates,
            });
            x += 1;
            dates = [];
          }
        }
        x += 1;
        final.push({
          week: x,
          dates: dates,
        });

        //SECOND PART: calculate total and average earning
        let a = 0;
        while (a < final.length) {
          let total = 0;
          let average = 0;
          let avgNum = 0;
          let b = 0;
          let valid = false;
          let from = "";
          let till = "";
          while (b < final[a].dates.length) {
            let x = 0;
            while (x < this.revenues.length) {
              let d = new Date(this.revenues[x].date);
              let date = new Date(d.getFullYear(), d.getMonth(), d.getDate());
              if (date.getTime() == final[a].dates[b].getTime()) {
                total += this.revenues[x].total;
                valid = true;
                avgNum += 1;
              }
              x += 1;
            }
            b += 1;
          }
          from = final[a].dates[0].toLocaleDateString("en-US");
          till = final[a].dates.at(-1).toLocaleDateString("en-US");
          if (valid) {
            average = total / avgNum;
            this.totalWeek.push({
              week: a + 1,
              from: from,
              till: till,
              total: total.toFixed(3) + "BHD",
              average: average.toFixed(3) + "BHD",
            });
          }
          a += 1;
        }
      }
    },
    //Calculating number of weeks in one month
    weekCount(year, month_number, startDayOfWeek) {
      // month_number is in the range 1..12

      // Get the first day of week week day (0: Sunday, 1: Monday, ...)
      var firstDayOfWeek = startDayOfWeek || 0;

      var firstOfMonth = new Date(year, month_number - 1, 1);
      var lastOfMonth = new Date(year, month_number, 0);
      var numberOfDaysInMonth = lastOfMonth.getDate();
      var firstWeekDay = (firstOfMonth.getDay() - firstDayOfWeek + 7) % 7;

      var used = firstWeekDay + numberOfDaysInMonth;

      return Math.ceil(used / 7);
    },
    getDate(date) {
      const day = new Date(date);
      return day.getDay();
    },
    async sortRevenuesBy(type) {
      this.totalEarningInYear = 0;
      this.averageEarning = 0;
      if (type == "Rooms No" || type == "location" || type == "type") {
        let x = 0;
        let avgNum = 0;
        while (x < this.revenuesWithProperty.length) {
          // rooms No i not empty
          if (this.roomNo != 0 && this.location == "" && this.type == "") {
            if (this.revenuesWithProperty[x].property.bedrooms == this.roomNo) {
              this.totalEarningInYear += this.revenuesWithProperty[x].total;
              avgNum += 1;
            }
          }
          // location is not empty
          else if (this.roomNo == 0 && this.location != "" && this.type == "") {
            if (this.revenuesWithProperty[x].property.area == this.location) {
              this.totalEarningInYear += this.revenuesWithProperty[x].total;
              avgNum += 1;
            }
          }
          // type is not empty
          else if (this.roomNo == 0 && this.location == "" && this.type != "") {
            if (this.revenuesWithProperty[x].property.type == this.type) {
              this.totalEarningInYear += this.revenuesWithProperty[x].total;
              avgNum += 1;
            }
          }
          // rooms No and location are not empty
          else if (this.roomNo != 0 && this.location != "" && this.type == "") {
            if (
              this.revenuesWithProperty[x].property.bedrooms == this.roomNo &&
              this.revenuesWithProperty[x].property.area == this.location
            ) {
              this.totalEarningInYear += this.revenuesWithProperty[x].total;
              avgNum += 1;
            }
          }
          // rooms No and type are not empty
          else if (this.roomNo != 0 && this.location == "" && this.type != "") {
            if (
              this.revenuesWithProperty[x].property.bedrooms == this.roomNo &&
              this.revenuesWithProperty[x].property.type == this.type
            ) {
              this.totalEarningInYear += this.revenuesWithProperty[x].total;
              avgNum += 1;
            }
          }
          // location and type are not empty
          else if (this.roomNo == 0 && this.location != "" && this.type != "") {
            if (
              this.revenuesWithProperty[x].property.area == this.location &&
              this.revenuesWithProperty[x].property.type == this.type
            ) {
              this.totalEarningInYear += this.revenuesWithProperty[x].total;
              avgNum += 1;
            }
          }
          // rooms No, location, and type are not empty
          else if (this.roomNo != 0 && this.location != "" && this.type != "") {
            if (
              this.revenuesWithProperty[x].property.bedrooms == this.roomNo &&
              this.revenuesWithProperty[x].property.area == this.location &&
              this.revenuesWithProperty[x].property.type == this.type
            ) {
              this.totalEarningInYear += this.revenuesWithProperty[x].total;
              avgNum += 1;
            }
          }
          x += 1;
        }
        if (avgNum > 0) {
          this.averageEarning = this.totalEarningInYear / avgNum;
        }
      }
    },
    reset() {
      this.roomNo = 0;
      this.location = "";
      this.type = "";
      this.calculateTotal();
      this.calculateAverage();
    },
  },
  async created() {
    await this.loadData();
    this.calculateTotal();
    this.calculateAverage();
    this.calculateEarningPerYear();
  },
};
</script>

<style scoped>
#reportHeader {
  background-image: linear-gradient(to right, #268d7c, #22665b);
}
</style>
