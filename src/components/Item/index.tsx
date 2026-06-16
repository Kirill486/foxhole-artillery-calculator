import { FC } from "react";
import { IMeasurementProps } from "./types";
import { projectOnAxis } from "../../selectors/selectors";

const ItemIcon: FC<{ itemId: string }> = ({ itemId }) => {
    switch (itemId) {
        case "arty":
            return (
                <svg className="item-icon" viewBox="0 0 96 96" role="img" aria-label="Field gun">
                    <path d="M16 61h34l18-12 5 8-18 13H16z" />
                    <path d="M49 49l30-17 4 7-30 17z" />
                    <path d="M27 60l16-18h14L42 63z" />
                    <circle cx="29" cy="71" r="10" />
                    <circle cx="62" cy="71" r="10" />
                    <circle cx="29" cy="71" r="4" className="item-icon-cutout" />
                    <circle cx="62" cy="71" r="4" className="item-icon-cutout" />
                    <path d="M18 48h16v8H18z" />
                </svg>
            );
        case "target":
            return (
                <svg className="item-icon" viewBox="0 0 96 96" role="img" aria-label="Target">
                    <circle cx="48" cy="48" r="34" />
                    <circle cx="48" cy="48" r="23" className="item-icon-cutout" />
                    <circle cx="48" cy="48" r="13" />
                    <path d="M48 8v16M48 72v16M8 48h16M72 48h16" />
                </svg>
            );
        case "officer":
            return (
                <svg className="item-icon" viewBox="0 0 96 96" role="img" aria-label="Binoculars">
                    <path d="M21 42h20v30H17c-5 0-9-4-9-9V52c0-6 6-10 13-10z" />
                    <path d="M55 42h20c7 0 13 4 13 10v11c0 5-4 9-9 9H55z" />
                    <path d="M38 31h20l8 14H30z" />
                    <path d="M41 42h14v30H41z" />
                    <circle cx="28" cy="62" r="8" className="item-icon-cutout" />
                    <circle cx="68" cy="62" r="8" className="item-icon-cutout" />
                    <path d="M34 31v-7h28v7" />
                </svg>
            );
        default:
            return null;
    }
};

export const ItemComponent: FC<IMeasurementProps> = ({
    itemId,
    azimut,
    distance,
    onClick,
}) => {
    const { dx, dy } = projectOnAxis({azimut, distance});
    const isDefined = !!azimut && !!distance;
    return (
        <div
            className="item clickable"
            id={itemId}
            onClick={onClick}
        >
            <ItemIcon itemId={itemId} />
            <div>Target: {itemId}</div>
            {isDefined && (<div>Azimut: {azimut}</div>)}
            {isDefined && <div>Distance: {distance}</div>}

            --------------------
            <div>dx: {dx.toFixed(1)}</div>
            <div>dy: {dy.toFixed(1)}</div>
        </div>
    );
};
