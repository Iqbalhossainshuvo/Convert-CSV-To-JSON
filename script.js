document.getElementById('csvFile').addEventListener('change', handleFileSelect, false);

function handleFileSelect(event) {
  const file = event.target.files[0];
  const reader = new FileReader();

  reader.onload = function (e) {
    const csv = e.target.result;
    const json = convertCsvToJson(csv);
    // displayJson(json);
    console.log(json);
  };

  reader.readAsText(file);
}

function convertCsvToJson(csv) {
  const lines = csv.split('\n');
  const result = [];

  const headers = lines[0].split(',');
  for (let i = 1; i < lines.length; i++) {
    const obj = {};
    const currentLine = lines[i].split(',');

    for (let j = 0; j < headers.length; j++) {
      obj[headers[j]] = currentLine[j];
    }

    result.push(obj);
  }

  return result;
}

function displayJson(json) {
  const outputSection = document.getElementById('output-section');
  outputSection.textContent = JSON.stringify(json, null, 2);
}
