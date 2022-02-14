import Link from 'next/link';
import { useState } from 'react';
import cookie from 'js-cookie';
import { useRouter } from 'next/router';
const Login = () => {
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const router = useRouter();
  const loginUser = async (e) => {
    e.preventDefault();
    const res = await fetch('http://localhost:3000/api/login', {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ email: email, password: password }),
    });
    const res2 = await res.json();
    if (res2.error) {
      M.toast({ html: res2.error, classes: 'red' });
    } else {
      cookie.set('token', res2.token);
      cookie.set('user', res2.userdet);
      console.log(res2.userdet);
      router.push('/account');
    }
  };
  return (
    <form
      className="container card authcard center-align"
      onSubmit={(e) => {
        loginUser(e);
      }}
    >
      <h3>Login Page</h3>
      <input
        type="email"
        placeholder="Email"
        value={email}
        onChange={(e) => {
          setEmail(e.target.value);
        }}
      ></input>
      <input
        type="password"
        placeholder="Password"
        value={password}
        onChange={(e) => {
          setPassword(e.target.value);
        }}
      ></input>
      <button
        className="btn btcard waves-effect waves-light bottom-align"
        type="submit"
      >
        Login
        <i className="material-icons right">forward</i>
      </button>
      <Link href="/signup">
        <a>
          <h5 className="acct1">Dont have account ?</h5>
        </a>
      </Link>
    </form>
  );
};
export default Login;
