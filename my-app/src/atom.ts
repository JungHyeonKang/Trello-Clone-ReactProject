import { atom ,selector} from "recoil";

export interface IToDo{
  id :number;
  text : string
}
interface IToDoState{
  [key : string] : IToDo[]
}
export const toDoState= atom<IToDoState>({
  key: "toDo",
  default: {
    "To Do": [{id:1,text:"하이"},{id:2,text:"하이2"},{id:3,text:"하이3"}],
    Doing: [],
    Done: [],
  },
})  

