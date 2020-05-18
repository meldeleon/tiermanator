export const viewers = [
  {
    login: "matthewormatt",
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/f03d0e6b-de8e-4116-bfcf-849f41546150-profile_image-300x300.png",
    //static value of "c"
    tier: "c",
  },
  {
    login: "insensitivelees",
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/b925410e-ae3b-44f5-8560-44a2b19c0e0d-profile_image-300x300.png",
    tier: "b",
  },
  {
    login: "nobo0dy_ ",
    profile_image_url:
      "https://static-cdn.jtvnw.net/jtv_user_pictures/013ad0fe-ba9e-4b29-9a9d-9d23989cfccc-profile_image-300x300.png",
    tier: "b",
  },
];

//get list of tiers
const tiers = viewers.map((item) => {
  return item.tier;
});

//remove duplicates
export const uniqueTiers = Array.from(new Set(tiers));

//export constants for use in app

