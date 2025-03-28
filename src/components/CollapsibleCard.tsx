import { useState , useRef } from "react";
import "../App.css"; // Ensure styles are included

interface CollapsibleCardProps {
  title: string;
  defaultRules : string[];
  handleSetRules : (rules : string[]) => void
}


export default function CollapsibleCard({ title, defaultRules, handleSetRules}: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rules, setRules] = useState(defaultRules)
  
  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        const lines = fileContent.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        setRules(lines);
        handleSetRules(lines);
      };
      reader.readAsText(file);
    }
  };
  
  return (
    <div className="section border border-black-300 rounded-md">
      <div className="card-header bg-orange-800" onClick={() => setIsOpen(!isOpen)}>
        <h3 className=" text-black-100">{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      <div className={`card-content ${isOpen ? "open" : "closed"}`}>

        {/* Open File Dialog Button */}
        {/*<button onClick={() => fileInputRef.current?.click()}>Open File Dialog</button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".txt"
        /> 

       
        <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg">
        <button onClick={() => fileInputRef.current?.click()}
    type="submit" 
    className="mt-1 px-4 py-2 bg-yellow-500 text-black font-medium rounded-md border border-black shadow-md 
              hover:bg-yellow-600 hover:shadow-lg active:bg-red-700 transition-all"
  >
    Load File
  </button>
          <table className="w-full">
            
            <tbody>
              {rules && rules.map((x: string, index) => (
                <tr key={index} className="border-b">
                  <td className="p-2">{x}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>


      </div>
    </div>
  );
}