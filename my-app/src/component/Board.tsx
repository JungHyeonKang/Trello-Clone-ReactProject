import { styled } from "styled-components";
import { IToDo, toDoState } from "../atom";
import { Droppable } from "react-beautiful-dnd";
import DraggableCard from "./DraggableCard";
import { useSetRecoilState } from "recoil";
import { useForm } from "react-hook-form";
import {useRef} from "react"

const Wrapper = styled.div`
  width: 300px;
  padding: 20px 10px;
  padding-top: 10px;
  background-color: ${(props) => props.theme.boardColor};
  border-radius: 5px;
  min-height: 300px;
  display: flex;
  flex-direction: column;
`;

const Title = styled.h2`
  text-align: center;
  font-weight: 600;
  margin-bottom: 10px;
  font-size: 18px;
`;
const Area = styled.div<IAreaProps>`
  background-color: "pink";
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;
const Form = styled.form`
  width: 100px;
  input {
    width: 100px;
  }
`
interface IBoardProps{
    boardId : string
    toDos : IToDo[]
}
interface IAreaProps {
    isDraggingFromThis: boolean;
    isDraggingOver: boolean;
  }
interface IForm{
    toDo : string
}
function Board({boardId,toDos} : IBoardProps){
    const {register,handleSubmit,setValue}=useForm<IForm>()
    const setTodos =useSetRecoilState(toDoState)
    const onValid = ({toDo} : IForm) =>{
      const newTodo = {
        id : Date.now(),
        text : toDo
      }
       setTodos((todos)=>{
        return {
          ...todos,[boardId] : [...todos[boardId],newTodo]
        }
       })
       setValue("toDo" ,"")
    }
    return (
        <Wrapper>
          <Title>{boardId}</Title>
          <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDo",{required:true})}/>
          </Form>
          <Droppable droppableId={boardId}>
            {(drop, info) => (
              <Area
                isDraggingOver={info.isDraggingOver}
                isDraggingFromThis={Boolean(info.draggingFromThisWith)}
                ref={drop.innerRef}
                {...drop.droppableProps}
              >
                {toDos.map((toDo, index) => (
                  <DraggableCard key={toDo.id} index={index} toDoId={toDo.id} toDoText={toDo.text} />
                ))}
                {drop.placeholder}
              </Area>
            )}
          </Droppable>
        </Wrapper>
      );
}

export default Board;