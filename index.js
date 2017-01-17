let express = require('express');
let app = express();
let indexRouter = require('./routes/index');
let userRouter = require('./routes/users');

app.use('/',indexRouter);
app.use('/users',userRouter);

app.listen(3000);