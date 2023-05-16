import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div<{isDragging:boolean}>`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>props.isDragging ? "tomato" :  props.theme.cardColor};
 
`;

interface IDragabbleCardProps {
  toDoId: number;
  index: number;
  toDoText : string
}

function DragabbleCard({ toDoId, toDoText,index }: IDragabbleCardProps) {
  console.log(toDoId, "has been rendered");
  return (
    <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
      {(drag,snapshot) => (
        <Card
        isDragging={snapshot.isDragging}
          ref={drag.innerRef}
          {...drag.dragHandleProps}
          {...drag.draggableProps}
        >
          {toDoText}
        </Card>
      )}
    </Draggable>
  );
}

export default React.memo(DragabbleCard);