import { create } from "zustand";

type FilterType = "status" | "date" | "sort" ;

interface IFilterStore {
    open: FilterType | null;
    inputValue: string;
    sort: string;
    dateFrom: string;
    dateTo: string;
    status: string[];
    setInputValue: (value: string) => void;
    clearInput: () => void;
    toggle: (key: FilterType) => void;
    setSort: (value: string) => void;
    setDateFrom: (value: string) => void;
    setDateTo: (value: string) => void;
    toggleStatus: (value: string) => void;
};

export const useFilterStore = create<IFilterStore>((set, get) => ({
    open: null,
    inputValue: "",
    sort: "default",
    dateFrom: "",
    dateTo: "",
    status: [],
    setInputValue: (value) => set({ inputValue: value }),
    clearInput: () => set({ inputValue: "" }),
    toggle: (key) => {
        const currentOpen = get().open;
        set({ open: currentOpen === key ? null : key });
    },
    setSort: (value) => set({sort: value}),
    setDateFrom: (value) => set({dateFrom: value}),
    setDateTo: (value) => set({dateTo: value}),
    toggleStatus: (value) => {
        const current = get().status;
        const exists = current.includes(value);
        const updated = exists ? current.filter((s) => s !== value) : [...current, value];
        set({ status: updated });
    }
}));
