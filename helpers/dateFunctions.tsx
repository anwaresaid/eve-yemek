import { i18n } from "../language"
import moment from 'moment';
import "moment/locale/tr";
import "moment/locale/ru";
import "moment/locale/ar";

export function parseDateInAllRows(rows) {
    var items
    if (Array.isArray(rows)) {
        items = rows
    } else if (rows.items) {
        items = rows.items
    } else {
        return rows
    }
    moment.locale(i18n.language);
    for (let row of items) {
        row = parseDateInOneRow(row)
    }
    return rows
}

// parses createdAt to howLongAgo 
export function parseDateInOneRow(row) {
    row.howLongAgo = moment(row.createdAt).fromNow();
    row.createdAtDetailed = detailedDate(row.createdAt);
    return row
}

export function fromNowDate(date) {
    return moment(date).fromNow();
}

export function detailedDate(date) {
    return moment(date).format("DD-MM-YYYY HH:mm");
}

export function momentSetLocale() {
    moment.locale(i18n.language);
}