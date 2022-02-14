/* eslint-disable @next/next/no-css-tags */
/* eslint-disable @next/next/no-sync-scripts */
import React from 'react';
import Head from 'next/head';
import NavBar from './NavBar';
import styles from '../styles/Layout.module.css';
export default function Layout({ children }) {
  return (
    <div>
      <Head>
        <title>Shoppy App</title>
        <link
          rel="stylesheet"
          href="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/css/materialize.min.css"
        ></link>
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        ></link>
        <link rel="stylesheet" href="/frontHome.css" />
        <link rel="stylesheet" href="/signup.css" />
        <script src="https://cdnjs.cloudflare.com/ajax/libs/materialize/1.0.0/js/materialize.min.js"></script>
      </Head>
      <NavBar></NavBar>
      {children}
      <footer className={styles.foot}>
        <p>All rights reserved by Shoppy</p>
      </footer>
    </div>
  );
}
