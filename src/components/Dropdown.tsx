
interface DropdownProps {
  options: number[];
  value: number;
  onChange: (value: number) => void;
}

export default function Dropdown( props : DropdownProps) {

  return (

    <div className="flex items-center space-x-4">
        <h1> Parse Number: </h1>
    <select
      value={props.value}
      onChange={(e) => props.onChange(Number(e.target.value))}
      className="p-2 border rounded"
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
