import { combineReducers } from "@reduxjs/toolkit";
import { singleMeasurementSlice } from "./singleMeasurementSliceFactory";
import { impactSlice } from "./impactSlice";

const artyMeasurementSlice = singleMeasurementSlice('arty');
const targetMeasurementSlice = singleMeasurementSlice('target');

export const rootReducer = combineReducers({
    arty: artyMeasurementSlice,
    target: targetMeasurementSlice,
    impacts: impactSlice,
});
