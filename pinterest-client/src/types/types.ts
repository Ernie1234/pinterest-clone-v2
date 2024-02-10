export type TUser = {
  _id: string | (string[] & string);
  _type: string;
  name: string;
  picture: string;
  email: string;
  aud: string;
  email_verified: boolean;
};

export type TPostedBy = {
  _id: string;
  username: string;
  avatar: string;
};
export type TSave = {
  _key: string;
  postedBy: TPostedBy;
};

export type TImage = {
  url: string;
};

export type TPin = {
  _id: string;
  destination?: string;
  image: {
    asset: {
      url: string;
    };
  };
  save?: TSave[];
  postedBy: {
    _id: string;
    username: string;
    avatar: string;
  };
};
