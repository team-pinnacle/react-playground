import React, { ReactElement, useState, FunctionComponent } from "react";
import './Table.css';

export type TableComponentColumn = {
  title: string;
  index: string;
  render?: (row: any) => ReactElement;
};

export type TableComponentProps = {
   columns: TableComponentColumn[];
   data: any[];
   onEdit?: (row: any) => void;
   onSort?: (sortOrder: SortOrder) => void;
   tableClassName?: string;
};

export enum SortOrderType {
  ASC,
  DESC,
  NONE
};

export type SortOrder = {
  column: string;
  order: SortOrderType;
};

export type TableComponentPropsType = {
  tableProps: TableComponentProps
};

function TableComponent({tableProps}: TableComponentPropsType) {
  const [sortOrder, setSortOrder] = useState<SortOrder>({
    column: '',
    order: SortOrderType.NONE
  });

  const sortHandler = (column: string) => {
    sortOrder.column = column;
    sortOrder.order = sortOrder.order == SortOrderType.NONE ? 
        SortOrderType.ASC : (sortOrder.order == SortOrderType.DESC ? SortOrderType.NONE: SortOrderType.DESC);

    if (tableProps.onSort) {
      setSortOrder(sortOrder);
      tableProps.onSort(sortOrder);
    }
  };

  return <div className={"table " + tableProps.tableClassName}>
    <div className="table-headers">
      {
        tableProps.columns.map((column, i) => <div key={i} className="table-header-cell">
          {column.title}
          <a onClick={() => sortHandler(column.index)}>sort</a>
        </div>)
      }
    </div>
    <div className="table-body">
      {
        tableProps.data.map((row, index) => <div key={index} className="table-row">
             {tableProps.columns.map((column, j) => <div key={j} className="table-cell">
              {column.render ? column.render(row) : row[column.index]}
            </div>)}
            <button onClick={() => tableProps.onEdit && tableProps.onEdit(row)}>Edit</button>
          </div>
        )
      }
    </div>
  </div>;
}

export default TableComponent;
