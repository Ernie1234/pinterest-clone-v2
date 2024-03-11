export type TUser = {
  _id: string | (string[] & string);
  _type: string;
  name: string;
  picture: string;
  email: string;
  sub: string;
  email_verified: boolean;
};
export type TSanityUser = {
  _id: string | (string[] & string);
  _type: string;
  username: string;
  avatar: string;
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

export type TComment = {
  _key: string;
  comment: string;
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
  category: string;
};

export interface TPinDetail extends TPin {
  comments: TComment[] | [];
  about: string;
  title: string;
}

export type TPost = {
  title: string;
  _id: string;
  destination?: string;
  video: {
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
  category: string;
  about: string;
};
