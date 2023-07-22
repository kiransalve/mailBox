import { createSlice } from "@reduxjs/toolkit";

const mailSlice = createSlice({
    name:"mail",
    initialState:{
        isOpen : false,
        selectedMsg : {},
        selectedType:"inbox",
        inbox :[],
        outbox:[],
        unread:[],
    },
    reducers:{
        open:(state, action) => {
            state.isOpen = true
        },
        close:(state, action) => {
            state.isOpen = false
        },
        openSelectedMsg:(state,action) => {
            state.selectedMsg = action.payload
        },
        selectType:(state,action) => {
            state.selectedType = action.payload
        },
        setInboxMail:(state,action) => {
            state.inbox = action.payload
        },
        setUnreadMail:(state, action) => {
            state.unread = action.payload
        },
        setOutboxMail:(state,action) => {
            state.outbox = action.payload
        }
    }
})

export const {open, close, openSelectedMsg, setMails,setInboxMail,setOutboxMail, selectType, setUnreadMail} = mailSlice.actions

export default mailSlice.reducer