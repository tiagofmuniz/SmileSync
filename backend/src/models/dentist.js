import mongoose from "mongoose";

const DentistSchema = new mongoose.Schema(
  {
    id: mongoose.Schema.Types.ObjectId,
    name: { type: String, required: true },
    phone_number: { type: String, required: true, unique: true },
    address: { type: String, required: true },
    createdAt: { type: Date, default: new Date() },

    consults: [{ date: Date, dentist: String, observation: String }],
  },
  { timestamps: true }
);
export default mongoose.models.Dentist || mongoose.model("Dentist", DentistSchema);
