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



 

contract YourContract is ERC721, ERC721URIStorage{
// 39.784133, -104.973355
//truncate numbers to 6 decimal places only

    uint256 public amount;
    int256 public real_x;
    int256 public real_y;


    constructor(uint256 _amount, int256 _real_x, int256 _real_y) ERC721("YourContract", "QRNFT") {
        amount = _amount;
        real_x = _real_x;
        real_y = _real_y;
    }

    int private x = 39784133;
    int private y = -104973355;
    uint private tokenID = 0 ; 
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

    function mint(address to, int real_x, int real_y) external {
        bool toggle = withinBounds(real_x, real_y);
        // only 20 available at this location
        if(toggle == true && tokenID <=amount)
        {
            string memory uri = Base64.encode(
            bytes(
                string(
                    abi.encodePacked(
                        '{"name": "QR-NFT-PROTOTYPE",',
                        '"description": "QR NFT associated with a real world location",',
                        '"image": "', "https://ipfs.io/ipfs/QmTgqnhFBMkfT9s8PHKcdXBn1f5bG3Q5hmBaR4U6hoTvb1?filename=Chainlink_Elf.png", '",'
                        '"attributes": [',
                        '{',
                            '"trait_type": "distance",',
                            '"value": ', "test value",
                            '}]'
                        '}'
                    )
                )
            )
            );
        // Create token URI
        string memory finalTokenURI = string(
            abi.encodePacked("data:application/json;base64,", uri)
        );
        _mint(to, tokenID);
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

contract Factory {
    address public owner;
    address[] private contracts;

    constructor() {
        owner = msg.sender;
    }

    modifier onlyOwner() {
        require(msg.sender == owner, "Only the contract owner can access this function");
        _;
    }

    function createContract(uint256 amount, int256 real_x, int256 real_y) public onlyOwner {
        address newContract = address(new YourContract(amount, real_x, real_y));
        contracts.push(newContract);
    }

    function getContracts() public view onlyOwner returns (address[] memory) {
        return contracts;
    }
}