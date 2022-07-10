import React from "react";
import { CSVLink } from "react-csv";
import Button from "react-bootstrap/Button";

interface ExportReactCSVProps {
  csvData: any;
  fileName: string;
}
export const ExportReactCSV = ({ csvData, fileName }: ExportReactCSVProps) => {
  return (
    <Button variant="default" className="ml-auto">
      <CSVLink data={csvData} filename={fileName}>
        Export
      </CSVLink>
    </Button>
  );
};
