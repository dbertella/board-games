export type BggGame = {
  image: string;
  name: { text: string };
  numplays: number;
  originalname: string;
  status: string;
  thumbnail: string;
  yearpublished: number;
  attr: Record<string, string>;
  stats: {
    attr: {
      minplayers: string;
      maxplayers: string;
      minplaytime: string;
      maxplaytime: string;
      playingtime: string;
      numowned: string;
    };
    rating: {
      attr: {
        value: string;
      };
      usersrated: {
        attr: {
          value: string;
        };
      };
      average: {
        attr: {
          value: string;
        };
      };
    };
  };
};
