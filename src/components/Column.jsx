import React from "react";
import Task from "./Task";
import "../styles/Column&Task.css";
import boardsSlice from "../redux/boardsSlice";
import { useDispatch, useSelector } from "react-redux";

import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';

export default function Column({ colIndex ,color}) {
  const dispatch = useDispatch();
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const col = board.columns.find((col, i) => i === colIndex);

  const handleOnDrop = (e) => {
    const { prevColIndex, taskIndex } = JSON.parse(e.dataTransfer.getData("text")); //alert(prevColIndex)

    if (colIndex !== prevColIndex) {
      dispatch(boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex }));
    }
  }

  const handleOnDragOver = (e) => {
    e.preventDefault()
  }

  const handleOnDragEnd=(result) =>{
    alert("sdf")
    // if (!result.destination) return;

    // const items = Array.from(characters);
    // const [reorderedItem] = items.splice(result.source.index, 1);
    // items.splice(result.destination.index, 0, reorderedItem);

    // updateCharacters(items);
  }


  // return (
  //   <div className="column" onDrop={handleOnDrop} onDragOver={handleOnDragOver}>
  //     <p className="col-name heading-S">
  //       {col.name} ({col.tasks.length})
  //     </p>
  //         {
  //           col.tasks.map((task, index) => {
  //               return (
  //                 <Task key={index} taskIndex={index} colIndex={colIndex} />
  //               );
  //             })
  //         }
  //   </div>
  // );


  return (
    <div className="column">
          <div>

        <div style={{ display: 'flex', flexDirection: 'row', gap: 10, justifyContent: 'center' }} className="col-border">
           <p style={{ width: '10px', height: '10px', border: '0px solid #000', borderRadius: '100%', backgroundColor: `${color}`, padding: '5px' }}></p>
                <p className="col-name heading-S">
                {col.name} ({col.tasks.length})
                </p>
        </div>
            
            { col.tasks.map((task, index) => {
                       
                        return (
                              <Draggable draggableId={"drag"+ colIndex + index} key={index} index={index}>
                                {
                                  (provided)=>(
                                    <div ref={provided.innerRef} {...provided.draggableProps} {...provided.dragHandleProps}>
                                      <Task key={index} taskIndex={index} colIndex={colIndex} />
                                    </div>
                                  )
                                }
                              </Draggable>
                            )}
                          )                
                      
              }
           </div> 
    </div>
  )
}
