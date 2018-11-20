export interface Alert  {
    id: number;
    userId: number;
    alertType: string;
    stockSymbol: string;
    price: number;
    triggered: boolean;
};