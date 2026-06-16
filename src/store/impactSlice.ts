import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeasurement } from "../interfaces/domain";

const emptyMeasurement = (): IMeasurement => ({
    azimut: 0,
    distance: 0,
});

export const impactSlice = createSlice({
    name: 'impact',
    initialState: [] as IMeasurement[],
    reducers: {
        impact: (state, {payload: newImpact}: PayloadAction<IMeasurement>) => [...state, newImpact],
        setImpact: (state, {payload: {index, measurement}}: PayloadAction<{index: number, measurement: IMeasurement}>) => {
            state[index] = measurement;
        },
        clearImpact: (state, {payload: indexToClear}: PayloadAction<number>) => {
            state[indexToClear] = emptyMeasurement();
        },
        remove: (state, {payload: indexToRemove}: PayloadAction<number>) => state.filter((item, index) => index !== indexToRemove),
        reset: () => [],
    },
});
