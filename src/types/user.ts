import { supabase } from "../utils/database";
import { Password } from "../utils/hash";

export class User {
  acceptedTOSVersion: number = 0;
  acceptedPrivacyVersion: number = 0;
  accountDeletionDate: string | null = null;
  accountDeletionLog: any = null;
  activeFriends: string[] = [];
  allowAvatarCopying: boolean = false;
  bio: string = '';
  bioLinks: string[] = [];
  currentAvatar: string = '';
  currentAvatarAssetUrl: string = '';
  currentAvatarImageUrl: string = '';
  currentAvatarThumbnailImageUrl: string = '';
  date_joined: string | null = null;
  developerType: DeveloperType = DeveloperType.None;
  displayName: string = '';
  emailVerified: boolean = true;
  fallbackAvatar: string = '';
  friendKey: string = '';
  friends: string[] = [];
  hasBirthday: boolean = true;
  hasEmail: boolean = true;
  hasLoggedInFromClient: boolean = false;
  hasPendingEmail: boolean = false;
  homeLocation: string = '';
  id!: string;
  isFriend: boolean = false;
  last_activity: string | null = null;
  last_login: string | null = null;
  last_platform: string | null = null;
  obfuscatedEmail: string = '*****@vrchat.com';
  obfuscatedPendingEmail: string = '';
  oculusId: string = '';
  offlineFriends: string[] = [];
  onlineFriends: string[] = [];
  pastDisplayNames: any = null;
  presence: any;
  profilePicOverride: string = '';
  state: string = 'online';
  status: UserStatus = UserStatus.Offline;
  statusDescription: string = '';
  statusFirstTime: boolean = false;
  statusHistory: string[] = [];
  steamDetails: any = null;
  steamId: string = '';
  tags: string[] = [];
  twoFactorAuthEnabled: boolean = false;
  twoFactorAuthEnabledDate: string | null = null;
  unsubscribe: boolean = false;
  updated_at: string | null = null;
  userIcon: string = '';
  username: string = '';

  constructor(init?: Partial<User>) {
    Object.assign(this, init);
  }
}

export enum DeveloperType {
  None = "none",
  Trusted = "trusted",
  Internal = "internal",
  Moderator = "moderator"
}

export enum UserStatus {
  Active = "Active",
  JoinMe = "Join Me",
  Busy = "Busy",
  Offline = "Offline"
}

export async function getLoginID(username: string, password: string) {

  const hashedUsername = await Password.hash(username);
  const hashedPass = await Password.hash(password);

  const {data, error} = await supabase.from("logins").select("*").eq('hashedPass', hashedPass).eq('hashedUsername', hashedUsername).single();
  if(data) {
    return data["id"];
  } else {
    //console.log(error)
    return null;
  }
}

export async function getUserFromId(id: string) : Promise<User | null> {
  const {data, error} = await supabase.from("users").select("*").eq("id", id).single();
  if(data) {
    return data as User;
  } else {
    //console.log(error);
    return null;
  }
}