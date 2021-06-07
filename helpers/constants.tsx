export const baseUrl = 'https://dev.eve-yemek.com';

// prettier-ignore
export const allMenuItems:any = [
    { label:"Kontrol Paneli",          url:"/",              roles:["admin", "restaurant_owner"] },
    { label:"Canlı Siparişler",        url:"/orders/live",   roles:["restaurant_owner","admin"]},
    { label:"Siparişler",              url:"/orders",        roles:["admin", "restaurant_owner"] },
    { label:"Restoranlar",           expanded: true, items: [
        { label:"Restoranlar Listesi",             url:"/restaurants",   roles:["admin"]                     },
        { label:"Restoranlar Oluştur",             url:"/restaurants/create",   roles:["admin"]              },
    ] },
    { label:"Yemekler",           expanded: true, items: [
        { label:"Yemek Listesi",       url:"/foods",        roles:["admin", "restaurant_owner"] },
        { label:"Yemek Oluştur",       url:"/foods/create", roles:["admin", "restaurant_owner"] }
    ] },
    { label:"Yemek Kategorileri", expanded: true, items: [
        { label:"Kategori Listesi",       url:"/food_categories",        roles:["admin", "restaurant_owner"] },
        { label:"Kategori Oluştur",       url:"/food_categories/create", roles:["admin", "restaurant_owner"] }
    ] },
    { label:"Eklenti Kategorileri", expanded: true, items: [
        { label:"Eklenti Kategorisi Listesi",  url:"/addon_categories",        roles:["admin", "restaurant_owner"] },
        { label:"Eklenti Kategorisi Oluştur",  url:"/addon_categories/create", roles:["admin", "restaurant_owner"] }
    ] },
    { label:"Eklentiler",           expanded: true, items: [
        { label:"Eklentiler Listesi",             url:"/addons",   roles:["admin"]                     },
        { label:"Eklentiler Oluştur",             url:"/addons/create",   roles:["admin"]              },
    ] },
    { label:"Kupon",                expanded: true, items: [
        { label:"Kupon Listesi",             url:"/coupons",   roles:["admin"]       },
        { label:"Kupon Oluştur",             url:"/coupons/create",   roles:["admin"]       },

    ] },
    { label:"Hesap Ayarları", expanded: true, items: [
        { label:"Müşteriler",  url:"/users/customers", roles:["admin"] },
        { label:"Restoran Sahipleri",  url:"/users/restaurant_owners", roles:["admin"] },
        { label:"Kargocular",  url:"/users/delivery_scouts", roles:["admin"] },
        { label:"Müşteri Sorumlusu",  url:"/users/customer_service", roles:["admin"] },
        { separator:true },
        { label:"Kullanıcı Oluştur", url:"/users/add",  roles:["admin"] },
    ] },
    { separator:true },
    { label:"Ayarlar",                 url:"/settings",   roles:["admin"] },
    { label:"Transferler", url:"/transfers",  roles:["admin"] },
    { label:"Çıkış yap",               url:"/auth/logout",   roles:["admin", "restaurant_owner"] }
];
