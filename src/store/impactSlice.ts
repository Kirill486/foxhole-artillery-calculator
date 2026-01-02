import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeasurement } from "../interfaces/domain";

export const impactSlice = createSlice({
    name: 'impact',
    initialState: [] as IMeasurement[],
    reducers: {
        impact: (state, {payload: newImpact}: PayloadAction<IMeasurement>) => [...state, newImpact],
        remove: (state, {payload: indexToRemove}: PayloadAction<number>) => state.filter((item, index) => index !== indexToRemove),
        reset: () => [],
    },
});