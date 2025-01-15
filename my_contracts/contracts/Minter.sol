// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Minter is ERC20 {
    address public wallet_address;
    address public owner;
    string public message;
    
    constructor(string memory _message)
    ERC20("My_token","NHK"){
        message = _message;
        owner = msg.sender;
    }

    event Logger(string message);

    function mint_tokens(address _wallet_address,uint256 _amount) public  {
        wallet_address = _wallet_address;
        _mint(wallet_address, _amount);
        
        emit Logger('Minted tokens');
    }
    function burn_tokens(address _wallet_address,uint256 _amount) public {
        wallet_address = _wallet_address;
        _burn(wallet_address, _amount);
        emit Logger('Burned tokens');
    }
    function transferTo(address _wallet_address,address _to, uint256 _amount) public {
        wallet_address = _wallet_address;
        _burn(wallet_address, _amount);
        _mint(_to, _amount);
        emit Logger('Transfered tokens');
    }
}
