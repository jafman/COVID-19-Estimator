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

  const infectionsByRequestedTime = currentlyInfected * (2 ** parseInt(numDays / 3, 10));
  const svrInfectionsByRequestedTime = svrCurrentlyInfected * (2 ** parseInt(numDays / 3, 10));

  const severeCasesByRequestedTime = parseInt(0.15 * infectionsByRequestedTime, 10);

  const svrSevereCasesByRequestedTime = parseInt(
    0.15 * svrInfectionsByRequestedTime, 10
  );

  const hospitalBedsByRequestedTime = parseInt(0.35 * totalBed, 10) - severeCasesByRequestedTime;


  const svrBedsByRequestedTime = parseInt(0.35 * totalBed, 10) - svrSevereCasesByRequestedTime;


  const casesForICUByRequestedTime = parseInt(0.05 * infectionsByRequestedTime, 10);
  const svrCasesForICUByRequestedTime = parseInt(
    0.05 * svrInfectionsByRequestedTime, 10
  );

  const casesForVentilatorsByRequestedTime = parseInt(
    0.02 * infectionsByRequestedTime, 10
  );

  const svrCasesForVentilatorsByRequestedTime = parseInt(
    0.02 * svrInfectionsByRequestedTime, 10
  );

  dollarsInFlight = infectionsByRequestedTime * avgIncPop * avgIncome * numDays;
  // dollarsInFlight = parseFloat(dollarsInFlight.toFixed(2));
  dollarsInFlight = parseInt(dollarsInFlight, 10);

  svrDollarsInFlight = svrInfectionsByRequestedTime * avgIncPop * avgIncome * numDays;
  // svrDollarsInFlight = parseFloat(svrDollarsInFlight.toFixed(2));
  svrDollarsInFlight = parseInt(svrDollarsInFlight, 10);

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
