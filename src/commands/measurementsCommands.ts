import { IMeasurement } from "../interfaces/domain";
import { impactSlice } from "../store/impactSlice";
import { modalSlice, ModalType } from "../store/modalSlice";
import { artyMeasurementSlice, targetMeasurementSlice } from "../store/rootReducer";
import { store } from "../store/store";

export const confirmMeasurement = (modalType: ModalType, measurement: IMeasurement, impactIndex?: number) => {
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
            if (impactIndex === undefined) {
                store.dispatch(impactSlice.actions.impact(measurement));
            } else {
                store.dispatch(impactSlice.actions.setImpact({index: impactIndex, measurement}));
            }
            break;
        }
    }

    store.dispatch(modalSlice.actions.closeModal());
}
