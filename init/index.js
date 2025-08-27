const mongoose = require("mongoose");
const initdata = require("./data");
const listing = require("../models/listing");

const MONGO_URL = "mongodb://127.0.0.1:27017/rentmate";

main()
  .then(() => {
    console.log("db Connected Successfully !");
  })
  .catch((err) => {
    console.log(err);
  });

async function main() {
  await mongoose.connect(MONGO_URL);
}

const initdb = async () => {
  await listing.deleteMany({});
  initdata.data = initdata.data.map((obj) => ({
    ...obj,
    owner: "68a7fbdca2fff3539dd44b39",
    coordinates: {
      lat: 34.0194,
      lng: -118.4912,
    },
  }));
  await listing.insertMany(initdata.data);
  console.log("data was initialized !");
};
initdb();
