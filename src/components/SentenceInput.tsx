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
        
      
<form onSubmit={handleSubmit} className="flex justify-center ">
  <div className="flex items-center space-x-4">
    <label htmlFor="inputField" className="text-sm font-medium">Sentence:</label>
    <input
      type="text"
      id="inputField"
      name="inputField" // Needed for form submission
      className="mt-1 text-center block p-2 border border-black-300 shadow-md rounded-md min-w-[50vw]"
    />

  <button
    type="submit" 
    className="mt-1 px-4 py-2 bg-yellow-500 text-black font-medium rounded-md border border-black shadow-md 
              hover:bg-yellow-600 hover:shadow-lg active:bg-red-700 transition-all"
  >
    Submit
  </button>
  </div>
</form>



    );
}

