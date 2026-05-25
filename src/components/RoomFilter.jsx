const ALL_TYPES = ["all", "single", "double", "family", "presidential"];

export function RoomFilter({ rooms, criteria, onChange }) {
  const maxPriceOption = Math.max(...rooms.map((r) => r.price), 0);
  const maxSizeOption = Math.max(...rooms.map((r) => r.size), 0);

  return (
    <form className="filter-form" aria-label="filter rooms" onSubmit={(e) => e.preventDefault()}>
      <div className="filter-field">
        <label htmlFor="f-type">Type</label>
        <select
          id="f-type"
          value={criteria.type}
          onChange={(e) => onChange({ ...criteria, type: e.target.value })}
        >
          {ALL_TYPES.map((t) => <option key={t} value={t}>{t}</option>)}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="f-capacity">Guests</label>
        <select
          id="f-capacity"
          value={criteria.minCapacity}
          onChange={(e) => onChange({ ...criteria, minCapacity: Number(e.target.value) })}
        >
          {[1, 2, 3, 4, 5, 6].map((n) => <option key={n} value={n}>{n}+</option>)}
        </select>
      </div>

      <div className="filter-field">
        <label htmlFor="f-price">Max price (R{criteria.maxPrice.toLocaleString()})</label>
        <input
          id="f-price"
          type="range"
          min={0}
          max={maxPriceOption}
          step={100}
          value={Math.min(criteria.maxPrice, maxPriceOption)}
          onChange={(e) => onChange({ ...criteria, maxPrice: Number(e.target.value) })}
        />
      </div>

      <div className="filter-field">
        <label htmlFor="f-size">Min size (m²)</label>
        <input
          id="f-size"
          type="range"
          min={0}
          max={maxSizeOption}
          step={50}
          value={criteria.minSize}
          onChange={(e) => onChange({ ...criteria, minSize: Number(e.target.value) })}
        />
      </div>

      <div className="filter-field checkboxes">
        <label>
          <input
            type="checkbox"
            checked={criteria.petsAllowed}
            onChange={(e) => onChange({ ...criteria, petsAllowed: e.target.checked })}
          />
          Pets
        </label>
        <label>
          <input
            type="checkbox"
            checked={criteria.breakfastIncluded}
            onChange={(e) => onChange({ ...criteria, breakfastIncluded: e.target.checked })}
          />
          Breakfast
        </label>
      </div>
    </form>
  );
}
