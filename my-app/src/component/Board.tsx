import { styled } from "styled-components";
import { IToDo } from "../atom";
import { Droppable } from "react-beautiful-dnd";

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
const Area = styled.div`
  background-color: "pink";
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

interface IBoardProps{
    boardId : string
    toDos : IToDo[]
}

function Board({boardId,toDos} : IBoardProps){
    return(
        <Wrapper>
            <Title>{boardId}</Title>
            <Droppable droppableId={boardId}>
            {(drop, info) => (
            <Area
                ref={drop.innerRef}
                {...drop.droppableProps}
            >
                {drop.placeholder}
            </Area>
        )}
            </Droppable>
        </Wrapper>
    )
}

export default Board;