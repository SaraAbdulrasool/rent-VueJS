import axios from "axios";
import store from "../store/index";

const url = `${process.env.VUE_APP_API_URL}/user/`;

class UserService {
  //get a user
  static async getUser(id) {
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
              reject();
            });
        });
      })
      .catch((err) => console.log(err));
  }

  //login
  static login(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(`${url}login`, user)
        .then(function({ data }) {
          resolve([data, null]);
        })
        .catch(function(err) {
          resolve([null, err]);
        });
    });
  }

  //sign-up
  static addUser(user) {
    return new Promise((resolve, reject) => {
      axios
        .post(url, user)
        .then(function({ data }) {
          resolve([data, null]);
        })
        .catch(function(err) {
          resolve([null, err]);
        });
    });
  }

  //update user
  static async updateUser(user) {
    return store
      .dispatch("validateToken")
      .then(() => {
        return axios.put(`${url}${user._id}`, user, {
          headers: { Authorization: `Bearer ${localStorage.accessToken}` },
        });
      })
      .catch((err) => console.log(err));
  }
}

export default UserService;
