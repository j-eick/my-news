type HLArrayProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
};

export const headlinesArray: HLArrayProps[] = [
  {
    country: "Germany",
    handle: "de",
    active: true,
    url: "https://newsapi.org/v2/top-headlines?country=de&apiKey=",
  },
  {
    country: "USA",
    handle: "us",
    active: false,
    url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=",
  },
  {
    country: "China",
    handle: "cn",
    active: false,
    url: "https://newsapi.org/v2/top-headlines?country=cn&apiKey=",
  },
  {
    country: "France",
    handle: "fr",
    active: false,
    url: "https://newsapi.org/v2/top-headlines?country=fr&apiKey=",
  },
  {
    country: "Russia",
    handle: "ru",
    active: false,
    url: "https://newsapi.org/v2/top-headlines?country=ru&apiKey=",
  },
  {
    country: "Ukraine",
    handle: "ua",
    active: false,
    url: "https://newsapi.org/v2/top-headlines?country=ua&apiKey=",
  },
];
