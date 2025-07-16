import Select from "@/components/atoms/Select";

const StatusFilter = ({ value, onChange, options, label = "Filter by Status" }) => {
  return (
    <div className="w-48">
      <Select
        label={label}
        value={value}
        onChange={(e) => onChange(e.target.value)}
      >
        <option value="">All Statuses</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </Select>
    </div>
  );
};

export default StatusFilter;