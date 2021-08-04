/**
 * Transform date in need format.
 * @param date Date in default format.
 * @returns Cropped date string.
 */
export const transformDate = (date: Date | undefined): string | undefined => date ? date.toISOString().split('T')[0] : date;
