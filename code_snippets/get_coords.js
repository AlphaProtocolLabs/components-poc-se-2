import mint_contract_abi from 'contracts.js'
import event_host_abi from 'contracts.js'


const eventHostContractInstance = new web3.eth.Contract(event_host_abi, contractAddress);
const result = await eventHostContractInstance.methods.getContracts().call();
print(result)
var available_events = []
result.forEach(address => available_events.push(new web3.eth.Contract(mint_contract_abi, address)));
x = available_events.length;
var coords = []
for (let i = 0; i < x; i++) {
    coords = await available_events[i].methods.getCoords().call();
    coords = coords/1000000; //converts to usable coords
    coords_list.push(coords)
  }


