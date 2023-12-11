import {v4 as uuidv4} from 'uuid';

export class Tag {

    public id: string = uuidv4();
    public name: string;
    public textColor: string;
    public backgroundColor: string;

    public constructor(name: string, backgroundColor: string, textColor: string){
        this.name = name;
        this.backgroundColor = backgroundColor;
        this.textColor = textColor;
    }
}