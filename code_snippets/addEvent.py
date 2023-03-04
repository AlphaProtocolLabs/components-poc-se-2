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
factory_contract_address = 0xF1FF3E3E0395B4B8BB75747022C7B97E22037544

rpc_endpoint = f"https://polygon-mumbai.g.alchemy.com/v2/{Alchemy_key}"
ws_endpoint = ""
print(rpc_endpoint)
_TRANSACTION_GAS = 3000000  # THIS IS the gas limit from the claim reward function
_GAS_PRICE = 57500000000  # THIS IS THE GAS PRICE = 27.5 GWEI


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
with open("./abis/events.json") as f:
    # Load the contents of the file as a Python object
    events = json.load(f)

for event in events:
    # Extract the variables from the event dictionary
    event_name = event["event_name"]
    longitude = event["longitude"]
    latitude = event["latitude"]
    TokenSupply = event["TokenSupply"]
    StartTimeStamp = event["StartTimeStamp"]
    EndTimeStamp = event["EndTimeStamp"]
    URI = event["URI"]

    try:
        # function addLocation(string memory name , int256 real_long, int256 real_lat, uint256 maxTokenSupply , uint256 start_timeStamp , uint256 end_timeStamp , string memory URI)
        nonce = web3.eth.get_transaction_count(WALLET_ADDRESS)
        tx = factory_contract.functions.addLocation(
            event_name,
            longitude,
            latitude,
            TokenSupply,
            StartTimeStamp,
            EndTimeStamp,
            URI,
        ).build_transaction(
            {
                "nonce": nonce,
                "gas": _TRANSACTION_GAS,
                "gasPrice": _GAS_PRICE,
            }
        )

        signed_tx = web3.eth.account.sign_transaction(tx, private_key=PRIVATE_KEY)
        print(signed_tx)
        print("Sending transaction...")
        print(web3.eth.send_raw_transaction(signed_tx.rawTransaction).hex())
        print("Success , I think \n")
        time.sleep(4)

    except Exception as error:
        print(error)
