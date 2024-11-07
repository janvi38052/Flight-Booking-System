import { SelectQueryBuilder } from 'typeorm';

export function applyPagination<T>(
  query: SelectQueryBuilder<T>,
  page = 1,
  pageSize = 2,
): SelectQueryBuilder<T> {
  const offset = (page - 1) * pageSize;
  return query.skip(offset).take(pageSize);
}
