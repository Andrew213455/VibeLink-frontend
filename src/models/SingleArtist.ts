interface Images {
  url: string;
}

export default interface SingleArtist {
  id: string;
  name: string;
  type: string;
  images: Images[];
}
