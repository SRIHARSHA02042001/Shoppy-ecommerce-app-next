import ConnectDb from '../../utils/db';
import Category from '../../models/Category';
ConnectDb();
const getallCategories = async (req, res) => {
  try {
    const categories = await Category.find();
    console.log(categories);
    res.status(200).json(categories);
  } catch (error) {
    res.status(500).json({ error: 'internal serevr error' });
    console.log(error);
  }
};
export default getallCategories;
