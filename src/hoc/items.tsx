import { useDispatch } from "react-redux";
import { HOC, useAppSelector } from "../interfaces/system";
import { IMeasurement } from "../interfaces/domain";
import { impactSlice } from "../store/impactSlice";
import { modalSlice, ModalType } from "../store/modalSlice";
import { isMeasurementSet, selectDirectionOnTarget, selectHasArtyAndTargetMeasurements } from "../selectors/selectors";
import { selectArtyMeasurement, selectImpactMeasurements, selectTargetMeasurement } from "../selectors/itemSelectors";
import { ItemComponent } from "../components/Item";

const emptyMeasurement: IMeasurement = {
    azimut: 0,
    distance: 0,
};

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

export const Impacts: HOC = () => {
    const dispatch = useDispatch();
    const impacts = useAppSelector(selectImpactMeasurements);
    const showProjection = useAppSelector(selectHasArtyAndTargetMeasurements);

    return (
        <>
            {[0, 1, 2].map((impactIndex) => {
                const measurement = impacts[impactIndex] || emptyMeasurement;
                const isSet = isMeasurementSet(measurement);

                return (
                    <ItemComponent
                        key={impactIndex}
                        itemId={`impact-${impactIndex + 1}`}
                        iconId="impact"
                        label={`impact ${impactIndex + 1}`}
                        className="impact"
                        azimut={measurement.azimut}
                        distance={measurement.distance}
                        showMeasurement={isSet}
                        showProjection={showProjection && isSet}
                        onClick={() => dispatch(modalSlice.actions.openModal({
                            title: `Observed Impact ${impactIndex + 1}`,
                            type: ModalType.impact,
                            impactIndex,
                        }))}
                    />
                );
            })}
            <button
                className="clear-impacts-button"
                type="button"
                aria-label="Clear impacts"
                title="Clear impacts"
                onClick={() => dispatch(impactSlice.actions.reset())}
            >
                <svg viewBox="0 0 96 96" role="img" aria-hidden="true">
                    <path d="M28 29h40" />
                    <path d="M39 29v-8h18v8" />
                    <path d="M34 39l3 36h22l3-36" />
                    <path d="M43 46v21M53 46v21" />
                    <path d="M24 75h48" />
                </svg>
            </button>
        </>
    );
}
