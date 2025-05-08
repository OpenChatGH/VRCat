import fs from 'fs';
import path from 'path';
import express from 'express';

const legalRouter = express.Router();
const legalPath = path.join(process.cwd(), "rules.txt");

legalRouter.get('/', (req, res) => {
    const file = fs.readFileSync(legalPath, 'utf-8');
    res.send(file)
})

export default legalRouter;