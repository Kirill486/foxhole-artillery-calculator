import { IMeasurement } from "../../interfaces/domain";

export interface IMeasurementProps extends IMeasurement {
    itemId: string;
    onClick?: () => void;
    showMeasurement?: boolean;
    showProjection?: boolean;
}
