import {v4 as uuidv4} from 'uuid';
import { ToDoListModel } from './ToDoList.model';

export class TaskModel {

    public id: string = uuidv4();
    public title: string;
    public description: string = "";

    public color: string = '#ffffff';
    public isDone: boolean = false;
    public date: Date = new Date();

    public subTasks: ToDoListModel = new ToDoListModel('Subtasks');

    public constructor(title: string){
        this.title = title;
    }

    public toggleDone(): void {
        this.isDone = !this.isDone;
    }

    public addSubTask(task: TaskModel): void {
        this.subTasks.tasks.push(task);
    }

    public removeSubTask(task: TaskModel): void {
        this.subTasks.tasks = this.subTasks.tasks.filter((t: TaskModel) => t.id !== task.id);
    }
}