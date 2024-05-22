import { Client } from "domain/invoice/entities/Client";

const DEFAULT_ADDRESS = `55 avenue de Juvisy
91390 Morsang-sur-Orge`;

export const HOST_CLIENT: Client = {
  name: "DUMONT KEVIN ET LUZIO GLORIA",
  address: DEFAULT_ADDRESS,
  phone: "+33 7 62 06 43 74",
  email: "k.dumont1994@gmail.com",
};

export const NAME_MAPPER = {
  nightPrice: "Nuitée",
  stayTaxes: "Taxes de séjour",
  cleaningFees: "Frais de ménage",
};
