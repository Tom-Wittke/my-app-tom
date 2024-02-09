import {
  calculateAge,
  isAdult,
  isCompleted,
  isValid,
  isValidZipCode,
  regexEmail,
  regexNames,
} from "./App.js";

let birth;
beforeAll(() => {
  birth = new Date(2000, 3, 22);
});

/**
 * @function calculateAge
 */
describe("calculateAge Unit Test Suites", () => {
  it("should return a correct age", () => {
    expect(calculateAge(birth)).toEqual(23);
  });

  it('should throw a "Missing parameter date" error', () => {
    expect(() => calculateAge()).toThrow("Missing parameter date");
  });
});

/**
 * @function isAdult
 */
describe("isAdult function", () => {
  it("should return true", () => {
    expect(isAdult(birth)).toBeTruthy();
  });
  it("should return false", () => {
    const younger = new Date(2015, 3, 22);
    expect(isAdult(younger)).toBeFalsy();
  });
  it("should throw 'Missing parameter date' error", () => {
    expect(() => isAdult()).toThrow("Missing parameter date");
  });
});

/**
 * @function isCompleted
 */
describe("isCompleted function", () => {
  let userData;
  beforeEach(() => {
    userData = {
      firstname: "Tom",
      lastname: "Wittke",
      birthDate: new Date(2000, 3, 22),
      city: "Saint-Laurent-du-Var",
      email: "wtom@live.fr",
      zipCode: "06700",
    };
  });
  it("should return true", () => {
    expect(isCompleted(userData)).toBeTruthy();
  });
  it("should return false", () => {
    userData.firstname = "";
    expect(isCompleted(userData)).toBeFalsy();
  });
  it("should throw 'Missing parameter userData' error", () => {
    expect(() => isCompleted()).toThrow("Missing parameter userData");
  });
});

/**
 * @function isValid
 */
describe("isValid function", () => {
  let userDataErrors;
  beforeEach(() => {
    userDataErrors = {
      firstname: "",
      lastname: "",
      email: "",
      birthDate: "",
      city: "",
      zipCode: "",
    };
  });
  it("should return true when userDataErrors does not contains errors", () => {
    expect(isValid(userDataErrors)).toBeTruthy();
  });
  it("should return false when at least one field is on error", () => {
    userDataErrors.firstname = "Prénom invalide.";
    expect(isValid(userDataErrors)).toBeFalsy();
  });
});

/**
 * @function isValidZipCode
 */
describe("isValidZipCode function", () => {
  it("should return 'Le code postal ne doit pas contenir de lettre.' string error", () => {
    const zipCode = "abc";
    expect(isValidZipCode(zipCode)).toEqual(
      "Le code postal ne doit pas contenir de lettre."
    );
  });
  it("should return 'Le code postal doit contenir au minimum 5 chiffres.' string error", () => {
    const zipCode = "0670";
    expect(isValidZipCode(zipCode)).toEqual(
      "Le code postal doit contenir au minimum 5 chiffres."
    );
  });
  it("should return 'Le code postal doit contenir au maximum 5 chiffres.' string error", () => {
    const zipCode = "067000";
    expect(isValidZipCode(zipCode)).toEqual(
      "Le code postal doit contenir au maximum 5 chiffres."
    );
  });
  it("should return empty error string", () => {
    const zipCode = "06700";
    expect(isValidZipCode(zipCode)).toEqual();
  });
});

/**
 * Test regex
 */
describe("Regex validations", () => {
  it("should return true when firstname respect regex", () => {
    const b = regexNames.test("Tom");
    expect(b).toBeTruthy();
  });
  it("should return false when firstname contains special char", () => {
    const b = regexNames.test("To/m");
    expect(b).toBeFalsy();
  });
  it("should return true when lastname respect regex", () => {
    const b = regexNames.test("Wittke");
    expect(b).toBeTruthy();
  });
  it("should return false when lastname contains special char", () => {
    const b = regexNames.test("Witt/ke");
    expect(b).toBeFalsy();
  });
  it("should return true when email respect regex", () => {
    const b = regexEmail.test("wtom@live.fr");
    expect(b).toBeTruthy();
  });
  it("should return false when email does not contains '@'", () => {
    const b = regexEmail.test("wtomlive.fr");
    expect(b).toBeFalsy();
  });
  it("should return false when email does not contains '.' after domains", () => {
    const b = regexEmail.test("wtom@livefr");
    expect(b).toBeFalsy();
  });
});
