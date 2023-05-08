
import { integer, pgTable, text, numeric, boolean} from 'drizzle-orm/pg-core';

export interface Data {
    kyselyLatencies?: number[],
    drizzleLatencies?: number[],
    pgLatencies?: number[],
    pgPercentiles? :{p75:number, p90:number, p99:number}
    kyselyPercentiles? :{p75:number, p90:number, p99:number}
    drizzlePercentiles? :{p75:number, p90:number, p99:number}
    error?: any,
  }
  
  interface AtomTable {
    AtomicNumber: number;
    Element: string | null;
    Symbol: string | null;
    AtomicMass: number | null;
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
    AtomicRadius: number | null;
    Electronegativity: number | null;
    FirstIonization: number | null;
    Density: number | null;
    MeltingPoint: number | null;
    BoilingPoint: number | null;
    NumberOfIsotopes: number | null;
    Discoverer: string | null;
    Year: number | null;
    SpecificHeat: number | null;
    NumberOfShells: number | null;
    NumberOfValence: number | null;
  }

  export interface ItemTable {
    Embedding: number[] | null,
    n_tokens: number | null,
    text: string | null
  }
  
  export interface Database {
    atoms: AtomTable,
  }

  export const periodicTable = pgTable('atoms', {
    AtomicNumber: integer('AtomicNumber').notNull(),
    Element: text('Element'),
    Symbol: text('Symbol'),
    AtomicMass: numeric('AtomicMass'),
    NumberOfNeutrons: integer('NumberOfNeutrons'),
    NumberOfProtons: integer('NumberOfProtons'),
    NumberOfElectrons: integer('NumberOfElectrons'),
    Period: integer('Period'),
    Group: integer('Group'),
    Phase: text('Phase'),
    Radioactive: boolean('Radioactive'),
    Natural: boolean('Natural'),
    Metal: boolean('Metal'),
    Nonmetal: boolean('Nonmetal'),
    Metalloid: boolean('Metalloid'),
    Type: text('Type'),
    AtomicRadius: numeric('AtomicRadius'),
    Electronegativity: numeric('Electronegativity'),
    FirstIonization: numeric('FirstIonization'),
    Density: numeric('Density'),
    MeltingPoint: numeric('MeltingPoint'),
    BoilingPoint: numeric('BoilingPoint'),
    NumberOfIsotopes: integer('NumberOfIsotopes'),
    Discoverer: text('Discoverer'),
    Year: integer('Year'),
    SpecificHeat: numeric('SpecificHeat'),
    NumberOfShells: integer('NumberOfShells'),
    NumberOfValence: integer('NumberOfValence'),
  });