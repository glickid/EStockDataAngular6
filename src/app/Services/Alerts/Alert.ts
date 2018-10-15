export default interface alert {
    id: number,
    userId: number,
    alertType: string,
    stockSymbol: string,
    price: number,
    triggered: boolean
};