import { SelectQueryBuilder } from 'typeorm';

export function applySorting<T>(
  query: SelectQueryBuilder<T>,
  sortBy: string,
  order: 'ASC' | 'DESC' = 'ASC',
): SelectQueryBuilder<T> {
  if (sortBy) {
    query.orderBy(sortBy, order);
  }
  return query;
}
