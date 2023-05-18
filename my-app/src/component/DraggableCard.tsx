import React,{ useState }  from "react";
import { Draggable } from "react-beautiful-dnd";
import { useForm } from "react-hook-form";
import { useRecoilState } from "recoil";
import styled from "styled-components";
import {  toDoState } from "../atom";
import xMark  from '../img/xmark-solid.svg';
import editImg  from '../img/pen-to-square-solid.svg';
const Card = styled.div`
  display: flex; 
  justify-content: space-between;
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>  props.theme.cardColor};
`;
const Form = styled.form`
  width: 100px;
  input {
    width: 250px;
    border: none;
  }
`
interface IDragabbleCardProps {
  toDoId: number;
  index: number;
  toDoText : string
  boardId : string
}
interface textForm{
  text : string
}
function DragabbleCard({ toDoId, toDoText,index ,boardId}: IDragabbleCardProps) {
  const [modifyMode , setModifyMode]=useState(false)
  const [todos,setTodos]=useRecoilState(toDoState)
  const {register,handleSubmit,setValue}=useForm<textForm>({defaultValues : {
    text : toDoText
  }})
  const changeModifyMode = ()=>{  setModifyMode(true)}
  const cancelModifyMode = ()=>{ 
     setModifyMode(false)
     setValue("text",toDoText)
    }
 const onValid = ({text}: textForm) =>{
  
  setTodos((todos)=>{
    const boardCopy = [...todos[boardId]]
    const targetObj = boardCopy[index]
    const newTodo = {
      id : targetObj.id,
      text : text
    }
    boardCopy.splice(index,1,newTodo)
    window.localStorage.setItem( "todos" ,JSON.stringify( {
      ...todos,[boardId] : boardCopy
    }));
    return {
      ...todos,[boardId] : boardCopy
    }
  })
  setValue("text",text)
  setModifyMode(false)
 }
  return (
    <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
      {(drag,snapshot) => (
        <>
         <Card
          ref={drag.innerRef}
          {...drag.dragHandleProps}
          {...drag.draggableProps}
        >
          {modifyMode 
          ?  
          <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("text")} autoFocus></input>
          </Form>
          : 
            toDoText
          }
          <div>
          {modifyMode 
           ? 
           <button style={{backgroundColor:"white"}} onClick={cancelModifyMode}><img src={xMark} width="10px" height="10px" alt=''></img> </button>
           :
           <button style={{backgroundColor:"white"}} onClick={changeModifyMode}><img src={editImg} width="10px" height="10px" alt=''></img> </button>
          }
          
           
           </div>
          </Card>
         
        </>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);