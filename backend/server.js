import express from 'express';
import mongoose from 'mongoose';
import UserRouter from './routers/userRouter.js';
import productRouter from './routers/productRouter.js';
import dotenv from 'dotenv';
import orderRouter from './routers/orderRouter.js';
import path from 'path';
import uploadRouter from './routers/uploadRouter.js';

dotenv.config()

const app = express();
app.use(express.json());
app.use(express.urlencoded ({extended:true}))

mongoose.connect(process.env.MONGODB_URL ||'mongodb://localhost/mshop',{
  useNewUrlParser:true,
  useUnifiedTopology:true,
  useCreateIndex:true,
})


app.use('/api/uploads', uploadRouter);
app.use('/api/users',UserRouter)
app.use('/api/products',productRouter)
app.use('/api/orders', orderRouter)

app.get('/api/config/mastercard' , (req,res)=>{
  res.send(process.env.MASTERCARD_CLIENT_ID || 'sb ')
})

const __dirname = path.resolve();
app.use('/uploads', express.static(path.join(__dirname, '/uploads')));

app.get('/',(req,res)=>{
  res.send('Server is OK')
} )

app.use((err,req,res,next)=>{
  res.status(500).send({message:err.message})
})


 

const port = process.env.PORT || 5000
app.listen(port ,()=>{
  console.log(`Server is running on port ${port}`)
})






