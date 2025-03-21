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
        <div style={{ maxWidth: "600px", width: "100%", margin: "0 auto", display: "inline-block" }}>
            <input
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                onKeyDown={handleKeyDown}
                placeholder="Type something..."
                style={{
                    width: "100%", 
                    padding: "10px", 
                    fontSize: "16px", 
                    borderRadius: "5px", 
                    border: "1px solid #ccc",
                }}
            />
        </div>
    );
}

