import React, { useEffect, useState } from "react";
import { PanelMenu } from "primereact/panelmenu";
import Link from "next/link";
import * as S from "./style";
import auth from "../../helpers/core/auth";
import { allMenuItems } from "../../helpers/constants";

const Sidebar = (props) => {
    const [initMenus, setInitMenus] = useState([]);

    const menuTemplate = (item, options) => {
        //console.log("menu template");

        const activeClass =
            window.location.pathname === item.url ? " p-menuitem-active" : "";
        
        return (
            <Link href={item.url || "#"} >
                <a
                    className={options.className + activeClass}
                    onClick={options.onClick}
                    style={{background: 'white', boxShadow: 'none'}}
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

    //Detect the menus that can be shown
    useEffect(() => {
        setInitMenus(
            allMenuItems.filter((e: any) => {
                if (e.roles) {
                    e.template = menuTemplate;
                    return auth.hasRoles(e.roles);
                } else if (e?.items) {
                    e.items = e.items?.filter((k: any) => {
                        if (k.roles) {
                            k.template = menuTemplate;
                            return auth.hasRoles(k.roles);
                        }
                    });
                    return e.items?.length > 0;
                }
            })
        );
    }, []);

    const renderMenu = () => {
        if (initMenus.length > 0) {
            return (
                <>
                    <S.Container open = {props.open}>
                        <S.TopLogoContainer>
                            <img src="/images/logos/eve-yemek-05.png" />
                        </S.TopLogoContainer>
                        <PanelMenu className="panelMenu" model={initMenus} />
                    </S.Container>
                </>
            );
        }
    };

    return <>{renderMenu()}</>;
};

export default Sidebar;
