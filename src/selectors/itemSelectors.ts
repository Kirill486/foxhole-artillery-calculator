import { IMeasurement } from "../interfaces/domain"
import { Selector } from "../interfaces/system"

export const selectArtyMeasurement: Selector<IMeasurement> = ({arty}) => arty;
export const selectTargetMeasurement: Selector<IMeasurement> = ({target}) => target;
export const selectImpactMeasurements: Selector<IMeasurement[]> = ({impacts}) => impacts;
