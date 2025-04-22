function ResponseDisplay({ response }) {
    if (!response) {
      return null;
    }
  
    if (response.error) {
      return (
        <div className="mt-4 p-4 bg-red-100 text-red-700 rounded">
          Error: {response.error}
        </div>
      );
    }
  
    return (
      <div className="mt-4 p-4 bg-gray-100 rounded">
        <h3 className="text-lg font-semibold">Response</h3>
        <p>{response.text || 'No response text available'}</p>
      </div>
    );
  }
  
  export default ResponseDisplay;