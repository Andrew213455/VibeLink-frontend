import AlbumResponse from "./Album";
import ArtistsResponse from "./Artist";
import { PlayListResponse } from "./PlayList";

import { TrackResponse } from "./Track";

export default interface Everything {
  artists: ArtistsResponse;
  tracks: TrackResponse;
  playlists: PlayListResponse;
  albums: AlbumResponse;
}
