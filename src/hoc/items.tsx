import { useDispatch } from "react-redux";
import { HOC, useAppSelector } from "../interfaces/system";
import { modalSlice, ModalType } from "../store/modalSlice";
import { selectDirectionOnTarget } from "../selectors/selectors";

export const Arty: HOC = () => {

    const dispatch = useDispatch();

    return (
        <div className="item clickable" id="arty" onClick={() => dispatch(modalSlice.actions.openModal({title: 'Arty location', type: ModalType.arty }))}>
            Arty
        </div>
    )
};

export const Target: HOC = () => {

    const dispatch = useDispatch();

    return (
        <div className="item clickable" id="target" onClick={() => dispatch(modalSlice.actions.openModal({title: 'Locate your Target', type: ModalType.target }))}>
            Target
        </div>
    )
};

export const Officer: HOC = () => {
    const result = useAppSelector(selectDirectionOnTarget);
    return (
        <div className="item" id="officer" >
            Officer
            Azimut: {result.azimut} deg.
            Distance: {result.distance} m.
        </div>
    )
}
