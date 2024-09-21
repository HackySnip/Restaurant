import mongoose, { Schema } from "mongoose";
import { NumberLiteralType } from "typescript";

export interface IRestaurant {
  user: Schema.Types.ObjectId;
  restaurantName: string;
  city: string;
  country: string;
  deliveryTime: number;
  cuisines: string[];
  imageUrl: string;
  menus: Schema.Types.ObjectId[];
}

export interface IRestaurantDocument extends IRestaurant, Document {
  createdAt: Date;
  updatedAt: Date;
}

const restaurantSchema = new Schema<IRestaurantDocument>(
  {
    user: {
      type: Schema.Types.ObjectId,
      ref: "User",
      required: true,
    },
    restaurantName: {
      type: String,
      required: true,
    },
    city: {
      type: String,
      required: true,
    },
    country: {
      type: String,
      required: true,
    },
    deliveryTime: {
      type: Number,
      required: true,
    },
    cuisines: [
      {
        type: String,
        required: true,
      },
    ],
    menus: [
      {
        type: Schema.Types.ObjectId,
        ref: "Menu",
      },
    ],
    imageUrl: {
      type: String,
      required: true,
    },
  },
  {
    timestamps: true,
  }
);

export const Restaurant = mongoose.model("Restaurant", restaurantSchema);
