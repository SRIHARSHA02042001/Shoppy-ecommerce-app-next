import mongoose from 'mongoose';
const productsSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  mediaurl: {
    type: String,
    required: true,
  },
  cid: {
    type: Number,
    required: true,
  },
});
export default mongoose.models.product ||
  mongoose.model('product', productsSchema);
