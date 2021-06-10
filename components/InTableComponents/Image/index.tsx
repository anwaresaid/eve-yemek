import React, { useEffect, useState } from "react";
import * as S from '../../../styles/food/food.list.style';


 export default (rowData) => {
    console.log(rowData)
    return (
      <S.Image
        id='image'
        src={`${rowData.image}`}
        alt={rowData.image}
      />
    );
  };