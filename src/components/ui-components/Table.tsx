import { ReactNode } from "react";
import "./Table.scss";

type RowData = Record<string, string | number | object>;

export type TableColumnType = {
  header: string;
  field?: string;
  renderer?: (data: RowData, field: string) => ReactNode;
};

type TableProps = {
  columns: TableColumnType[];
  data: RowData[];
  className?: string;
};

function Table(props: TableProps) {
  const { columns, data, className = "" } = props;

  return (
    <div className={`main-table-container ${className}`}>
      <table>
        <thead className="table-header">
          <tr>
            {columns.map((hd, index) => {
              return <th key={`header-${index}`}>{hd.header}</th>;
            })}
          </tr>
        </thead>
        <tbody className="table-body">
          {data.map((row, rowIdx) => {
            return (
              <tr key={`row-${rowIdx}`}>
                {columns.map((col, colIdx) => {
                  let field = undefined;
                  if (col?.field) {
                    field = col?.field;
                  }

                  if (col.renderer) {
                    return (
                      <td key={`field-${rowIdx}-${colIdx}`}>
                        {col.renderer(row, field || "")}
                      </td>
                    );
                  }

                  if (field) {
                    const val = row[field];

                    if (typeof val !== "object") {
                      return <td key={`field-${rowIdx}-${colIdx}`}>{val}</td>;
                    }
                  }

                  return <td key={`field-${rowIdx}-${colIdx}`}></td>;
                })}
              </tr>
            );
          })}
        </tbody>
      </table>
    </div>
  );
}

export default Table;
