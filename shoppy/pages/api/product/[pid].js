import Product from '../../../models/Product';
import ConnectDb from '../../../utils/db';
ConnectDb();
export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await getProduct(req, res);
      break;
    case 'DELETE':
      await deleteProduct(req, res);
      break;
  }
};
const getProduct = async (req, res) => {
  try {
    const { pid } = req.query;
    const product = await Product.findOne({ _id: pid });
    res.status(200).json(product);
  } catch (error) {
    res.status(500).json({ error: 'internal server error' });
    console.log(error);
  }
};
const deleteProduct = async (req, res) => {
  try {
    const { pid } = req.query;
    await Product.findOneAndDelete({ _id: pid });
    res.status(200).json({});
  } catch (error) {
    res.status(500).json({ error: 'internal server error' });
    console.log(error);
  }
};
