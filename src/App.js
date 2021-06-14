import React, { useEffect, useState } from 'react';
import logo from './logo.svg';
import axios from 'axios';
import './App.css';

function App() {
  const [orderId, setOrderId] = useState();
  async function getOrderId() {
    try {
      const {
        data: { id },
      } = await axios.post(
        'https://cors-anywhere.herokuapp.com/https://api.razorpay.com/v1/orders',
        // 'https://api.razorpay.com/v1/orders',
        // {
        //   headers: { 'Authorization': 'Basic '+ encodedToken }
        // },
        {
          amount: 5000, // Money should in smallest figures so for INR multiply with 100 i.e 100000 = 100 ruppes
          currency: 'INR',
          receipt: 'Receipt no. 1',
          payment_capture: 1,
        },
        {
          auth: {
            username: process.env.REACT_APP_RAZORPAY_ID,
            password: process.env.REACT_APP_RAZORPAY_PASSWORD,
          },
        }
      );
      setOrderId(id);
      console.log(id);
    } catch (error) {
      console.log(error);
    }
  }
  var options = {
    key: process.env.REACT_APP_RAZORPAY_ID, // Enter the Key ID generated from the Dashboard
    amount: '50000', // Amount is in currency subunits. Default currency is INR. Hence, 50000 refers to 50000 paise
    currency: 'INR',
    name: 'Acme Corp',
    description: 'Test Transaction',
    order_id: `${orderId}`, //This is a sample Order ID. Pass the `id` obtained in the response of Step 1
    "handler": function (response){
      alert(response.razorpay_payment_id);
      alert(response.razorpay_order_id);
      alert(response.razorpay_signature)
  },
    prefill: {
      name: 'Aayush Kumar',
      email: 'gaurav.kumar@example.com',
      contact: '9999999999',
    },
  };
  const rzp = new window.Razorpay(options);
  rzp.on('payment.failed', function (response){
    alert(response.error.code);
    alert(response.error.description);
  });
  function handleClick() {
    if (orderId) {
      rzp.open();
    } else {
      return;
    }
  }
  useEffect(() => {
    getOrderId();
    return () => {
      console.log('Unmounting');
    };
  }, []);

  return (
    <div className="App">
      <header className="App-header">
        <img src={logo} className="App-logo" alt="logo" />
        <p className="App-text">Razorpay Payment With React</p>
        <button onClick={handleClick} className="App-link">
          Add Money
        </button>
      </header>
    </div>
  );
}

export default App;
