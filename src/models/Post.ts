import { PlayListResponse } from "./PlayList";
import { UserProfile } from "./SpotifyUser";
import { TrackResponse } from "./Track";

export default interface Post {
  _id?: string;
  from: UserProfile;
  content: string;
  playlist?: PlayListResponse;
  track?: TrackResponse;
  profileImage?: string;
}
