import React, { useState, useEffect } from 'react';
import { useTable } from 'react-table';
import styles from '../../styles/Table.module.css';

const Table = ({ columns, data }) => {
    const {
        getTableProps,
        getTableBodyProps,
        headerGroups,
        rows,
        prepareRow,
    } = useTable({ columns, data });

    return (
        <table {...getTableProps()} className={styles.table}>
            <thead className={styles.thead}>
                {headerGroups.map((headerGroup) => (
                    <tr {...headerGroup.getHeaderGroupProps()}>
                        {headerGroup.headers.map((column) => (
                            <th {...column.getHeaderProps()} className={styles.th}>
                                {column.render('Header')}
                            </th>
                        ))}
                    </tr>
                ))}
            </thead>
            <tbody {...getTableBodyProps()}>
                {rows.map((row) => {
                    prepareRow(row);
                    return (
                        <tr {...row.getRowProps()} className={styles.tr}>
                            {row.cells.map((cell) => {
                                return (
                                    <td {...cell.getCellProps()} className={styles.td}>
                                        {cell.render('Cell')}
                                    </td>
                                );
                            })}
                        </tr>
                    );
                })}
            </tbody>
        </table>
    );
};

const TableViewer = ({ database }) => {
    const [selectedFile, setSelectedFile] = useState(null);
    const [files, setFiles] = useState([]);
    const [data, setData] = useState([]);
    const [columns, setColumns] = useState([]);

    useEffect(() => {
        async function fetchFiles() {
            try {
                const response = await fetch(`/api/listfiles?database=${database}`);
                const files = await response.json();
                setFiles(files);
                setSelectedFile(files[0]);
            } catch (error) {
                console.error('Erreur lors de la récupération des fichiers:', error);
            }
        }

        fetchFiles();
    }, [database]);

    useEffect(() => {
        async function fetchData() {
            if (!selectedFile) return;

            try {
                const response = await fetch(`/api/csvtojson?database=${database}&file=${selectedFile}`);
                const jsonData = await response.json();
                setData(jsonData);

                const cols = Object.keys(jsonData[0]).map(key => ({
                    Header: key,
                    accessor: key
                }));
                setColumns(cols);
            } catch (error) {
                console.error('Erreur lors de la récupération des données:', error);
            }
        }

        fetchData();
    }, [selectedFile, database]);

    return (
        <div>
            <br></br>
            <div>
                {Array.isArray(files) &&
                    files.map((file) => (
                        <button
                            key={file}
                            onClick={() => setSelectedFile(file)}
                            className={styles.button}
                            style={{ marginRight: '20px' }}
                        >
                            {file}
                        </button>
                    ))}
            </div>
            <br></br>
            {data && columns && <Table columns={columns} data={data} />}
        </div>
    );
};

export default TableViewer;
