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
    <div className="card bg-base-100 shadow-xl border border-base-300">
      {/* Collapsible Header */}
      <div
        className="card-header bg-primary text-primary-content flex justify-between p-4 cursor-pointer rounded-t-lg hover:bg-opacity-90 transition-all"
        onClick={() => setIsOpen(!isOpen)}
      >
        <h3 className="card-title text-lg">{title}</h3>
        <span className="text-xl">{isOpen ? "▲" : "▼"}</span>
      </div>

      {/* Collapsible Content */}
      {isOpen && (
        <div className="card-body p-4">
          {/* Button to toggle dropdown */}
          <div className="relative">
            <button
              className="btn btn-secondary btn-sm mb-2"
              onClick={() => setShowDropdown(!showDropdown)}
            >
              Select or Upload File
            </button>

            {/* Dropdown Menu */}
            {showDropdown && (
              <div
                className="absolute left-0 mt-2 bg-base-100 border border-base-300 rounded-lg shadow-xl z-50 menu"
                style={{ width: dropdownWidth }}
              >
                {files.length > 0 ? (
                  files.map((file, index) => (
                    <li key={index}>
                      <button
                        className="text-left hover:bg-base-200"
                        onClick={() => handleFileSelect(file)}
                      >
                        {file}
                      </button>
                    </li>
                  ))
                ) : (
                  <li className="px-4 py-2 text-base-content opacity-50">No files available</li>
                )}

                {/* Open File Dialog Button */}
                <li>
                  <button
                    className="bg-success text-success-content hover:bg-success hover:brightness-90"
                    onClick={() => fileInputRef.current?.click()}
                  >
                    Upload New File
                  </button>
                </li>
              </div>
            )}
          </div>

          {/* Hidden file input */}
          <input
            type="file"
            ref={fileInputRef}
            className="hidden"
            onChange={handleFileChange}
            accept=".txt"
          />

          {/* Display Rules in Table */}
          <div className="overflow-x-auto max-h-60 border border-base-300 rounded-lg">
            <table className="table table-xs table-pin-rows">
              <tbody>
                {rules.map((x: string, index) => (
                  <tr key={index} className="hover">
                    <td className="text-sm">{x}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      )}
      {/* Hidden span for text measurement */}
      <span ref={textMeasureRef} className="absolute invisible whitespace-nowrap"></span>
    </div>
  );
}
