import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeasurement } from "../interfaces/domain";

const emptyMeasurement = (): IMeasurement => ({
    azimut: 0,
    distance: 0,
})

export const singleMeasurementSlice = (name: string) => {
    const slice = createSlice({
        name,
        initialState: emptyMeasurement(),
        reducers: {
            setState: (state, {payload: measurement}: PayloadAction<IMeasurement>) => measurement,
            resetState: () => emptyMeasurement(),
        },
    });

    return slice;
};
