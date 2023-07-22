import { createSlice } from "@reduxjs/toolkit";

const userSlice = createSlice({
  name: "user",
  initialState: {
    email: localStorage.getItem("userEmail") || "",
    recipent:""
  },
  reducers: {
    setUserEmail: (state, action) => {
      state.email = action.payload;
      localStorage.setItem("userEmail", action.payload);
    },
    logout: (state, action) => {
      state.email = "";
      localStorage.removeItem("userEmail");
    },    
  },
});

export const { setUserEmail, logout  } = userSlice.actions;
export default userSlice.reducer;
