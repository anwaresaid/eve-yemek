const idColumn = (rowData, column) => {
    return column?.rowIndex + 1
}

export default idColumn;