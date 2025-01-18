import {buildModule} from "@nomicfoundation/hardhat-ignition/modules";


export default buildModule("token",(m) =>{
    const token = m.contract("Token",[]);
    return {token};
});