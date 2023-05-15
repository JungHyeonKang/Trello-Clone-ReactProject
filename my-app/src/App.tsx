import React from 'react';
import {styled} from "styled-components"
import { DragDropContext } from "react-beautiful-dnd";
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
  const [todos,setTodos] = useRecoilState(toDoState)
  console.log(todos);
  
  const onDragEnd = () =>{

  }

  return (
    <DragDropContext onDragEnd={onDragEnd}>
        <Wrapper>
          <Boards>
            {Object.keys(todos).map((boardId ,index)=><Board key={index} boardId={boardId} toDos={todos[boardId]}></Board>)}
          </Boards>
        </Wrapper>
    </DragDropContext>
  );
}

export default App;
