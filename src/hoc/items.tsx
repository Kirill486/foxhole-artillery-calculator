import { useDispatch } from "react-redux";
import { HOC, useAppSelector } from "../interfaces/system";
import { modalSlice, ModalType } from "../store/modalSlice";
import { isMeasurementSet, selectDirectionOnTarget, selectHasArtyAndTargetMeasurements } from "../selectors/selectors";
import { selectArtyMeasurement, selectTargetMeasurement } from "../selectors/itemSelectors";
import { ItemComponent } from "../components/Item";

export const Arty: HOC = () => {

    const dispatch = useDispatch();
    const measurement = useAppSelector(selectArtyMeasurement);
    const { azimut, distance } = measurement;
    const showProjection = useAppSelector(selectHasArtyAndTargetMeasurements);

    return (
        <ItemComponent
            itemId="arty"
            distance={distance}
            azimut={azimut}
            showMeasurement={isMeasurementSet(measurement)}
            showProjection={showProjection}
            onClick={() => dispatch(modalSlice.actions.openModal({title: 'Arty location', type: ModalType.arty }))}
        />
    )
};

export const Target: HOC = () => {

    const dispatch = useDispatch();
    const measurement = useAppSelector(selectTargetMeasurement);
    const { azimut, distance } = measurement;
    const showProjection = useAppSelector(selectHasArtyAndTargetMeasurements);

    return (
        <ItemComponent
            itemId="target"
            distance={distance}
            azimut={azimut}
            showMeasurement={isMeasurementSet(measurement)}
            showProjection={showProjection}
            onClick={() => dispatch(modalSlice.actions.openModal({title: 'Locate your Target', type: ModalType.target }))}
        />
    );
};

export const Officer: HOC = () => {
    const { azimut, distance } = useAppSelector(selectDirectionOnTarget);
    const showInformation = useAppSelector(selectHasArtyAndTargetMeasurements);
    return (
        <ItemComponent
            itemId="officer"
            distance={distance}
            azimut={azimut}
            showMeasurement={showInformation}
            showProjection={showInformation}
        />
    )
}
