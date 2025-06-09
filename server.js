const express = require('express');
const mongoose = require('mongoose');
const dotenv = require('dotenv');
const cors = require('cors');

dotenv.config();
const app = express();

app.use(cors());
app.use(express.json());

// Rutas
app.use('/api/user', require('./routes/userRoutes'));
app.use('/api/product', require('./routes/productRoutes'));
app.use('/api/order', require('./routes/orderRoutes'));

// Conexión Mongo + levantar servidor
mongoose.connect(process.env.MONGO_URI)
  .then(() => {
    app.listen(process.env.PORT, () =>
      console.log(`Servidor corriendo en puerto ${process.env.PORT}`)
    );
  })
  .catch(err => console.error('Error conectando a MongoDB', err));