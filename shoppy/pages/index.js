import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
const Home = ({ categories }) => {
  console.log(categories);
  const categoryList = categories.map((category) => {
    return (
      <div className="card pcard hoverable" key={category._id}>
        <div className="card-image">
          <img src={category.mediaurl} width="300px" height="300px" />
        </div>
        <span className="card-title black-text">{category.cname}</span>
        <br></br>
        <div className="card-action">
          <Link href={'/Category/[cid]'} as={`/Category/${category.cid}`}>
            <a>View Category</a>
          </Link>
        </div>
      </div>
    );
  });
  return <div className="rootcard">{categoryList}</div>;
};
export async function getStaticProps() {
  const res = await fetch('http://localhost:3000/api/categories');
  const data = await res.json();
  return {
    props: {
      categories: data,
    },
  };
}
export default Home;
