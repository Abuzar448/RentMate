const mongoose = require("mongoose");
const review = require("./review");

const ListingSchema = new mongoose.Schema({
  title: {
    type: String,
    required: true,
  },
  description: {
    type: String,
  },
  image: {
    filename: {
      type: String,
    },
    url: {
      type: String,
      default:
        "https://plus.unsplash.com/premium_photo-1749751600727-3fb5c8af5c29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8",
      set: (v) =>
        v === ""
          ? "https://plus.unsplash.com/premium_photo-1749751600727-3fb5c8af5c29?w=500&auto=format&fit=crop&q=60&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxmZWF0dXJlZC1waG90b3MtZmVlZHwxfHx8ZW58MHx8fHx8"
          : v,
    },
  },
  price: {
    type: Number,
  },
  location: {
    type: String,
  },
  country: {
    type: String,
  },
  reviews: [
    {
      type: mongoose.Schema.Types.ObjectId,
      ref: "review",
    },
  ],
  owner:{
    type:mongoose.Schema.Types.ObjectId,
    ref:'User',
  },
  coordinates: {
    lat: Number,
    lng: Number,
  },
});

ListingSchema.post("findOneAndDelete", async (listing) => {
  if (listing) {
    await review.deleteMany({ _id: { $in: listing.reviews } });
  }
});

module.exports = mongoose.model("listing", ListingSchema);
