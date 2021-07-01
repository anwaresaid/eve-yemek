import { i18n } from "../language"
import moment from 'moment';
import "moment/locale/tr";
import "moment/locale/ru";
import "moment/locale/ar";

export function parseDateInAllRows(rows){
    moment.locale(i18n.language);
    for (let row of rows.items){
        row = parseDateInOneRow(row)
    }
    return rows
}

// parses createdAt to howLongAgo 
export function parseDateInOneRow(row){
    row.howLongAgo = moment(row.createdAt).fromNow();
    return row
}