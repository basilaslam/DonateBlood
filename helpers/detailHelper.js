var db = require("../config/connection");
var collection = require("../config/collections");
module.exports = {
  getAllDetailes: () => {
    return new Promise(async (resolve, reject) => {
      let details = await db
        .get()
        .collection(collection.DETAILS_COLLECTION)
        .find()
        .toArray();
      resolve(details);
    });
  },
  addNewDetailes: (userData) => {
    db.get()
      .collection(collection.DETAILS_COLLECTION)
      .insertOne({
        name: userData.username,
        blood: userData.blood,
        country: userData.country,
        state: userData.state,
        district: userData.district,
        phone: userData.phone,
        email: userData.email,
      })
      .then((err) => {
        if (err) {
          console.log(err);
        } else {
          console.log("Detailes Saved");
        }
      });
  },

  filteredDetailes: (filterParameter) => {
    return new Promise(async (resolve, reject) => {
      if (
        filterParameter.blood != "" &&
        filterParameter.country != "" &&
        filterParameter.state != "" &&
        filterParameter.district != ""
      ) {
        var paraMeter = {
          $and: [
            { blood: filterParameter.blood },
            { country: filterParameter.country },
            { state: filterParameter.state },
            { district: filterParameter.district },
          ],
        };
      } else if (
        filterParameter.blood != "" &&
        filterParameter.country != "" &&
        filterParameter.state == "" &&
        filterParameter.district == ""
      ) {
        var paraMeter = {
          $and: [
            { blood: filterParameter.blood },
            { country: filterParameter.country },
          ],
        };
      } else if (
        filterParameter.blood == "" &&
        filterParameter.country != "" &&
        filterParameter.state != "" &&
        filterParameter.district == ""
      ) {
        var paraMeter = {
          $and: [
            { country: filterParameter.country },
            { state: filterParameter.state },
          ],
        };
      } else if (
        filterParameter.blood != "" &&
        filterParameter.country == "" &&
        filterParameter.state == "" &&
        filterParameter.district != ""
      ) {
        var paraMeter = {
          $and: [
            { blood: filterParameter.blood },
            { district: filterParameter.district },
          ],
        };
      } else if (
        filterParameter.blood != "" &&
        filterParameter.country == "" &&
        filterParameter.state != "" &&
        filterParameter.district == ""
      ) {
        var paraMeter = {
          $and: [
            { blood: filterParameter.blood },
            { state: filterParameter.state },
          ],
        };
      } else if (
        filterParameter.blood == "" &&
        filterParameter.country == "" &&
        filterParameter.state == "" &&
        filterParameter.district != ""
      ) {
        var paraMeter = { district: filterParameter.district };
      } else if (
        filterParameter.blood != "" &&
        filterParameter.country == "" &&
        filterParameter.state == "" &&
        filterParameter.district == ""
      ) {
        var paraMeter = { blood: filterParameter.blood };
      } else if (
        filterParameter.blood == "" &&
        filterParameter.country != "" &&
        filterParameter.state == "" &&
        filterParameter.district == ""
      ) {
        var paraMeter = { country: filterParameter.country };
      } else if (
        filterParameter.blood == "" &&
        filterParameter.country == "" &&
        filterParameter.state != "" &&
        filterParameter.district == ""
      ) {
        var paraMeter = { state: filterParameter.state };
      } else {
        var paraMeter = {};
      }
      let details = await db
        .get()
        .collection(collection.DETAILS_COLLECTION)
        .find(paraMeter)
        .toArray();
      resolve(details);
    });
  },
  removeUserDetailes : (user) => {
    return new Promise((resolve,reject)=>{
        db.get().collection(collection.DETAILS_COLLECTION).removeOne({name :user}).then((response)=>{
            resolve(response)
        })
    })
  }
}