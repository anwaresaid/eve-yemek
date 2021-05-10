export const baseUrl = "https://dev.eve-yemek.com";

// prettier-ignore
export const menuItems:any = [
    { label:"Kontrol Paneli",          url:"/",              roles:["admin", "restaurant_owner"] },
    { label:"Restoranlar",             url:"/restaurants",   roles:["admin"] },
    { label:"Canlı Siparişler",        url:"/live-orders",   roles:["restaurant_owner"] },
    { label:"Siparişler",              url:"/orders",        roles:["admin", "restaurant_owner"] },
    { label:"Yemekler",   expanded: true, items: [
        { label:"Yemek Listesi",       url:"/dishes",        roles:["admin", "restaurant_owner"] },
        { label:"Yemek Oluştur",       url:"/dishes/create", roles:["admin", "restaurant_owner"] }
    ] },
    { label:"Eklentiler", expanded: true, items: [
        { label:"Eklentiler Listesi",  url:"/addons",        roles:["admin", "restaurant_owner"] },
        { label:"Eklentiler Oluştur",  url:"/addons/create", roles:["admin", "restaurant_owner"]  }
    ] },
    { separator:true },
	{ label:"Çıkış yap",               url:"/auth/logout",   roles:["admin", "restaurant_owner"] }
];
