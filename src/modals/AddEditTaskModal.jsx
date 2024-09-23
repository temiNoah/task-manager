import React, { useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { v4 as uuidv4 } from "uuid";
import crossIcon from "../assets/icon-cross.svg";
import boardsSlice from "../redux/boardsSlice";

export default function AddEditTaskModal({
  type,
  setIsTaskModalOpen,
  setIsAddTaskModalOpen,
  taskIndex,
  prevColIndex = 0,
}) {
  const dispatch = useDispatch();
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  const [isValid, setIsValid] = useState(true);
  const [title, setTitle] = useState("");
  const [description, setDescription] = useState("");
  const board = useSelector((state) => state.boards).find(
    (board) => board.isActive
  );
  const columns = board.columns;
  const col = columns.find((col, index) => index === prevColIndex);
  const task = col ? col.tasks.find((task, index) => index === taskIndex) : [];
  const [status, setStatus] = useState(columns[prevColIndex].name);
  const [newColIndex, setNewColIndex] = useState(prevColIndex);
  const [subtasks, setSubtasks] = useState([
    { title: "", isCompleted: false, id: uuidv4() },
    // { title: "", isCompleted: false, id: uuidv4() },
  ]);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [priority, setPriority] = useState('High');
  const [assignee, setAssignee] = useState(null);
  const [isLoading ,setIsLoading] = useState(false)



  if (type === "edit" && isFirstLoad) {
    setSubtasks(
      task.subtasks.map((subtask) => {
        return { ...subtask, id: uuidv4() };
      })
    );
    setTitle(task.title);
    setDescription(task.description);
    setIsFirstLoad(false);
  }

  const validate = () => {
    setIsValid(false);
    if (!title.trim()) {
      return false;
    }
    for (let i = 0; i < subtasks.length; i++) {
      if (!subtasks[i].title.trim()) {
        return false;
      }
    }
    setIsValid(true);
    return true;
  };

  const onChangeSubtasks = (id, newValue) => {
    setSubtasks((prevState) => {
      const newState = [...prevState];
      const subtask = newState.find((subtask) => subtask.id === id);
      subtask.title = newValue;
      return newState;
    });
  };

  const onDelete = (id) => {
    setSubtasks((prevState) => prevState.filter((el) => el.id !== id));
  };

  const onChangeStatus = (e) => {
    setStatus(e.target.value);
    setNewColIndex(e.target.selectedIndex);
  };

  const onSubmit = (type) => {
  
    setIsLoading(true)
    if (type === "add") {
      dispatch(
        boardsSlice.actions.addTask({
          title,
          description,
          assignee,
          subtasks,
          status,
          newColIndex,
          priority, 
          startDate,
          endDate
        })
      );
    } else {

     
      dispatch(
        boardsSlice.actions.editTask({
          title,
          description,
          assignee,
          subtasks,
          status,
          taskIndex,
          prevColIndex,
          newColIndex,
          priority,
          startDate,
          endDate
        })
      );
    }

  
   
    setIsLoading(false)
  };

  return (
    
<div
      className={`modal-container ${type === "add" ? "dimmed" : ""}`}
      onClick={(e) => {
        if (e.target !== e.currentTarget) {
          return;
        }
        setIsAddTaskModalOpen(false);
      }}
    >
      <div className="modal">
        <h3>{type === "edit" ? "Edit" : "Add New"} Task</h3>
        <label htmlFor="task-name-input">Task Name</label>
        <div className="input-container">
          <input
            value={title}
            onChange={(e) => setTitle(e.target.value)}
            id="task-name-input"
            type="text"
            placeholder="e.g. Take coffee break"
            className={!isValid && !title.trim() ? "red-border" : ""}
          />
          {!isValid && !title.trim() && (
            <span className="cant-be-empty-span text-L"> Can't be empty</span>
          )}
        </div>

        <label htmlFor="task-name-input">Description</label>
        <div className="description-container">
          <textarea
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            id="task-description-input"
            placeholder="e.g. It's always good to take a break. This 
            15 minute break will  recharge the batteries 
            a little."
          />
        </div>

        <label htmlFor="task-assignee-input">Assignee</label>
        <div className="input-container">
          <input
            value={assignee}
            onChange={(e) => setAssignee(e.target.value)}
            id="task-assignee-input"
            type="text"
            placeholder="e.g. John Doe"
          />
          
        </div>




        <div className="" style={{display:'flex' , flexDirection:'row' , gap:0, justifyContent:'space-between',margin:'10px 0px 10px 0px'}}>
          <div style={{ flexDirection: 'column', width: '40%' }}>
            <label>Start Date:</label>
            <input
              className=""
              type="date"
              value={startDate ? startDate.toISOString().split("T")[0] : ""}
              onChange={(e) => setStartDate(new Date(e.target.value))}
            />
          </div>
          <div style={{ flexDirection: 'column', width: '40%' }}>
            <label>End Date:</label>
              <input
                className=""
                type="date"
                value={endDate ? endDate.toISOString().split("T")[0] : ""}
                onChange={(e) => setEndDate(new Date(e.target.value))}
              />
          </div>
        </div>


        <div className="select-column-container" style={{ display: 'flex', flexDirection: 'row', justifyContent: 'space-between', marginBottom: '10px' }}>
          <div style={{ border: '0px solid #000', width: '40%' }}>
            <label className="text-M">Current Status</label>
            <select
              className="select-status text-L"
              value={status}
              onChange={onChangeStatus}
            >
              {columns.map((col, index) => (
                <option className="status-options" key={index}>
                  {col.name}
                </option>
              ))}
            </select>
          </div>

          <div style={{ border: '0px solid #000', width: '40%' }}>
            <label className="text-M">Priority Level</label>
            <select
              className="select-status text-L"
              value={priority}
              onChange={(e) => setPriority(e.target.value)}
            >
             
              <option value="High">High</option>
              <option value="Medium">Medium</option>
              <option value="Low">Low</option>
            </select>
          </div>
        </div>



        <label>SubTask:</label>
        <div className="modal-columns">
          {subtasks.map((subtask, index) => {
            return (
              <div className="modal-column" key={index}>
                <div className="input-container">
                  <input
                    onChange={(e) => {
                      onChangeSubtasks(subtask.id, e.target.value);
                    }}
                    type="text"
                    value={subtask.title}
                    className={
                      !isValid && !subtask.title.trim() ? "red-border" : ""
                    }
                  />
                  {!isValid && !subtask.title.trim() ? (
                    <span className="cant-be-empty-span text-L">
                      {" "}
                      Can't be empty
                    </span>
                  ) : null}
                </div>
                <img
                  src={crossIcon}
                  alt="delete-column-icon"
                  onClick={() => {
                    onDelete(subtask.id);
                  }}
                />
              </div>
            );
          })}
        </div>

        <button
          onClick={() => {
            setSubtasks((state) => [
              ...state,
              { title: "", isCompleted: false, id: uuidv4() },
            ]);
          }}
          className="add-column-btn btn-light"
        >
          + Add New Subtask
        </button>

      
        

        <button
          onClick={() => {
            const isValid = validate();
            if (isValid) {
              onSubmit(type);
              setIsAddTaskModalOpen(false);
              type === "edit" && setIsTaskModalOpen(false);
            }
          }}
          className="create-btn"
        >
          {type === "edit" ? "Update" : "Create"} Task
        </button>

        
      </div>

     
    </div>
    
  );
}
