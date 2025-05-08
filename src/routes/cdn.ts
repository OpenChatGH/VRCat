import express from 'express';
import path from 'path';

const worldsPath = path.join(process.cwd(), "assets", "worlds");
const avatarPath = path.join(process.cwd(), "assets", "worlds");

const cdnRouter = express.Router()

cdnRouter.get('/worlds/:wldId/file', (req, res) => {
    let wldid = req.params.wldId;
    res.download(path.join(worldsPath, wldid, "world.vrcw"))
})

cdnRouter.get('/worlds/:wldId/plugin', (req, res) => {
    let wldid = req.params.wldId;
    res.download(path.join(worldsPath, wldid, "plugin.dll"))
})

export default cdnRouter;