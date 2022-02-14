/* eslint-disable react/jsx-key */
import { parseCookies } from 'nookies';
import { useRouter } from 'next/router';
import cookies from 'js-cookie';
import Link from 'next/link';
import { useState } from 'react';
import StripeCheckout from 'react-stripe-checkout';
const Cart = ({ error, products }) => {
  const router = useRouter();
  const { token } = parseCookies();
  const [cProducts, setcProducts] = useState(products);
  let ptotal = 0;
  if (!token) {
    return (
      <div className="center-align">
        <h3>Please login to view cart</h3>
        <Link href="/login">
          <a>
            <button className="btn #1565c0 blue darken-3">Login</button>
          </a>
        </Link>
      </div>
    );
  }
  if (error) {
    M.toast({ html: error, classes: 'red' });
    cookies.remove('token');
    cookies.remove('user');
    router.push('/login');
  }
  const handleRemove = async (pid) => {
    const res = await fetch('http://localhost:3000/api/cart', {
      method: 'DELETE',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ productId: pid }),
    });
    const res2 = await res.json();
    //console.log(res2);
    setcProducts(res2);
  };
  const handleCheckout = async (paymentInfo) => {
    console.log(paymentInfo);
    const res = await fetch('http://localhost:3000/api/payment', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json', Authorization: token },
      body: JSON.stringify({ paymentInfo: paymentInfo }),
    });
    const res2 = await res.json();
    console.log(res2);
  };
  const TotalPrice = () => {
    console.log('potatl', ptotal);
    return (
      <div
        className="container"
        style={{ display: 'flex', justifyContent: 'space-between' }}
      >
        <h5>total:₹{ptotal}</h5>
        <StripeCheckout
          name="Shoppy"
          amount={ptotal * 100}
          image={products[0].product.mediaurl}
          currency="INR"
          shippingAddress={true}
          billingAddress={true}
          zipCode={true}
          stripeKey="pk_test_51KSv5aSIOY5siGzt6QCUh2OMWM08nxbHtiq5b5Fq0ZgbIFWWYVhlG21SM6b3uwRilBMcOiDtIceNEKHOjjSjbTtd001BaTrzIV"
          token={(paymentInfo) => {
            handleCheckout(paymentInfo);
          }}
        >
          <button className="btn">Checkout</button>
        </StripeCheckout>
      </div>
    );
  };
  const CartItems = () => {
    let total = 0;
    return (
      <>
        {cProducts.map((item) => {
          total = total + item.quantity * item.product.price;
          console.log(total);
          ptotal = total;
          return (
            <div style={{ display: 'flex', margin: '20px' }}>
              <img
                src={item.product.mediaurl}
                style={{ width: '250px', height: '215px' }}
              ></img>
              <div style={{ marginLeft: '20px' }}>
                <h6>{item.product.name}</h6>
                <h6>
                  {item.quantity}x{item.product.price}
                </h6>
                <button
                  className="btn red"
                  onClick={() => {
                    handleRemove(item.product._id);
                  }}
                >
                  Remove
                </button>
              </div>
            </div>
          );
        })}
      </>
    );
    //ptotal = total;
  };
  return (
    <div className="container">
      <CartItems></CartItems>
      <TotalPrice></TotalPrice>
    </div>
  );
};
export default Cart;
/*export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  if (!token) {
    return {
      props: { products: [] },
    };
  }
  const res = await fetch('http://localhost:3000/api/cart', {
    headers: { Authorization: token },
  });
  const products = await res.json();
  if (products.error) {
    return {
      props: { error: products.error },
    };
  }
  console.log('products', products);
  return {
    props: { products },
  };
}*/
export async function getServerSideProps(content) {
  const { token } = parseCookies(content);
  if (!token) {
    return {
      props: { products: [] },
    };
  }
  const res = await fetch('http://localhost:3000/api/cart', {
    headers: { Authorization: token },
  });
  const products = await res.json();
  if (products.error) {
    return {
      props: { error: products.error },
    };
  }
  console.log(products);
  return {
    props: { products },
  };
}
