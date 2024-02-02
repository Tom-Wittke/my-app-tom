import { calculateAge } from "./module";

let people20years;
beforeEach(() => {
  let date = new Date();
  people20years = {
    birth: new Date(date.setFullYear(date.getFullYear() - 20)),
  };
});

/**
 * @function calculateAge
 */
describe("calculateAge Unit Test Suites", () => {
  it("should return a correct age", () => {
    expect(calculateAge(people20years)).toEqual(20);
  });

  it("should return a correct age", () => {
    const loise = {
      birth: new Date("11/07/1991"),
    };

    expect(calculateAge(loise)).toEqual(32);
  });

  it('should throw a "missing param p" error', () => {
    expect(() => calculateAge()).toThrow("missing param p");
  });

  it(`should throw a "it's not an object" error`, () => {
    expect(() => calculateAge("123456")).toThrow("it's not an object");
  });

  it('should throw a "birth is missing in the object" error', () => {
    expect(() => calculateAge({})).toThrow("birth is missing in the object");
  });

  it('should throw a "birth is not a date" error', () => {
    expect(() => calculateAge({ birth: "11/07/1991" })).toThrow(
      "birth is not a date"
    );
  });

  it('should throw a "wrong date" error', () => {
    const wrong = {
      birth: new Date("51/07/1991"),
    };
    expect(() => calculateAge(wrong)).toThrow("wrong date");
  });

  it("should return correct date next year", () => {
    const currentDate = new Date();
    const newDate = currentDate.setFullYear(currentDate.getFullYear() - 20);
    expect(calculateAge({ birth: new Date(newDate) })).toBe(20);
  });
});
