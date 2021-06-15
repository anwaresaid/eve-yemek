import React, { useRef, useState, useEffect } from 'react';

import { getIdQuery } from '../../helpers/getIdQuery';
import FoodCategoryDataInput from '../../components/DataInputForms/MealDataInput/FoodCategoryDataInput'
import Loading from '../../components/Loading';

export const FoodCategoryEdit = () => {
 
  const id = getIdQuery();

  return (
    id ? <FoodCategoryDataInput id={id} updating ></FoodCategoryDataInput> : <Loading/>

  );
};

export default FoodCategoryEdit;
