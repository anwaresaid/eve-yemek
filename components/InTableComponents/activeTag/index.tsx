import { Tag } from "primereact/tag"
import React, { useEffect, useState } from "react"
import { i18n } from "../../../language";

const activeTag = (activeStatus) => {
    return (
        <Tag 
            value={activeStatus ? i18n.t('active') : i18n.t('inactive')} 
            severity={activeStatus ? "primary" : "warning"}
            icon={activeStatus ? "pi pi-check" : "pi pi-exclamation-triangle"}
        >
        </Tag>
    )
}

export default activeTag;