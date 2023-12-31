import { useEffect, useState } from 'react';
import { collection, getDocs, where, query } from 'firebase/firestore';
import { database } from '../firebasecfg/Config';

const hookICD = (itemId) => {
  const [item, setItem] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(false);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const collectionRef = collection(database, 'items');
        const itemQuery = query(collectionRef, where('id', '==', Number(itemId)));
        const snapshot = await getDocs(itemQuery);

        if (snapshot.docs.length > 0) {
          const docData = snapshot.docs[0].data();
          const dbId = snapshot.docs[0].id;
          setItem({ ...docData, id: docData.id || dbId, dbId });
          setError(false);
        } else {
          setError(true);
        }
      } catch (error) {
        setError(true);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [itemId]);

  return { item, loading, error };
};

export default hookICD;