import { createSlice } from "@reduxjs/toolkit";
const initialState =  'all'

const prioritySlice = createSlice({
    name: "priority",
    initialState: initialState,
    reducers: {
        setPriorityFilter: (state, action) => {

            //alert(action.payload.priorityFilter)
            state = action.payload

            return state
        }
    },
})
export default prioritySlice