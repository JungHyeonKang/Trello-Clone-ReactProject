import React from "react";
import { Draggable } from "react-beautiful-dnd";
import styled from "styled-components";

const Card = styled.div`
  border-radius: 5px;
  margin-bottom: 5px;
  padding: 10px 10px;
  background-color: ${(props) =>  props.theme.cardColor};
`;

interface IDragabbleCardProps {
  toDoId: number;
  index: number;
  toDoText : string
}

function DragabbleCard({ toDoId, toDoText,index }: IDragabbleCardProps) {
  return (
    <Draggable key={toDoId} draggableId={toDoId+""} index={index}>
      {(drag,snapshot) => (
        <Card
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