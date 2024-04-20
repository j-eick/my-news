type UncuratedHLArrayProps = {
  country: string;
  handle: string;
  url: string;
  active: boolean;
};

/**
 *
 * @param allHeadlines
 * @returns true  if
 *                1) arrays have different lengths
 *                2) userArray !== localStorageArray
 */
export default function updateDisplayedHLs( allHeadlines: UncuratedHLArrayProps[] ) {
  let needToUpdate: boolean = false;

  //---get userArray
  const userHLs = allHeadlines
    .filter((hl) => hl.active)
    .map((country) => country.handle);
  // CONSOLE: console.log("userArray: " + userHLs);

  //---get localStorageArray
  let localSArray: string[] = [];
  const dataFromLS = localStorage.getItem("localData");
  if (dataFromLS !== null) {
    //---get country handles from localStorage
    const data = JSON.parse(dataFromLS);
    localSArray = data.map((item) => item[0].handle);
    console.log(
      "userArray: " + userHLs + "\n" +
      "localStorageArray: " + localSArray
    );
  }

  //---checks country handles
  //---adds "true/false" to array for every checked handle
  const truthyArray: boolean[] = [];
  for (let i = 0; i < userHLs.length; i++) {
    const interim = userHLs[i];
    const check: boolean = localSArray.includes(interim);
    truthyArray.push(check);
  }
  // CONSOLE: console.log(truthyArray);
  // CONSOLE: console.log(truthyArray.includes(false));

  //---userArray !== localStorageArray
  if (truthyArray.includes(false) || userHLs.length !== localSArray.length) {
    needToUpdate = true;
    return needToUpdate;
  } else {
    needToUpdate = false;
    return needToUpdate;
  }
}
