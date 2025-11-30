export interface Movie {
  id: string;
  title: string;
  year: number;
  genre: string;
  rating: number;
  watched: boolean;
  notes: string;
  posterUrl?: string;
  addedAt: string;
}

export class MovieDatabase {
  static async getAll(): Promise<Movie[]> {
    throw new Error('Database not implemented yet');
  }

  static async getById(id: string): Promise<Movie | null> {
    throw new Error('Database not implemented yet');
  }

  static async create(movie: Omit<Movie, 'id' | 'addedAt'>): Promise<Movie> {
    throw new Error('Database not implemented yet');
  }

  static async update(id: string, movie: Partial<Movie>): Promise<Movie> {
    throw new Error('Database not implemented yet');
  }

  static async delete(id: string): Promise<void> {
    throw new Error('Database not implemented yet');
  }
}
