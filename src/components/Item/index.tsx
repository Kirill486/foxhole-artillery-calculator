import { FC } from "react";
import { IMeasurementProps } from "./types";
import { projectOnAxis } from "../../selectors/selectors";

export const ItemComponent: FC<IMeasurementProps> = ({
    itemId,
    azimut,
    distance,
    onClick,
}) => {
    const { dx, dy } = projectOnAxis({azimut, distance});
    return (
        <div
            className="item clickable"
            id={itemId}
            onClick={onClick}
        >
            Target
            Azimut: {azimut}
            Distance: {distance}
            --------------------
            dx: {dx.toFixed(1)}
            dy: {dy.toFixed(1)}
        </div>
    );
};
