import { useState } from "react";

interface sentenceInputProps 
{
    onSubmit: (value: string) => void 
}
export function SentenceInput(props : sentenceInputProps) {

    const [input, setInput] = useState("");

    const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
        if (event.key === "Enter" && input.trim()) {
            props.onSubmit(input);
        }
      };

    return (
        <div style={{ width: "100%", padding: "0 20px" }}>
            <input
            type="text"
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={handleKeyDown}
            placeholder="Type something..."
            style={{
                width: "100%", // Full screen width
                padding: "10px", // Padding for better appearance
                fontSize: "16px", // Font size for readability
                borderRadius: "5px", // Rounded corners
                border: "1px solid #ccc", // Light border
              }}            />
        </div>
      );
}

