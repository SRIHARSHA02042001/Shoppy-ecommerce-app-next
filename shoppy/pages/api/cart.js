import { CardContent } from '@material-ui/core';
import Product from '../../models/Product';
import jwt from 'jsonwebtoken';
import Cart from '../../models/Cart';
export default async (req, res) => {
  switch (req.method) {
    case 'GET':
      await fetchUserCart(req, res);
      break;
    case 'PUT':
      await addProduct(req, res);
      break;
    case 'DELETE':
      await removeProduct(req, res);
      break;
  }
};
function Authenticate(icomponent) {
  return (req, res) => {
    const { authorization } = req.headers;
    if (!authorization) {
      return res.status(401).json({ error: 'User not logged in' });
    }
    try {
      const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
      req.userId = userId;
      return icomponent(req, res);
    } catch (err) {
      return res.status(401).json({ error: 'User not logged in' });
    }
  };
}
const removeProduct = Authenticate(async (req, res) => {
  const { productId } = req.body;
  const cart = await Cart.findOneAndUpdate(
    { user: req.userId },
    { $pull: { products: { product: productId } } },
    { new: true }
  ).populate('products.product');
  res.status(200).json(cart.products);
});
const fetchUserCart = Authenticate(async (req, res) => {
  const cart = await Cart.findOne({ user: req.userId }).populate(
    'products.product'
  );
  res.status(200).json(cart.products);
});
const addProduct = Authenticate(async (req, res) => {
  const { quantity, productId } = req.body;
  const cart = await Cart.findOne({ user: req.userId });
  const pexist = cart.products.some(
    (pdoc) => productId === pdoc.product.toString()
  );
  if (pexist) {
    await Cart.findOneAndUpdate(
      { _id: cart._id, 'products.product': productId },
      { $inc: { 'products.$.quantity': quantity } }
    );
  } else {
    const newproduct = { quantity: quantity, product: productId };
    await Cart.findByIdAndUpdate(
      {
        _id: cart._id,
      },
      { $push: { products: newproduct } }
    );
  }
  res.status(200).json({ message: 'product added' });
});
