import { createSlice } from "@reduxjs/toolkit";
import { RootState } from "../store/store";

interface ThemeState {
    theme: string;
}

const initialState: ThemeState = {
    theme: "dark",
}

export const themeSlice = createSlice({
    name: "theme",
    initialState,
    reducers: {
        setTheme: (state) => {
            if (state.theme === "dark") {
                state.theme = "light";
            } else {
                state.theme = "dark";
            }
        },
    },
});

export const { setTheme } = themeSlice.actions;
export const selectTheme = (state: RootState) => state.theme.theme;

export default themeSlice.reducer;