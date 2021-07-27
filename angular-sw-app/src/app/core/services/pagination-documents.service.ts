import { Injectable } from '@angular/core';
import { CollectionReference, QueryDocumentSnapshot } from '@angular/fire/firestore';

/**
 * Service for storage documents snapshots for firestore pagination.
 * Not singleton. Inject in every component for different pagination cases.
 */
@Injectable({
  providedIn: 'any'
})
export class PaginationDocumentsService {

  /** Latest  document in response for pagination. */
  private latestEntryInResponse: QueryDocumentSnapshot<unknown> | null = null;

  /** First document in response for pagination. */
  private firstEntryInResponse: QueryDocumentSnapshot<unknown> | null = null;

  /** First document in previous response push in the stack for previous pagination. */
  private firstEntryInPrevResponseStack: QueryDocumentSnapshot<unknown>[] = [];

  // public get latestEntryInResponse(): QueryDocumentSnapshot<unknown> | null {
  //   return this.latestEntryInResponse;
  // }

  /**
   * RESET
   * this.firstEntryInPrevResponseStack = [];
   * this.firstEntryInResponse = null;
   * this.latestEntryInResponse = null;
   *
   * SAVE:
   * this.firstEntryInResponse = this.getOneFromList(docs, true);
   * this.latestEntryInResponse = this.getOneFromList(docs, false);
   *
   * Push and pop
   */

  /** Reset documents state because of pagination's reset. */
  public reset(): void {
    this.firstEntryInPrevResponseStack = [];
    this.firstEntryInResponse = null;
    this.latestEntryInResponse = null;
  }

  /**
   * Push first document in response to the stack for use after
   * for access to the previous page.
   * Push when user go the next page.
   * @param document First document in current response.
   */
  public push(document: QueryDocumentSnapshot<unknown>): void {
    this.firstEntryInPrevResponseStack.push(document);
  }

  /** Pop document from the stack. If user go to the previous page. */
  public pop(): void {
    this.firstEntryInPrevResponseStack.pop();
  }
}
