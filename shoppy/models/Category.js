import mongoose, { Mongoose } from 'mongoose';
const categorySchema = new mongoose.Schema({
  cid: {
    type: Number,
    required: true,
  },
  cname: {
    type: String,
    required: true,
  },
  mediaurl: {
    type: String,
    required: true,
  },
});
export default mongoose.models.categorie ||
  mongoose.model('categorie', categorySchema);
