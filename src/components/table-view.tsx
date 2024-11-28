"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

const TableView = ({ tasks }) => {
  const columnHelper = createColumnHelper();

  const columns = [
    columnHelper.accessor("id", {
      header: "id",
    }),
    columnHelper.accessor("created_at", {
      header: "created_at",
    }),
    columnHelper.accessor("name", {
      header: "name",
    }),
    columnHelper.accessor("description", {
      header: "description",
    }),
    columnHelper.accessor("priority", {
      header: "priority",
    }),
  ];

  const table = useReactTable({
    columns,
    data: tasks,
    getCoreRowModel: getCoreRowModel(),
  });

  return (
    <div>
      <table>
        <thead>
          {table?.getHeaderGroups().map((headerGroup) => (
            <tr key={headerGroup.id}>
              {headerGroup.headers.map((header) => (
                <th key={header.id} colSpan={header.colSpan}>
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
          {table?.getRowModel().rows.map((row) => (
            <tr key={row.id}>
              {row.getVisibleCells().map((cell) => (
                <td key={cell.id}>
                  {flexRender(cell.column.columnDef.cell, cell.getContext())}
                </td>
              ))}
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
};

export default TableView;
