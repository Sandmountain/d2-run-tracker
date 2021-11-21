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

const replaceHolyGrail = async () => {
  const { uid } = auth.currentUser;
  const dataRef = doc(db, "userData", uid);

  await updateDoc(dataRef, {
    [`holyGrail`]: collectionStructure.holyGrail,
  });
};

const fetchUserHolyGrail = async () => {
  try {
    const querySnapshot = await constructUserQuery();

    if (querySnapshot && querySnapshot.exists()) {
      return querySnapshot.data().holyGrail.items;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error when fetching user's holy grail", error);
  }
};

const updateUserholyGrail = async (holyGrail) => {
  try {
    const { uid } = auth.currentUser;
    const dataRef = doc(db, "userData", uid);

    await updateDoc(dataRef, {
      [`holyGrail.items`]: holyGrail,
    });
  } catch (error) {
    console.log("Error updating holy grail", error);
  }
};

// Finding an item and changing the values, if no changes, add imediatly.
const addToHistory = async (dataToAdd) => {
  try {
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
  } catch (error) {
    console.log("Error when adding history. ", error);
  }
};

const deleteHistoryRun = async (itemToRemove) => {
  try {
    const { uid } = auth.currentUser;

    const dataRef = doc(db, "userData", uid);

    await updateDoc(dataRef, {
      "runData.history": arrayRemove(itemToRemove),
    });
  } catch (error) {
    console.log("Error when deleting history. ", error);
  }
};

const fetchHistory = async () => {
  try {
    const querySnapshot = await constructUserQuery();

    if (querySnapshot.exists()) {
      return querySnapshot.data().runData.history;
    } else {
      return [];
    }
  } catch (error) {
    console.log("Error when fetching history data. ", error);
  }
};

const fetchActiveRun = async () => {
  try {
    const querySnapshot = await constructUserQuery();

    if (querySnapshot.exists()) {
      return querySnapshot.data().runData.active;
    } else {
      return {};
    }
  } catch (error) {
    console.log("Error when fetching active run. ", error);
  }
};

const clearActiveRun = async () => {
  try {
    const { uid } = auth.currentUser;
    const dataRef = doc(db, "userData", uid);

    await updateDoc(dataRef, {
      "runData.active": [],
    });
  } catch (error) {
    console.log("Error when clearing active run. ", error);
  }
};

const addToActiveRun = async (data) => {
  try {
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
  } catch (error) {
    console.log("Error when adding to active run", error);
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
  deleteHistoryRun,
  fetchActiveRun,
  clearActiveRun,
  updateUserholyGrail,
  fetchUserHolyGrail,
  replaceHolyGrail,
};
