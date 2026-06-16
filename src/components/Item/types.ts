import { ReactNode } from "react";
import { IMeasurement } from "../../interfaces/domain";

export interface IItemDetail {
    label: string;
    value: string;
}

export interface IMeasurementProps extends IMeasurement {
    itemId: string;
    iconId?: string;
    label?: string;
    className?: string;
    details?: IItemDetail[];
    actions?: ReactNode;
    onClick?: () => void;
    showMeasurement?: boolean;
    showProjection?: boolean;
}
