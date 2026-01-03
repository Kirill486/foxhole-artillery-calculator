import { useDispatch } from "react-redux";
import { HOC, useAppSelector } from "../interfaces/system";
import { selectModalAzimut, selectModalDistance, selectModalIsOpen, selectModalTitle, selectModalType } from "../selectors/modalSelectors";
import { modalSlice } from "../store/modalSlice";
import { confirmMeasurement } from "../commands/measurementsCommands";

export const MeasurementModal: HOC = () => {
    const title = useAppSelector(selectModalTitle);
    const isOpen = useAppSelector(selectModalIsOpen);
    const azimut = useAppSelector(selectModalAzimut);
    const distance = useAppSelector(selectModalDistance);
    const type = useAppSelector(selectModalType);

    const dispatch = useDispatch();
    return (
        <>
            { isOpen && (
                <div id="modal">
                    <div>{title}</div>
                    <div><input value={azimut} onChange={(e) => dispatch(modalSlice.actions.setAzimuit(Number(e.target.value)))} /></div>
                    <div><input value={distance} onChange={(e) => dispatch(modalSlice.actions.setDistance(Number(e.target.value)))} /></div>
                    <button onClick={() => confirmMeasurement(type, { azimut, distance })}>Confirm</button>
                    <button onClick={() => dispatch(modalSlice.actions.closeModal())}>Cancel</button>
                </div>
            ) }
        </>
    );
}
