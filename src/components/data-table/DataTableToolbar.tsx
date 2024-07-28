import { useState } from "react";

import { Cross2Icon } from "@radix-ui/react-icons";
import { Table } from "@tanstack/react-table";

import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

import { DataTableViewOptions } from "@/components/data-table/DataTableViewOptions";
import { DataTableRowAdd } from "@/components/data-table/DataTableRowAdd";

interface DataTableToolbarProps<TData> {
  table: Table<TData>;
}

export function DataTableToolbar<TData>({
  table,
}: DataTableToolbarProps<TData>) {
  const isFiltered = table.getState().columnFilters.length > 0;

  const [show, setShow] = useState(false);

  return (
    <>
      <div className="flex items-center justify-between">
        <div className="flex flex-1 items-center space-x-2">
          <Input
            placeholder="Filter tasks..."
            value={(table.getColumn("todo")?.getFilterValue() as string) ?? ""}
            onChange={(event) =>
              table.getColumn("todo")?.setFilterValue(event.target.value)
            }
            className="h-8 w-[150px] lg:w-[250px]"
          />
          {isFiltered && (
            <Button
              variant="ghost"
              onClick={() => table.resetColumnFilters()}
              className="h-8 px-2 lg:px-3"
            >
              Reset
              <Cross2Icon className="ml-2 h-4 w-4" />
            </Button>
          )}
          <Button
            variant="outline"
            size="sm"
            className="h-8 border-dashed"
            onClick={() => {
              setShow(!show);
            }}
          >
            {!show ? "Add a Task" : "Hide Panel"}
          </Button>
        </div>
        <DataTableViewOptions table={table} />
      </div>
      {show && <DataTableRowAdd table={table} />}
    </>
  );
}
