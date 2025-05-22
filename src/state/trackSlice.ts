import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { RootState } from "../store/store";
import { SpotifyTrackItem } from "../types";

interface TrackState {
    visible: boolean;
    track: SpotifyTrackItem | null;
    searchResults: SpotifyTrackItem[] | null;
}

const initialState: TrackState = {
    visible: false,
    track: null,
    searchResults: null,
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
        },

        setTrackResults: (state, action: PayloadAction<SpotifyTrackItem[] | null>) => {
            state.searchResults = action.payload;
        }
    }
})

export const { showTrack, hideTrack, setTrack, setTrackResults } = trackSlice.actions;
export const selectTrack = (state: RootState) => state.track;
export const trackResults = (state: RootState) => state.track.searchResults;

export default trackSlice.reducer;