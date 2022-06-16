import { Schema, model } from "mongoose";

export interface ISubtask {
    name: string;
    done: boolean;
}

const subtaskSchema = new Schema<ISubtask>({
    name: { type: String, required: true },
    done: { type: Boolean, required: true },
});

export const Subtask = model<ISubtask>("Subtask", subtaskSchema);
