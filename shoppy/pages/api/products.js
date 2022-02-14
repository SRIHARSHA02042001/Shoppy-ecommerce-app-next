import ConnectDb from '../../utils/db';
import Product from '../../models/Product';
ConnectDb();
export default async (req, res) => {
  //res.json({ message: 'Hello World' });
  //console.log(Product);
  switch (req.method) {
    case 'GET':
      await getallProducts(req, res);
      break;
    case 'POST':
      console.log('in post');
      if (req.body.prod) {
        console.log('in if');
        getallProds(req, res);
        break;
      }
      await saveProduct(req, res);
      break;
  }
};
const getallProducts = async (req, res) => {
  try {
    const products = await Product.find();
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'internal serevr error' });
    console.log(error);
  }
};
const getallProds = async (req, res) => {
  console.log('in prods');
  const { cid } = req.body;
  console.log(cid);
  try {
    const products = await Product.find({ cid: cid });
    res.status(200).json(products);
  } catch (error) {
    res.status(500).json({ error: 'internal serevr error' });
    console.log(error);
  }
};
const saveProduct = async (req, res) => {
  const { name, price, description, mediaurl, cid } = req.body;
  try {
    if (!name || !price || !description || !mediaurl || !cid) {
      return res.status(422).json({ error: 'Please enter all fields' });
    }
    if (cid < 1 || cid > 10) {
      return res
        .status(422)
        .json({ error: 'Category Id must be between 1 to 10 only' });
    }
    const product = await new Product({
      name: name,
      price: price,
      description: description,
      mediaurl: mediaurl,
      cid: cid,
    }).save();
    res.status(201).json(product);
  } catch (error) {
    res.status(500).json({ error: 'internal server error' });
    console.log(error);
  }
};
