import axios from "axios";
import store from "../store/index";

const url = `${process.env.VUE_APP_API_URL}/revenue/`;

class RevenueService {
  //get all revenues
  static async getRevenues() {
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

  // sort the revenue
  static async getSortedRevenue() {
    return store
      .dispatch("validateToken")
      .then(() => {
        return new Promise((resolve, reject) => {
          axios
            .get(`${url}sorted-revenue`, {
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

  // add new revenue
  static async addRevenue(revenue) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.post(url, revenue, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        });
      })
      .catch((err) => console.log(err));
  }
}
export default RevenueService;
