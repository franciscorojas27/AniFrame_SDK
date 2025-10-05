import { Category, Genero, Status } from "../enums/filter.js";

export class ArgumentsFilter {
  static validateGenres(genres: Genero[]): Genero[] {
    if (genres.length === 0) return [];
    return Array.from(
      new Set(genres.filter((genre) => Object.values(Genero).includes(genre)))
    );
  }
  static validateStatus(status: Status): string | undefined {
    if (Object.values(Status).includes(status as Status)) return status;
    return undefined;
  }
  static validateCategory(category: Category): string | undefined {
    if (Object.values(Category).includes(category as Category)) return category;
    return undefined;
  }
}
