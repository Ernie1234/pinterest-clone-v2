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
