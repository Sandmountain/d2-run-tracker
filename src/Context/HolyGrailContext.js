import React, { useContext, useState } from "react";
import { fetchUserHolyGrail } from "../Firebase/firebase";

const HolyGrailContext = React.createContext();

export function useHolyGrail() {
  return useContext(HolyGrailContext);
}

export function HolyGrailProvider({ loggedIn, children }) {
  const [holyGrail, setHolyGrail] = useState({});
  React.useEffect(() => {
    async function fetchHolyGrail() {
      const data = await fetchUserHolyGrail();
      setHolyGrail(data);
    }

    if (Object.keys(holyGrail).length === 0 && loggedIn) {
      fetchHolyGrail();
    }
    return () => fetchUserHolyGrail();
  }, [holyGrail, loggedIn]);

  const updateHolyGrail = (item) => {
    // compare to the items in the holy grail
    // Come up with a solution if there is a conflict. Maybe use a modal here comparing the 2 items,
    // or have another value that is being updated to display a component down the tree. Like another hook,
    // that gets changed to true (or the items), to display a conflict modal.
    setHolyGrail(item);
  };

  // Probably use useEffect to fetch the holy grail on start

  return <HolyGrailContext.Provider value={{ holyGrail, updateHolyGrail }}>{children}</HolyGrailContext.Provider>;
}
