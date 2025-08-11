const express = require("express");
const cors = require("cors");
const connectDB = require("./config/db");
const authRoute = require("./routes/authRoute");
const facultyRoute = require("./routes/facultyRoute");
const fetchRoute = require("./routes/fetchRoute");
const adminRoute=require("./routes/adminRoute");
const announceRoute= require('./routes/announceRoute');
const userRoute=require('./routes/userRoute');
const listRoute=require('./routes/listRoute');
const eventlistRoute=require('./routes/eventlistRoute');
const applyRoute=require('./routes/applyRoute');
const applicationRoute=require('./routes/applicationRoute');
const feedbackRoute=require('./routes/feedbackRoute');
const adminfeedRoute=require('./routes/adminfeedRoute');
const certifyRoute=require('./routes/certifyRoute');
const facultyviewRoute=require('./routes/facultyviewRoute');
const studentannRoute=require('./routes/studentannRoute');
const certicateverifyRoute=require('./routes/certicateverifyRoute');
const certifyeventRoute=require('./routes/certifyeventRoute');
const cstoreRoute=require('./routes/cstoreRoute');
const certifyapproveRoute=require('./routes/certifyapproveRoute');
const makecertifyRoute=require('./routes/makecertifyRoute');
const app = express();
connectDB();

app.use(cors());
app.use(express.json());

app.use("/authRoute", authRoute);
app.use("/faculty", facultyRoute);
app.use("/fetchevent", fetchRoute);  // ✅ This will prefix "/fetchevent"
app.use("/afetch",adminRoute);
app.use("/announce",announceRoute);
app.use("/uroute",userRoute);
app.use("/list",listRoute);
app.use("/eve",eventlistRoute);
app.use("/apply",applyRoute);
app.use("/eventfetch",applicationRoute);
app.use("/feed",feedbackRoute);
app.use("/afeed",adminfeedRoute);
app.use("/certify",certifyRoute);
app.use("/facultyview",facultyviewRoute);
app.use("/studentview",studentannRoute);
app.use("/verify",certicateverifyRoute);
app.use("/event",certifyeventRoute);
app.use("/upload",cstoreRoute);
app.use("/certifyfetch",certifyapproveRoute);
app.use("/fetchcertify",makecertifyRoute);

app.listen(3001, () => {
  console.log("✅ Server running on port 3001");
});
