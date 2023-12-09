import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/Config";

const hookICL = (collectionName) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null); // Change here, initialize error state as null

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(database, collectionName);
        const snapshot = await getDocs(collectionRef);

        setData(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.data().id || doc.id }))
            .sort((a, b) => a.id - b.id)
        );
        setError(null); // Change here, reset error state on successful fetch
      } catch (error) {
        setError(error.message); // Change here, set the error state with the error message
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [collectionName]);

  return { data, loading, error };
};

export default hookICL;
