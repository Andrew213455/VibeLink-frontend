interface Images {
  url: string;
  height: number;
  width: number;
}

interface Followers {
  href: string;
  total: number;
}

export default interface SpotifyUser {
  display_name: string;
  id: string;
  images: Images;
  // uri: string;
  followers: Followers;
}
