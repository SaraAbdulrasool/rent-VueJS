import Vue from 'vue'
import Vuex from 'vuex'
import db from '../firebase/firebaseInit'

Vue.use(Vuex)

export default new Vuex.Store({
  state: {
    //login status
    loginStatus: false,

    //current logined user
    loggedUserID: '',
    loggedUserFName: '',
    loggedUserLName: '',

    badge: false,
    reservationsNumber: '',
    errorMessage: false,

    users: [],
    properties: [
      {
        name: "A unique and stylish fully furnished flat with a charming sea view",
        desription:
          "A unique and stylish fully furnished flat with a charming sea view in an ideal location is available for rent. The apartment is located in the middle of Juffair, near the Al-Fateh mosque. Juffair is one of Bahrain's most dynamic districts, with diverse entertainment options, including restaurants, cafes, retail malls, luxury hotels, and theatres. It also features a lot of tourist attractions. Juffair offers a very opulent lifestyle to all of its citizens.",
        type: "Apartment",
        furnish: "Furnished",
        bedroom: "3",
        livingroom: "1",
        bathroom: "2",
        kitchen: "1",
        parking: "1",
        balcony: "Not Available",
        size: "500",
        location: "Juffair",
        price: "350",
        ownerNumber: "39691362",
        pictures: [
          "/apartment/apa1.webp",
          "/apartment/apa.1.1.webp",
          "/apartment/apa1.2.webp",
          "/apartment/apa1.3.webp",
          "/apartment/apa1.4.webp",
        ],
      },
      {
        name: "A distinctive and trendy fully furnished flat with a magical sea view",
        desription:
          "A distinctive and trendy fully furnished flat with a magical sea view is available for rent in a great location. The apartment lies in Juffair's heart, near the Najma club. Juffair is one of Bahrain's most vibrant areas, featuring a varied range of entertainment options such as restaurants, cafes, shopping malls, luxury hotels, and theatres. It also has a large number of tourist attractions. Juffair provides all of its people with an extremely affluent lifestyle.",
        type: "Apartment",
        furnish: "Semi-Furnished",
        bedroom: "3",
        livingroom: "1",
        bathroom: "3",
        kitchen: "1",
        parking: "1",
        balcony: "Available",
        size: "300",
        location: "Saar",
        price: "450",
        ownerNumber: "39691362",
        pictures: [
          "/apartment/apa2.jpg",
          "/apartment/apa2.1.webp",
          "/apartment/apa2.2.webp",
          "/apartment/apa2.3.jpg",
          "/apartment/apa2.4.webp",
        ],
      },
      {
        name: "Fully furnished one bedroom flat for rent",
        desription:
          "A fully furnished flat for rent located in Al-Juffair, this flat consists of one bedroom, one bathroom, a fully equipped open kitchen with all appliances such as microwave and washing machine, a very nice living room with a nice dining area",
        type: "Apartment",
        furnish: "Semi-Furnished",
        bedroom: "2",
        livingroom: "1",
        bathroom: "3",
        kitchen: "1",
        parking: "1",
        balcony: "Not Available",
        size: "400",
        location: "Sitra",
        price: "280",
        ownerNumber: "39691362",
        pictures: [
          "/apartment/apa3.webp",
          "/apartment/apa3.1.webp",
          "/apartment/apa3.2.webp",
          "/apartment/apa3.3.webp",
          "/apartment/apa3.4.webp",
        ],
      },
      {
        name: "Unique fully furnished apartment for rent",
        desription:
          "A very unique flat fully furnished with nice furnisher for rent located in a good location in Seef district, this flat consists of two bedrooms, two bathrooms, a closed kitchen fully equipped with all appliances such as stove, oven, microwave and washing machine, a stunning living area with nice dining area, balcony with sea view",
        type: "Apartment",
        furnish: "Furnished",
        bedroom: "3",
        livingroom: "1",
        bathroom: "3",
        kitchen: "1",
        parking: "2",
        balcony: "Not Available",
        size: "1470",
        location: "Isa Town",
        price: "400",
        ownerNumber: "39691362",
        pictures: [
          "/apartment/apa4.jpg",
          "/apartment/apa4.1.webp",
          "/apartment/apa4.2.webp",
          "/apartment/apa4.3.webp",
          "/apartment/apa4.4.webp",
        ],
      },
      {
        name: "A unique stylishly fully furnished apartment",
        desription:
          "A unique and stylish fully furnished apartment. The apartment is located in the heart of Seef's city center. The site's proximity to significant regions of Manama , such as Reef Island and the Diplomatic Sector , is another advantage. The Seef area boasts a broad range of visitor attractions , from ancient historical structures to modern entertainment places.",
        type: "Villa",
        furnish: "Furnished",
        bedroom: "2",
        livingroom: "1",
        bathroom: "3",
        kitchen: "1",
        parking: "2",
        balcony: "Not Available",
        size: "190",
        location: "Saar",
        price: "450",
        ownerNumber: "39691362",
        pictures: [
          "/apartment/apa5.webp",
          "/apartment/apa5.1.webp",
          "/apartment/apa5.2.webp",
          "/apartment/apa5.3.webp",
          "/apartment/apa5.4.jpg",
          "/apartment/apa5.5.jpg",
        ],
      },
    ],
  },
  mutations: {
    // <-- ADD A NEW USER -->
    addNewUser(state, user) {
      db.collection('users').get().then((snapshot) => {
        let maxID = 0
        let contain = false
        //determine user maxID
        snapshot.forEach((doc) => {
          if (doc.data().email == user.email) {
            contain = true
          }
          maxID = doc.data().userID
        })

        //pushing the new user
        if (contain) {
          state.errorMessage = true
        }
        else {
          let x = {
            userID: maxID,
            fName: user.fName,
            lName: user.lName,
            password: user.password,
            phoneNumber: user.phoneNumber,
            birthDate: user.birthDate,
            email: user.email,
            address: user.address
          }
          db.collection('users').add(x)
          state.loggedUserFName = user.fName
          state.loggedUserLName = user.lName
          state.loggedUserID = maxID
          state.loginStatus = true
        }
      })
    },
    // <-- Login -->
    login(state, user) {
      let x = 0
      while (x < state.users.length) {
        if (user.email == state.users[x].email && user.password == state.users[x].password) {
          state.loggedUserID = state.users[x].userID
          state.loggedUserFName = state.users[x].fName
          state.loggedUserLName = state.users[x].lName
          state.loginStatus = true
          state.errorMessage = false
          x = state.users.length
        }
        else {
          state.errorMessage = true
        }
        x++
      }
    },
    // <-- ADD A NEW APPLICATION -->
    createNewApplication(state, { propertyID, ownerID, dates }) {
      let app = {
        id: state.applications.length + 1,
        propertyID: propertyID,
        ownerID: ownerID,
        customerID: state.loggedUserID,
        status: 'waiting',
        dates: dates,
      }
      state.applications.push(app)
    },
    // <-- APPROVE OR REJECT APPLICATION-->
    approveRejectApp(state, { status, appID, propertyID, customerID }) {

    },
    // <-- DELETE A RESERVATION -->
    deleteReservation(state, resID) {
      state.reservations = state.reservations.filter(task => task !== resID) //filter the reservation array from the resrvation ID
    },
    // <-- SORT BY -->
    sortByType(state, type) {
      if (type == "location") {
        state.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "size") {
        state.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      } else if (type == "price") {
        state.properties.sort((a, b) => (a[type] < b[type] ? -1 : 1));
      }
    },
  },
  actions: {
  },
  modules: {
  }
})
