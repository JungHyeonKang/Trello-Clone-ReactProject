import React from 'react';
import {styled} from "styled-components"
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IToDo, toDoState } from './atom';
import Board from './component/Board';
import { useForm } from 'react-hook-form';
import TrashCan from './component/TrashCan';

const Wrapper = styled.div`
  display: flex;
  width: 100vw;
  margin: 0 auto;
  justify-content: center;
  align-items: center;
  height: 100vh;
`;

const Boards = styled.div`
  display: flex;
  justify-content: center;
  align-items: flex-start;
  width: 100%;
  gap: 10px;
`;
const Form = styled.form`
  width: 100px;
  input {
    width: 100px; 
  }
`
interface IBoard{
  toDoBoard : string
}
function App() {
  const {register,handleSubmit,setValue}=useForm<IBoard>()
  const [todos, setToDos] = useRecoilState(toDoState);
  const onValid = ({toDoBoard} : IBoard) =>{      
    setToDos((todos)=>{
      window.localStorage.setItem( "todos" ,JSON.stringify({
        ...todos,[toDoBoard]: []
      }));
      return {
        ...todos,[toDoBoard]: []
      }
    })  
    setValue("toDoBoard","")
  }
  
  
  const onDragEnd = (info: DropResult) =>{
    const {destination,source,draggableId} = info
    if(!destination) return;
    if(destination.droppableId === source.droppableId){
      // 같은 보드일때
      setToDos((todos)=>{
        const copyBoard = [...todos[source.droppableId]]
        const targetObj = copyBoard[source.index]
        copyBoard.splice(source.index,1)
        copyBoard.splice(destination.index,0,targetObj)
        window.localStorage.setItem( "todos" ,JSON.stringify({...todos,[source.droppableId] : copyBoard}));
        return {
          ...todos,[source.droppableId] : copyBoard
        }
      })
    }
    if(destination.droppableId !== source.droppableId){

       if(destination.droppableId === 'trashCan'){
          setToDos((todos)=>{
            const sourceBoard = [...todos[source.droppableId]]
            sourceBoard.splice(source.index,1)
            window.localStorage.setItem( "todos" ,JSON.stringify( {
              ...todos,[source.droppableId] : sourceBoard
            })); 
            return {
              ...todos,[source.droppableId] : sourceBoard
            }
          })
        }else{
          setToDos((todos)=>{
            const sourceBoard = [...todos[source.droppableId]]
            const destinationBoard = [...todos[destination.droppableId]]
            const targetObj = sourceBoard[source.index]
            sourceBoard.splice(source.index,1)
            destinationBoard.splice(destination.index,0,targetObj)
            window.localStorage.setItem( "todos" ,JSON.stringify({...todos,[source.droppableId] : sourceBoard , [destination.droppableId] : destinationBoard}));
            return {
              ...todos,[source.droppableId] : sourceBoard , [destination.droppableId] : destinationBoard
            }
          })
        }
    }
  }

  return (
    <>
      <Form onSubmit={handleSubmit(onValid)}>
            <input {...register("toDoBoard")} placeholder='새 보드'/>
        </Form> 
    <DragDropContext onDragEnd={onDragEnd}>
       <TrashCan></TrashCan>
      <Wrapper>
        <Boards>
         {Object.keys(todos).map((boardId,index) => (
            <Board boardId={boardId} key={boardId} toDos={todos[boardId]} />
          ))} 
        </Boards>
      </Wrapper>
    </DragDropContext>
    </>
  );
}

export default App;
