import Stripe from 'stripe';
import { v4 as uuidv4 } from 'uuid';
import Cart from '../../models/Cart';
import jwt from 'jsonwebtoken';
import Order from '../../models/Order';
import ConnectDb from '../../utils/db';
ConnectDb();
const stripe = Stripe(process.env.STRIPE_SECRET);
//console.log(stripe);
export default async (req, res) => {
  const { paymentInfo } = req.body;
  //console.log(paymentInfo);
  const { authorization } = req.headers;
  if (!authorization) {
    return res.status(401).json({ error: 'User not logged in' });
  }
  try {
    const { userId } = jwt.verify(authorization, process.env.JWT_SECRET);
    const cart = await Cart.findOne({ user: userId }).populate(
      'products.product'
    );
    console.log(cart);
    let cprice = 0;
    let quantity = 0;
    let pname;
    cart.products.forEach((item) => {
      console.log(item.product.price);
      pname = item.product.name;
      cprice = cprice + item.quantity * item.product.price;
      quantity = quantity + item.quantity;
    });
    console.log(cprice);
    const pCustomer = await stripe.customers.list({ email: paymentInfo.email });
    const isExistCustomer = pCustomer.data.length > 0;
    let nCustomer;
    if (!isExistCustomer) {
      nCustomer = await stripe.customers.create({
        email: paymentInfo.email,
        source: paymentInfo.id,
      });
    }
    /*const charge = await stripe.charges.create(
      {
        currency: 'inr',
        amount: cprice * 100,
        receipt_email: paymentInfo.email,
        source: paymentInfo.id,
        customer: isExistCustomer ? pCustomer.data[0].id : nCustomer.id,
        description: `You purchased a product | ${paymentInfo.email}`,
      },
      { idempotencyKey: uuidv4() }
    );*/
    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: [
        {
          price_data: {
            currency: 'inr',
            product_data: { name: pname },
            unit_amount: cprice,
          },

          quantity: quantity,
        },
      ],
      client_reference_id: paymentInfo.id,
      success_url: 'http://localhost:3000/account',
      cancel_url: 'http://localhost:3000/cart',
    });
    console.log(session);
    await new Order({
      user: userId,
      email: paymentInfo.email,
      products: cart.products,
      total: cprice,
    }).save();
    await Cart.findOneAndUpdate({ id: cart._id }, { $set: { products: [] } });
    res.status(200).json({ message: 'payment success' });
  } catch (err) {
    console.log(err);
    return res.status(401).json({ error: 'error in processing payment' });
  }
};
