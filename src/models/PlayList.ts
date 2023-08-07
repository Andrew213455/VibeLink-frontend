interface Images {
  url: string;
}

interface Item {
  id: string;
  name: string;
  type: string;
  images: Images[];
}

export interface PlayListResponse {
  items: Item[];
}
