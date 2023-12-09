import { useEffect, useState } from "react";
import { collection, getDocs } from "firebase/firestore";
import { database } from "../firebase/Config";

const hookICL = (items) => {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(database, "items");
        const snapshot = await getDocs(collectionRef);

        setData(
          snapshot.docs
            .map((doc) => ({ ...doc.data(), id: doc.data().id || doc.id }))
            .sort((a, b) => a.id - b.id)
        );
        setError(snapshot.empty);
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [items]);

  return { data, loading, error };
};

export default hookICL;
