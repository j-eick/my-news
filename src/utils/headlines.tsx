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
    url: "https://newsapi.org/v2/top-headlines?country=de&apiKey=",
    active: true,
  },
  {
    country: "USA",
    handle: "us",
    url: "https://newsapi.org/v2/top-headlines?country=us&apiKey=",
    active: true,
  },
  {
    country: "China",
    handle: "cn",
    url: "https://newsapi.org/v2/top-headlines?country=cn&apiKey=",
    active: false,
  },
  {
    country: "France",
    handle: "fr",
    url: "https://newsapi.org/v2/top-headlines?country=fr&apiKey=",
    active: false,
  },
  {
    country: "Russia",
    handle: "ru",
    url: "https://newsapi.org/v2/top-headlines?country=ru&apiKey=",
    active: false,
  },
  {
    country: "Ukraine",
    handle: "ua",
    url: "https://newsapi.org/v2/top-headlines?country=ua&apiKey=",
    active: false,
  },
];
