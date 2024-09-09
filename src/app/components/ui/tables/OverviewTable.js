import {
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";
import { Button, Table } from "react-bootstrap";
import SearchInput from "../SearchInput";
import styles from "./OverviewTable.module.scss";

export default function OverviewTable({ data, columns, onAddNewResource }) {
  const table = useReactTable({
    data,
    columns,
    getCoreRowModel: getCoreRowModel(),
  });
  // let items = [];
  // for (let number = 1; number <= 5; number++) {
  //   items.push(
  //     <Pagination.Item
  //       onClick={paginate.bind(this, number)}
  //       key={number}
  //       active={number === currentPage}
  //     >
  //       {number}
  //     </Pagination.Item>
  //   );
  // }

  return (
    <div className={styles["overview-table-container"]}>
      <div className={styles["search-button-container"]}>
        {/* <SearchInput /> */}
        <Button onClick={onAddNewResource}>Add Product</Button>
      </div>
      <Table responsive hover>
        <thead>
          {table.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.header,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </thead>
        <tbody>
          {table.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
        {/* <tfoot>
          {table.getFooterGroups().map(footerGroup => (
            <tr key={footerGroup.id}>
              {footerGroup.headers.map(header => (
                <th key={header.id}>
                  {header.isPlaceholder
                    ? null
                    : flexRender(
                        header.column.columnDef.footer,
                        header.getContext()
                      )}
                </th>
              ))}
            </tr>
          ))}
        </tfoot> */}
        {/* <div className="d-flex justify-content-center">
        <Pagination>{items}</Pagination>
      </div> */}
      </Table>
    </div>
  );
}
