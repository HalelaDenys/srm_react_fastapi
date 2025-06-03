import styles from "./FilterItem.module.css";
import { useFilterStore } from "../../store/filterStore";


function FilterItem() {


  const open = useFilterStore((state) => state.open);
  const inputValue = useFilterStore((state) => state.inputValue);
  const sort = useFilterStore((state) => state.sort);
  const dateFrom = useFilterStore((state) => state.dateFrom);
  const dateTo = useFilterStore((state) => state.dateTo);
  const status = useFilterStore((state) => state.status);

  const toggle = useFilterStore((state) => state.toggle);
  const setInputValue = useFilterStore((state) => state.setInputValue);
  const clearInput = useFilterStore((state) => state.clearInput);
  const setSort = useFilterStore((state) => state.setSort);
  const setDateFrom = useFilterStore((state) => state.setDateFrom);
  const setDateTo = useFilterStore((state) => state.setDateTo);
  const toggleStatus = useFilterStore((state) => state.toggleStatus);



  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === "Enter") {
      console.log(status);
      clearInput();
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
                  onChange={() => toggleStatus("active")}
                />
                Активний
              </label>
              <label className="flex items-center gap-2 mb-1">
                <input
                  type="checkbox"
                  checked={status.includes("booked")}
                  onChange={() => toggleStatus("booked")}
                />
                Заброньовано
              </label>
              <label className="flex items-center gap-2">
                <input
                  type="checkbox"
                  checked={status.includes("completed")}
                  onChange={() => toggleStatus("completed")}
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
