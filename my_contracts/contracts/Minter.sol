// SPDX-License-Identifier: SEE LICENSE IN LICENSE
pragma solidity ^0.8.20;
import "@openzeppelin/contracts/token/ERC20/ERC20.sol";

contract Token is ERC20{

    string public token_name;
    string public token_description;
    
    constructor()ERC20("NAToken","NHK"){
        token_name = "NAToken";
    }
    function MintToken(address to,uint256 amount) public{
        _mint(to, amount);
    }
    function BurnToken(address from,uint256 amount) public{
        _burn(from, amount);
    }
}


contract Minter {

    IERC20 public token;

    address public wallet_address;
    address public owner;
    string public message;
    uint256 public balance;
    
    constructor(string memory _message,address token_address)
    {
        token = IERC20(token_address);
        message = _message;
        owner = msg.sender;
        balance = 0;
    }

    event Logger(string message);
    event Balance(uint256 number);

    function mint_tokens(address _wallet_address,uint256 _amount) public  {
        wallet_address = _wallet_address;
        Token(address(token)).MintToken(_wallet_address,_amount);
        
        emit Logger('Minted tokens');
    }
    function burn_tokens(address _wallet_address,uint256 _amount) public {
        wallet_address = _wallet_address;
        Token(address(token)).BurnToken(_wallet_address,_amount);
        emit Logger('Burned tokens');
    }
    function transferTo(address _wallet_address,address _to, uint256 _amount) public {
        wallet_address = _wallet_address;
        Token(address(token)).BurnToken(_wallet_address,_amount);
        Token(address(token)).MintToken(_to,_amount);
        emit Logger('Transfered tokens');
    }
    function getBalance(address _wallet_address) public view returns(uint256){
       
        return token.balanceOf(_wallet_address);
    }
    
}
