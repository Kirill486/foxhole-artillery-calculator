import { IMeasurement } from "../interfaces/domain";
import { impactSlice } from "../store/impactSlice";
import { modalSlice, ModalType } from "../store/modalSlice";
import { artyMeasurementSlice, targetMeasurementSlice } from "../store/rootReducer";
import { store } from "../store/store";

export const confirmMeasurement = (modalType: ModalType, measurement: IMeasurement) => {
    switch(modalType) {
        case ModalType.arty: {
            store.dispatch(artyMeasurementSlice.actions.setState(measurement));
            break;
        }
        case ModalType.target: {
            store.dispatch(targetMeasurementSlice.actions.setState(measurement));
            break;
        }
        case ModalType.impact: {
            store.dispatch(impactSlice.actions.impact(measurement));
            break;
        }
    }

    store.dispatch(modalSlice.actions.closeModal());
}