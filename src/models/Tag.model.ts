import {v4 as uuidv4} from 'uuid';

export class Tag {

    public id: string = uuidv4();
    public name: string;
    public color: string;

    public constructor(name: string, color: string){
        this.name = name;
        this.color = color;
    }
}