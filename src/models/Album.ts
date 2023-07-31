interface Images {
    url: string;
  }
  
interface Item {
    id: string;
    name: string;
    images: Images[];
  }
  
  export interface AlbumResponse {
    items: Item[];
  }
  
  