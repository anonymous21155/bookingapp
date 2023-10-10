import React, {useState} from "react";
import Cards from 'react-credit-cards-2';
import 'react-credit-cards-2/dist/es/styles-compiled.css';



function Payment ({ propObject }) {
  const [paymentDetails, setPaymentDetails] = useState({
    number: '',
    expiry: '',
    cvc: '',
    name: '',
    focus: '',
  });
  const { email } = propObject;
  console.log(propObject)
  

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

  async function handleOnClick  (e)  {
    const data = await fetch('http://localhost:1337/razorpay', { method: 'POST', headers: {'Content-Type': 'application/json'}, body: JSON.stringify(propObject)}).then((t) =>
			t.json()
		)
    const razorpay = new Razorpay({
      key: 'rzp_test_euDS0x6iBgKyk',
        // logo, displayed in the payment processing popup
      image: 'https://i.imgur.com/n5tjHFD.jpg',
    });
    const expiryData = paymentDetails.expiry;
    const [expiryMonth, expiryYear] = expiryData.split('/');
    e.preventDefault();
    Object.assign(data, {
      key: "rzp_test_euDS0x6iBgKyk5",
      currency: data.currency,
      order_id: data.id,
      amount: data.amount.toString(),
      name: 'contoso',
      method: 'card',
      'card[name]': paymentDetails.name,
      'card[number]': paymentDetails.number,
      'card[cvv]': paymentDetails.cvc,
      'card[expiry_month]': expiryMonth,
      'card[expiry_year]': expiryYear,
      email: email,
      contact: '9123456780'
    })
    
    const rzpay = razorpay.createPayment(data);
    rzpay.on('payment.success', function(resp) {
      alert(resp.razorpay_payment_id),
      alert(resp.razorpay_order_id),
      alert(resp.razorpay_signature)});
    rzpay.on('payment.error', function(resp){
      alert(resp.error.description)});
    
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
      <button type="button" onClick={handleOnClick}>Book</button>
        </>
         
    )
}

export default Payment;