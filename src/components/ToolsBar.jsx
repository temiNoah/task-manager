import { useSelector } from 'react-redux'
import '../styles/Toolsbar.css'

export default function ToolsBar({ colIndex, color }) {
    const theme = useSelector(state=> state.theme)
    
    return (
        <div className={`toolsbar ${theme}`} >
            <div className='filter tools'><i class="ri-filter-3-line"></i> <span className='caption'>Filter</span></div>
            <div className='list tools'><i class="ri-list-check"></i> <span className='caption'>List</span></div>
            <div className='grid tools'><i class="ri-layout-grid-2-line"></i> <span className='caption'>Grid</span></div>
       </div>
    )
}