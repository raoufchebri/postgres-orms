
import { integer, pgTable, text, numeric, boolean} from 'drizzle-orm/pg-core';

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