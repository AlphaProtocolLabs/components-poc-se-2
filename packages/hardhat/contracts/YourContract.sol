// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";

contract Location is ERC721, ERC721URIStorage{
// 39.784133, -104.973355
//truncate numbers to 6 decimal places only

    int256 public longitude;
    int256 public latitude;

    //TODO make public attribute 
    uint256 public tokenID = 0; 
    string public location_URI;
    
    string public location_name;
    uint256 public max_token_supply;

    uint256 public start_timeStamp;   //Used in Mint function . 
    uint256 public end_timeStamp;

    mapping(address => bool) public nft_owners;
    
    
    constructor(string memory _name ,int256 _longitude, int256 _latitude, uint256 _token_supply, uint256 _start_timeStamp , uint256 _end_timeStamp, string memory _URI) ERC721("Location", "LOC") {
        location_name = _name;
        longitude = _longitude;
        latitude = _latitude;
        max_token_supply = _token_supply;
        start_timeStamp = _start_timeStamp;
        end_timeStamp = _end_timeStamp;
        location_URI = _URI;
    }
    
    struct coords {
        int longitude;
        int latitude;
    }

    function getCoords() public view returns (coords memory) {
        return coords(longitude, latitude);
    }

    function mint(string memory _URI) external {
        // only 20 available at this location

        //TODO TIME STAMP CHECK 
        uint time = block.timestamp;
        
        if(nft_owners[msg.sender] == false && time > start_timeStamp && time < end_timeStamp && tokenID < max_token_supply)
        {
            _mint(msg.sender, tokenID);
            _setTokenURI(tokenID, _URI);
            nft_owners[msg.sender] = true;
            tokenID = tokenID + 1 ; 
        }
    }


    function is_nft_owner(address _address) public view returns (bool) {
        
        return nft_owners[_address];
    }

    function _burn(uint256 _tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(_tokenId);
    }

    function tokenURI(uint256 tokenId)
         public
         view
         override(ERC721, ERC721URIStorage)
         returns (string memory)
     {
         return super.tokenURI(tokenId);
     }

}

contract LocationFactory {
    address public owner;
    address[] private contracts;
    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can access this function");
        _;
    }

    function addLocation(string memory name , int256 real_long, int256 real_lat, uint256 maxTokenSupply , uint256 start_timeStamp , uint256 end_timeStamp , string memory URI) public onlyOwner returns (address) {
        
        address newContract = address(new Location(name, real_long, real_lat, maxTokenSupply, start_timeStamp, end_timeStamp, URI));
        contracts.push(newContract);
        return newContract;
    }

    function getContracts() public view returns (address[] memory) {
        return contracts;
    }
}