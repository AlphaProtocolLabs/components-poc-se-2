from dotenv import load_dotenv
import os
import abis
from web3 import Web3
import json
import time

# cd code_snippets
# pipenv shell
# pipenv install
# python3 addEvent.py

PRIVATE_KEY = os.environ.get("DEPLOYER_PRIVATE_KEY")
WALLET_ADDRESS = os.environ.get("DEPLOYER_WALLET_ADDRESS")
Alchemy_key = os.environ.get("ALCHEMY_API_KEY")

_abi = abis.mumbai_factory_abi
factory_contract_address = 0xD5FFB26021A64725E76CB51873149F0873DC177B

rpc_endpoint = f"https://polygon-mumbai.g.alchemy.com/v2/{Alchemy_key}"
ws_endpoint = ""
print(rpc_endpoint)


# RPC
provider = Web3.HTTPProvider(rpc_endpoint, request_kwargs={"timeout": 60})
web3 = Web3(provider)
print(web3.isConnected())

# WEBSOCKET
# provider = Web3.WebsocketProvider(ws_endpoint, websocket_timeout=60)
# web3 = Web3(provider)

factory_contract = web3.eth.contract(
    address=Web3.toChecksumAddress(factory_contract_address),
    abi=_abi,
)

try:
    # function addLocation(string memory name , int256 real_long, int256 real_lat, uint256 maxTokenSupply , uint256 start_timeStamp , uint256 end_timeStamp , string memory URI)
    contract_addresses = factory_contract.functions.getContracts().call()
    print(contract_addresses)

except Exception as error:
    print(error)
