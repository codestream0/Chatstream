import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{
  userId:string;
  fullName:string,
  email:string,
  phoneNumber:string,
  accessToken:string | null
  refreshToken:string | null,

}

const initialState: AuthState = {
  userId:"",
  fullName: "",
  email: "",
  phoneNumber: "",
  accessToken: null,
  refreshToken: null,

};

const authSlice = createSlice({
  name: "auth",
  initialState,
  reducers: {
    createUser: (state, action: PayloadAction<Partial<AuthState>>) => {
     Object.assign(state, action.payload);
    },

     setAccessToken: (state, action: PayloadAction<string>) => {
      state.accessToken = action.payload;
    },

    logout: (state) => {
      return{
        userId:"",
        fullName: "",
        email: "",
        phoneNumber: "",
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

  


export const { createUser, logout,setAccessToken } = authSlice.actions;
export default authSlice.reducer;
