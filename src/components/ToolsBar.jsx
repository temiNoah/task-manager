import { useState } from 'react';
import { useSelector } from 'react-redux'
import '../styles/Toolsbar.css'
import { useDispatch } from 'react-redux';
import TaskFilterModal from '../modals/TaskFilterModal'

export default function ToolsBar({ colIndex, color }) {
    const theme = useSelector(state=> state.theme);
    const dispatch = useDispatch();
    const [isTaskFilterModalOpen, setIsTaskFilterModalOpen] = useState(false);

    const handleFilter=()=>{
       setIsTaskFilterModalOpen(true)
    }
    return (
        <div className={`toolsbar ${theme}`} >
            <div className='filter tools' onClick={handleFilter}><i class="ri-filter-3-line"></i> <span className='caption'>Filter</span></div>
            <div className='list tools'><i class="ri-list-check"></i> <span className='caption'>List</span></div>
            <div className='grid tools'><i class="ri-layout-grid-2-line"></i> <span className='caption'>Grid</span></div>


            {isTaskFilterModalOpen && (
                <TaskFilterModal
                    // colIndex={colIndex}
                    // taskIndex={taskIndex}
                    setIsTaskFilterModalOpen={setIsTaskFilterModalOpen}
                />
            )}
       </div>
    )
}