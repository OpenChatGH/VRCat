import { supabase } from "../utils/database";

export class World {
  id: string = '';
  name: string = '';
  description: string = '';
  authorId: string = '';
  authorName: string = '';
  capacity: number = 0;
  recommendedCapacity: number = 0;
  tags: string[] = [];
  releaseStatus: string = '';
  imageUrl: string = '';
  thumbnailImageUrl: string = '';
  assetUrl: string = '';
  assetUrlObject: any = {};
  pluginUrl: string = '';
  pluginUrlObject: any = {};
  unityPackageUrl: string = '';
  unityPackageUrlObject: any = {};
  unityPackages: UnityPackage[] = [];
  version: number = 0;
  favorites: number = 0;
  created_at: string = '';
  updated_at: string = '';
  publicationDate: string = '';
  labsPublicationDate: string = '';
  visits: number = 0;
  popularity: number = 0;
  heat: number = 0;
  publicOccupants: number = 0;
  privateOccupants: number = 0;
  occupants: number = 0;
  instances: any[] = [];
  featured: boolean = false;
  organization: string = '';
  previewYoutubeId: string | null = null;
  $isLabs: boolean = false;
  defaultContentSettings: any = {};
  udonProducts: any[] = [];
  urlList: any[] = [];

  constructor(init?: Partial<World>) {
    Object.assign(this, init);
  }
}

export interface UnityPackage {
  assetUrl: string;
  assetVersion: number;
  created_at: string;
  id: string;
  platform: string;
  pluginUrl: string;
  pluginUrlObject?: any;
  unitySortNumber: number;
  unityVersion: string;
  assetUrlObject?: any;
}

export async function getWorldByID(id: string) : Promise<World | null> {
    const {data, error} = await supabase.from("worlds").select('*').eq("id", id).single();
    if(data) {
        return data as World
    } else {
        //console.log(error)
        return null;
    }
}