import { useUserFilterStore } from "../../../store/userFilter.store";
import type { FilterUserType } from "../../../entities/filter.types";
import { useEffect, useRef, useState } from "react";
import { currentUserId } from "../../../utils/auth";
import styles from "../Filter.module.css";


function UserFilter() {
    const userId = currentUserId();
    const ref = useRef<HTMLDivElement>(null);
    const filters = useUserFilterStore((state) => state.getUserFilters(userId));
    const setUserFilters = useUserFilterStore((state) => state.setUserFilters);
    const [open, setOpen] = useState<FilterUserType | null>(null);

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter") {
            setUserFilters(userId, { search: "" });
        }
    };

    const handleToggle = (key: FilterUserType) => {
        setOpen((prev) => (prev === key ? null : key));
    }

    const handleSortOrderChange = (value: string) => {
        if (value === "asc" || value === "desc") {
            setUserFilters(userId, { sortOrder: value });
        }
    };

    const handleSortByChange = (value: string) => {
        if (value === "created_at" || value === "first_name" || value === "last_name") {
            setUserFilters(userId, { sortBy: value });
        }
    };

    useEffect(() => {
        function handleClickOutside(event: MouseEvent) {
            if (ref.current && !ref.current.contains(event.target as Node)) {
                setOpen(null);
            }
        }

        document.addEventListener("mousedown", handleClickOutside);
        return () => {
            document.removeEventListener("mousedown", handleClickOutside);
        };
    }, [ref]);


    return (
        <div className={styles["filter-container"]}>
            <input
                type="text"
                className={styles["input"]}
                placeholder="Введіть щось..."
                value={filters.search}
                onChange={(e) =>
                    setUserFilters(userId, { search: e.target.value })
                }
                onKeyDown={handleKeyDown}
            />

            <div ref={ref} className={styles["filter-wrapper"]}>
                <div className="relative">
                    <span onClick={() => handleToggle("status")} className="cursor-pointer">
                        Status
                    </span>
                    {open === "status" && (
                        <div className={styles["filter-dropdown"]}>
                            <div className={styles["title"]}>Статус:</div>
                            <label className="flex items-center gap-2 mb-1">
                                <input
                                    type="checkbox"
                                    checked={filters.status.includes("is_active")}
                                    onChange={() => setUserFilters(userId, { status: "is_active" })}
                                />
                                Активний
                            </label>
                            <label className="flex items-center gap-2 mb-1">
                                <input
                                    type="checkbox"
                                    checked={filters.status.includes("is_inactive")}
                                    onChange={() => setUserFilters(userId, { status: "is_inactive" })}
                                />
                                Не активний
                            </label>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <span onClick={() => handleToggle("date")} className="cursor-pointer">
                        Date
                    </span>
                    {open === "date" && (
                        <div className={styles["filter-dropdown"]}>
                            <div className={styles["title"]}>Виберіть дату:</div>
                            <input
                                type="date"
                                className="border p-1 rounded mb-2 w-full"
                                value={filters.dateFrom}
                                onChange={(e) => setUserFilters(userId, { dateFrom: e.target.value })}
                            />
                            <input
                                type="date"
                                className="border p-1 rounded w-full"
                                value={filters.dateTo}
                                onChange={(e) => setUserFilters(userId, { dateTo: e.target.value })}
                            />
                        </div>
                    )}
                </div>

                <div className="relative">
                    <span onClick={() => handleToggle("sortBy")} className="cursor-pointer">
                        Sorted By
                    </span>
                    {open === "sortBy" && (
                        <div className={styles["filter-dropdown"]}>
                            <div className={styles["title"]}>Сортувати по:</div>
                            <select
                                className="w-full border rounded p-1"
                                value={filters.sortBy}
                                onChange={(e) => handleSortByChange(e.target.value)}
                            >
                                <option value="created_at">Дата створення</option>
                                <option value="first_name">Ім'я</option>
                                <option value="last_name">Прізвище</option>
                            </select>
                        </div>
                    )}
                </div>

                <div className="relative">
                    <span onClick={() => handleToggle("sortOrder")} className="cursor-pointer">
                        Sorted Order
                    </span>
                    {open === "sortOrder" && (
                        <div className={styles["filter-dropdown"]}>
                            <div className={styles["title"]}>Сортувати за:</div>
                            <select
                                className="w-full border rounded p-1"
                                value={filters.sortOrder}
                                onChange={(e) => handleSortOrderChange(e.target.value)}
                            >
                                <option value="asc">За зростанням</option>
                                <option value="desc">За спаданням</option>
                            </select>
                        </div>
                    )}
                </div>
            </div>

            <hr className="mb-4" />
        </div>
    );
};


export default UserFilter