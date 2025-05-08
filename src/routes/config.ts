import fs from 'fs';
import path from 'path';
import express from 'express';

const configRouter = express.Router();
const configPath = path.join(process.cwd(), "config.json");

configRouter.get('/', (req, res) => {
    const file = fs.readFileSync(configPath, 'utf-8');
    res.json(JSON.parse(file));
})

export default configRouter;