import { InputText } from "primereact/inputtext";
import React, { useEffect, useState } from "react";
import * as S from '../../../styles/food/food.list.style';


const Index = (setGlobalFilter,name) => {
    return (
        <div className="table-header">
         {"List of "+ name}
        <span className="p-input-icon-left">
            <i className="pi pi-search" />
            <InputText type="search" onInput={(e) => setGlobalFilter((e.target as HTMLInputElement).value)} placeholder="Search" />
        </span>
    </div>
    );
  };
export default Index