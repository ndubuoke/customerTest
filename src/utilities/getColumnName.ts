export const getColumnName = ({ columns, pageId, sectionId, fieldId, fieldName }) => {
  let columnName, columnFound

  if (!sectionId) {
    columnFound = columns?.find((x) => x?.pageId === pageId)
  }

  if (sectionId) {
    columnFound = columns?.find((x) => x?.sectionId === sectionId)
  }

  console.log({ columnFound: columnFound?.data?.find((x) => x?.fieldId === fieldId), fieldName })

  if (columnFound?.length > 0) {
    console.log({ preCol: columnFound?.data?.find((x) => x?.fieldId === fieldId) })
    columnName = columnFound?.data?.find((x) => x?.fieldId === fieldId)?.columnName
  }

  return columnName ? columnName : fieldName
}
