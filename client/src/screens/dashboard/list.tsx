import { useMemo, useState } from "react";
import { CellProps, Column, useTable } from "react-table";
import { FinancialRecord, useFinancialRecords } from "../../contexts/financial-record-context";

interface EditableCellProps extends CellProps<FinancialRecord>{
    updateRecord: (rowIndex: number, columnId: string, value: any) => void;
    editable: boolean;
}

const EditableCell: React.FC<EditableCellProps> = ({value: initialValue, row, column, updateRecord, editable}) => {
    const [isEditing, setIsEditing] = useState(false)
    const [value, setValue] = useState(initialValue)

    const onBlur = () => {
        setIsEditing(false)
        updateRecord(row.index, column.id, value);
    };
    return (
    <div onClick={() => editable && setIsEditing(true)} 
        style = {{cursor: editable ? "pointer" : "default"}}>
        {isEditing ? 
        <input 
        value = {value} 
        onChange = {(e) => setValue(e.target.value)} 
        autoFocus
        onBlur={onBlur}
        style = {{width: "100%"}}/> 
        : typeof value === "string"
        ? (value)  //if its a string then display the value else convert to a string and then display it
        : (value.toString())} 
    </div>
    )
}


export const Financelist = () => {
    const {records, updateRecord, deleteRecord} = useFinancialRecords();

    const updateCellRecord = (rowIndex: number, columnId: string, value: any) =>{
        const id = records[rowIndex]?._id;
        updateRecord(id ?? "", {...records[rowIndex], [columnId]: value});
    };

    const columns : Array<Column<FinancialRecord>> = useMemo(() =>[
        {
            Header: "Description",
            accessor: "Description",
            Cell: (props) => (
                <EditableCell {...props} updateRecord = {() => null} editable = {true}/>
            ),
        },

        {
            Header: "Amount",
            accessor: "Amount",
            Cell: (props) => (
                <EditableCell {...props} 
                updateRecord = {updateCellRecord} 
                editable = {true}/>
            ),
        },

        {
            Header: "Category",
            accessor: "Category",
            Cell: (props) => (
                <EditableCell {...props} 
                updateRecord = {updateCellRecord} 
                editable = {true}/>
            ),
        },

        {
            Header: "Payment Method",
            accessor: "PaymentMethod",
            Cell: (props) => (
                <EditableCell {...props} 
                updateRecord = {updateCellRecord} 
                editable = {true}/>
            ),
        },

        {
            Header: "Date",
            accessor: "date",
            Cell: (props) => (
                <EditableCell {...props} 
                updateRecord = {updateCellRecord} 
                editable = {false}/>
            ),
        },

        {
            Header: "Delete",
            id: "delete",
            Cell: ({row}) => (
                <button onClick={() => deleteRecord(row.original._id ?? "")} className="button">
                    Delete
                </button>
            ),
        },

    ],
    [records] //dependency array
);
    const {getTableProps, getTableBodyProps, headerGroups, rows, prepareRow} = 
        useTable({
            columns, 
            data: records,
        });
    return (
        <div className="table-container">
            <table {...getTableProps()} className = "table">
                <thead>
                    {headerGroups.map((hg) => (
                        <tr {...hg.getHeaderGroupProps()}>
                            {hg.headers.map((column) => (
                                <th {...column.getHeaderProps()}> {column.render("Header")} </th>
                            ))}
                        </tr>
                    ))}
                </thead>
                <tbody {...getTableBodyProps()}>
                    {rows.map((row, idx) =>{
                        prepareRow(row);
                        return <tr {...row.getRowProps()}>{row.cells.map((cell) =>(
                            <td {...cell.getCellProps()}>{cell.render("Cell")}</td>
                        ))}
                        </tr>
                    })}
                </tbody>
            </table>
        </div>
    );
}