interface Images {
    url: string;
  }

  interface Album {
    image: Images[]
  }
  
 interface Item {
    id: string;
    name: string;
    album: Album
  }
  
  export interface TrackResponse {
    items: Item[];
  }
  

  