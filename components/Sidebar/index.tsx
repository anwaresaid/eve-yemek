import React, { useEffect, useState } from "react";
import { Menu } from "primereact/menu";
import Link from "next/link";
import { useRouter } from "next/router";
import * as S from "./style";
import { allMenuItems } from "../../helpers/constants";

const Sidebar = () => {
    const router = useRouter();
    const routeName = router?.asPath;

    const [menus, setMenus] = useState([]);

    //Store menus with compared roles
    const [initMenus, setInitMenus] = useState([]);

    const [firstRun, setFirstRun] = useState(false);

    // Setting "initMenus" with user's accessable routes, by "roles"
    useEffect(()=>{
        const user = JSON.parse(localStorage.getItem("user"));
        if(user?.roles){
            generateInitMenus(user.roles);
            setFirstRun(true);
        }else{
            //User has no roles, log out
            alert("User has no roles");
        }
    },[]);

    // Adding tempolate: menuTemplate to menu constants
    useEffect(()=>{
        if(firstRun){
            generateMenus();
        }
    }, [router.asPath, initMenus])

    const generateInitMenus = (userRoles) => {
        //console.log("generate init menu");
        setInitMenus(allMenuItems.filter(e=>{
            if(e?.url && e?.roles.includes(...userRoles)){
                return e;
            }
            else if(e.items && e.items.length > 0){
                e.items = e.items.filter(k=>{
                    if(k?.url && k?.roles.includes(...userRoles)){
                        return k;
                    }
                    return false;
                });
                if(e.items && e.items.length > 0){
                    return e;
                }
            }
            return false;
        }));
    }

    const generateMenus = () => {
        //console.log("generate menu");
        setMenus(initMenus.map(e=>{

            if(e.url){
                e.template = menuTemplate;
                return e;
            }else if(e.items && e.items.length > 0){
                e.items = e.items.map(k=>{
                    if(k.url){
                        k.template = menuTemplate;
                        return k;
                    }
                });
                return e;
            }else{
                return e;
            }
        }));
    }

    const menuTemplate = (item, options) => {
        //console.log("Creating menus");

        const activeClass = routeName === item.url ? " p-menuitem-active" : "";

        return (
            <Link href={item.url || "#"}>
                <a
                    className={options.className + activeClass}
                    onClick={options.onClick}
                >
                    {options?.iconClassName !== "p-menuitem-icon" ? (
                        <span className={options.iconClassName}></span>
                    ) : (
                        ""
                    )}
                    <span className={options.labelClassName}>{item.label}</span>
                </a>
            </Link>
        );
    };

    return (
        <S.Container>
            <S.TopLogoContainer>
                <img src="/images/logos/eve-yemek-05.png" />
            </S.TopLogoContainer>
            {menus && 
                <Menu model={menus} />
            }
        </S.Container>
    );
};

export default Sidebar;
