export const priceBodyTemplate = (price, currency?) => {
    return price + " " + (currency || "");
}