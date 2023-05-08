import type { ColumnType } from "kysely";

export type Numeric = ColumnType<string, string | number, string | number>;

export interface PeriodicTable {
  AtomicNumber: number;
  Element: string | null;
  Symbol: string | null;
  AtomicMass: Numeric | null;
  NumberOfNeutrons: number | null;
  NumberOfProtons: number | null;
  NumberOfElectrons: number | null;
  Period: number | null;
  Group: number | null;
  Phase: string | null;
  Radioactive: boolean | null;
  Natural: boolean | null;
  Metal: boolean | null;
  Nonmetal: boolean | null;
  Metalloid: boolean | null;
  Type: string | null;
  AtomicRadius: Numeric | null;
  Electronegativity: Numeric | null;
  FirstIonization: Numeric | null;
  Density: Numeric | null;
  MeltingPoint: Numeric | null;
  BoilingPoint: Numeric | null;
  NumberOfIsotopes: number | null;
  Discoverer: string | null;
  Year: number | null;
  SpecificHeat: Numeric | null;
  NumberOfShells: number | null;
  NumberOfValence: number | null;
}

export interface DB {
  atoms: PeriodicTable;
}
