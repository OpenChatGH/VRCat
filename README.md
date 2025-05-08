# VRCat
TypeScript VRChat API Server https://discord.gg/wztsKy9y9U
> [!WARNING]  
> **THIS IS NOT COMPLETE AND HAS ISSUES.**

> [!NOTE]  
> Requires VRChat 2020 w/ Patched VRCCore.

## Features
- Game Config
- Authentication via Supabase
- User Data
- World Data

## Planned Features
- Avatar Data
- WebSocket Notifications
- Friend Presence
- World Instance Handler
- Avatar Sync

## Running
While I don't *recommend* you run the VRCat API by itself, you can.

1. Change the Database Enviroment (Supabase)
Make sure you set `createClient()` in `utils/database.ts`.
```ts
export const supabase = createClient() // put stuff in here :)
```

2. Migrate the Database
I don't have any migration loool, just have it use VRCAPI's format for worlds, users, etc.

3. Run the Server
You can run the following to start the test server:
```
npm run dev
```
