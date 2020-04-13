
const covid19ImpactEstimator = (data) => {
  // Input data
  const input = data;

  const impact = {};

  // Computing by number of days
  let numberOfDays = input.timeToElapse;
  if (input.periodType === 'months') {
    numberOfDays = input.timeToElapse * 30;
  } else if (input.periodType === 'weeks') {
    numberOfDays = input.timeToElapse * 7;
  }
  // get the multiplier rounded off to nearest integer
  const multiplier = Math.floor(numberOfDays / 3);
  // challange 1
  impact.currentlyInfected = input.reportedCases * 10;
  // infectionsByRequestedTime
  impact.infectionsByRequestedTime = Math.floor(impact.currentlyInfected * (2 ** multiplier));
  // Challenge 2
  // severeCasesByRequestedTime
  impact.severeCasesByRequestedTime = Math.floor(0.15
    * impact.infectionsByRequestedTime);
  // hospitalBedsByRequestedTime
  const availableBeds = input.totalHospitalBeds * 0.35;
  impact.hospitalBedsByRequestedTime = Math.trunc(availableBeds
   - impact.severeCasesByRequestedTime);
  // Challenge 3
  impact.casesForICUByRequestedTime = Math.trunc(0.05 * impact.infectionsByRequestedTime);
  impact.casesForVentilatorsByRequestedTime = Math.trunc(0.02
    * impact.infectionsByRequestedTime);
  impact.dollarsInFlight = Math.trunc((impact.infectionsByRequestedTime
    * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD) / numberOfDays);


  const severeImpact = {};
  // challange 1
  severeImpact.currentlyInfected = input.reportedCases * 50;
  // infectionsByRequestedTime
  severeImpact.infectionsByRequestedTime = Math.floor(severeImpact.currentlyInfected
    * (2 ** multiplier));
  // Challenge 2
  // severeCasesByRequestedTime
  severeImpact.severeCasesByRequestedTime = Math.floor(0.15
    * severeImpact.infectionsByRequestedTime);
  // hospitalBedsByRequestedTime
  severeImpact.hospitalBedsByRequestedTime = Math.trunc(availableBeds
    - severeImpact.severeCasesByRequestedTime);
  // Challenge 3
  severeImpact.casesForICUByRequestedTime = Math.trunc(0.05
    * severeImpact.infectionsByRequestedTime);
  severeImpact.casesForVentilatorsByRequestedTime = Math.trunc(0.02
    * severeImpact.infectionsByRequestedTime);
  severeImpact.dollarsInFlight = Math.trunc((severeImpact.infectionsByRequestedTime
    * input.region.avgDailyIncomePopulation * input.region.avgDailyIncomeInUSD) / numberOfDays);


  return {
    data: input,
    impact,
    severeImpact
  };
};


export default covid19ImpactEstimator;
