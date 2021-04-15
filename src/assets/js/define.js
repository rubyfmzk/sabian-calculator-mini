const define = {
  IMG_BASE_URL: 'https://s3-ap-northeast-1.amazonaws.com/sabian-symbols/',
  FULL_SIZE_IMG_BASE_URL: 'https://s3-ap-northeast-1.amazonaws.com/sabian-symbols/1080px/',
  PLANET_ICON_DIR: '/img/planet/',
  SIGN_LIST: [
    {key: "Aries"},
    {key: "Taurus"},
    {key: "Gemini"},
    {key: "Cancer"},
    {key: "Leo"},
    {key: "Virgo"},
    {key: "Libra"},
    {key: "Scorpio"},
    {key: "Sagittarius"},
    {key: "Capricorn"},
    {key: "Aquarius"},
    {key: "Pisces"},
  ],
  cookie:{
    orb_midpoint: 1.5,
    orb_harmonics: 5,
    true_mean_node: 0,
    true_mean_lilith: 0,
  },
  year_milisecond: 365.2425 * 24 * 60 * 60 * 1000,
}
module.exports = define