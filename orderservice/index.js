require('dotenv').config();
const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
app.use(cors());
app.use(express.json());

mongoose.connect(process.env.MONGO_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
  .then(() => console.log('✅ MongoDB connected'))
  .catch(err => console.error('❌ MongoDB connection error:', err));

const orderRoutes = require('./routes/orderRoutes');
app.use('/api/orders', orderRoutes);

app.get('/', (req, res) => {
  res.send('Order Service is running');
});

app.get('/health', (req, res) => {
  res.status(200).json({ status: 'ok' });
});

const PORT = process.env.PORT || 3002;
app.listen(PORT, () => {
  console.log(`✅ Order Service listening on port ${PORT}`);
});
