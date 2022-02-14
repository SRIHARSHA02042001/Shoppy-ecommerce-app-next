import ConnectDb from '../../utils/db';
import User from '../../models/User';
import bcrypt from 'bcryptjs/dist/bcrypt';
import jwt from 'jsonwebtoken';

ConnectDb();
export default async (req, res) => {
  try {
    const { email, password } = req.body;
    console.log(email, password);
    if (!email || !password) {
      return res.status(404).json({ error: 'please fill all fields' });
    }
    const user = await User.findOne({ email });
    if (!user) {
      return res
        .status(422)
        .json({ error: 'User dont exsist with this email' });
    }
    const domatch = await bcrypt.compare(password, user.password);
    if (domatch) {
      const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET, {
        expiresIn: '7d',
      });
      console.log(token);
      const { name, email, role } = user;
      console.log(name, email, role);
      let user1 = { name: name, email: email, role: role };
      let userdet = JSON.stringify(user1);
      res.status(201).json({ token, userdet });
    } else {
      return res.status(401).json({ error: 'email or password dont match' });
    }
  } catch (error) {
    console.log(error);
  }
};
