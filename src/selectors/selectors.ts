import { IMeasurement, IProjectionOnAxis } from "../interfaces/domain";
import { Selector } from "../interfaces/system";

const radianToDegrees = (radians: number) => {
    const degrees = radians * (180 / Math.PI);
    return degrees;
}

const dergreesToRadians = (degrees: number): number => {
    const pi = Math.PI;
    // Multiply degrees by pi divided by 180 to convert to radians.
    return degrees * (pi/180);
}

export const projectOnAxis = ({azimut, distance}: IMeasurement): IProjectionOnAxis => {
    const azimutToRad = dergreesToRadians(azimut);
    const dx = distance * Math.cos(azimutToRad);
    const dy = distance * Math.sin(azimutToRad);
    return {
        dx,
        dy,
    }
};

export const selectDirectionOnTarget: Selector<IMeasurement> = ({arty, target, impacts}) => {
    const {dx: dxArty, dy: dyArty} = projectOnAxis(arty);
    const {dx: dxTarget, dy: dyTarget} = projectOnAxis(target);

    let dx = 0;
    let dy = 0;

    const areThereImpacts = !!impacts.length;

    if (!areThereImpacts) {
        dx = dxTarget;
        dy = dyTarget;
    } else {
        const impactsProjections = impacts.map(projectOnAxis);

        let dxSumm = 0;
        let dySumm = 0;
    
        impactsProjections.forEach(({ dx, dy }) => {
            dxSumm += dx;
            dySumm += dy;
        });

        dx = dxSumm / impactsProjections.length;
        dy = dySumm / impactsProjections.length;
    }

    const dxResult = dx - dxArty;
    const dyResult = dy - dyArty;

    const azimutTg = dxResult / dyResult;
    const azimutRad = Math.atan(azimutTg);

    const distance = Math.sqrt((dx * dx) + (dy * dy)); 
    const azimut = radianToDegrees(azimutRad);

    return {
        azimut,
        distance,
    }
}
