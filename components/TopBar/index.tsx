import { useRouter } from "next/router";
import { Button } from "primereact/button";
import { Card } from "primereact/card";
import { Dropdown } from "primereact/dropdown";
import React from "react";
import { i18n } from "../../language";
import vars from "../../styles/core/variables";

type IProps = {
    setHideBar:Function,
    hideBar:boolean
}

const TopBar = (props:IProps) => {

    const router = useRouter();

    return (
        <>
            <Card  id='main_context_card'className={"main-context-card" + (props.hideBar  ? "-showBar" : "-hideBar")} >
                <Button id='main_context_burger_btn' icon="pi pi-bars" className=" p-button-secondary" onClick={()=> { props.setHideBar(!props.hideBar) }}/>
                <Dropdown  style={{float: 'right', marginRight: '20px'}}
                    id="language"
                    name="language"
                    placeholder="Language"
                    options={[
                        {value: 'en', label:'English'},
                        {value: 'ar', label:'اَلْعَرَبِيَّةُ'},
                        {value: 'ru', label:'Русский '},
                        {value: 'tr', label:'Türkçe'}
                    ]}
                    value={i18n.language}
                    onChange={(e) => {i18n.changeLanguage(e.value); router.reload();}}
                />
            </Card>
        </>
    )
}

export default TopBar;
