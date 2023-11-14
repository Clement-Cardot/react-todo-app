import {v4 as uuidv4} from 'uuid';
import { TaskModel } from './Task.model';

export class ToDoListModel {

    public id: string = uuidv4();
    public title: string;

    public color: string = '#ffffff';
    public isDone: boolean = false;
    public date: Date = new Date();

    public tasks: TaskModel[] = [];

    public constructor(title: string){
        this.title = title;
    }

    public toggleDone(): void {
        this.isDone = !this.isDone;
    }

    public addTask(task: TaskModel): void {
        this.tasks.push(task);
        console.log(this.tasks);
    }

    public removeTask(task: TaskModel): void {
        this.tasks = this.tasks.filter((t: TaskModel) => t.id !== task.id);
    }
}