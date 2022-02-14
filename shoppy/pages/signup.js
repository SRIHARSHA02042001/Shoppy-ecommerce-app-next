import Link from 'next/link';
import { useState } from 'react';
import validator from 'validator';
import { useRouter } from 'next/router';
const SignUp = () => {
  const [name, setName] = useState();
  const [password, setPassword] = useState();
  const [email, setEmail] = useState();
  const [passwordError, setPasswordError] = useState(false);
  const [passwordErrorMessage, setPasswordErrorMessage] = useState();
  const router = useRouter();
  const handleSubmit = async (e) => {
    e.preventDefault();
    /*try {
      e.preventDefault();
      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        setPasswordErrorMessage('Is Not Strong Password');
        setPasswordError(true);
      } else {
        setPasswordErrorMessage('');
        setPasswordError(false);
        const res = await fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type:': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        const res2 = await res.json();
        if (res2.error) {
          M.toast({ html: res2.error, classes: 'red' });
        } else {
          M.toast({ html: res2.message, classes: 'green' });
          router.push('/login');
        }
      }
    } catch (err) {
      console.log(err);
    }*/
    try {
      if (
        !validator.isStrongPassword(password, {
          minLength: 8,
          minLowercase: 1,
          minUppercase: 1,
          minNumbers: 1,
          minSymbols: 1,
        })
      ) {
        setPasswordErrorMessage('Is Not Strong Password');
        setPasswordError(true);
      } else {
        setPasswordErrorMessage('');
        setPasswordError(false);
        const res = await fetch('http://localhost:3000/api/signup', {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({
            name: name,
            email: email,
            password: password,
          }),
        });
        const res2 = await res.json();
        if (res2.error) {
          M.toast({ html: res2.error, classes: 'red' });
        } else {
          M.toast({ html: res2.message, classes: 'green' });
          //router.push('/login');
        }
      }
    } catch (err) {
      console.log(err);
    }
  };
  return (
    <form
      className="container card authcard center-align"
      onSubmit={(e) => {
        handleSubmit(e);
      }}
    >
      <h3>Signup Page</h3>
      <input
        type="text"
        placeholder="Name"
        value={name}
        onChange={(e) => {
          setName(e.target.value);
        }}
      ></input>
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
      <p>
        Strong Password:password must contain atleast one upper case,lower
        case,number,special character
      </p>
      <span
        error={passwordError ? true : undefined}
        style={{ fontWeight: 'bold', color: 'red' }}
      >
        {passwordErrorMessage}
      </span>
      <button
        className="btn btcard waves-effect waves-light bottom-align"
        type="submit"
      >
        SignUp
        <i className="material-icons right">forward</i>
      </button>
      <Link href="/login">
        <a>
          <h5 className="acct">Already have an acount ?</h5>
        </a>
      </Link>
    </form>
  );
};
export default SignUp;
