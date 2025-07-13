import { create } from "zustand";


export interface IFilterValues {
  search: string;
  sortBy: "created_at" | "first_name" | "last_name";
  sortOrder: "asc" | "desc";
  status: "is_active" | "is_inactive" | "all";
  dateFrom: string;
  dateTo: string;
}

interface IUserFilterStore {
  filters: Record<string, IFilterValues>;
  setUserFilters: (userId: number, values: Partial<IFilterValues>) => void;
  getUserFilters: (userId: number) => IFilterValues;
  resetUserFilters: (userId: number) => void;
}

const defaultFilter: IFilterValues = {
  sortBy: "created_at",
  sortOrder: "desc",
  status: "all",
  search: "",
  dateFrom: "",
  dateTo: "",
};

export const useUserFilterStore = create<IUserFilterStore>((set, get) => ({
  filters: {},

  setUserFilters: (userId, values) => {
    const current = get().filters[userId] || defaultFilter;
    set({
      filters: {
        ...get().filters,
        [userId]: {
          ...current,
          ...values,
        },
      },
    });
  },
  getUserFilters: (userId) => {
    return get().filters[userId] || defaultFilter;
  },

  resetUserFilters: (userId) => {
    set({
      filters: {
        ...get().filters,
        [userId]: defaultFilter,
      },
    });
  },
}));
