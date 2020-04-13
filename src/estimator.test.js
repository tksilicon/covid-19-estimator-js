
import estimator from './estimator';

const input = {
  region: {
    name: 'Africa',
    avgAge: 19.7,
    avgDailyIncomeInUSD: 5,
    avgDailyIncomePopulation: 0.71
  },
  periodType: 'days',
  timeToElapse: 58,
  reportedCases: 674,
  population: 66622705,
  totalHospitalBeds: 1380614

};

const expected = {
  data: input,
  impact: {
    currentlyInfected: 6740,
    infectionsByRequestedTime: 3533701120,
    severeCasesByRequestedTime: 530055168,
    hospitalBedsByRequestedTime: -529571953,
    casesForICUByRequestedTime: 176685056,
    casesForVentilatorsByRequestedTime: 70674022,
    dollarsInFlight: 216286878
  },
  severeImpact: {
    currentlyInfected: 33700,
    infectionsByRequestedTime: 17668505600,
    severeCasesByRequestedTime: 2650275840,
    hospitalBedsByRequestedTime: -2649792625,
    casesForICUByRequestedTime: 883425280,
    casesForVentilatorsByRequestedTime: 353370112,
    dollarsInFlight: 1081434394
  }
};
describe('covid-19 estimator js', () => {
  describe('Check output object', () => {
    const output = estimator(input);

    test('Should march the expected object', () => {
      expect(output).toMatchObject(expected);
    });

    test('Should return data object', () => {
      expect(output.data).toEqual(input);
    });
    describe('should return impact object that:', () => {
      test('has currently infected cases', () => {
        expect(output.impact).toHaveProperty('currentlyInfected', expect.any(Number));
        expect(output.impact.currentlyInfected).toEqual(expected.impact.currentlyInfected);
      });
      test('has infected by requested time cases', () => {
        expect(output.impact).toHaveProperty('infectionsByRequestedTime', expect.any(Number));
        expect(output.impact.infectionsByRequestedTime).not.toBeNaN();
      });
      test('has severe positive cases that will require ICU care', () => {
        expect(output.severeImpact).toHaveProperty('casesForICUByRequestedTime', expect.any(Number));
      });
      test('severe positive cases that will require ventilators', () => {
        expect(output.severeImpact).toHaveProperty('casesForVentilatorsByRequestedTime', expect.any(Number));
      });
      test('severe dollarsInFlight', () => {
        expect(output.severeImpact).toHaveProperty('dollarsInFlight', expect.any(Number));
      });
    });
    describe('has should return severeImpact object that:', () => {
      test('has currently severe infected cases', () => {
        expect(output.severeImpact).toMatchObject({ currentlyInfected: expect.any(Number) });
      });
      test('has severe infected by  requested time cases', () => {
        expect(output.severeImpact.infectionsByRequestedTime).not.toBeNaN();
      });
      test('has severe cases By requested Time', () => {
        expect(typeof output.severeImpact.hospitalBedsByRequestedTime).toBe('number');
      });
      test('has available cases By requested Time', () => {
        expect(output.severeImpact).toHaveProperty('hospitalBedsByRequestedTime', expect.any(Number));
        expect(output.severeImpact.hospitalBedsByRequestedTime).not.toBeNaN();
      });
      test('has severe positive cases that will require ICU care', () => {
        expect(output.severeImpact).toHaveProperty('casesForICUByRequestedTime', expect.any(Number));
      });
      test('has severe positive cases that will require ventilators', () => {
        expect(output.severeImpact).toHaveProperty('casesForVentilatorsByRequestedTime', expect.any(Number));
      });
      test('has severe dollarsInFlight', () => {
        expect(output.severeImpact).toHaveProperty('dollarsInFlight', expect.any(Number));
      });
    });
  });
});
