import React from "react";
import { Menu } from 'primereact/menu';
import Link from 'next/link';
import { useRouter } from 'next/router'
import * as S from "./style";

const Sidebar = () => {

	const router = useRouter();
	const routeName = router?.asPath;

	const menuTemplate = (item, options)=>{
		const activeClass = routeName === item.url ? " p-menuitem-active" : "";

		return (
			<Link href={item.url || "#"}>
				<a className={options.className + activeClass} onClick={options.onClick}>
					{options?.iconClassName !== "p-menuitem-icon" ? <span className={options.iconClassName}></span> : ""}
					<span className={options.labelClassName}>{item.label}</span>
				</a>
			</Link>
		)
	}

	const items:any = [
		{ label:"Kontrol Paneli", template:menuTemplate, url:"/"},
		{ label:"Canlı Siparişler", template:menuTemplate, url:"/live-orders" },
		{ label:"Siparişler", template:menuTemplate, url:"/orders" },
		{ label:"Yemekler", template:menuTemplate, url:"/foods" },
		{ label:"Eklentiler", template:menuTemplate, url:"/addons" },
		{ label:"Ayarlar", template:menuTemplate, url:"/settings" },
		{ separator:true },
		{ label:"Restorantlar", template:menuTemplate, expanded: true,items:[
			{ label:"Restorantlar Listesi", template:menuTemplate, url:"/restaurants" },
			{ label:"Restorant Oluştur", template:menuTemplate, url:"/create-restaurants" },
		] },
		{ separator:true },
		{ label:"Çıkış yap", template:menuTemplate, url:"/auth/logout" },
		
	]

    return (
      <S.Container>
		<S.TopLogoContainer>
			<img src="/images/logos/eve-yemek-05.png"/>
		</S.TopLogoContainer>
        <Menu model={items}/>
      </S.Container>
    );
}
  
export default Sidebar;