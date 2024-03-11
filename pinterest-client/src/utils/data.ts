import { TPin, TPost } from "../types/types";

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

export const feedQuery = `*[_type == 'pin'] | order(_createdAt desc, _updatedAt asc) {
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
     username,
      avatar
    },
   save[]{
      postedBy->{
        _id,
       username,
      avatar
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
      avatar
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
     username,
      avatar
    },
    save[]{
      _key,
      postedBy->{
        _id,
       username,
      avatar
      },
    },
  }`;
  return query;
};

export const userCreatedPinsQuery = (userId: string) => {
  const query = `*[ _type == 'pin' && userId == '${userId}'] | order(_createdAt desc){
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
     username,
      avatar
    },
    save[]{
      postedBy->{
        _id,
        username,
      avatar
      },
    },
  }`;
  return query;
};

export const userSavedPinsQuery = (userId: string) => {
  const query = `*[_type == 'pin' && '${userId}' in save[].userId ] | order(_createdAt desc) {
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
     username,
      avatar
    },
    save[]{
      postedBy->{
        _id,
        username,
      avatar
      },
    },
  }`;
  return query;
};
export const userQuery = (userId: string) => {
  const query = `*[_type == 'user' && _id == '${userId}']`;
  return query;
};

export const postQuery = `*[_type == 'post'] | order(_createdAt desc, _updatedAt asc) {
    video{
      asset -> {
        url
      }
    },
    _id,
    title,
    about,
    category,
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
export const postDetailsQuery = (videoId: string | undefined) => {
  const query = `*[_type == "post" && _id == '${videoId}']{
    video{
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
     username,
      avatar
    },
   save[]{
      postedBy->{
        _id,
       username,
      avatar
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
      avatar
      },
    }
  }`;
  return query;
};
export const postDetailMorePinQuery = (pin: TPost) => {
  const query = `*[_type == "post" && category == '${pin.category}' && _id != '${pin._id}' ]{
    video{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
     username,
      avatar
    },
    save[]{
      _key,
      postedBy->{
        _id,
       username,
      avatar
      },
    },
  }`;
  return query;
};

export const ideaQuery = `*[_type == 'idea'] | order(_createdAt desc, _updatedAt asc) {
    image{
      asset -> {
        url
      }
    },
    _id,
    title,
    about,
    category,
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

export const ideaDetailsQuery = (ideaId: string | undefined) => {
  const query = `*[_type == "idea" && _id == '${ideaId}']{
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
     username,
      avatar
    },
   save[]{
      postedBy->{
        _id,
       username,
      avatar
      },
    },
    comments[]{
      comment,
      _key,
      postedBy->{
        _id,
        username,
      avatar
      },
    }
  }`;
  return query;
};
export const ideaDetailMorePinQuery = (idea: TPost) => {
  const query = `*[_type == "idea" && category == '${idea.category}' && _id != '${idea._id}' ]{
    image{
      asset->{
        url
      }
    },
    _id,
    destination,
    postedBy->{
      _id,
     username,
      avatar
    },
    save[]{
      _key,
      postedBy->{
        _id,
       username,
      avatar
      },
    },
  }`;
  return query;
};
