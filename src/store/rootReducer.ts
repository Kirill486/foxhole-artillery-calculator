import { combineReducers } from "@reduxjs/toolkit";
import { singleMeasurementSlice } from "./singleMeasurementSliceFactory";
import { impactSlice } from "./impactSlice";
import { modalSlice } from "./modalSlice";

export const artyMeasurementSlice = singleMeasurementSlice('arty');
export const targetMeasurementSlice = singleMeasurementSlice('target');

export const rootReducer = combineReducers({
    arty: artyMeasurementSlice.reducer,
    target: targetMeasurementSlice.reducer,
    impacts: impactSlice.reducer,
    modal: modalSlice.reducer,
});
