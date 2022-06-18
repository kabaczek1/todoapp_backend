import { Schema, model } from "mongoose";
import { ISubtask } from "./subtask.model";

export interface ITask {
    author: string;
    name: string;
    desc: string;
    done: boolean;
    created_at: number;
    subtasks: ISubtask[];
}

const taskSchema = new Schema<ITask>({
    author: { type: String, required: true },
    name: { type: String, required: true },
    desc: { type: String, required: false },
    done: { type: Boolean, required: true },
    created_at: { type: Number, required: true },
    subtasks: [],
});

export const Task = model<ITask>("Task", taskSchema);
