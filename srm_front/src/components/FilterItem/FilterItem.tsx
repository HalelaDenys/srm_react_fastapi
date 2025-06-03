import { useState } from "react";
import styles from "./FilterItem.module.css";

type FilterType = "status" | "date" | "sort";

function FilterItem() {
  const [open, setOpen] = useState<FilterType | null>(null);
  const [inputValue, setInputValue] = useState("");
  const [_, setSearch] = useState("");
  const [status, setStatus] = useState<string[]>([]);
  const [dateFrom, setDateFrom] = useState<string>("");
  const [dateTo, setDateTo] = useState<string>("");
  const [sort, setSort] = useState<string>("default");

  const toggle = (name: FilterType) => {
    setOpen(open === name ? null : name);
  };

  const handleCheckBoxChange = (value: string) => {
    setStatus((prev) => {
      if (prev.includes(value)) {
        return prev.filter((item) => item !== value);
      } else {
        return [...prev, value];
      }
    });
  };

  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      setSearch(inputValue);
      setInputValue(""); // очищаємо поле
    }
  };

  return (
    <div className={styles["filter-container"]}>
      <input
        type="text"
        className={styles["input"]}
        placeholder="Введіть щось..."
        value={inputValue}
        onChange={(e) => setInputValue(e.target.value)}
        onKeyDown={handleKeyDown}
      />

      <div className={styles["filter-wrapper"]}>
        <div className="relative">
          <span onClick={() => toggle("status")} className="cursor-pointer">
            Status
          </span>
          {open === "status" && (
            <div className={styles["filter-dropdown"]}>
              <div className={styles["title"]}>Статус:</div>
              <label className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={status.includes("active")}
                  onChange={() => handleCheckBoxChange("active")}
                />
                Активний
              </label>
              <label className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={status.includes("booked")}
                  onChange={() => handleCheckBoxChange("booked")}
                />
                Заброньовано
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={status.includes("completed")}
                  onChange={() => handleCheckBoxChange("completed")}
                />
                Завершено
              </label>
            </div>
          )}
        </div>

        <div className="relative">
          <span onClick={() => toggle("date")} className="cursor-pointer">
            Date
          </span>
          {open === "date" && (
            <div className={styles["filter-dropdown"]}>
              <div className={styles["title"]}>Виберіть дату:</div>
              <input
                type="date"
                className="border p-1 rounded mb-2 w-full"
                value={dateFrom}
                onChange={(e) => setDateFrom(e.target.value)}
              />
              <input
                type="date"
                className="border p-1 rounded w-full"
                value={dateTo}
                onChange={(e) => setDateTo(e.target.value)}
              />
            </div>
          )}
        </div>

        <div className="relative">
          <span onClick={() => toggle("sort")} className="cursor-pointer">
            Sorted
          </span>
          {open === "sort" && (
            <div className={styles["filter-dropdown"]}>
              <div className={styles["title"]}>Сортування:</div>
              <select
                className="w-full border rounded p-1"
                value={sort}
                onChange={(e) => setSort(e.target.value)}
              >
                <option value="default">За замовчуванням</option>
                <option value="dateDesc">За датою (новіші)</option>
                <option value="alphabet">За алфавітом</option>
              </select>
            </div>
          )}
        </div>
      </div>
      <hr />
    </div>
  );
}

export default FilterItem;
