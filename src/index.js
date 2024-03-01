const express = require("express");
const morgan = require('morgan');
const helmet = require('helmet')
const connect = require("./config/db");
const dotenv = require('dotenv')
const userRoute = require("./routes/user.routes");
const authRoute = require("./routes/auth.routes");
const postRoute = require("./routes/post.routes");
const commentRoute = require("./routes/comment.routes");


dotenv.config()
const app = express();
app.use(express.json());
app.use(helmet())
app.use(morgan('common'))

//All routes

app.use('/api/users',userRoute)
app.use('/api/auth',authRoute)
app.use('/api/posts',postRoute)
app.use('/api/comments',commentRoute)



app.listen(process.env.PORT, () => {
   connect();
  console.log(`listening at ${process.env.PORT}`);
});
