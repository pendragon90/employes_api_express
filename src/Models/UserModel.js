import mongoose from "mongoose";

const {Schema} = mongoose;

const UserSchema = new Schema({
  name: {
    type: String,
    required: true
  },
  password: {
    type: String,
    required: true
  },
  role: {
    type: String,
    default: 'user'
  },
  img: String,
  nip: {
    type: String,
    required: true
  },
  date: Date,
  address: {
    city: String,
    street: String,
    country: String
  },
  email: {
    type: String,
    required: true
  },
  phone: {
    type: String
  },
  position: {
    type: Schema.Types.ObjectId,
    ref: "Position"
  },
  entry_date: Date,
  salary: Number,
  skills: [String],
});

const User = mongoose.model("User", UserSchema);

export default User;
