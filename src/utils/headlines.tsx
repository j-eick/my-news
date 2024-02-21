type HeadlinesArrayProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
};

export const headlinesArray: HeadlinesArrayProps[] = [
  {
    country: "germany",
    handle: "de",
    url: "https://newsapi.org/v2/top-headlines?country=de&apiKey=",
    active: true,
  },
  {
    country: "usa",
    handle: "us",
    url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=",
    active: true,
  },
  // {
  //   country: "china",
  //   handle: "cn",
  //   url: "https://newsapi.org/v2/top-headlines?country=cn&apiKey=",
  //   active: true,
  // },
  // {
  //   country: "france",
  //   handle: "fr",
  //   url: "https://newsapi.org/v2/top-headlines?country=fr&apiKey=",
  //   active: false,
  // },
  // {
  //   country: "russia",
  //   handle: "ru",
  //   url: "https://newsapi.org/v2/top-headlines?country=ru&apiKey=",
  //   active: false,
  // },
  // {
  //   country: "ukraine",
  //   handle: "ua",
  //   url: "https://newsapi.org/v2/top-headlines?country=ua&apiKey=",
  //   active: false,
  // },
];
