import { useState, useContext } from "react";
import { DotsHorizontalIcon } from "@radix-ui/react-icons";
import { Row } from "@tanstack/react-table";
import { doc, updateDoc, deleteDoc } from "firebase/firestore";
import { db } from "@/firebase";

import { Button } from "@/components/ui/button";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuSeparator,
  DropdownMenuShortcut,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";

import { Task, taskSchema } from "@/data/schema";
import { TasksContext } from "@/context/tasksContext";
import { EditTaskForm } from "@/components/data-table/EditTaskForm";
import { Modal } from "@/components/ui/modal";

interface DataTableRowActionsProps<TData> {
  row: Row<TData>;
}

export function DataTableRowActions<TData>({ row }: DataTableRowActionsProps<TData>) {
  const task = taskSchema.parse(row.original);
  const { tasks, setTasks } = useContext(TasksContext);
  const [isEditing, setIsEditing] = useState(false);

  const handleEdit = () => {
    setIsEditing(true);
  };

  const handleSave = async (updatedTask: Task) => {
    try {
      const taskRef = doc(db, "tasks", updatedTask.id);
      await updateDoc(taskRef, updatedTask);
      const newTasks = tasks.map(t => t.id === updatedTask.id ? updatedTask : t);
      setTasks(newTasks);
      setIsEditing(false);
    } catch (error) {
      console.error("Error updating document: ", error);
    }
  };

  const handleStatusChange = async (newStatus: "todo" | "done") => {
    try {
      const taskRef = doc(db, "tasks", task.id);
      await updateDoc(taskRef, {
        completed: newStatus === "done"
      });
      const updatedTask = { ...task, status: newStatus };
      const newTasks = tasks.map(t => t.id === task.id ? updatedTask : t);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error updating status: ", error);
    }
  };

  const handleCancel = () => {
    setIsEditing(false);
  };

  const handleDelete = async () => {
    try {
      await deleteDoc(doc(db, "tasks", task.id));
      const newTasks = tasks.filter((item) => item.id !== task.id);
      setTasks(newTasks);
    } catch (error) {
      console.error("Error removing document: ", error);
    }
  };

  return (
      <>
        <DropdownMenu>
          <DropdownMenuTrigger asChild>
            <Button
                variant="ghost"
                className="flex h-8 w-8 p-0 data-[state=open]:bg-muted"
            >
              <DotsHorizontalIcon className="h-4 w-4" />
              <span className="sr-only">Open menu</span>
            </Button>
          </DropdownMenuTrigger>
          <DropdownMenuContent align="end" className="w-[160px]">
            <DropdownMenuItem onClick={handleEdit}>
              Edit
            </DropdownMenuItem>
            <DropdownMenuItem onClick={() => handleStatusChange(task.status === "done" ? "todo" : "done")}>
              Mark as {task.status === "done" ? "Todo" : "Done"}
            </DropdownMenuItem>
            <DropdownMenuSeparator />
            <DropdownMenuItem onClick={handleDelete}>
              Delete
              <DropdownMenuShortcut>⌘⌫</DropdownMenuShortcut>
            </DropdownMenuItem>
          </DropdownMenuContent>
        </DropdownMenu>

        <Modal isOpen={isEditing} onClose={handleCancel} title="Edit Task">
          <EditTaskForm task={task} onSave={handleSave} onCancel={handleCancel} />
        </Modal>
      </>
  );
}