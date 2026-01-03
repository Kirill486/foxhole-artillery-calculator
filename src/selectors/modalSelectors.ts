import { Selector } from "../interfaces/system";
import { ModalType } from "../store/modalSlice";

export const selectModalAzimut: Selector<number> = ({modal: {azimut}}) => azimut;
export const selectModalDistance: Selector<number> = ({modal: {distance}}) => distance;
export const selectModalType: Selector<ModalType> = ({modal: {type}}) => type;
export const selectModalTitle: Selector<string> = ({modal: {title}}) => title;
export const selectModalIsOpen: Selector<boolean> = ({modal: {isOpen}}) => isOpen;
