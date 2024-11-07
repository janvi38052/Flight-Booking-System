import { SelectQueryBuilder } from 'typeorm';

export function applyFilters<T>(
  query: SelectQueryBuilder<T>,
  filters: { [key: string]: any },
): SelectQueryBuilder<T> {
  // Loop through each filter key
  for (const key in filters) {
    // Skip 'page', 'pageSize', 'sortBy', and 'order' as they are for pagination and sorting
    if (key !== 'page' && key !== 'pageSize' && key !== 'sortBy' && key !== 'order') {
      // Only apply the filter if the value is defined
      if (filters[key] !== undefined) {
        query.andWhere(`${key} = :${key}`, { [key]: filters[key] });
      }
    }
  }

  return query;
}
