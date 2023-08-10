interface Images {
  url: string;
}

interface Item {
  id: string;
  name: string;
  images: Images[];
  release_date?: string;
}

interface Album {
  items: Item[];
}

export default interface NewReleaseResponse {
  albums: Album;
}
