import ConnectDb from '../../utils/db';
import Order from '../../models/Order';
import Authenticate from '../../utils/Authenticate';
ConnectDb();
export default Authenticate(async (req, res) => {
  try {
    const orders = await Order.find({ user: req.userId }).populate(
      'products.product'
    );
    console.log(orders);
    res.status(200).json(orders);
  } catch (err) {
    console.log(err);
  }
});
