import React, { useMemo } from 'react'
import useEvents from './eventsApi'
import { useTable, usePagination } from 'react-table'
import * as localizedFormat from 'dayjs/plugin/localizedFormat'
import * as dayjs from 'dayjs'
import styled from 'styled-components'

dayjs.extend(localizedFormat)


const Styles = styled.article`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
`

const TableStyle = styled.div`
  display: flex;
  flex-direction: column;
  table {
    border-spacing: 0;
    border: 1px solid black;

    tr {
      :last-child {
        td {
          border-bottom: 0;
        }
      }
    }

    th,
    td {
      margin: 0;
      padding: 0.5rem;
      border-bottom: 1px solid black;
      border-right: 1px solid black;

      :last-child {
        border-right: 0;
      }
    }
  }
`

const HeadingStyle = styled.div`
  font-weight: 700;
  font-size: 2rem;
`


function Table({ columns, data }) {
    const { getTableProps, getTableBodyProps, headerGroups, page, prepareRow,
        canPreviousPage,
        canNextPage,
        pageOptions,
        pageCount,
        gotoPage,
        nextPage,
        previousPage,
        setPageSize,
        state: { pageIndex, pageSize }
    } = useTable({ columns, data, initialState: { pageIndex: 1 } }, usePagination)
    return (
        <>
            <HeadingStyle>
                <div>Mood Table</div>
            </HeadingStyle>
            <TableStyle>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps()}>{column.render('Header')}</th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {page.map((row, i) => {
                            prepareRow(row)
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => {
                                        return <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    })}
                                </tr>
                            )
                        })}
                    </tbody>
                </table>
            </TableStyle>
            <div className="pagination">
                <button onClick={() => gotoPage(0)} disabled={!canPreviousPage}>
                    {'<<'}
                </button>{' '}
                <button onClick={() => previousPage()} disabled={!canPreviousPage}>
                    {'<'}
                </button>{' '}
                <button onClick={() => nextPage()} disabled={!canNextPage}>
                    {'>'}
                </button>{' '}
                <button onClick={() => gotoPage(pageCount - 1)} disabled={!canNextPage}>
                    {'>>'}
                </button>{' '}
                <span>
                    Page{' '}
                    <strong>
                        {pageIndex + 1} of {pageOptions.length}
                    </strong>{' '}
                </span>
                <span>
                    | Go to page:{' '}
                    <input
                        type="number"
                        defaultValue={pageIndex + 1}
                        onChange={e => {
                            const page = e.target.value ? Number(e.target.value) - 1 : 0
                            gotoPage(page)
                        }}
                        style={{ width: '100px' }}
                    />
                </span>{' '}
                <select
                    value={pageSize}
                    onChange={e => {
                        setPageSize(Number(e.target.value))
                    }}
                >
                    {[10, 20, 30, 40, 50].map(pageSize => (
                        <option key={pageSize} value={pageSize}>
                            Show {pageSize}
                        </option>
                    ))}
                </select>
            </div>
        </>
    )
}

export default function EventsComponent() {

    function formatDate(date) {
        return dayjs(date).format('llll')
    }

    function formatMood(mood) {
        switch (mood) {
            case 'happy':
                return '😊'
            case 'okay':
                return '😐'
            case 'sad':
                return '😢'
            default:
                return mood
        }
    }

    const { isLoading, error, data = [] } = useEvents()
    const columns = useMemo(() => [
        {
            Header: 'Date',
            accessor: 'attributes.timestamp',
            Cell: props => formatDate(props.value)
        },
        {
            Header: 'Mood',
            accessor: 'attributes.mood',
            Cell: props => formatMood(props.value)
        }
    ], [])


    return (
        <Styles>
            <article>
                {error ? (
                    <> Sorry, we couldn't load care events </>
                ) : isLoading ? (
                    <> Loading </>
                ) : data ? (
                    <Table columns={columns} data={data.data} />
                ) : null}
            </article>
        </Styles>
    )
}