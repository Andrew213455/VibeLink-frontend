
import { AlbumResponse } from "./Album";
import ArtistsResponse from "./Artist";




import PlayList from "./PlayList";
import { TrackResponse } from "./Track";




export default interface Everything {
    artist: ArtistsResponse,
    tracks: TrackResponse,
    playlists: PlayList,
    albums: AlbumResponse

}