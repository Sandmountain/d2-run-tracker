// Import the functions you need from the SDKs you need
import { initializeApp } from "firebase/app";
import { getFirestore, arrayUnion, getDoc, doc, setDoc, updateDoc, arrayRemove } from "firebase/firestore";
//import { getAnalytics } from "firebase/analytics";
import { getAuth } from "firebase/auth";

// Your web app's Firebase configuration
// For Firebase JS SDK v7.20.0 and later, measurementId is optional

const firebaseConfig = {
  apiKey: "AIzaSyBcDKP-1pryjEQFgMSSbcZK6ZI3QsIezFk",
  authDomain: "d2-tracker.firebaseapp.com",
  projectId: "d2-tracker",
  storageBucket: "d2-tracker.appspot.com",
  messagingSenderId: "921822416104",
  appId: "1:921822416104:web:fc92a373b728c7706b4d5d",
};

const collectionStructure = {
  runData: {
    active: { gameData: {}, runData: [] },
    history: [],
  },
  holyGrail: {
    items: {
      Rings: [],
      Amulets: [],
      Charms: [],
      Jewels: [],
      Helms: [],
      "Class Specific Uniques": [],
      "Javelins & Throwing Weapons": [],
      Armor: [],
      Shields: [],
      Gloves: [],
      Boots: [],
      Belts: [],
      Axes: [],
      Bows: [],
      Crossbows: [],
      Daggers: [],
      "Maces and Mauls": [],
      Polearms: [],
      Scepters: [],
      Spears: [],
      Staves: [],
      Swords: [],
      Wands: [],
      "Starting Sets": [],
      "Sorceress Set": [],
      "Amazon Set": [],
      "Barbarian Set": [],
      "Necromancer Set": [],
      "Paladin Set": [],
      "Druid Set": [],
      Sets: [],
      "Assassin Set": [],
      Runes: [],
      Recipe: [],
    },
  },
};

// Initialize Firebase variables
const app = initializeApp(firebaseConfig);
let db;
let auth;

const initDatabase = async (user) => {
  try {
    auth = getAuth();
    db = getFirestore();

    const userRef = doc(db, "userData", user.uid);
    const userSnap = await getDoc(userRef);

    if (userSnap.exists()) {
      console.log("Document data:", userSnap.data());
      fetchHistory();
    } else {
      setDoc(userRef, collectionStructure)
        .then(() => {
          console.log("collection created");
        })
        .catch((err) => {
          console.log(err);
        });
    }
  } catch (error) {
    console.log("error when loading data", error);
  }
};

// const updateRunData = async (dataToUpdate) => {
//   const { uid } = auth.currentUser;
//   const dataRef = doc(db, "userData", uid);

//   await updateDoc(dataRef, {
//     "runData.active": dataToUpdate,
//   });
// };

const addItemToHolyGrail = async (item) => {
  if (!Object.keys(item).length) {
    console.log("nonno");
    return;
  }
  const { uid } = auth.currentUser;

  const dataRef = doc(db, "userData", uid);
  console.log(item);
  await updateDoc(dataRef, {
    [`holyGrail.items.${item.category}`]: arrayUnion(item),
  });
};

const getItemFromHolyGrail = async (item) => {
  if (item && !Object.keys(item).length) {
    console.log("nonno");
    return;
  }

  const querySnapshot = await constructUserQuery();
  console.log(item);
  if (item && querySnapshot && querySnapshot.exists()) {
    const categoryItems = querySnapshot.data().holyGrail.items;
    const exists = categoryItems[item.category].filter((it) => it.name === item.name);

    if (exists.length) {
      console.log(exists);
    }
  } else {
    return {};
  }

  // await getDoc(dataRef, {
  //   "holyGrail.items": {
  //     [item.category]: find(item),
  //   },
  // });
};

const addToHistory = async (dataToAdd) => {
  const { uid } = auth.currentUser;

  const dataRef = doc(db, "userData", uid);

  await updateDoc(dataRef, {
    "runData.history": arrayUnion(dataToAdd),
  });

  // When the run has been added to the history,
  // The run is over and we remove the data from active.
  await updateDoc(dataRef, {
    "runData.active": [],
  });
};

const deleteHistoryRun = async (itemToRemove) => {
  const { uid } = auth.currentUser;

  const dataRef = doc(db, "userData", uid);

  await updateDoc(dataRef, {
    "runData.history": arrayRemove(itemToRemove),
  });
};

const fetchHistory = async () => {
  const querySnapshot = await constructUserQuery();

  if (querySnapshot.exists()) {
    return querySnapshot.data().runData.history;
  } else {
    return [];
  }
};

const fetchActiveRun = async () => {
  const querySnapshot = await constructUserQuery();

  if (querySnapshot.exists()) {
    return querySnapshot.data().runData.active;
  } else {
    return {};
  }
};

const clearActiveRun = async () => {
  const { uid } = auth.currentUser;
  const dataRef = doc(db, "userData", uid);

  await updateDoc(dataRef, {
    "runData.active": [],
  });
};

const addToActiveRun = async (data) => {
  const { uid } = auth.currentUser;
  const dataRef = doc(db, "userData", uid);

  if (data.runData.length > 1) {
    await updateDoc(dataRef, {
      "runData.active.runData": data.runData,
    });
  } else {
    await updateDoc(dataRef, {
      "runData.active.gameData": data.gameData,
      "runData.active.runData": data.runData,
    });
  }
};

const constructUserQuery = async () => {
  try {
    const { uid } = auth.currentUser;
    const dataRef = doc(db, "userData", uid);
    return await getDoc(dataRef);
  } catch (error) {
    console.log(error);
  }
};

export {
  app,
  initDatabase,
  addToActiveRun,
  addToHistory,
  fetchHistory,
  fetchActiveRun,
  clearActiveRun,
  deleteHistoryRun,
  addItemToHolyGrail,
  getItemFromHolyGrail,
};
