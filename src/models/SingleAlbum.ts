interface Images {
  url: string;
}

export default interface SingleAlbum {
  id: string;
  name: string;
  images: Images[];
}
