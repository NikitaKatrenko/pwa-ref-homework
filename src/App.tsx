import { useEffect, useState } from "react";
import { z } from "zod";
import { initializeApp } from 'firebase/app';
import { getFirestore, collection, onSnapshot, query } from 'firebase/firestore';
import { firebaseConfig } from "@/firebase";
import { DataTable } from "@/components/data-table/DataTable";
import { columns } from "@/components/data-table/Columns";
import { taskSchema } from "@/data/schema";
import { Task } from "@/data/schema";
import { TasksContext } from "@/context/tasksContext";

// Initialize Firebase
const app = initializeApp(firebaseConfig);
const db = getFirestore(app);

export default function App() {
    const [tasks, setTasks] = useState<Task[]>([]);
    const [isLoading, setIsLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        const q = query(collection(db, 'tasks'));
        const unsubscribe = onSnapshot(q, (querySnapshot) => {
            setIsLoading(true);
            setError(null);
            try {
                const tasksArray = querySnapshot.docs.map(doc => ({
                    id: doc.id,
                    ...doc.data()
                }));

                const todos = tasksArray.map((item: any) => ({
                    id: item.id,
                    todo: item.todo,
                    status: item.completed ? "done" : "todo",
                    priority: item.priority || "medium",
                    name: item.name,
                }));

                const parsedTasks = z.array(taskSchema).parse(todos);
                setTasks(parsedTasks);
            } catch (e) {
                setError(e instanceof Error ? e.message : 'An unknown error occurred');
                console.error("Error fetching tasks:", e);
            } finally {
                setIsLoading(false);
            }
        }, (error) => {
            console.error("Firestore error:", error);
            setError("Failed to fetch tasks. Please try again later.");
            setIsLoading(false);
        });

        return () => unsubscribe();
    }, []);

    if (isLoading) {
        return <div>Loading tasks...</div>;
    }

    if (error) {
        return <div>Error: {error}</div>;
    }

    return (
        <div className="h-full flex-1 flex-col space-y-8 p-8 md:flex">
            <div className="flex items-center justify-between space-y-2">
                <div>
                    <h2 className="text-2xl font-bold tracking-tight">TODO List</h2>
                    <p className="text-muted-foreground">
                        List of your tasks:
                    </p>
                </div>
            </div>
            <TasksContext.Provider value={{ tasks, setTasks }}>
                <DataTable data={tasks} columns={columns} />
            </TasksContext.Provider>
        </div>
    );
}