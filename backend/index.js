import express from "express";
import cors from "cors";

import body_parser from "body-parser";
import { JsonRpcProvider, Contract, ethers, ZeroAddress } from "ethers";
import { sign } from "crypto";

const app = express();
app.use(cors());
app.use(body_parser.json());

let contract;

app.get("/deploy", async (req,res) =>{



const provider = new JsonRpcProvider("http://127.0.0.1:8545/");
const signer  = await provider.getSigner(0);
const token_ABI = [
  {
    "inputs": [],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "allowance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientAllowance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "balance",
        "type": "uint256"
      },
      {
        "internalType": "uint256",
        "name": "needed",
        "type": "uint256"
      }
    ],
    "name": "ERC20InsufficientBalance",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "approver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidApprover",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "receiver",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidReceiver",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "sender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSender",
    "type": "error"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "ERC20InvalidSpender",
    "type": "error"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Approval",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": true,
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "indexed": true,
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "Transfer",
    "type": "event"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "BurnToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "amount",
        "type": "uint256"
      }
    ],
    "name": "MintToken",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "owner",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      }
    ],
    "name": "allowance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "spender",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "approve",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "account",
        "type": "address"
      }
    ],
    "name": "balanceOf",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "decimals",
    "outputs": [
      {
        "internalType": "uint8",
        "name": "",
        "type": "uint8"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "symbol",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token_description",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token_name",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "totalSupply",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transfer",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "from",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "value",
        "type": "uint256"
      }
    ],
    "name": "transferFrom",
    "outputs": [
      {
        "internalType": "bool",
        "name": "",
        "type": "bool"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "function"
  }
];

const token_bytecode = '0x608060405234801561001057600080fd5b506040518060400160405280600781526020017f4e41546f6b656e000000000000000000000000000000000000000000000000008152506040518060400160405280600381526020017f4e484b0000000000000000000000000000000000000000000000000000000000815250816003908161008c9190610339565b50806004908161009c9190610339565b5050506040518060400160405280600781526020017f4e41546f6b656e00000000000000000000000000000000000000000000000000815250600590816100e39190610339565b5061040b565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061016a57607f821691505b60208210810361017d5761017c610123565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026101e57fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff826101a8565b6101ef86836101a8565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061023661023161022c84610207565b610211565b610207565b9050919050565b6000819050919050565b6102508361021b565b61026461025c8261023d565b8484546101b5565b825550505050565b600090565b61027961026c565b610284818484610247565b505050565b5b818110156102a85761029d600082610271565b60018101905061028a565b5050565b601f8211156102ed576102be81610183565b6102c784610198565b810160208510156102d6578190505b6102ea6102e285610198565b830182610289565b50505b505050565b600082821c905092915050565b6000610310600019846008026102f2565b1980831691505092915050565b600061032983836102ff565b9150826002028217905092915050565b610342826100e9565b67ffffffffffffffff81111561035b5761035a6100f4565b5b6103658254610152565b6103708282856102ac565b600060209050601f8311600181146103a35760008415610391578287015190505b61039b858261031d565b865550610403565b601f1984166103b186610183565b60005b828110156103d9578489015182556001820191506020850194506020810190506103b4565b868310156103f657848901516103f2601f8916826102ff565b8355505b6001600288020188555050505b505050505050565b6111428061041a6000396000f3fe608060405234801561001057600080fd5b50600436106100cf5760003560e01c806370a082311161008c578063a9059cbb11610066578063a9059cbb14610218578063dcdea89814610248578063dd62ed3e14610264578063e12923b914610294576100cf565b806370a08231146101ac578063947a3168146101dc57806395d89b41146101fa576100cf565b806306fdde03146100d4578063095ea7b3146100f257806318160ddd1461012257806323b872dd14610140578063310d3f6914610170578063313ce5671461018e575b600080fd5b6100dc6102b0565b6040516100e99190610d96565b60405180910390f35b61010c60048036038101906101079190610e51565b610342565b6040516101199190610eac565b60405180910390f35b61012a610365565b6040516101379190610ed6565b60405180910390f35b61015a60048036038101906101559190610ef1565b61036f565b6040516101679190610eac565b60405180910390f35b61017861039e565b6040516101859190610d96565b60405180910390f35b61019661042c565b6040516101a39190610f60565b60405180910390f35b6101c660048036038101906101c19190610f7b565b610435565b6040516101d39190610ed6565b60405180910390f35b6101e461047d565b6040516101f19190610d96565b60405180910390f35b61020261050b565b60405161020f9190610d96565b60405180910390f35b610232600480360381019061022d9190610e51565b61059d565b60405161023f9190610eac565b60405180910390f35b610262600480360381019061025d9190610e51565b6105c0565b005b61027e60048036038101906102799190610fa8565b6105ce565b60405161028b9190610ed6565b60405180910390f35b6102ae60048036038101906102a99190610e51565b610655565b005b6060600380546102bf90611017565b80601f01602080910402602001604051908101604052809291908181526020018280546102eb90611017565b80156103385780601f1061030d57610100808354040283529160200191610338565b820191906000526020600020905b81548152906001019060200180831161031b57829003601f168201915b5050505050905090565b60008061034d610663565b905061035a81858561066b565b600191505092915050565b6000600254905090565b60008061037a610663565b905061038785828561067d565b610392858585610712565b60019150509392505050565b600680546103ab90611017565b80601f01602080910402602001604051908101604052809291908181526020018280546103d790611017565b80156104245780601f106103f957610100808354040283529160200191610424565b820191906000526020600020905b81548152906001019060200180831161040757829003601f168201915b505050505081565b60006012905090565b60008060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020549050919050565b6005805461048a90611017565b80601f01602080910402602001604051908101604052809291908181526020018280546104b690611017565b80156105035780601f106104d857610100808354040283529160200191610503565b820191906000526020600020905b8154815290600101906020018083116104e657829003601f168201915b505050505081565b60606004805461051a90611017565b80601f016020809104026020016040519081016040528092919081815260200182805461054690611017565b80156105935780601f1061056857610100808354040283529160200191610593565b820191906000526020600020905b81548152906001019060200180831161057657829003601f168201915b5050505050905090565b6000806105a8610663565b90506105b5818585610712565b600191505092915050565b6105ca8282610806565b5050565b6000600160008473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008373ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905092915050565b61065f8282610888565b5050565b600033905090565b610678838383600161090a565b505050565b600061068984846105ce565b90507fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff81101561070c57818110156106fc578281836040517ffb8f41b20000000000000000000000000000000000000000000000000000000081526004016106f393929190611057565b60405180910390fd5b61070b8484848403600061090a565b5b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036107845760006040517f96c6fd1e00000000000000000000000000000000000000000000000000000000815260040161077b919061108e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036107f65760006040517fec442f050000000000000000000000000000000000000000000000000000000081526004016107ed919061108e565b60405180910390fd5b610801838383610ae1565b505050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108785760006040517fec442f0500000000000000000000000000000000000000000000000000000000815260040161086f919061108e565b60405180910390fd5b61088460008383610ae1565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff16036108fa5760006040517f96c6fd1e0000000000000000000000000000000000000000000000000000000081526004016108f1919061108e565b60405180910390fd5b61090682600083610ae1565b5050565b600073ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff160361097c5760006040517fe602df05000000000000000000000000000000000000000000000000000000008152600401610973919061108e565b60405180910390fd5b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff16036109ee5760006040517f94280d620000000000000000000000000000000000000000000000000000000081526004016109e5919061108e565b60405180910390fd5b81600160008673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020819055508015610adb578273ffffffffffffffffffffffffffffffffffffffff168473ffffffffffffffffffffffffffffffffffffffff167f8c5be1e5ebec7d5bd14f71427d1e84f3dd0314c0f7b2291e5b200ac8c7c3b92584604051610ad29190610ed6565b60405180910390a35b50505050565b600073ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff1603610b33578060026000828254610b2791906110d8565b92505081905550610c06565b60008060008573ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002054905081811015610bbf578381836040517fe450d38c000000000000000000000000000000000000000000000000000000008152600401610bb693929190611057565b60405180910390fd5b8181036000808673ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff16815260200190815260200160002081905550505b600073ffffffffffffffffffffffffffffffffffffffff168273ffffffffffffffffffffffffffffffffffffffff1603610c4f5780600260008282540392505081905550610c9c565b806000808473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff168152602001908152602001600020600082825401925050819055505b8173ffffffffffffffffffffffffffffffffffffffff168373ffffffffffffffffffffffffffffffffffffffff167fddf252ad1be2c89b69c2b068fc378daa952ba7f163c4a11628f55a4df523b3ef83604051610cf99190610ed6565b60405180910390a3505050565b600081519050919050565b600082825260208201905092915050565b60005b83811015610d40578082015181840152602081019050610d25565b60008484015250505050565b6000601f19601f8301169050919050565b6000610d6882610d06565b610d728185610d11565b9350610d82818560208601610d22565b610d8b81610d4c565b840191505092915050565b60006020820190508181036000830152610db08184610d5d565b905092915050565b600080fd5b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610de882610dbd565b9050919050565b610df881610ddd565b8114610e0357600080fd5b50565b600081359050610e1581610def565b92915050565b6000819050919050565b610e2e81610e1b565b8114610e3957600080fd5b50565b600081359050610e4b81610e25565b92915050565b60008060408385031215610e6857610e67610db8565b5b6000610e7685828601610e06565b9250506020610e8785828601610e3c565b9150509250929050565b60008115159050919050565b610ea681610e91565b82525050565b6000602082019050610ec16000830184610e9d565b92915050565b610ed081610e1b565b82525050565b6000602082019050610eeb6000830184610ec7565b92915050565b600080600060608486031215610f0a57610f09610db8565b5b6000610f1886828701610e06565b9350506020610f2986828701610e06565b9250506040610f3a86828701610e3c565b9150509250925092565b600060ff82169050919050565b610f5a81610f44565b82525050565b6000602082019050610f756000830184610f51565b92915050565b600060208284031215610f9157610f90610db8565b5b6000610f9f84828501610e06565b91505092915050565b60008060408385031215610fbf57610fbe610db8565b5b6000610fcd85828601610e06565b9250506020610fde85828601610e06565b9150509250929050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061102f57607f821691505b60208210810361104257611041610fe8565b5b50919050565b61105181610ddd565b82525050565b600060608201905061106c6000830186611048565b6110796020830185610ec7565b6110866040830184610ec7565b949350505050565b60006020820190506110a36000830184611048565b92915050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052601160045260246000fd5b60006110e382610e1b565b91506110ee83610e1b565b9250828201905080821115611106576111056110a9565b5b9291505056fea264697066735822122047bd8303f1088c3742959295e6149c04280a64d394c805e954dce00a2ef4294f64736f6c634300081c0033';
const f = new ethers.ContractFactory(token_ABI,token_bytecode,signer);
const token_contract = await f.deploy();
let token_address;
let contract_address;
await token_contract.getAddress().then((add)=>{
  token_address = add;
});

const contractABI =   [
  {
    "inputs": [
      {
        "internalType": "string",
        "name": "_message",
        "type": "string"
      },
      {
        "internalType": "address",
        "name": "token_address",
        "type": "address"
      }
    ],
    "stateMutability": "nonpayable",
    "type": "constructor"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "uint256",
        "name": "number",
        "type": "uint256"
      }
    ],
    "name": "Balance",
    "type": "event"
  },
  {
    "anonymous": false,
    "inputs": [
      {
        "indexed": false,
        "internalType": "string",
        "name": "message",
        "type": "string"
      }
    ],
    "name": "Logger",
    "type": "event"
  },
  {
    "inputs": [],
    "name": "balance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_wallet_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "burn_tokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_wallet_address",
        "type": "address"
      }
    ],
    "name": "getBalance",
    "outputs": [
      {
        "internalType": "uint256",
        "name": "",
        "type": "uint256"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "message",
    "outputs": [
      {
        "internalType": "string",
        "name": "",
        "type": "string"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_wallet_address",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "mint_tokens",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "owner",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "token",
    "outputs": [
      {
        "internalType": "contract IERC20",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  },
  {
    "inputs": [
      {
        "internalType": "address",
        "name": "_wallet_address",
        "type": "address"
      },
      {
        "internalType": "address",
        "name": "_to",
        "type": "address"
      },
      {
        "internalType": "uint256",
        "name": "_amount",
        "type": "uint256"
      }
    ],
    "name": "transferTo",
    "outputs": [],
    "stateMutability": "nonpayable",
    "type": "function"
  },
  {
    "inputs": [],
    "name": "wallet_address",
    "outputs": [
      {
        "internalType": "address",
        "name": "",
        "type": "address"
      }
    ],
    "stateMutability": "view",
    "type": "function"
  }
];
  
  const bytecode ='0x608060405234801561001057600080fd5b5060405161121e38038061121e833981810160405281019061003291906102a5565b806000806101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555081600390816100819190610522565b5033600260006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff160217905550600060048190555050506105f4565b6000604051905090565b600080fd5b600080fd5b600080fd5b600080fd5b6000601f19601f8301169050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052604160045260246000fd5b610139826100f0565b810181811067ffffffffffffffff8211171561015857610157610101565b5b80604052505050565b600061016b6100d2565b90506101778282610130565b919050565b600067ffffffffffffffff82111561019757610196610101565b5b6101a0826100f0565b9050602081019050919050565b60005b838110156101cb5780820151818401526020810190506101b0565b60008484015250505050565b60006101ea6101e58461017c565b610161565b905082815260208101848484011115610206576102056100eb565b5b6102118482856101ad565b509392505050565b600082601f83011261022e5761022d6100e6565b5b815161023e8482602086016101d7565b91505092915050565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b600061027282610247565b9050919050565b61028281610267565b811461028d57600080fd5b50565b60008151905061029f81610279565b92915050565b600080604083850312156102bc576102bb6100dc565b5b600083015167ffffffffffffffff8111156102da576102d96100e1565b5b6102e685828601610219565b92505060206102f785828601610290565b9150509250929050565b600081519050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b6000600282049050600182168061035357607f821691505b6020821081036103665761036561030c565b5b50919050565b60008190508160005260206000209050919050565b60006020601f8301049050919050565b600082821b905092915050565b6000600883026103ce7fffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffffff82610391565b6103d88683610391565b95508019841693508086168417925050509392505050565b6000819050919050565b6000819050919050565b600061041f61041a610415846103f0565b6103fa565b6103f0565b9050919050565b6000819050919050565b61043983610404565b61044d61044582610426565b84845461039e565b825550505050565b600090565b610462610455565b61046d818484610430565b505050565b5b818110156104915761048660008261045a565b600181019050610473565b5050565b601f8211156104d6576104a78161036c565b6104b084610381565b810160208510156104bf578190505b6104d36104cb85610381565b830182610472565b50505b505050565b600082821c905092915050565b60006104f9600019846008026104db565b1980831691505092915050565b600061051283836104e8565b9150826002028217905092915050565b61052b82610301565b67ffffffffffffffff81111561054457610543610101565b5b61054e825461033b565b610559828285610495565b600060209050601f83116001811461058c576000841561057a578287015190505b6105848582610506565b8655506105ec565b601f19841661059a8661036c565b60005b828110156105c25784890151825560018201915060208501945060208101905061059d565b868310156105df57848901516105db601f8916826104e8565b8355505b6001600288020188555050505b505050505050565b610c1b806106036000396000f3fe608060405234801561001057600080fd5b50600436106100935760003560e01c8063d35cf91311610066578063d35cf9131461010c578063e21f37ce14610128578063e776a5b514610146578063f8b2cb4f14610164578063fc0c546a1461019457610093565b80638da5cb5b146100985780639a2b8565146100b6578063a5f2a152146100d2578063b69ef8a8146100ee575b600080fd5b6100a06101b2565b6040516100ad919061073e565b60405180910390f35b6100d060048036038101906100cb91906107c0565b6101d8565b005b6100ec60048036038101906100e79190610800565b6102df565b005b6100f6610474565b6040516101039190610862565b60405180910390f35b610126600480360381019061012191906107c0565b61047a565b005b610130610581565b60405161013d919061090d565b60405180910390f35b61014e61060f565b60405161015b919061073e565b60405180910390f35b61017e6004803603810190610179919061092f565b610635565b60405161018b9190610862565b60405180910390f35b61019c6106d9565b6040516101a991906109bb565b60405180910390f35b600260009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e12923b983836040518363ffffffff1660e01b81526004016102749291906109d6565b600060405180830381600087803b15801561028e57600080fd5b505af11580156102a2573d6000803e3d6000fd5b505050507f65e06b3884a88e13243953e5160aec7a836e4cc7abc0762f84c66d6b918efe7f6040516102d390610a4b565b60405180910390a15050565b82600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663e12923b984836040518363ffffffff1660e01b815260040161037b9291906109d6565b600060405180830381600087803b15801561039557600080fd5b505af11580156103a9573d6000803e3d6000fd5b5050505060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dcdea89883836040518363ffffffff1660e01b81526004016104089291906109d6565b600060405180830381600087803b15801561042257600080fd5b505af1158015610436573d6000803e3d6000fd5b505050507f65e06b3884a88e13243953e5160aec7a836e4cc7abc0762f84c66d6b918efe7f60405161046790610ab7565b60405180910390a1505050565b60045481565b81600160006101000a81548173ffffffffffffffffffffffffffffffffffffffff021916908373ffffffffffffffffffffffffffffffffffffffff16021790555060008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff1663dcdea89883836040518363ffffffff1660e01b81526004016105169291906109d6565b600060405180830381600087803b15801561053057600080fd5b505af1158015610544573d6000803e3d6000fd5b505050507f65e06b3884a88e13243953e5160aec7a836e4cc7abc0762f84c66d6b918efe7f60405161057590610b23565b60405180910390a15050565b6003805461058e90610b72565b80601f01602080910402602001604051908101604052809291908181526020018280546105ba90610b72565b80156106075780601f106105dc57610100808354040283529160200191610607565b820191906000526020600020905b8154815290600101906020018083116105ea57829003601f168201915b505050505081565b600160009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b60008060009054906101000a900473ffffffffffffffffffffffffffffffffffffffff1673ffffffffffffffffffffffffffffffffffffffff166370a08231836040518263ffffffff1660e01b8152600401610691919061073e565b602060405180830381865afa1580156106ae573d6000803e3d6000fd5b505050506040513d601f19601f820116820180604052508101906106d29190610bb8565b9050919050565b60008054906101000a900473ffffffffffffffffffffffffffffffffffffffff1681565b600073ffffffffffffffffffffffffffffffffffffffff82169050919050565b6000610728826106fd565b9050919050565b6107388161071d565b82525050565b6000602082019050610753600083018461072f565b92915050565b600080fd5b6107678161071d565b811461077257600080fd5b50565b6000813590506107848161075e565b92915050565b6000819050919050565b61079d8161078a565b81146107a857600080fd5b50565b6000813590506107ba81610794565b92915050565b600080604083850312156107d7576107d6610759565b5b60006107e585828601610775565b92505060206107f6858286016107ab565b9150509250929050565b60008060006060848603121561081957610818610759565b5b600061082786828701610775565b935050602061083886828701610775565b9250506040610849868287016107ab565b9150509250925092565b61085c8161078a565b82525050565b60006020820190506108776000830184610853565b92915050565b600081519050919050565b600082825260208201905092915050565b60005b838110156108b757808201518184015260208101905061089c565b60008484015250505050565b6000601f19601f8301169050919050565b60006108df8261087d565b6108e98185610888565b93506108f9818560208601610899565b610902816108c3565b840191505092915050565b6000602082019050818103600083015261092781846108d4565b905092915050565b60006020828403121561094557610944610759565b5b600061095384828501610775565b91505092915050565b6000819050919050565b600061098161097c610977846106fd565b61095c565b6106fd565b9050919050565b600061099382610966565b9050919050565b60006109a582610988565b9050919050565b6109b58161099a565b82525050565b60006020820190506109d060008301846109ac565b92915050565b60006040820190506109eb600083018561072f565b6109f86020830184610853565b9392505050565b7f4275726e656420746f6b656e7300000000000000000000000000000000000000600082015250565b6000610a35600d83610888565b9150610a40826109ff565b602082019050919050565b60006020820190508181036000830152610a6481610a28565b9050919050565b7f5472616e73666572656420746f6b656e73000000000000000000000000000000600082015250565b6000610aa1601183610888565b9150610aac82610a6b565b602082019050919050565b60006020820190508181036000830152610ad081610a94565b9050919050565b7f4d696e74656420746f6b656e7300000000000000000000000000000000000000600082015250565b6000610b0d600d83610888565b9150610b1882610ad7565b602082019050919050565b60006020820190508181036000830152610b3c81610b00565b9050919050565b7f4e487b7100000000000000000000000000000000000000000000000000000000600052602260045260246000fd5b60006002820490506001821680610b8a57607f821691505b602082108103610b9d57610b9c610b43565b5b50919050565b600081519050610bb281610794565b92915050565b600060208284031215610bce57610bcd610759565b5b6000610bdc84828501610ba3565b9150509291505056fea2646970667358221220dc46a2029ef182a5203c9df9c1e4fec27049cdea81cc850c4dc1ec0f63fd552964736f6c634300081c0033';
  const factory = new ethers.ContractFactory(contractABI,bytecode,signer);
  contract = await factory.deploy("Nandan",token_address);
  await contract.getAddress().then((add) =>{
    contract_address = add;
  })
  console.log("token address is : ",token_address);
  console.log("Contract address is : ",contract_address);
  res.send({message:"deployed"});
});
  
  

  app.get("/",(req,res) =>{
    res.send("Home Page");
  });

  app.post("/mint",async (req,res) =>{
    
    const wallet_address =  req.body.wallet_address;
    const amount = req.body.amount;
    const tx = await contract.mint_tokens(wallet_address,amount);
    // res.send(`minted ${amount} tokens to ${wallet_address} `);
    const recepit = await tx.wait();
    if(recepit){
      res.send({message:"success"});
    }
    else{
      res.send({message:"error"});
    }
  });

  app.post("/burn",async (req,res) =>{
    
    const wallet_address =  req.body.wallet_address;
    const amount = req.body.amount;
    const tx = await contract.burn_tokens(wallet_address,amount);
    const recepit = await tx.wait();
    if(recepit){
      res.send({message:"success"});
    }
    else{
      res.send({message:"error"});
    }
  });

  app.post("/balance",  async (req,res) =>{
    
    const wallet_address =  req.body.wallet_address;
    const tx = await contract.getBalance(wallet_address);
    res.send({message:tx.toString()});
    // res.send(`Balance of ${wallet_address} is ${balance}`);
  });
console.log("server started at port 3000");
app.listen(3000);