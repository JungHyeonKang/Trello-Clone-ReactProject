
import { atom } from "recoil";

export interface ITodo{
    id : string,
    text : string
}
export interface ITodos{
    [key : string] : ITodo[]
}

const toDos = atom({
    key : "todo",
    default : {
        "ToDo" : [],
        "Doing" : [],
        "Done" : []
    }
})