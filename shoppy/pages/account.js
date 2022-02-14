import { parseCookies } from 'nookies';
const Account = () => {
  return <h1>Hello account</h1>;
};
export function getServerSideProps(context) {
  const { token } = parseCookies(context);
  if (!token) {
    const { res } = context;
    res.writeHead(302, { Location: '/login' });
    res.end();
  }
  return {
    props: {},
  };
}
export default Account;
