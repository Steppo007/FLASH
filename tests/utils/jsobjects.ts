/**
 * Represents an object whose values are lists of type T
 */
export type ObjectWithArrayValues<T> = Record<string, T[]>;

/**
 * Represents an object whose values are of type T
 */
export type ObjectWithValues<T> = Record<string, T>;

/**
 * Given an object whose values are all lists, this function returns a list of objects
 * by taking a sort of cartesian product of those lists. For example,
 * On input
 * {variant: ["primary", "ghost"], hover: [true, false]},
 * it will return
 * [{variant: "primary", hover: true}, {variant: "primary", hover: false}, {variant: "ghost", hover: true}, {variant: "ghost", hover: false}]
 */
export function expandObjectWithArrayValues<T>(
  objectWithArrayValues: ObjectWithArrayValues<T>
): ObjectWithValues<T>[] {
  const obj = objectWithArrayValues; // e.g. {a: [true, false], b: ["x", "y"]}
  const keys = Object.keys(obj); // -> ["a", "b"]
  const lists = keys.map((key) => obj[key]); // -> [[true, false], ["x", "y"]]
  let elementCombinations = cartesian(...lists); // -> [[true, "x"], [true, "y"], [false, "x"], [false, "y"]]

  // correction in case of degenarate conditions
  if (keys.length === 1)
    elementCombinations = elementCombinations.map((x) => [x]);

  elementCombinations = elementCombinations as T[][];
  const objectsWithValues: ObjectWithValues<T>[] = [];
  elementCombinations.forEach((combination) => {
    const objectWithValues: ObjectWithValues<T> = {};
    for (const i in keys) {
      const key = keys[i];
      objectWithValues[key] = combination[i];
    }
    objectsWithValues.push(objectWithValues);
  });

  return objectsWithValues; // -> [{a: true, b: "x"}, {a: true, b: "y"}, {a: false, b: "x"}, {a: false, b: "y"}]
}

/**
 *
 * Takes the cartesian product of a list of arrays. Thanks to this stack exchange post:
 * https://stackoverflow.com/questions/12303989/cartesian-product-of-multiple-arrays-in-javascript
 *
 * In other words, cartesian([0, 1], ["a", "b"], ["x", "y"]) =
 * [[0, "a", "x"], [0, "a", "y"], [0, "b", "x"], [0, "b", "y"], [1, "a", "x"], [1, "a", "y"], [1, "b", "x"], [1, "b", "y"]]
 */
const cartesian = (...a) =>
  a.reduce((b, c) => b.flatMap((d) => c.map((e) => [d, e].flat())));
