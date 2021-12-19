import axios from "axios";
import store from "../store/index";

const url = `${process.env.VUE_APP_API_URL}/reservation/`;

class ReservationService {
  //get reservations
  static async getReservations() {
    return store
      .dispatch("validateToken")
      .then(() => {
        return new Promise((resolve, reject) => {
          axios
            .get(url, {
              headers: { Authorization: `Bearer ${localStorage.accessToken}` },
            })
            .then(function({ data }) {
              resolve(data);
            })
            .catch(function(err) {
              reject();
            });
        });
      })
      .catch((err) => console.log(err));
  }

  //get user reservations
  static async getUserReservations(id) {
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

  //add reservation
  static async addReservation(res) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.post(url, res, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        });
      })
      .catch((err) => console.log(err));
  }

  //delete reservation
  static async deleteReservation(id) {
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

export default ReservationService;
