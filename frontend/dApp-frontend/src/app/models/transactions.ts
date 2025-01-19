export class Transactions {
    constructor(
        public wallet_address:string,
        public Operation:string,
        public tokens:number,
        public balance:number
    ){}
}
