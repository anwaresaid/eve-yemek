import { i18n } from "../language"

export function parseDateInAllRows(rows){
    for (let row of rows.items){
        row = parseDateInOneRow(row)
    }
    return rows
}

// parses createdAt to howLongAgo 
export function parseDateInOneRow(row){
    row.howLongAgo = i18n.t('xDaysAgo', {x: Math.round(((new Date()).getTime() - (new Date(row.createdAt)).getTime() ) / (1000*60*60*24))})
    return row
}