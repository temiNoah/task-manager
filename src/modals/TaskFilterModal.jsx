import React,{useState} from "react";
import { useDispatch, useSelector } from "react-redux";
import prioritySlice from "../redux/prioritySlice";
import "../styles/BoardModals.css";



export default function TaskFilterModal({ type, title, setIsTaskFilterModalOpen }) {
    const [priorityFilter, setPriorityFilter] = useState("all");
    const [dateFilter , setDateFilter] = useState(null);
    const dispatch = useDispatch();
    // const filteredTasks = tasks.filter((task) => {
        // const taskDate = new Date(task.startDate);
       
        // const isDateInRange =(!startDate || taskDate >= startDate) && (!endDate || taskDate <= endDate);
       
        // const isStatusMatch =statusFilter === "All" || task.status === statusFilter;
     
        // const isPriorityMatch =priorityFilter === "All" || task.priority === priorityFilter;
        
        // return isDateInRange && isStatusMatch && isPriorityMatch;
    // });

    const handleOk=()=>{
        dispatch(prioritySlice.actions.setPriorityFilter(priorityFilter ));
        setIsTaskFilterModalOpen(false);
    }


    return (
        <div className="modal-container dimmed" 
            onClick={(e) => {
                if (e.target !== e.currentTarget) {
                    return;
                }
                setIsTaskFilterModalOpen(false)
            }}
           
           > 
            <div className="modal" >
                <p className="">Priority Level</p>
                <div className="" style={{margin:'50px'}}>
                    
                    <select
                        className="bg-gray-200 p-2 rounded-xl"
                        value={priorityFilter}
                        onChange={(e) => setPriorityFilter(e.target.value)}
                    >
                        <option value="all">All</option>
                        <option value="high">High</option>
                        <option value="medium">Medium</option>
                        <option value="low">Low</option>
                    </select>
                </div>

                <button className="add-column-btn btn-light" onClick={()=> {handleOk()}}>ok</button>
            </div>
        </div>
    )
}