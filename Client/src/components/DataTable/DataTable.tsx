import React from "react";
interface DataTableProps {
  columns: string[];
  rows: any[];
}

function DataTable(props: DataTableProps) {
  return (
    <table id="example2" className="table table-bordered table-hover">
      <thead>
        <tr>
          {props.columns.map((col, index) => {
            return <th key={index + col}>{col}</th>;
          })}
        </tr>
      </thead>
      <tbody>
        {props.rows.map((row, index) => {
          return (
            <tr key={row + index}>
              {Object.keys(row).map((value, index) => {
                return <td key={index}>{row[value]}</td>;
              })}
            </tr>
          );
        })}
      </tbody>
    </table>
  );
}

export default DataTable;
