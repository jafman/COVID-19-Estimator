const covid19ImpactEstimator = (data) => {
  const currentlyInfected = data.reportedCases * 10;
  const svrCurrentlyInfected = data.reportedCases * 50;
  const totalBed = data.totalHospitalBeds;
  const avgIncome = data.region.avgDailyIncomeInUSD;
  const avgIncPop = data.region.avgDailyIncomePopulation;

  let numDays = data.timeToElapse;
  let dollarsInFlight;
  let svrDollarsInFlight;
  if (data.periodType === 'weeks') {
    numDays *= 7;
  }
  if (data.periodType === 'months') {
    numDays *= 30;
  }

  const infectionsByRequestedTime = currentlyInfected * (2 ** Math.floor(numDays / 3));
  const svrInfectionsByRequestedTime = svrCurrentlyInfected * (2 ** Math.floor(numDays / 3));

  const severeCasesByRequestedTime = Math.floor(0.15 * infectionsByRequestedTime);

  const svrSevereCasesByRequestedTime = Math.floor(
    0.15 * svrInfectionsByRequestedTime
  );

  const hospitalBedsByRequestedTime = Math.round((0.35 * totalBed)
  - (0.15 * infectionsByRequestedTime));


  const svrBedsByRequestedTime = Math.round((0.35 * totalBed)
  - (0.15 * svrInfectionsByRequestedTime));


  const casesForICUByRequestedTime = Math.floor(0.05 * infectionsByRequestedTime);
  const svrCasesForICUByRequestedTime = Math.floor(
    0.05 * svrInfectionsByRequestedTime
  );

  const casesForVentilatorsByRequestedTime = Math.floor(
    0.02 * infectionsByRequestedTime
  );

  const svrCasesForVentilatorsByRequestedTime = Math.floor(
    0.02 * svrInfectionsByRequestedTime
  );

  dollarsInFlight = infectionsByRequestedTime * avgIncPop * avgIncome * numDays;
  // dollarsInFlight = parseFloat(dollarsInFlight.toFixed(2));
  dollarsInFlight = Math.floor(dollarsInFlight);

  svrDollarsInFlight = svrInfectionsByRequestedTime * avgIncPop * avgIncome * numDays;
  // svrDollarsInFlight = parseFloat(svrDollarsInFlight.toFixed(2));
  svrDollarsInFlight = Math.floor(svrDollarsInFlight);

  return {
    // data: { ...data },

    impact: {
      currentlyInfected,
      infectionsByRequestedTime,
      severeCasesByRequestedTime,
      hospitalBedsByRequestedTime,
      casesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime,
      dollarsInFlight
    }, // your best case estimation
    severeImpact: {
      currentlyInfected: svrCurrentlyInfected,
      infectionsByRequestedTime: svrInfectionsByRequestedTime,
      severeCasesByRequestedTime: svrSevereCasesByRequestedTime,
      hospitalBedsByRequestedTime: svrBedsByRequestedTime,
      casesForICUByRequestedTime: svrCasesForICUByRequestedTime,
      casesForVentilatorsByRequestedTime: svrCasesForVentilatorsByRequestedTime,
      dollarsInFlight: svrDollarsInFlight
    } // your severe case estimation


  };

  /* return {
    impact: {
      currentlyInfected,
      infectionsByRequestedTime
    },
    severeImpact: {
      currentlyInfected: svrCurrentlyInfected,
      infectionsByRequestedTime: svrInfectionsByRequestedTime
    }
  };
 */
};
export default covid19ImpactEstimator;
