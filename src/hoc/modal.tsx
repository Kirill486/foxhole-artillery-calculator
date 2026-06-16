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
                <div id="modal" role="presentation">
                    <div className="modal-dialog" role="dialog" aria-modal="true" aria-labelledby="modal-title">
                        <div id="modal-title" className="modal-title">{title}</div>
                        <div className="modal-field">
                            <label htmlFor="modal-azimut">Azimut</label>
                            <input
                                id="modal-azimut"
                                type="number"
                                value={azimut}
                                onChange={(e) => dispatch(modalSlice.actions.setAzimuit(Number(e.target.value)))}
                            />
                        </div>
                        <div className="modal-field">
                            <label htmlFor="modal-distance">Distance</label>
                            <input
                                id="modal-distance"
                                type="number"
                                value={distance}
                                onChange={(e) => dispatch(modalSlice.actions.setDistance(Number(e.target.value)))}
                            />
                        </div>
                        <div className="modal-actions">
                            <button className="modal-button secondary" onClick={() => dispatch(modalSlice.actions.closeModal())}>Cancel</button>
                            <button className="modal-button primary" onClick={() => confirmMeasurement(type, { azimut, distance })}>Confirm</button>
                        </div>
                    </div>
                </div>
            ) }
        </>
    );
}
