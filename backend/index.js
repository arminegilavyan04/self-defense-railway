const express = require('express');
const path = require('path');
const db = require('./db'); 
const authRoutes = require('./routes/auth'); 
const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json()); 


app.use(express.static(path.join(__dirname, 'frontend')));


app.get('/', (req, res) => {
  res.sendFile(path.join(__dirname, 'frontend', 'index.html'));
});


app.use('/api', authRoutes);


app.listen(PORT, () => {
  console.log(`Server is running on http://localhost:${PORT}`);
});
