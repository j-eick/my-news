// import { useEffect, useState } from "react";

// type UseActiveHLProps = {
//   country: string;
//   handle: string;
//   url: string;
//   active: boolean;
// };

// export default function useActiveHL(listOfAllHL: UseActiveHLProps[]) {
//   const [activeHL, setActiveHL] = useState<UseActiveHLProps[]>([]);

//   useEffect(() => {
//     setActiveHL(listOfAllHL.filter((headline) => headline.active === true));

//     console.log(listOfAllHL);
//   }, [listOfAllHL]);

//   return [activeHL];
// }
