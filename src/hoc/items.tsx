import { useDispatch } from "react-redux";
import { HOC, useAppSelector } from "../interfaces/system";
import { modalSlice, ModalType } from "../store/modalSlice";
import { selectDirectionOnTarget } from "../selectors/selectors";
import { selectArtyMeasurement, selectTargetMeasurement } from "../selectors/itemSelectors";
import { ItemComponent } from "../components/Item";

export const Arty: HOC = () => {

    const dispatch = useDispatch();
    const { azimut, distance } = useAppSelector(selectArtyMeasurement);

    return (
        <ItemComponent
            itemId="arty"
            distance={distance}
            azimut={azimut}
            onClick={() => dispatch(modalSlice.actions.openModal({title: 'Arty location', type: ModalType.arty }))}
        />
    )
};

export const Target: HOC = () => {

    const dispatch = useDispatch();
    const { azimut, distance } = useAppSelector(selectTargetMeasurement);

    return (
        <ItemComponent
            itemId="target"
            distance={distance}
            azimut={azimut}
            onClick={() => dispatch(modalSlice.actions.openModal({title: 'Locate your Target', type: ModalType.target }))}
        />
    );
};

export const Officer: HOC = () => {
    const { azimut, distance } = useAppSelector(selectDirectionOnTarget);
    return (
        <ItemComponent
            itemId="officer"
            distance={distance}
            azimut={azimut}
        />
    )
}
