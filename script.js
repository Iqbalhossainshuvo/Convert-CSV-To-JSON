// Attaching an event listener to the 'change' event of the file input element with id 'csvFile'
// When the user selects a file, the 'handleFileSelect' function will be called
document.getElementById('csvFile').addEventListener('change', handleFileSelect, false);

// Function to handle the file selection and conversion
function handleFileSelect(event) {
  // Getting the selected file
  const file = event.target.files[0];
  
  // Creating a FileReader object to read the file contents
  const reader = new FileReader();

  // When the file is loaded, this function will be executed
  reader.onload = function (e) {
    // Extracting the CSV content from the file
    const csv = e.target.result;
    
    // Converting the CSV to JSON
    const json = convertCsvToJson(csv);
    
    // Displaying the JSON in the output section
    displayJson(json);
  };

  // Start reading the file as text
  reader.readAsText(file);
}

// Function to convert CSV content to JSON
function convertCsvToJson(csv) {
  // Splitting the CSV content into lines
  const lines = csv.split('\n');
  
  // Creating an empty array to store the resulting JSON objects
  const result = [];

  // Extracting the headers from the first line
  const headers = lines[0].split(',');
  
  // Looping through the lines starting from the second line
  for (let i = 1; i < lines.length; i++) {
    // Creating an empty object to store the values
    const obj = {};
    
    // Splitting the current line into values
    const currentLine = lines[i].split(',');

    // Looping through the headers and assigning values to corresponding keys in the object
    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    // Adding the object to the result array
    result.push(obj);
  }

  // Returning the resulting JSON array
  return result;
}

// Function to display the JSON in the output section
function displayJson(json) {
  // Getting the output section element
  const outputSection = document.getElementById('output-section');
  
  // Setting the text content of the output section to the JSON string representation
  // The 'null' parameter is for the replacer function, and '2' is for indentation
  outputSection.textContent = JSON.stringify(json, null, 2);
}
