import Head from 'next/head';
import Image from 'next/image';
import Link from 'next/link';
const ProductDeatils = ({ products }) => {
  console.log(products);
  const productList = products.map((product) => {
    return (
      <div className="card pcard hoverable" key={product._id}>
        <div className="card-image">
          <img src={product.mediaurl} width="300px" height="300px" />
        </div>
        <span className="card-title black-text">{product.name}</span>
        <br></br>
        <div className="card-content">
          <p>RS.{product.price}</p>
        </div>
        <div className="card-action">
          <Link href={'/product/[id]'} as={`/product/${product._id}`}>
            <a>View Product</a>
          </Link>
        </div>
      </div>
    );
  });
  return <div className="rootcard">{productList}</div>;
};
export async function getStaticProps({ params: { cid } }) {
  const res = await fetch('http://localhost:3000/api/products', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ cid: cid, prod: true }),
  });
  const data = await res.json();
  return {
    props: {
      products: data,
    },
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { cid: '1' } }],
    fallback: true, // false or 'blocking'
  };
}
export default ProductDeatils;
