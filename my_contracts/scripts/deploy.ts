import {ethers}from "hardhat";
import Deployment from "../ignition/modules/deployment";
async function main() {
    const contract = await ethers.getContractFactory("Minter");
    const deploy = contract.deploy("NandanHollaK");
    (await deploy).waitForDeployment();
    (await deploy).getAddress().then((value) =>{

        console.log("Contract deployed at : ", value);
    });
}

main().catch((error) =>{
    console.log("Error occured",error);
});