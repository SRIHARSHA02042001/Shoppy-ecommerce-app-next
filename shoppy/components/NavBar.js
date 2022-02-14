import React from 'react';
import Link from 'next/link';
import { useRouter } from 'next/router';
import { parseCookies } from 'nookies';
import cookie from 'js-cookie';
export default function NavBar() {
  const router = useRouter();
  const { token } = parseCookies();
  const cookie1 = cookie.get('user');
  const user1 = cookie1 ? JSON.parse(cookie1) : '';
  //console.log(user1);
  //const user = cookie.user ? JSON.parse(cookie.user) : '';
  function isActive(route) {
    if (route == router.pathname) {
      return 'active';
    } else '';
  }
  return (
    <nav>
      <div className="nav-wrapper #ef5350 red lighten-1">
        <Link href="/">
          <a className="brand-logo left">Shoppy</a>
        </Link>
        <ul id="nav-mobile" className="right">
          <li className={isActive('/cart')}>
            <Link href="/cart">
              <a>Cart</a>
            </Link>
          </li>
          {(user1.role == 'admin' || user1.role == 'root') && (
            <li className={isActive('/create')}>
              <Link href="/create">
                <a>Create</a>
              </Link>
            </li>
          )}
          {user1 ? (
            <>
              <li className={isActive('/account')}>
                <Link href="/account">
                  <a>Account</a>
                </Link>
              </li>
              <li>
                <button
                  className="btn blue"
                  onClick={() => {
                    cookie.remove('token');
                    cookie.remove('user');
                    router.push('/login');
                  }}
                >
                  Log out
                </button>
              </li>
            </>
          ) : (
            <>
              <li className={isActive('/login')}>
                <Link href="/login">
                  <a>Login</a>
                </Link>
              </li>
              <li className={isActive('/signup')}>
                <Link href="/signup">
                  <a>Sign up</a>
                </Link>
              </li>
            </>
          )}
        </ul>
      </div>
    </nav>
  );
}
