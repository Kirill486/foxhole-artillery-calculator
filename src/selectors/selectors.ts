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
    const dx = distance * Math.sin(azimutToRad);
    const dy = distance * Math.cos(azimutToRad);
    return {
        dx,
        dy,
    }
};

const norm360 = (deg: number) => ((deg % 360) + 360) % 360;

export const isMeasurementSet = ({ distance }: IMeasurement) => distance !== 0;

export const selectHasArtyAndTargetMeasurements: Selector<boolean> = ({ arty, target }) => (
  isMeasurementSet(arty) && isMeasurementSet(target)
);

export const selectDirectionOnTarget: Selector<IMeasurement> = ({ arty, target, impacts }) => {
  const { dx: dxArty, dy: dyArty } = projectOnAxis(arty);
  const { dx: dxTarget, dy: dyTarget } = projectOnAxis(target);

  const areThereImpacts = impacts.length > 0;

  let dx: number;
  let dy: number;

  if (!areThereImpacts) {
    dx = dxTarget;
    dy = dyTarget;
  } else {
    const impactsProjections = impacts.map(projectOnAxis);

    let dxSumm = 0;
    let dySumm = 0;

    impactsProjections.forEach(p => {
      dxSumm += p.dx;
      dySumm += p.dy;
    });

    dx = dxSumm / impactsProjections.length;
    dy = dySumm / impactsProjections.length;
  }

  // vector from arty -> (target or avg impact)
  const dxResult = dx - dxArty;
  const dyResult = dy - dyArty;

  // 0° = North, clockwise
  const azimutRad = Math.atan2(dxResult, dyResult);

  const distance = Math.hypot(dxResult, dyResult);
  const azimut = norm360(radianToDegrees(azimutRad));

  return { azimut, distance };
};
