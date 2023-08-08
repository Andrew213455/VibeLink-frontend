interface Images {
  url: string;
}

interface Item {
  id: string;
  name: string;
  images: Images[];
}

export default interface AlbumResponse {
  items: Item[];
}
