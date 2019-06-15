export function mapReduce<TSource, TOut>(source: TSource[], initial: TOut, reducer: (reduction: TOut, element: TSource) => TOut): TOut {
  var output = initial;
  source.forEach(element => {
    output = reducer(output, element);
  });
  return output;
}
