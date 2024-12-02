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
import { Task } from "@/app/db/db.types";

const TableView = ({ tasks }: { tasks: Task[] }) => {
  const columnHelper = createColumnHelper();

  const columns: any[] = [
    columnHelper.accessor("id", {
      header: "id",
    }),
    columnHelper.accessor("created_at", {
      header: "created_at",
      cell: (info) => dayjs(info.getValue()).format("DD/MM/YY"),
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
                  <TableHead
                    key={header.id}
                    colSpan={header.colSpan}
                    onClick={header.column.getToggleSortingHandler()}
                  >
                    {header.isPlaceholder ? null : (
                      <div>
                        {flexRender(
                          header.column.columnDef.header,
                          header.getContext()
                        )}

                        {header.column.getIsSorted() == "asc" ? "⬆️" : false}
                        {header.column.getIsSorted() == "desc" ? "⬇️" : false}
                      </div>
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
