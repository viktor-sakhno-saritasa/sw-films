import { defer, Observable, Subject } from 'rxjs';
import { finalize } from 'rxjs/operators';

/**
 * The operators indicate and prepare are available in the
 * ngx-operators https://github.com/nilsmehlhorn/ngx-operators.
 */

/**
 * Operator which invokes a callback upon subscription.
 * This can be done using the RxJS method defer.
 * @param callback Callback which invokes upon subscription.
 * @returns Prepare operator.
 */
export function prepare<T>(callback: () => void):
(source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> => defer(
    () => {
    callback();
    return source;
  },
  );
}

/**
 * Using prepare operator, we'll update this subject upon subscription
 * to the actual source stream via indicator.next(true).
 * Similarly, we use the finalize operator to inform it
 * about the loading being completed via indicator.next(false).
 * @param indicator Subject of loading.
 * @returns Indicate operator.
 */
export function indicate<T>(indicator: Subject<boolean>):
(source: Observable<T>) => Observable<T> {
  return (source: Observable<T>): Observable<T> =>
  source.pipe(
    prepare(() => indicator.next(true)),
    finalize(() => indicator.next(false)),
  );
}
