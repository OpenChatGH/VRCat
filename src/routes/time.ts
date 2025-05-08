import express from 'express'

const timeRouter = express.Router()

timeRouter.get('/', (req, res) => {
    const now = new Date();
    const isoString = now.toISOString().replace('.000Z', '+00:00');
    res.json(`${isoString}`)
})

export default timeRouter;