const express = require('express');
const app = express();
const mongoose = require('mongoose');
const cors = require('cors');
const adminRoutes = require('./routes/admin');
const userRoutes = require('./routes/user');
const path = require('path');

app.use(express.json());
app.use(cors({
  origin: 'https://admindashboard-7bg4.onrender.com/'
}));

// Connect to MongoDB
mongoose.connect('mongodb+srv://tangududwarika18:lKP93a6ltCvGgrnh@cluster0.moern1l.mongodb.net/courses', { useNewUrlParser: true, useUnifiedTopology: true, dbName: "courses" });

const _dirname = path.resolve();

app.use("/admin", adminRoutes);
app.use("/users", userRoutes);

app.use(express.static(path.join(_dirname, "/frontend/dist")));
app.get('*', (_, res) => {
  res.sendFile(path.resolve(_dirname, "frontend", "dist", "index.html"));
})

const PORT = process.env.PORT || 3000;
app.listen(PORT, () => {
  console.log(`Server is listening on port ${PORT}`);
});
