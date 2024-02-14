import mongoose from 'mongoose';
const URI = `mongodb+srv://tiagofmuniz:Asimov31985100!2024@cluster0.wdkwqep.mongodb.net/?retryWrites=true&w=majority`;
const databaseConnection = async () => {
  if (!global.mongoose) {
    mongoose.set('strictQuery', false);
    global.mongoose = await mongoose.connect(URI);
  }
};
export default databaseConnection;
