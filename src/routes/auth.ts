import express from 'express';
import { getLoginID, getUserFromId } from '../types/user';
import { generateToken } from '../utils/id';
import cookieParser from 'cookie-parser';
const authRouter = express.Router();
authRouter.use(cookieParser());

export const allLogins = new Map<string, string>();

authRouter.get('/user', async (req, res) => {
    let auth = req.headers.authorization;
    let token: string | undefined = req.cookies["auth"];
    if(!(typeof auth === "string")) {
        if (token) {
            let baseToken = token.replace("authcookie_", "");
            let id = allLogins.get(baseToken) || "";
    
            res.json(await getUserFromId(id));
        } else {
            res.status(500).send("invalid auth")
        }
    } else if (auth) {
        auth = auth.slice(6);
        let login = decodeURIComponent(Buffer.from(auth, "base64").toString()).split(":");
        let id = await getLoginID(login[0], login[1])
        if(id == null) {
            res.status(401).json({error: {message: "Unable to get user, try again with a different username or password.", status_code: 401}})
        }

        let token = generateToken();

        allLogins.set(token, id)

        res.cookie("auth", `authcookie_${token}`)
        res.cookie("Expires", "Tue, 01 Jan 2030 00:00:00 GMT")

        let outh = await getUserFromId(id);
        if(outh == null) {
            res.status(401).json({error: {message: "Unable to get user, try again with a different username or password.", status_code: 401}})
        }

        res.json(outh);
    } else {
        res.status(500).send("invalid auth")
    }
})

authRouter.post('/steam', async (req, res) => {
    res.status(401).json({"error": "Steam Service Unavaliable", "status_code": 401})
})

authRouter.get('/', (req, res) => {
    let token: string = req.cookies["auth"] || "";
    token = token.replace("authcookie_", "");
    let exists = allLogins.has(token);
    
    res.json({
        ok: exists,
        token: `authcookie_${token}`
    })
})

authRouter.get('/user/moderations', (req, res) => {
    res.json([{}]);
})

authRouter.get('/user/playermoderations', (req, res) => {
    res.json([{}]);
})

authRouter.get('/user/playermoderated', (req, res) => {
    res.json([{}]);
})

export default authRouter;