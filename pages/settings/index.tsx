import React, { useEffect } from 'react'
import { useDispatch, useSelector } from 'react-redux';
import { listSettings } from '../../store/actions/settings.action';

const index = () => {

  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(listSettings());
  }, [dispatch]);
  
  return (
    <div>
      <h2>Welcome to settings page</h2>
    </div>
  )
}

export default index
