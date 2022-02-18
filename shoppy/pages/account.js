/* eslint-disable react-hooks/rules-of-hooks */
/* eslint-disable react/jsx-key */
import Timeline from '@material-ui/lab/Timeline';
import TimelineItem from '@material-ui/lab/TimelineItem';
import TimelineSeparator from '@material-ui/lab/TimelineSeparator';
import TimelineConnector from '@material-ui/lab/TimelineConnector';
import TimelineContent from '@material-ui/lab/TimelineContent';
import TimelineDot from '@material-ui/lab/TimelineDot';
import { Paper } from '@material-ui/core';
import { parseCookies } from 'nookies';
import { useEffect, useRef } from 'react';
const Account = ({ orders }) => {
  const cookie = parseCookies();
  const User = cookie.user ? JSON.parse(cookie.user) : '';
  const ordercard = useRef(null);
  useEffect(() => {
    M.Collapsible.init(ordercard.current);
  }, []);
  const OrderHistory = () => {
    return (
      <>
        <ul className="collapsible" ref={ordercard}>
          {orders.map((item) => {
            return (
              <li key={item._id}>
                <div className="collapsible-header">
                  <i className="material-icons">filter_drama</i>
                  Items
                </div>
                <div className="collapsible-body">
                  {item.products.map((pitem) => {
                    return (
                      <>
                        <Timeline align="alternate" key={pitem._id}>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Paper elevation={3}>
                                Ordered At :{item.createdAt}
                              </Paper>
                            </TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Paper elevation={3}>
                                Product :{pitem.product.name}
                              </Paper>
                            </TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Paper elevation={3}>
                                Quantity :{pitem.quantity}
                              </Paper>
                            </TimelineContent>
                          </TimelineItem>
                          <TimelineItem>
                            <TimelineSeparator>
                              <TimelineDot color="primary" />
                              <TimelineConnector />
                            </TimelineSeparator>
                            <TimelineContent>
                              <Paper elevation={3}>Amount :{item.total}</Paper>
                            </TimelineContent>
                          </TimelineItem>
                        </Timeline>
                      </>
                    );
                  })}
                </div>
              </li>
            );
          })}
        </ul>
      </>
    );
  };
  return (
    <div className="container">
      <div className="center-align">
        <h4>Name:{User.name}</h4>
        <h4>Email:{User.email}</h4>
      </div>
      <h3>OrderHistory</h3>
      {ordercard.length == 0 ? (
        <div className="container center-align">
          <h3>You have no ordershistory</h3>
        </div>
      ) : (
        <OrderHistory></OrderHistory>
      )}
    </div>
  );
};
export async function getServerSideProps(context) {
  const { token } = parseCookies(context);
  if (!token) {
    const { res } = context;
    res.writeHead(302, { Location: '/login' });
    res.end();
  }
  const res = await fetch('http://localhost:3000/api/Order', {
    headers: { Authorization: token },
  });
  const res2 = await res.json();
  console.log(res2);
  return {
    props: { orders: res2 },
  };
}
export default Account;
