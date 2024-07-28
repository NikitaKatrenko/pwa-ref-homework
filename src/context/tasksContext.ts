import { createContext } from "react";
import { Task } from "@/data/schema";

interface TasksContextValue {
  tasks: Task[];
  setTasks: React.Dispatch<React.SetStateAction<Task[]>>;
}

export const TasksContext = createContext<TasksContextValue>(
  {} as TasksContextValue
);
