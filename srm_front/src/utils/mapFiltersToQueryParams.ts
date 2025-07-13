import type { UserQueryParams } from "../entities/user.types";
import type { IFilterValues } from "../store/userFilter.store";

export default function mapFiltersToQueryParams(filters: IFilterValues): UserQueryParams{
    return {
        status: filters.status,
        search: filters.search,
        date_from: filters.dateFrom,
        date_to: filters.dateTo,
        sort_by: filters.sortBy,
        sort_order: filters.sortOrder
    }
};