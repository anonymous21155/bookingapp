import bodyParser from 'body-parser';
import express from 'express';
import Razorpay from 'razorpay';
import { createBooking, bookingRouter } from './booking.mjs';
import { availabilityRouter, serviceRouter } from './availability.mjs';
import cors from 'cors';

const app = express();
app.use(cors());
app.use(bodyParser.json());
const port = 1337;
const razorpay = new Razorpay({
    key_id: 'rzp_test_euDS0x6iBgKyk5',
    key_secret: 'gULH7BA4ZbyySRhnTpuDeXxo',
  });
app.use('/service', serviceRouter);
app.use('/bookings', bookingRouter);
app.use('/availability', availabilityRouter);
app.get('/', (req, res) => {
  res.send('Hello World!');
});
app.post('/razorpay', async (req, res) => {
  let amount = "";
  console.log(req.body.service, req.body.doctor)
  if (req.body.service === "GeneralMedicine" && req.body.doctor === "Dr Smith" || req.body.doctor === "Dr Jhon" || req.body.doctor === "Dr Hari") {
     amount = 50000;
  } else if (req.body.service === "GeneralMedicine" && req.body.doctor === "Dr Hennah"){
     amount = 35000;
  } else if (req.body.service === "GeneralMedicine" && req.body.doctor === "Dr Alvaro") {
    amount = 25000;
  } else if (req.body.service === "Dermatology") {
    amount = 30000;
  } else {
    amount = 50000;
  }
  const options = {
    amount: amount,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  const response = await razorpay.orders.create(options);
  
  console.log(response);
   if (response) {
    createBooking(req.body);
  }
  res.json({
    id: response.id,
    currency: response.currency,
    amount: response.amount
  });
})

  



app.listen(port, () => {
  console.log('sever running on port 1337');
})

