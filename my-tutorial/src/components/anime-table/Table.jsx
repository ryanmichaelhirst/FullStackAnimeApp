import React from "react"
import ReactTable from "react-table"
import "react-table/react-table.css"
import LoadingBar from '../loader/LoadingBar'

const Table = ({ data }) => {
  if (!data || !data[0]) {
    return <LoadingBar />
  }

  const columns = Object.keys(data[0]).map(key => {
    return { Header: key, accessor: key }
  })

  return (
    <ReactTable
      className="-striped -highlight anime-table"
      data={data}
      columns={columns}
      defaultPageSize={10}
    />
  )
}

export default Table
