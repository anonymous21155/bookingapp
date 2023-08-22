import { error } from 'console';
import express from 'express';
import Razorpay from 'razorpay';
import cors from 'cors';

const app = express();
app.use(cors());
const razorpay = new Razorpay({
    key_id: 'rzp_test_euDS0x6iBgKyk5',
    key_secret: 'gULH7BA4ZbyySRhnTpuDeXxo',
  });
app.post('/razorpay', async (req, res) => {
  const options = {
    amount: 50000,  // amount in the smallest currency unit
    currency: "INR",
    receipt: "order_rcptid_11"
  };
  const response = await razorpay.orders.create(options);
  const methods = await 
  console.log(response);
  res.json({
    id: response.id,
    currency: response.currency,
    amount: response.amount
  });
})

  



app.listen(1337, () => {
  console.log('sever running on port 1337');
})

