import { useState, useRef, useEffect } from "react";
const API_URL = import.meta.env.VITE_API_URL || 'http://localhost:5158';

interface CollapsibleCardProps {
  title: string;
  defaultRules: string[];
  handleSetRules: (rules: string[]) => void;
  routeName : string;
}

export default function CollapsibleCard({ title, defaultRules, handleSetRules, routeName }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const fileInputRef = useRef<HTMLInputElement | null>(null);
  const [rules, setRules] = useState(defaultRules);
  const [files, setFiles] = useState<string[]>([]);
  const [showDropdown, setShowDropdown] = useState(false);
  const textMeasureRef = useRef<HTMLSpanElement | null>(null);
  const [dropdownWidth, setDropdownWidth] = useState<string>("auto");

  // Fetch files from server on mount
  useEffect(() => {
    const fetchFiles = async () => {
      try {
        const response = await fetch(`${API_URL}/${routeName}`); // Adjust API endpoint
        if (!response.ok) throw new Error("Failed to fetch files");
        const data = await response.json();
        setFiles(data); // Assuming data is an array of filenames


        // Measure longest filename width
      if (textMeasureRef.current) {
        const longestName = data.reduce((a : string, b : string) => (a.length > b.length ? a : b), "");
        textMeasureRef.current.innerText = longestName;
        setDropdownWidth(`${textMeasureRef.current.offsetWidth + 20}px`); // Add padding
      }

      } catch (error) {
        console.error("Error fetching files:", error);
      }
    };

    fetchFiles();
  }, []);

  const handleFileSelect = async (fileName: string) => {
    try {
      const response = await fetch(`${API_URL}/${routeName}/${fileName}`); // Fetch file content from server
      if (!response.ok) throw new Error("Failed to load file");
  
      const text = await response.text();
  
      // Process file content: Trim, split, and filter out empty & commented lines
      const lines = text
        .split("\n")
        .map(line => line.trim())
        .filter(line => line.length > 0 && !line.startsWith("#")); // Ignore comments
  
      setRules(lines);
      handleSetRules(lines);
      setShowDropdown(false);
      
    } catch (error) {
      console.error("Error loading file:", error);
    }
  };
  // Handle file upload
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        const lines = fileContent.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        setRules(lines);
        handleSetRules(lines);
        setShowDropdown(false);
      };
      reader.readAsText(file);
    }
  };

  return (
    <div className="section border border-black-300 rounded-md">
      {/* Collapsible Header */}
      <div className="card-header bg-orange-800 flex justify-between p-2 cursor-pointer" onClick={() => setIsOpen(!isOpen)}>
        <h3 className="text-white">{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="card-content p-4">
          {/* Button to toggle dropdown */}
          <button
            className="px-4 py-2 bg-blue-500 text-white rounded-lg relative"
            onClick={() => setShowDropdown(!showDropdown)}
          >
            Select or Upload File
          </button>

          {/* Dropdown Menu */}
          {showDropdown && (
  <div
    className="absolute left-0 mt-2 bg-white border rounded-lg shadow-lg z-50"
    style={{ width: dropdownWidth }}
  >
              {files.length > 0 ? (
                files.map((file, index) => (
                  <button
                    key={index}
                    className="block w-full px-4 py-2 text-left hover:bg-gray-200"
                    onClick={() => handleFileSelect(file)}
                  >
                    {file}
                  </button>
                ))
              ) : (
                <p className="px-4 py-2 text-gray-500">No files available</p>
              )}

              {/* Open File Dialog Button */}
              <button
                className="block w-full px-4 py-2 text-left bg-green-500 text-white hover:bg-green-600"
                onClick={() => fileInputRef.current?.click()}
              >
                Upload New File
              </button>
            </div>
          )}

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".txt"
          />

          {/* Display Rules in Table */}
          <div className="max-h-60 overflow-y-auto border border-gray-300 rounded-lg mt-4">
            <table className="w-full border-collapse">
              <tbody>
                {rules.map((x: string, index) => (
                  <tr key={index} className="border-b">
                    <td className="p-2">{x}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
    </div>
  );
}
