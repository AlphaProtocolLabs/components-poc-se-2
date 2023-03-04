//this is how you will receive the .json
//const encodedData = "data:application/json;base64,eyJuYW1lIjogIlFSLU5GVC1QUk9UT1RZUEUiLCJkZXNjcmlwdGlvbiI6ICJRUiBORlQgYXNzb2NpYXRlZCB3aXRoIGEgcmVhbCB3b3JsZCBsb2NhdGlvbiIsImltYWdlIjogImh0dHBzOi8vaXBmcy5pby9pcGZzL1FtVGdxbmhGQk1rZlQ5czhQSEtjZFhCbjFmNWJHM1E1aG1CYVI0VTZob1R2YjE/ZmlsZW5hbWU9Q2hhaW5saW5rX0VsZi5wbmciLCJhdHRyaWJ1dGVzIjogW3sidHJhaXRfdHlwZSI6ICJkaXN0YW5jZSIsInZhbHVlIjogdGVzdCB2YWx1ZX1dfQ==";

const jsonStr = atob(encodedData.split(',')[1]);
const jsonData = JSON.parse(jsonStr);

console.log(jsonData);
