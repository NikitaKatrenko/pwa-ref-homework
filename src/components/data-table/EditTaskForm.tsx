import React, { useState } from "react";
import { Task } from "@/data/schema";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";

interface EditTaskFormProps {
    task: Task;
    onSave: (updatedTask: Task) => void;
    onCancel: () => void;
}

export function EditTaskForm({ task, onSave, onCancel }: EditTaskFormProps) {
    const [editedTask, setEditedTask] = useState<Task>(task);

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        const { name, value } = e.target;
        setEditedTask(prev => ({ ...prev, [name]: value }));
    };

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        onSave(editedTask);
    };

    return (
        <form onSubmit={handleSubmit} className="space-y-4">
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Name</label>
                <Input
                    id="name"
                    name="name"
                    value={editedTask.name}
                    onChange={handleInputChange}
                    placeholder="Task title"
                    className="mt-1 w-full"
                />
            </div>
            <div>
                <label htmlFor="title" className="block text-sm font-medium text-gray-700">Todo</label>
                <Input
                    id="todo"
                    name="todo"
                    value={editedTask.todo}
                    onChange={handleInputChange}
                    placeholder="Task todo"
                    className="mt-1 w-full"
                />
            </div>
            <div className="flex justify-end space-x-2 mt-4">
                <Button type="button" variant="outline" onClick={onCancel}>
                    Cancel
                </Button>
                <Button type="submit">Save</Button>
            </div>
        </form>
    );
}