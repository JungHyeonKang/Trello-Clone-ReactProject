import { atom ,selector} from "recoil";

export interface IToDo{
  id :number;
  text : string
}
export interface IToDoState{
  [key : string] : IToDo[]
}
export const toDoState= atom<IToDoState>({
  key: "toDo",
  default : JSON.parse(localStorage.getItem("todos") as any) ?? []
})  


