import axios from "axios";
import store from "../store/index";

const url = `${process.env.VUE_APP_API_URL}/application/`;

class ApplicationService {
  // get all application
  static async getApplications() {
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

  //get user applications
  static async getUserApplications(id) {
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

  //get customer ApplicationService
  static async getCustomerApplications(id) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return new Promise((resolve, reject) => {
          axios
            .get(`${url}customer-applications/${id}`, {
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

  //add new application
  static async addAplication(app) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.post(url, app, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        });
      })
      .catch((err) => console.log(err));
  }

  //update application
  static async updateApplication(id, x) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.put(
          `${url}${id}`,
          { status: x },
          {
            headers: { Authorization: `Bearer ${localStorage.accessToken}` },
          }
        );
      })
      .catch((err) => console.log(err));
  }
}

export default ApplicationService;
