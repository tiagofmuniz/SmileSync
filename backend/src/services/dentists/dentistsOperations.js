import databaseConnection from "../../utils/database.js";
import Dentist from "../../models/dentist.js";

export const listDentist = async () => {
  await databaseConnection();
  return await Dentist.find();
};

export const createDentist = async (dentist) => {
  console.log(dentist);
  if (!dentist) throw new Error("Dentista não cadastrado");
  await databaseConnection();
  const createdDentist = await Dentist.create({ ...dentist });
  return createdDentist;
};

export const deleteDentist = async (dentistId) => {
  await databaseConnection();
  await Dentist.findByIdAndDelete(dentistId);
};

export const updateDentist = async (dentistId, newBody) => {
  await databaseConnection();
  await Dentist.findByIdAndUpdate(dentistId, newBody);
};
