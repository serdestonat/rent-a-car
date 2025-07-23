import { Schema, model, models } from "mongoose";

interface User {
  name: string;
  email: string;
  password?: string;
  resetCode?: string;
  resetCodeExpires?: Date;
}

const UserSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
  },
  resetCode: {
    type: String,
    default: null,
  },
  resetCodeExpires: {
    type: Date,
    default: null,
  },
});

export default models.User || model("User", UserSchema);
