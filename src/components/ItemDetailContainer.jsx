import React, { useEffect } from 'react';
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';
import hookICD from '../hooks/hookICD';

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const { item, loading, error } = hookICD(id);

  if (loading) {
    return <div>Loading...</div>;
  }

  if (error) {
    return <div>Error loading item details.</div>;
  }

  return <ItemDetail currency={item} />;
};
