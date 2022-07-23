import { emptyFieldGenerator, CellState, fieldGenerator, Cell } from "./Field";

const { EMPTY, MINE, HIDDEN } = CellState;
const cellWithMineFilter = (cell: Cell) => cell === MINE;

describe("Field Generator", () => {
  describe("emptyFieldGenerator Test", () => {
    it("2x2 Field", () => {
      expect(emptyFieldGenerator(2)).toStrictEqual([
        [EMPTY, EMPTY],
        [EMPTY, EMPTY],
      ]);
    });
    it("3x3 Field", () => {
      expect(emptyFieldGenerator(3)).toStrictEqual([
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY],
      ]);
    });
    it("3x3 Field With All Hidden", () => {
      expect(emptyFieldGenerator(3, HIDDEN)).toStrictEqual([
        [HIDDEN, HIDDEN, HIDDEN],
        [HIDDEN, HIDDEN, HIDDEN],
        [HIDDEN, HIDDEN, HIDDEN],
      ]);
    });
  });
  describe("Simple field cases", () => {
    it("Invalid mine probability", () => {
      const errorText = "Mine probability must be between 0 and 1";
      expect(() => fieldGenerator(1, -1)).toThrow(errorText);
      expect(() => fieldGenerator(1, 2)).toThrow(errorText);
    });
    it("Smallest field without any mine", () => {
      expect(fieldGenerator(1, 0)).toStrictEqual([[EMPTY]]);
    });
    it("Smallest field with mine", () => {
      expect(fieldGenerator(1, 1)).toStrictEqual([[MINE]]);
    });
    it("Big field without mine", () => {
      expect(fieldGenerator(10, 0)).toStrictEqual([
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
        [EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY, EMPTY],
      ]);
    });
    it("2x2 field with 50% probability", () => {
      const field = fieldGenerator(2, 0.5);
      const flatField = field.flat();

      const cellsWithBombs = flatField.filter(cellWithMineFilter);
      const emptyCells = flatField.filter((cell: Cell) => cell === 2);

      expect(cellsWithBombs).toHaveLength(2);
      expect(emptyCells).toHaveLength(2);
    });
    it("Real game field size = 10x10 with 1/4 mined cells (25 mines)", () => {
      const size = 10;
      const mines = 25;

      const probability = mines / (size * size);
      const field = fieldGenerator(size, probability);
      const flatField = field.flat();

      expect(flatField.filter(cellWithMineFilter)).toHaveLength(25);
    });
  });
});
