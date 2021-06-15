
const formatCurrency = (value) => {
    return value.toLocaleString('tr-TR', {style: 'currency', currency: 'TRY'});
}

export const priceBodyTemplate = (rowData) => {
    return formatCurrency(rowData.price);
}
