import mongoose from 'mongoose';
function ConnectDb() {
  if (mongoose.connections[0].readyState) {
    console.log('already connected');
    return;
  }
  mongoose.connect(process.env.MONGO_URI, {
    useNewUrlParser: true,
    useUnifiedTopology: true,
  });
  mongoose.connection.on('connected', () => {
    console.log('connected to database');
  });
  mongoose.connection.on('error', (err) => {
    console.log(err);
  });
}
export default ConnectDb;
