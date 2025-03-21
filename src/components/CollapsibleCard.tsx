import { useState, useRef } from "react";
import "../App.css"; // Ensure styles are included

interface CollapsibleCardProps {
  title: string;
}

export default function CollapsibleCard({ title }: CollapsibleCardProps) {
  const [isOpen, setIsOpen] = useState(true);
  const [strings, setStrings] = useState<string[]>([]);
  const fileInputRef = useRef<HTMLInputElement | null>(null);

  // Handle file selection
  const handleFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onload = () => {
        const fileContent = reader.result as string;
        const lines = fileContent.split("\n").map(line => line.trim()).filter(line => line.length > 0);
        setStrings(lines);
      };
      reader.readAsText(file);
    }
  };

  // Parse strings into part of speech -> words pairs (assuming format: "POS -> word")
  const parsedData = strings
    .map(line => line.split("->").map(part => part.trim()))
    .filter(pair => pair.length === 2) as [string, string][];

  // Group words by part of speech
  const groupedData: Record<string, string[]> = parsedData.reduce((acc, [pos, word]) => {
    acc[pos] = acc[pos] ? [...acc[pos], word] : [word];
    return acc;
  }, {} as Record<string, string[]>);

  return (
    <div className="section">
      <div className="card-header" onClick={() => setIsOpen(!isOpen)}>
        <h3>{title}</h3>
        <span>{isOpen ? "▲" : "▼"}</span>
      </div>
      <div className={`card-content ${isOpen ? "open" : "closed"}`}>

        {/* Open File Dialog Button */}
        <button onClick={() => fileInputRef.current?.click()}>Open File Dialog</button>

        {/* Hidden File Input */}
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={handleFileChange}
          accept=".txt"
        />

       
        {/* Table View */}
          <table>
            <thead>
              <tr>
                <th>Part of Speech</th>
                <th>Word</th>
              </tr>
            </thead>
            <tbody>
              {parsedData.map(([pos, word], index) => (
                <tr key={index}>
                  <td>{pos}</td>
                  <td>{word}</td>
                </tr>
              ))}
            </tbody>
          </table>
      </div>
    </div>
  );
}