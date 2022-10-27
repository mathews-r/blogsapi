const express = require('express');
const errorMiddleware = require('./middlewares/errorMiddleware');
const authRouter = require('./routers/auth.router');
const categoryRouter = require('./routers/categories.router');
const postRouter = require('./routers/post.router');
const userRouter = require('./routers/user.router');

const app = express();

app.use(express.json());

app.use('/login', authRouter);

app.use('/user', userRouter);

app.use('/categories', categoryRouter);

app.use('/post', postRouter);

app.use(errorMiddleware);

// É importante exportar a constante `app`,
// para que possa ser utilizada pelo arquivo `src/server.js`
module.exports = app;
