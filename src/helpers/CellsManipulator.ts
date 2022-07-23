import { Cell, CellState, Coordinates, Field } from "./Field";

export const getNieghboursCoords = ([y, x]: Coordinates): Record<
  string,
  [number, number]
> => ({
  top: [y - 1, x],
  topRight: [y - 1, x + 1],
  right: [y, x + 1],
  rightBottom: [y + 1, x + 1],
  bottom: [y + 1, x],
  bottomLeft: [y + 1, x - 1],
  left: [y, x - 1],
  leftTop: [y - 1, x - 1],
});

export const checkCoordsInField = (
  [y, x]: Coordinates,
  { length }: Field
): boolean => y >= 0 && x >= 0 && length - y > 0 && length - x > 0;

export const incrementNeighbours = (
  coordinates: Coordinates,
  field: Field
): Field => {
  const neighborCoords = getNieghboursCoords(coordinates);

  for (const coord of Object.values(neighborCoords)) {
    if (checkCoordsInField(coord, field)) {
      const [y, x] = coord;
      const cell = field[y][x];
      if (cell < CellState.MINE - 1) {
        field[y][x] = (cell + 1) as Cell;
      }
    }
  }

  return field;
};
