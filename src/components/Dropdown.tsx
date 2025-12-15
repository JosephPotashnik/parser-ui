
interface DropdownProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}

export default function Dropdown( props : DropdownProps) {

  return (
    <div className="flex items-center gap-4 justify-center mb-4">
      <label className="label">
        <span className="label-text text-lg font-semibold">Parse Number:</span>
      </label>
      <select
        value={props.value}
        onChange={(e) => props.onChange(Number(e.target.value))}
        className="select select-bordered select-primary w-24"
      >
        {props.options.map((option) => (
          <option key={option} value={option}>
            {option}
          </option>
        ))}
      </select>
    </div>
  );
};
