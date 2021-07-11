/**
 * Interface for collection data.
 */
export interface collectionType {
  [key: string]: string | undefined;

  /** In a lot of case property name needed for create template. */
  name?: string;

  /** Property for the vehicle. */
  vehicle_class?: string;

  /** Property for the starship. */
  starship_class?: string;
}
