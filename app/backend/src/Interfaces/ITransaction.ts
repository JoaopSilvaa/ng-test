export default interface ITransaction {
    id: number;
    debitedAccountI: number;
    creditedAccountId: number;
    value: number;
    createdAt: Date;
}
