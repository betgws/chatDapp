// SPDX-License-Identifier: UNLICENSED
pragma solidity ^0.8.28;

import "@openzeppelin/contracts/token/ERC721/ERC721.sol";

contract yundda is ERC721{

    uint256 public totalSupply;
    uint256 public totalChannels;
    address public nftAddress; 

    struct Channel{

        uint256 cid;
        string name;
        uint256 cost;
        address channelOwner;
    }

    constructor(string memory name, string memory symbol) ERC721(name, symbol){

    }

    function createChannel(string memory name, uint256 cost) public{
        totalChannels++;
        channels[totalChannels] = Channel(totalChannels, name, cost, msg.sender);

        channelOwner[totalChannels] = msg.sender;

        mint(totalChannels);
    }

    function mint(uint256 id) public payable{
        require(totalChannels <= id);
         _safeMint(msg.sender, totalChannels);
    }

    function approveSale(uint256 _nftID) public {
        approval[_nftID][msg.sender] = true;
    }

    function finalize(uint256 _nftID) public payable{
        require(approval[_nftID][channelOwner[_nftID]]);
        require(approval[_nftID][buyer[_nftID]]);
        require(msg.value >= channels[_nftID].cost);

        address previousOwner = channels[_nftID].channelOwner;
        payable(previousOwner).transfer(msg.value);
        address newOwner = buyer[_nftID];

        

        _transfer(previousOwner, newOwner, _nftID);
        channels[_nftID].channelOwner = newOwner;

        approval[_nftID][previousOwner] = false;
        approval[_nftID][newOwner] = false;
        buyer[_nftID] = address(0);
        


    }


     mapping(uint256 => address) public buyer;
     mapping(uint256 => address) public channelOwner;
     mapping(uint256 => Channel) public channels;
     mapping(uint256 => bool) public isListed;
     mapping(uint256 => mapping(address => bool)) public approval;






}