mumbai_factory_abi = [
    {"inputs": [], "stateMutability": "nonpayable", "type": "constructor"},
    {
        "inputs": [
            {"internalType": "string", "name": "name", "type": "string"},
            {"internalType": "int256", "name": "real_long", "type": "int256"},
            {"internalType": "int256", "name": "real_lat", "type": "int256"},
            {"internalType": "uint256", "name": "maxTokenSupply", "type": "uint256"},
            {"internalType": "uint256", "name": "start_timeStamp", "type": "uint256"},
            {"internalType": "uint256", "name": "end_timeStamp", "type": "uint256"},
            {"internalType": "string", "name": "URI", "type": "string"},
        ],
        "name": "addLocation",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "nonpayable",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "getContracts",
        "outputs": [{"internalType": "address[]", "name": "", "type": "address[]"}],
        "stateMutability": "view",
        "type": "function",
    },
    {
        "inputs": [],
        "name": "owner",
        "outputs": [{"internalType": "address", "name": "", "type": "address"}],
        "stateMutability": "view",
        "type": "function",
    },
]
