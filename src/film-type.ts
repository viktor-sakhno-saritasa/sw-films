export interface Film {
  title: string;
  director: string;
  producer: string;
  episodeId: number;
  releaseDate: string;
  description: string;
}

export type filmLocalStorageType = Film | null;
