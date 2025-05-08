import express from 'express';
import configRouter from './routes/config';
import authRouter from './routes/auth';
import legalRouter from './routes/legal';
import timeRouter from './routes/time';
import worldsRouter from './routes/worlds';
import cdnRouter from './routes/cdn';
const app = express();

app.use("/api/1/config", configRouter)
app.use('/api/1/auth', authRouter)
app.use('/legal', legalRouter)
app.use('/api/1/time', timeRouter)
app.use('/api/1/worlds', worldsRouter)
app.use('/api/1/file', cdnRouter)

app.get('/', (req, res) => {
    res.send('hi there')
})


// If I somehow miss a URL, this is here :)
app.use("/", (req, res, next) => {
    console.log(`[!] Invalid URL @ ${req.url}`)
    res.status(404);
    res.json({
        "error": "The endpoint you're looking for is not implemented by our system.",
        "status_code": 404
    })
})

app.listen(3000, () => {
    console.log(`API @ 3000`)
})