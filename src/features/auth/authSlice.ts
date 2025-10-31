import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface AuthState{

  fullName:string,
  email:string,
  phoneNumber:string,
  accessToken:string | null
  refreshToken:string | null,
}

const initialState: AuthState = {
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
    createUser: (state, action: PayloadAction<AuthState>) => {
      return { ...state, ...action.payload };
    },
    logout: (state) => {
      return{
        fullName: "",
        email: "",
        phoneNumber: "",
        accessToken: null,
        refreshToken: null,
      };
    },
  },
});

  


export const { createUser, logout } = authSlice.actions;
export default authSlice.reducer;
