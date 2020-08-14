export const viewers = [
  {
    login: "anthonywritescode",
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/34369a28-5fda-41b2-b0aa-22f0b77a7baa-profile_image-150x150.png",
    //static value of "c"
    tier: "c",
  },
  {
    login: "dota2attitude",
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/0a012bb9-2161-47fe-9a13-b9c465c12ab2-profile_image-150x150.png",
    tier: "b",
  },
  {
    login: "mewtru",
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/0804d2ae-7909-410f-8304-8a44c5d03850-profile_image-150x150.png",
    tier: "a",
  },
  {
    login: "vapejuicejordan",
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/52071e17-3edd-4927-bcd5-147a3a11d365-profile_image-150x150.png",
    tier: "trash",
  },
];

//get list of tiers
const tiers = viewers.map((item) => {
  return item.tier;
});

//remove duplicates
export const uniqueTiers = Array.from(new Set(tiers)).sort();

//export constants for use in app

export const boardState = {
  currentViewers: viewers,
  currentTiers: uniqueTiers,
};
