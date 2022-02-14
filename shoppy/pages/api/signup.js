import ConnectDb from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs/dist/bcrypt';
import Cart from '../../models/Cart';
ConnectDb();
export default async (req, res) => {
  try {
    const { name, email, password } = req.body;
    console.log(name, email.password);
    if (!name || !email || !password) {
      return res.status(422).json({ error: 'please fill all fields' });
    }
    const user = await User.findOne({ email });
    if (user) {
      return res.status(422).json({ error: 'User Exists' });
    }
    const hashpassword = await bcrypt.hash(password, 15);
    const newuser = await new User({
      name: name,
      email: email,
      password: hashpassword,
    }).save();
    await new Cart({ user: newuser._id }).save();
    console.log(newuser);
    res.status(201).json({ message: 'Signup Success' });
  } catch (error) {
    console.log(error);
  }
};
