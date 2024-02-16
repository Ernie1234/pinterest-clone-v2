import { TPin } from "../types/types";

export const footers = [
  "Terms of Service",
  "Privacy Policy",
  "Help",
  "Iphone App",
  "Android App",
  "User",
  "Collection",
  "Shopping",
  "Today",
  "Explore",
  "Watch",
  "Shop",
];

// groq

//todo  use this query template to search for both images and videos later
// const query = `*[_type == "pin" && title match '${searchTerm}*'  || _type == "video" && name match '${searchTerm}*']`;
export const searchQuery = (searchTerm: string) => {
  const query = `*[_type == 'pin' && title match '${searchTerm}*' || category match '${searchTerm}*' || about match '${searchTerm}*']{
    image{
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      username,
      avatar
    },
    save[] {
      _key,
       postedBy -> {
      _id,
      username,
      avatar
    },
    }
  }`;
  return query;
};

export const feedQuery = `*[_type == 'pin'] | order(_createAt desc) {
    image{
      asset -> {
        url
      }
    },
    _id,
    destination,
    postedBy -> {
      _id,
      username,
      avatar
    },
    save[] {
      _key,
       postedBy -> {
      _id,
      username,
      avatar
    },
    }
}`;

export const pinDetailQuery = (pinId: string | undefined) => {
  const query = `*[_type == "pin" && _id == '${pinId}']{
    image{
      asset->{
        url
      }
    },
    _id,
    title, 
    about,
    category,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
   save[]{
      postedBy->{
        _id,
        userName,
        image
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    }
  }`;
  return query;
};

export const pinDetailMorePinQuery = (pin: TPin) => {
  const query = `*[_type == "pin" && category == '${pin.category}' && _id != '${pin._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
      userName,
      image
    },
    save[]{
      _key,
      postedBy->{
        _id,
        userName,
        image
      },
    },
  }`;
  return query;
};
