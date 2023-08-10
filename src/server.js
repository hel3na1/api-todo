const express = require('express');
const sequelize = require('./config/database');
const todoRoutes = require('./routes/todoRoutes');

const cors = require('cors');

const app = express();
const PORT = process.env.PORT || 5000; // Use a porta definida pelo ambiente ou 5000

app.use(cors());
app.use(express.json());

app.use('/api/todos', todoRoutes);

sequelize
  .sync()
  .then(() => {
    console.log('Connected to PostgreSQL');
    app.listen(PORT, () => {
      console.log(`Server is running on port ${PORT}`);
    });
  })
  .catch((err) => {
    console.error('Error connecting to PostgreSQL:', err);
  });