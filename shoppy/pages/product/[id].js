import { useRouter } from 'next/router';
import { useRef, useEffect, useState } from 'react';
import cookie from 'js-cookie';
import { parseCookies } from 'nookies';
const Product = ({ product }) => {
  const router = useRouter();
  const modalRef = useRef(null);
  const cookiet = parseCookies();
  const cookie1 = cookie.get('user');
  const user1 = cookie1 ? JSON.parse(cookie1) : '';
  const [quantity, setQuantity] = useState(1);
  useEffect(() => {
    M.Modal.init(modalRef.current);
  });
  if (router.isFallback) {
    return <h3>Loading...</h3>;
  }
  const AddtoCart = async () => {
    const res = await fetch('http://localhost:3000/api/cart', {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        Authorization: cookiet.token,
      },
      body: JSON.stringify({
        quantity: quantity,
        productId: product._id,
      }),
    });
    const res2 = await res.json();
    //console.log(res2);
    if (res2.error) {
      M.toast({ html: res2.error, classes: 'red' });
      cookie.remove('token');
      cookie.remove('user');
      router.push('/login');
    }
    M.toast({ html: res2.message, classes: 'green' });
  };
  const getModal = () => {
    return (
      <div id="modal1" className="modal" ref={modalRef}>
        <div className="modal-content">
          <h4>{product.name}</h4>
          <p>Are you sure you want to delete</p>
        </div>
        <div className="modal-footer">
          <button className="btn waves-effect waves-light #1565c0 blue darken-3">
            cancel
          </button>
          <button
            className="btn waves-effect waves-light #c62828 red darken-3"
            onClick={() => deleteProduct()}
          >
            yes
          </button>
        </div>
      </div>
    );
  };
  const deleteProduct = async () => {
    const res = await fetch(
      `http://localhost:3000/api/product/${product._id}`,
      { method: 'DELETE' }
    );
    await res.json();
    router.push('/');
  };
  return (
    <div className="container center-align">
      <h3>{product.name}</h3>
      <img src={product.mediaurl} width="300px" height="300px"></img>
      <h5>Rs.{product.price}</h5>
      <input
        type="number"
        value={quantity}
        onChange={(e) => {
          setQuantity(Number(e.target.value));
        }}
        style={{ width: '400px', margin: '10px' }}
        min="1"
        placeholder="Quantity"
      ></input>
      {user1 ? (
        <button
          className="btn waves-effect waves-light"
          onClick={() => AddtoCart()}
        >
          Add
          <i className="material-icons right">add</i>
        </button>
      ) : (
        <button
          className="btn waves-effect waves-light"
          onClick={() => {
            router.push('/login');
          }}
        >
          Login to add
          <i className="material-icons right">add</i>
        </button>
      )}
      <p className="left-align">{product.description}</p>
      {(user1.role == 'admin' || user1.role == 'root') && (
        <button
          data-target="modal1"
          className="btn modal-trigger waves-effect waves-light #c62828 red darken-3"
        >
          Delete
          <i className="material-icons right">delete</i>
        </button>
      )}
      {getModal()}
    </div>
  );
};
/*export async function getServerSideProps({ params: { id } }) {
  const res = await fetch(`http://localhost:3000/api/product/${id}`);
  const data = await res.json();
  return {
    props: { product: data },
  };
}*/
export async function getStaticProps({ params: { id } }) {
  const res = await fetch(`http://localhost:3000/api/product/${id}`, {
    method: 'GET',
  });
  const data = await res.json();
  return {
    props: { product: data },
  };
}
export async function getStaticPaths() {
  return {
    paths: [{ params: { id: '6204f829024178713b25758c' } }],
    fallback: true, // false or 'blocking'
  };
}
export default Product;
