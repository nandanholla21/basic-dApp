import {ethers}from "hardhat";
import Deployment from "../ignition/modules/deployment";
import { AddressLike } from "ethers";
async function main() {
    const token_contract = await ethers.getContractFactory("Token");
    const deploy_token_contract = token_contract.deploy();
    (await deploy_token_contract).waitForDeployment();
    let address: AddressLike;
    (await deploy_token_contract).getAddress().then((value) =>{

        address = value;
        console.log("Address of token contract: ",address);
        
    });
    
    setTimeout(async () =>{
        const contract = await ethers.getContractFactory("Minter");
        const deploy = contract.deploy("NandanHollaK",address);
        (await deploy).waitForDeployment();

        (await deploy).getAddress().then((value) =>{
            console.log("Address of Minter contract: ",value);
        });
        
    },1000);

}
main().catch((error) =>{
    console.log("Error occured",error);
});