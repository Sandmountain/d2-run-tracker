import React, { useContext, useState } from "react";
import { fetchUserHolyGrail, updateUserholyGrail } from "../Firebase/firebase";
import { useAuth } from "./AuthContext";

const HolyGrailContext = React.createContext();

export function useHolyGrail() {
  return useContext(HolyGrailContext);
}

export function HolyGrailProvider({ children }) {
  const [holyGrail, setHolyGrail] = useState({});
  const { loggedIn } = useAuth();

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

  const addToHolyGrail = (items, itemsStatuses) => {
    setHolyGrail((prev) => {
      let newHolyGrail = { ...prev };
      // Go through all the keys in the holy grail
      Object.keys(prev).forEach((key) => {
        // For each key, see if the items are part of them
        const itemsInCategory = items.filter((item) => item.category === key);

        // If there was any items for this key to add
        if (itemsInCategory.length > 0) {
          // go through all the items that are in this category
          itemsInCategory.forEach((itemInCategory, index) => {
            // Get status of the item, itemInCategory.
            const getStatus = itemsStatuses.filter((status) => itemInCategory.name === status.name)[0];

            if (getStatus.indicator === "upgrade") {
              let newValue = {};
              newValue = itemInCategory;
              newValue.counter = prev[key][index].counter + 1;
              newHolyGrail[key][index] = newValue;
            } else if (getStatus.indicator === "downgrade") {
              newHolyGrail[key][index].counter = newHolyGrail[key][index].counter + 1;
            } else if (getStatus.indicator === "new") {
              let newValue = {};
              newValue = itemInCategory;
              newValue.counter = 1;
              newHolyGrail[key].push(newValue);
            }
          });
        }
      });
      return newHolyGrail;
    });
    updateUserholyGrail(holyGrail);
  };

  return <HolyGrailContext.Provider value={{ holyGrail, addToHolyGrail }}>{children}</HolyGrailContext.Provider>;
}
