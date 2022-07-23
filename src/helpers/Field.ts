import { incrementNeighbours } from "./CellsManipulator";

export type Cell = 0 | 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8 | 9 | 10 | 11 | 12;
export type Field = Cell[][];
export type Coordinates = [number, number];

type cellType = "EMPTY" | "MINE" | "HIDDEN" | "MARK" | "MARK_WEAK";

export const CellState: Record<cellType, Cell> = {
  EMPTY: 0,
  MINE: 9,
  HIDDEN: 10,
  MARK: 11,
  MARK_WEAK: 12,
};

export const emptyFieldGenerator = (
  fieldSize: number,
  state: Cell = CellState.EMPTY
): Field =>
  new Array(fieldSize).fill(null).map(() => new Array(fieldSize).fill(state));

export const fieldGenerator = (
  fieldSize: number,
  mineProbability: number
): Field => {
  if (mineProbability < 0 || mineProbability > 1) {
    throw new Error("Mine probability must be between 0 and 1");
  }

  let unprocessedCells = fieldSize * fieldSize;
  let restCellsWithMines = unprocessedCells * mineProbability;

  const result = emptyFieldGenerator(fieldSize);

  for (let y = 0; y < fieldSize; y++) {
    for (let x = 0; x < fieldSize; x++) {
      if (restCellsWithMines === 0) {
        return result;
      }
      if (restCellsWithMines / unprocessedCells > Math.random()) {
        result[y][x] = CellState.MINE;
        incrementNeighbours([y, x], result);
        restCellsWithMines--;
      }
      unprocessedCells--;
    }
  }

  return result;
};
