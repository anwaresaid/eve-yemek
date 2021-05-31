export default (rowData, column) => {
    console.log(rowData, column);
    return column?.rowIndex + 1
};