/**
 * Calculate a person's age in years.
 *
 * @param {object}  An object representing a person, implementing a birth Date parameter.
 * @return {number} The age in years of p
 */

import { isDate } from "util/types";

export function calculateAge(p) {
  if (!p) {
    throw new Error("missing param p");
  } else if (!(typeof p === "object")) {
    throw new Error("it's not an object");
  } else if (p.birth == null) {
    throw new Error("birth is missing in the object");
  } else if (!(p.birth instanceof Date)) {
    throw new Error("birth is not a date");
  } else if (isNaN(p.birth)) {
    throw new Error("wrong date");
  }

  let dateDiff = new Date(Date.now() - p.birth.getTime());
  let age = Math.abs(dateDiff.getUTCFullYear() - 1970);
  return age;
}
