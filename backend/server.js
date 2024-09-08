const express = require('express');
const mongoose = require('mongoose');
const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000;

app.use(cors());
app.use(express.json());

// اتصال به MongoDB
mongoose.connect(process.env.MONGODB_URI, {
  useNewUrlParser: true,
  useUnifiedTopology: true,
})
.then(() => console.log('MongoDB connected to Sharoztiuning'))
.catch(err => console.error('MongoDB connection error:', err));

// تعریف مدل داده
const DataSchema = new mongoose.Schema({
  title: String,
  img: String,
  date: String,
  url: String,
  description: String,
});

const DataModel = mongoose.model('Data', DataSchema);

// API برای دریافت داده‌ها
app.get('/api/data', async (req, res) => {
  try {
    const data = await DataModel.find();
    res.status(200).json(data);
  } catch (error) {
    res.status(500).json({ error: 'Error fetching data' });
  }
});

// شروع سرور
app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
