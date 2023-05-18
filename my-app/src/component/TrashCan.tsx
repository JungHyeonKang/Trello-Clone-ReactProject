import { Droppable } from 'react-beautiful-dnd';
import trashCan  from '../img/trash-can-regular.svg';
import { styled } from 'styled-components';

const Area = styled.div`
  flex-grow: 1;
  transition: background-color 0.3s ease-in-out;
`;

function TrashCan(){
   
    return (
        <Droppable droppableId="trashCan">
             {(drop, info) => (
              <Area
                ref={drop.innerRef}
                {...drop.droppableProps}
              >
                <img src={trashCan} width="100px" height="50px" alt=''></img>  
                {drop.placeholder} 
              </Area>
            )}
        </Droppable>
          
    )
}

export default TrashCan;