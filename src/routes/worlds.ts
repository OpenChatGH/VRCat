import express from 'express';
import { getWorldByID } from '../types/worlds';

const worldsRouter = express.Router();

worldsRouter.use('/', (req, res, next) => {
    console.log(`[WORLD] URL @ ${req.url}`);
    next();
})

worldsRouter.get('/:wldId', async (req, res) => {
    let wldid = req.params.wldId;
    let world = await getWorldByID(wldid);
    if(world == null) {
        res.status(404).send({"error":{"message":`"World ${wldid} not found"`,"status_code":404}})
    } else {
        res.json(world)
    }
})

worldsRouter.get('/:wldId/metadata', (req, res) => {
    let wldid = req.params.wldId;

    res.json({"id":wldid,"metadata":{}})
})

export default worldsRouter;