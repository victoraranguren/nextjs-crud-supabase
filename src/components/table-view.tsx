"use client";

import {
  createColumnHelper,
  flexRender,
  getCoreRowModel,
  useReactTable,
} from "@tanstack/react-table";

import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import dayjs from "dayjs";

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
      <h2 className="text-2xl font-bold">Table View</h2>
      <Table>
        <TableHeader>
          {table.getHeaderGroups().map((headerGroup) => (
            <TableRow key={headerGroup.id}>
              {headerGroup.headers.map((header) => {
                return (
                  <TableHead key={header.id}>
                    {header.isPlaceholder
                      ? null
                      : flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}
                  </TableHead>
                );
              })}
            </TableRow>
          ))}
        </TableHeader>
        <TableBody>
          {table.getRowModel().rows?.length ? (
            table.getRowModel().rows.map((row) => (
              <TableRow
                key={row.id}
                data-state={row.getIsSelected() && "selected"}
              >
                {row.getVisibleCells().map((cell) => {
                  if (cell.column.id == "created_at") {
                    console.log(dayjs(cell.getValue()).format("DD/MM/YY"));
                    return (
                      <TableCell key={cell.id}>
                        {cell.column.id == "created_at"
                          ? dayjs(cell.getValue()).format("DD/MM/YY")
                          : flexRender(
                              cell.column.columnDef.cell,
                              cell.getContext()
                            )}
                      </TableCell>
                    );
                  }

                  return (
                    <TableCell key={cell.id}>
                      {flexRender(
                        cell.column.columnDef.cell,
                        cell.getContext()
                      )}
                    </TableCell>
                  );
                })}
              </TableRow>
            ))
          ) : (
            <TableRow>
              <TableCell colSpan={columns.length} className="h-24 text-center">
                No results.
              </TableCell>
            </TableRow>
          )}
        </TableBody>
      </Table>
    </div>
  );
};

export default TableView;
