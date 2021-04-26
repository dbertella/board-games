interface Name {
  type: string;
  sortindex: string;
  value: string;
}

interface Yearpublished {
  value: string;
}

interface Minplayers {
  value: string;
}

interface Maxplayers {
  value: string;
}

interface Poll {
  name: string;
  title: string;
  totalvotes: string;
  results: any;
}

interface Playingtime {
  value: string;
}

interface Minplaytime {
  value: string;
}

interface Maxplaytime {
  value: string;
}

interface Minage {
  value: string;
}

interface Link {
  type: string;
  id: string;
  value: string;
}

interface Usersrated {
  value: string;
}

interface Average {
  value: string;
}

interface Bayesaverage {
  value: string;
}

interface Rank {
  type: string;
  id: string;
  name: string;
  friendlyname: string;
  value: string;
  bayesaverage: string;
}

interface Ranks {
  rank: Rank[];
}

interface Stddev {
  value: string;
}

interface Median {
  value: string;
}

interface Owned {
  value: string;
}

interface Trading {
  value: string;
}

interface Wanting {
  value: string;
}

interface Wishing {
  value: string;
}

interface Numcomments {
  value: string;
}

interface Numweights {
  value: string;
}

interface Averageweight {
  value: string;
}

interface Ratings {
  usersrated: Usersrated;
  average: Average;
  bayesaverage: Bayesaverage;
  ranks: Ranks;
  stddev: Stddev;
  median: Median;
  owned: Owned;
  trading: Trading;
  wanting: Wanting;
  wishing: Wishing;
  numcomments: Numcomments;
  numweights: Numweights;
  averageweight: Averageweight;
}

interface Statistics {
  page: string;
  ratings: Ratings;
}

export interface BggGameSingle {
  type: string;
  id: string;
  thumbnail: string;
  image: string;
  name: Name[];
  description: string;
  yearpublished: Yearpublished;
  minplayers: Minplayers;
  maxplayers: Maxplayers;
  poll: Poll[];
  playingtime: Playingtime;
  minplaytime: Minplaytime;
  maxplaytime: Maxplaytime;
  minage: Minage;
  link: Link[];
  statistics: Statistics;
}

type Stats = {
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
export type BggGame = {
  image: string;
  name: { text: string };
  numplays: number;
  originalname: string;
  status: string;
  thumbnail: string;
  yearpublished: number;
  attr: Record<string, string>;
  stats: Stats;
};
