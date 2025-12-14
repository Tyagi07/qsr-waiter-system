export interface JWTPayload{
 id: string;
 username: string;
 email: string;
}

export interface ApiResponse<T> {
    success: boolean;
    message: string;
    data?: T;
    error?: string;
    statusCode?: number;
}

export enum OrderStatus{
    PENDING = 'PENDING',
    CONFIRMED = 'CONFIRMED',
    PREPARING = 'PREPARING',
    READY = 'READY',
    SERVED = 'SERVED'
}

export enum TableStatus{
    VACANT = 'VACANT',
    OCCUPIED = 'OCCUPIED',
}