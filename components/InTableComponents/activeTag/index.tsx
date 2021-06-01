import { Tag } from "primereact/tag"
import React, { useEffect, useState } from "react"

const activeTag = (activeStatus) => {
    return (
        <Tag 
            value={activeStatus ? "Aktif" : "engelli"} 
            severity={activeStatus ? "primary" : "warning"}
            icon={activeStatus ? "pi pi-check" : "pi pi-exclamation-triangle"}
        >
        </Tag>
    )
}

export default activeTag;