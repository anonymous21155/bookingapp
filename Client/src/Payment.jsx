import React, {useState} from "react";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';


function Payment () {
  const [paymentDetails, setPaymentDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  /*const razorpay = new Razorpay({
    key: 'rzp_test_euDS0x6iBgKyk',
      // logo, displayed in the payment processing popup
    image: 'https://i.imgur.com/n5tjHFD.jpg',
  });
  const cardElement = document.querySelector('#card');
  cardElement.addEventListener('click', async function () {
    try {
    const response =  await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)
    const data = await response.json();
    const options = {
      key: "rzp_test_euDS0x6iBgKyk5",
      currency: data.currency,
      order_id: data.id,
      amount: data.amount.toString(),
      name: 'contoso',
      prefill: {
				name: 'testuser',
				email: 'sdfdsjfh2@ndsfdf.com'
				
			},
      }
    razorpay.createPayment(options);
    } catch {
      console.error('Error handling click:', error);
    }
  })*/

  const handleOnChange =  (e) => {
    const {name, value} = e.target;
    setPaymentDetails((prev) => ({
        ...prev,
        [name]: value
    }))
  }

  const handleInputFocus = (evt) => {
    setPaymentDetails((prev) => ({ ...prev, focus: evt.target.name }));
  }

  async function handleOnClick  ()  {
    const data = await fetch('http://localhost:1337/razorpay', { method: 'POST' }).then((t) =>
			t.json()
		)
    const razorpay = new Razorpay({
      key: 'rzp_test_euDS0x6iBgKyk',
        // logo, displayed in the payment processing popup
      image: 'https://i.imgur.com/n5tjHFD.jpg',
    });
    const options = {
      key: "rzp_test_euDS0x6iBgKyk5",
      currency: data.currency,
      order_id: data.id,
      amount: data.amount.toString(),
      name: 'contoso',
      prefill: {
				name: 'testuser',
				email: 'sdfdsjfh2@ndsfdf.com'
				
			},
      }
    razorpay.createPayment(data);
    
  }
  
    return (
        <>
        <Cards number={paymentDetails.number}
        expiry={paymentDetails.expiry}
        cvc={paymentDetails.cvc}
        name={paymentDetails.name}
        focused={paymentDetails.focus}/>
        <form>
        <input
          type="number"
          name="number"
          placeholder="Card Number"
          value={paymentDetails.number}
          onChange={handleOnChange}
          onFocus={handleInputFocus}
        />
        <input
          type="number"
          name="expiry"
          placeholder="Valid Thru"
          value={paymentDetails.expiry}
          onChange={handleOnChange}
          onFocus={handleInputFocus}
        />
        <input
            type="text"
            name="name"
            placeholder="Cardholder's Name"
            value={paymentDetails.name}
            onChange={handleOnChange}
            onFocus={handleInputFocus}
        />
        <input 
          type="number"
          name="cvc"
          placeholder="cvc"
          value={paymentDetails.cvc}
          onChange={handleOnChange}
          onFocus={handleInputFocus}
        />
        </form>
      <button id="card" onClick={handleOnClick}>Book</button>
        </>
         
    )
}

export default Payment;