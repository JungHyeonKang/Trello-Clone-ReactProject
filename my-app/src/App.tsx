import React from 'react';
import {styled} from "styled-components"
import { DragDropContext, DropResult } from "react-beautiful-dnd";
import { useRecoilState } from "recoil";
import { IToDo, toDoState } from './atom';
import Board from './component/Board';
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

function App() {
  const [todos, setToDos] = useRecoilState(toDoState);
 console.log("todos " , todos)
  const onDragEnd = (info: DropResult) =>{
    const {destination,source,draggableId} = info
    if(!destination) return;
    if(destination.droppableId === source.droppableId){
      // 같은 보드일때
      setToDos((todos)=>{
        const copyBoard = [...todos[source.droppableId]]
        console.log("source.droppableId",source.droppableId);
        
        const targetObj = copyBoard[source.index]
        copyBoard.splice(source.index,1)
        copyBoard.splice(destination.index,0,targetObj)
        return {
          ...todos,[source.droppableId] : copyBoard
        }
      })
    }
    if(destination.droppableId !== source.droppableId){
      setToDos((todos)=>{
        const sourceBoard = [...todos[source.droppableId]]
        const destinationBoard = [...todos[destination.droppableId]]
        const targetObj = sourceBoard[source.index]
        sourceBoard.splice(source.index,1)
        destinationBoard.splice(destination.index,0,targetObj)

        return {
          ...todos,[source.droppableId] : sourceBoard , [destination.droppableId] : destinationBoard
        }
      })
    }
  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
      <Wrapper>
        <Boards>
          {Object.keys(todos).map((boardId) => (
            <Board boardId={boardId} key={boardId} toDos={todos[boardId]} />
          ))}
        </Boards>
      </Wrapper>
    </DragDropContext>
  );
}

export default App;
