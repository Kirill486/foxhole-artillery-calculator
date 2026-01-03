import { createSlice, PayloadAction } from "@reduxjs/toolkit";
import { IMeasurement } from "../interfaces/domain";

export enum ModalType {
    arty = 'arty',
    target = 'target',
    impact = 'impact',
}

interface IModalMeta {
    title: string,
    type: ModalType,
}

interface IModalState extends IMeasurement, IModalMeta {
    isOpen: boolean,
}

const initialModal: IModalState = {
    isOpen: false,
    title: '',
    azimut: 0,
    distance: 0,
    type: ModalType.target,
};

export const modalSlice = createSlice({
    name: 'modalSlice',
    initialState: initialModal,
    reducers: {
        openModal: (state, {payload: {title, type}}: PayloadAction<IModalMeta>) => ({ ...state, type, title, isOpen: true }),
        setAzimuit: (state, {payload: newAzimut}: PayloadAction<number>) => ({ ...state, azimut: newAzimut }),
        setDistance: (state, {payload: newDistance}: PayloadAction<number>) => ({ ...state, distance: newDistance }),
        closeModal: () => initialModal,
    },
});
