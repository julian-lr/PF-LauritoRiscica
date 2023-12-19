import React, { useEffect } from 'react';
import { ItemDetail } from './ItemDetail';
import { useParams } from 'react-router-dom';
import hookICD from '../hooks/HookICD';
import { Error404 } from './Error404';

export const ItemDetailContainer = () => {
  const { id } = useParams();
  const { item, loading, error } = hookICD(id);

  if (loading) {
    return <div>Cargando...</div>;
  }

  if (error) {
    return <Error404 />;
  }

  return <ItemDetail currency={item} />;
};
