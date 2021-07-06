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
    row.createdAt = moment(row.createdAt).format('h:m A D MMM YYYY')
    return row
}

export function fromNowDate(date){
    return moment(date).fromNow();
}

export function detailedDate(date){
    return moment(date).format("llll");
}

export function momentSetLocale(){
    moment.locale(i18n.language);
}