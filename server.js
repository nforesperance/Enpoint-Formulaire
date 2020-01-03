const express = require('express');
const sequelize = require('./config')
const Dev = require('./config').Dev;



const app = express();
// Bodyparser Middleware
app.use(express.json());


// Database
// Test DB
sequelize.authenticate()
  .then(() => console.log('Database connected...'))
  .catch(err => console.log('Error: ' + err))

// routes
app.use('/api/controle', require('./routes'));



const PORT = process.env.PORT || 5000;

app.listen(PORT, console.log(`Server started on port ${PORT}`));  