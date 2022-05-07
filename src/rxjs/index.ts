import { mergeMap, from } from 'rxjs';

(() => {
  from([
    [1, 2, 3, 4],
    [5, 6, 7, 8],
  ])
    .pipe(mergeMap(value => value))
    .subscribe(console.log);
})();
