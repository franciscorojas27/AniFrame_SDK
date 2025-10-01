import { Genero, Status, Category } from "./enum/filter.js";
import { manifestAgreement } from "./types/agreement.js";

const manifest: manifestAgreement = {
  name: "animeav1",
  version: "1.0.0",
  urlPage: "https://animeav1.com",
  date_created: "2023-10-05",
  filterSupportedList: {
    status: Object.values(Status),
    genres: Object.values(Genero),
    type: Object.values(Category),
  },
};

export default manifest;
