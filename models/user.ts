import { Schema, model, models } from "mongoose";

interface User {
  name: string;
  email: string;
  password?: string;
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
});

export default models.User || model("User", UserSchema);
