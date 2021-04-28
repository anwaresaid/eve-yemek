import React from "react";
import { Menu } from 'primereact/menu';
import * as S from "./style";

const Sidebar = () => {


	const items = [
		{ label:"Kontrol Paneli" },
		{ label:"Restoranlar" },
		{ label:"Siparişler" }
	]

    return (
      <S.Container>
        <Menu model={items}/>
      </S.Container>
    );
}
  
export default Sidebar;