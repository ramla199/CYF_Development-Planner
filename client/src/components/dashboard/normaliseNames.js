// Normalise first and last names

import { capitalise } from "./capitalise"
export function normaliseNames(firstname,lastname) {
  return capitalise(firstname) + " " + capitalise(lastname);
}
