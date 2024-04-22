/* global fetch */
import Layout from "../components/layout";
import React from 'react';
import { useTable, useSortBy } from 'react-table';
import styles from './CanadianCustomers.module.css'; 



const CanadianCustomers = ({ canadianCustomers, error}) => {
    if (error) {
        return <div>Error: {error}</div>;
    }

    if (!canadianCustomers) {
        return <div>Loading...</div>;
    }
    const data = React.useMemo(() => canadianCustomers, [canadianCustomers]);

    const columns = React.useMemo(() => [
        {
            Header: 'First Name',
            accessor: 'first_name',
        },
        {
            Header: 'Last Name',
            accessor: 'last_name',
        },
        {
            Header: 'Email',
            accessor: 'email',
        },
        {
            Header: 'City',
            accessor: 'city',
        }
    ], []);

    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data }, useSortBy);

    return (
        <Layout>
            <div className={styles.tableContainer}>
                <table {...getTableProps()}>
                    <thead>
                        {headerGroups.map(headerGroup => (
                            <tr {...headerGroup.getHeaderGroupProps()}>
                                {headerGroup.headers.map(column => (
                                    <th {...column.getHeaderProps(column.getSortByToggleProps())}>
                                        {column.render('Header')}
                                        <span>
                                            {column.isSorted
                                                ? column.isSortedDesc
                                                    ? ' 🔽'
                                                    : ' 🔼'
                                                : ''}
                                        </span>
                                    </th>
                                ))}
                            </tr>
                        ))}
                    </thead>
                    <tbody {...getTableBodyProps()}>
                        {rows.map(row => {
                            prepareRow(row);
                            return (
                                <tr {...row.getRowProps()}>
                                    {row.cells.map(cell => (
                                        <td {...cell.getCellProps()}>{cell.render('Cell')}</td>
                                    ))}
                                </tr>
                            );
                        })}
                    </tbody>
                </table>
            </div>
        </Layout>
    );
};

export async function getServerSideProps() {
    try {
      const response = await fetch('http://fastapi:8000/getCanadianCustomers');
      if (!response.ok) {
        throw new Error(`Failed to fetch data: ${response.status}`);
      }
      const canadianCustomers = await response.json();
      return { props: { canadianCustomers } };
    } catch (error) {
      console.error(error);
      return { props: { error: error.message } };
    }
  }


export default CanadianCustomers;




