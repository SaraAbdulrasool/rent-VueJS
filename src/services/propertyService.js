import axios from "axios";
import store from "../store/index";

const url = `${process.env.VUE_APP_API_URL}/property/`;

class PropertyService {
  //get properties
  static async getProperties() {
    if (localStorage.user) {
      return store
        .dispatch("validateToken")
        .then(() => {
          return new Promise((resolve, reject) => {
            axios
              .get(url, {
                headers: {
                  Authorization: `Bearer ${localStorage.accessToken}`,
                },
              })
              .then(function({ data }) {
                resolve(data);
              })
              .catch(function(err) {
                reject(err);
              });
          });
        })
        .catch((err) => console.log(err.message));
    } else {
      return new Promise((resolve, reject) => {
        axios
          .post(url, { message: "noUser" })
          .then(function({ data }) {
            resolve(data);
          })
          .catch(function(err) {
            reject(err);
          });
      });
    }
  }

  //get properties
  static async getPropertiesWithOwner() {
    return store
      .dispatch("validateToken")
      .then(() => {
        return new Promise((resolve, reject) => {
          axios
            .get(`${url}PropertyWithOwner`, {
              headers: { Authorization: `Bearer ${localStorage.accessToken}` },
            })
            .then(function({ data }) {
              resolve(data);
            })
            .catch(function(err) {
              reject(err);
            });
        });
      })
      .catch((err) => console.log(err.message));
  }

  //get user properties
  static async getUserProperties(id) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return new Promise((resolve, reject) => {
          axios
            .get(`${url}${id}`, {
              headers: { Authorization: `Bearer ${localStorage.accessToken}` },
            })
            .then(function({ data }) {
              resolve(data);
            })
            .catch(function(err) {
              reject(err);
            });
        });
      })
      .catch((err) => console.log(err));
  }

  //add property
  static async addProperty(property) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.post(`${url}add-property`, property, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        });
      })
      .catch((err) => console.log(err));
  }

  //update property
  static async updateProperty(property) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.put(`${url}${property._id}`, property, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        });
      })
      .catch((err) => console.log(err));
  }

  //get property reserved dates
  static async getProperty(id, date) {
    console.log(localStorage.accessToken);
    return store
      .dispatch("validateToken")
      .then(() => {
        return new Promise((resolve, reject) => {
          axios
            .post(
              `${url}property${id}`,
              { dates: date },
              {
                headers: {
                  Authorization: `Bearer ${localStorage.accessToken}`,
                },
              }
            )
            .then(function({ data }) {
              resolve(data);
            })
            .catch(function(err) {
              reject(err);
            });
        });
      })
      .catch((err) => console.log(err.message));
  }

  //update property reserved dates
  static async updatePropertyReservedDates(id, type, dates) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.put(
          `${url}update-reservedDates${id}`,
          { type: type, reservedDates: dates },
          {
            headers: { Authorization: `Bearer ${localStorage.accessToken}` },
          }
        );
      })
      .catch((err) => console.log(err));
  }

  //delete property
  static async deleteProperty(id) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.delete(`${url}${id}`, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        });
      })
      .catch((err) => console.log(err));
  }
}

export default PropertyService;
