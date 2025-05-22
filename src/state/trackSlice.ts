import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { SpotifyTrackItem } from "../types";

interface TrackState {
    visible: boolean;
    track: SpotifyTrackItem | null;
}

const initialState: TrackState = {
    visible: false,
    track: null
}

export const trackSlice = createSlice({
    name: "track",
    initialState,
    reducers: {
        showTrack: (state) => {
            state.visible = true;
        },

        hideTrack: (state) => {
            state.visible = false;
        },

        setTrack: (state, action: PayloadAction<SpotifyTrackItem | null>) => {
            state.track = action.payload;
        }
    }
})

export const { showTrack, hideTrack, setTrack } = trackSlice.actions;
export const selectTrack = (state: RootState) => state.track;

export default trackSlice.reducer;