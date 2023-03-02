// SPDX-License-Identifier: MIT
pragma solidity ^0.8.17;

// Useful for debugging. Remove when deploying to a live network.
import "hardhat/console.sol";
// Use openzeppelin to inherit battle-tested implementations (ERC20, ERC721, etc)
// import "@openzeppelin/contracts/access/Ownable.sol";

import "@openzeppelin/contracts/token/ERC721/extensions/ERC721URIStorage.sol";
import "@openzeppelin/contracts/utils/Counters.sol";
import "@openzeppelin/contracts/utils/Strings.sol";
import "@openzeppelin/contracts/utils/Base64.sol";



 

contract Event is ERC721, ERC721URIStorage{
// 39.784133, -104.973355
//truncate numbers to 6 decimal places only

    uint256 public token_supply;
    int256 public x;
    int256 public y;
    uint private tokenID = 0 ; 
    string public finalTokenURI;

    constructor(uint256 _token_supply, int256 _x, int256 _y, string memory URI) ERC721("YourContract", "QRNFT") {
        token_supply = _token_supply;
        x = _x;
        y = _y;
        finalTokenURI = URI;
    }

    struct coords {
        int x;
        int y;
    }

    function getCoords() public view returns (coords memory) {
        return coords(x, y);
    }

    function coordDifference(int real_x, int real_y) public view{
        int delta_x = real_x - x;
        int delta_y = real_y - y;
    }

    function abs(int x) internal pure returns (uint) {
        if(x < 0) {
            return uint(-x);
        }
        return uint(x);
    }

    function withinBounds(int real_x, int real_y) public view returns (bool) {
        int delta_x = real_x - x;
        int delta_y = real_y - y;
        //100 m within targets
        uint new_x =abs(delta_x);
        uint new_y =abs(delta_y);
        // has to be below 900 , 900 is 100 meters 50 meter is 450
        if(new_x <=450 && new_y <=450)
        {
            return true;
        }
        else
        {
            return false;
        }

    }

    function mint(int real_x, int real_y) external {
        bool toggle = withinBounds(real_x, real_y);
        // only 20 available at this location
        if(toggle == true && tokenID < token_supply)
        {
            _mint(msg.sender, tokenID);
            _setTokenURI(tokenID, finalTokenURI);
            tokenID = tokenID + 1 ; 
        }
    }



    function _burn(uint256 tokenId) internal override(ERC721, ERC721URIStorage) {
        super._burn(tokenId);
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

contract EventHost {
    address public owner;
    address[] private contracts;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can access this function");
        _;
    }

    function createContract(uint256 amount, int256 real_x, int256 real_y, string memory URI) public onlyOwner {
        address newContract = address(new Event(amount, real_x, real_y, URI));
        contracts.push(newContract);
    }

    function getContracts() public view returns (address[] memory) {
        return contracts;
    }
}