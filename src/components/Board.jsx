import React, { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { useMediaQuery } from "react-responsive";
import AddEditBoardModal from "../modals/AddEditBoardModal";
import "../styles/Board.css";
import Column from "./Column";
import EmptyBoard from "./EmptyBoard";
import Sidebar from "./Sidebar";
import { DragDropContext, Droppable, Draggable } from 'react-beautiful-dnd';
import boardsSlice from "../redux/boardsSlice";
import colors from "../utility/colors.json"
import ToolsBar from "./ToolsBar";

export default function Board() {
  const dispatch = useDispatch();
  const isBigScreen = useMediaQuery({ query: "(min-width: 768px)" });
  const [isSideBarOpen, setIsSideBarOpen] = useState(true);
  const [isBoardModalOpen, setIsBoardModalOpen] = useState(false);
  const boards = useSelector((state) => state.boards);
  const board = boards.find((board) => board.isActive === true);
  const columns = board.columns;

  

  const handleOnDragEnd=(result)=> {
    const { colIndex, prevColIndex, taskIndex ,prevTaskIndex} = { colIndex:    parseInt(result.destination.droppableId),
                                                                  prevColIndex: parseInt(result.source.droppableId),
                                                                  taskIndex:    result.destination.index,
                                                                  prevTaskIndex: result.source.index 
                                                                }

    dispatch(boardsSlice.actions.dragTask({ colIndex, prevColIndex, taskIndex ,prevTaskIndex}));
  }

  

  return (
    <div
      className={isBigScreen && isSideBarOpen ? "board open-sidebar" : "board"}
    >
      {isBigScreen && (
        <Sidebar
          isSideBarOpen={isSideBarOpen}
          setIsSideBarOpen={setIsSideBarOpen}
        />
      )}



      {columns.length > 0 ? (
        <div  className="content">
             
            <ToolsBar/>
             
              <div style={{width:'100%' ,display:'flex',flexDirection:'row',gap:10}}>
                
                <DragDropContext onDragEnd={ handleOnDragEnd }>
                {  columns.map((col, index) => {
                      return <Droppable droppableId={index+""}>
                                  {
                                    (provided)=>(
                                      <div {...provided.droppableProps} ref={provided.innerRef} style={{borderWidth:0,borderStyle:'solid'}}>
                                          <Column key={index} colIndex={index}  color={index < colors.length? colors[index] : colors[0]}/>
                                      </div>
                                    )
                                  }
                              </Droppable>
                    })  
                }
                </DragDropContext>
                <div
                  className="add-column-column heading-XL"
                  onClick={() => {
                    setIsBoardModalOpen(true);
                  }}
                >
                  + New Column
                </div>
              </div>
        </div>

      ) : (
        <EmptyBoard type="edit" />
      )}
      {isBoardModalOpen && <AddEditBoardModal type="edit" setIsBoardModalOpen={setIsBoardModalOpen} />}
    </div>
  );
}
