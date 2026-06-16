import { IMeasurement, IProjectionOnAxis } from "../interfaces/domain";
import { Selector } from "../interfaces/system";

const radianToDegrees = (radians: number) => {
  const degrees = radians * (180 / Math.PI);
  return degrees;
}

const dergreesToRadians = (degrees: number): number => {
  const pi = Math.PI;
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

const getAverageProjection = (measurements: IMeasurement[]): IProjectionOnAxis => {
  let dxSumm = 0;
  let dySumm = 0;

  measurements.map(projectOnAxis).forEach(p => {
    dxSumm += p.dx;
    dySumm += p.dy;
  });

  return {
    dx: dxSumm / measurements.length,
    dy: dySumm / measurements.length,
  };
};

export const selectWindCorrection: Selector<IProjectionOnAxis> = ({ target, impacts }) => {
  const filledImpacts = impacts.filter(isMeasurementSet);

  if (filledImpacts.length === 0) {
    return {
      dx: 0,
      dy: 0,
    };
  }

  const targetProjection = projectOnAxis(target);
  const averageImpactProjection = getAverageProjection(filledImpacts);

  return {
    dx: targetProjection.dx - averageImpactProjection.dx,
    dy: targetProjection.dy - averageImpactProjection.dy,
  };
};

const selectCorrectedTargetProjection: Selector<IProjectionOnAxis> = (state) => {
  const targetProjection = projectOnAxis(state.target);
  const windCorrection = selectWindCorrection(state);

  return {
    dx: targetProjection.dx + windCorrection.dx,
    dy: targetProjection.dy + windCorrection.dy,
  };
};

export const selectDirectionOnTarget: Selector<IMeasurement> = (state) => {
  const { dx: dxArty, dy: dyArty } = projectOnAxis(state.arty);
  const { dx, dy } = selectCorrectedTargetProjection(state);

  const dxResult = dx - dxArty;
  const dyResult = dy - dyArty;

  // 0 degrees = North, clockwise.
  const azimutRad = Math.atan2(dxResult, dyResult);

  const distance = Math.hypot(dxResult, dyResult);
  const azimut = norm360(radianToDegrees(azimutRad));

  return { azimut, distance };
};
