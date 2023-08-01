interface Images {
  url: string;
}

interface Item {
  id: string;
  name: string;
  type: string;
  images: Images[];
}

export default interface ArtistsResponse {
  items: Item[];
}


