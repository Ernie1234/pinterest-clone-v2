export type TUser = {
  _id: string | (string[] & string);
  type: string;
  name: string;
  picture: string;
  email: string;
  aud: string;
  email_verified: boolean;
};
