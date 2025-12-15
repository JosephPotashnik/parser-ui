interface sentenceInputProps 
{
    onSubmitSentenceInputForm: (value: string) => void 
}
export function SentenceInput(props : sentenceInputProps) {


    const handleSubmit = (event: React.FormEvent<HTMLFormElement>) => {
        event.preventDefault(); // Prevent the default form submission
    
        const formData = new FormData(event.currentTarget);
        const inputValue = formData.get("inputField") as string; // Assert as string
        props.onSubmitSentenceInputForm(inputValue);
      };
      return (
<form onSubmit={handleSubmit} className="flex justify-center p-4">
  <div className="flex items-center gap-4">
    <label htmlFor="inputField" className="label">
      <span className="label-text text-lg font-semibold">Sentence:</span>
    </label>
    <input
      type="text"
      id="inputField"
      name="inputField"
      className="input input-bordered input-primary w-[50vw] bg-base-100"
      placeholder="Enter a sentence to parse..."
    />

    <button
      type="submit"
      className="btn btn-accent"
    >
      Submit
    </button>
  </div>
</form>
    );
}

