export class ApiError extends Error {
    constructor (
        public statusCode: number,
        message: string,
        public isOperational = true
    ){
        super(message);
        Object.setPrototypeOf(this, ApiError.prototype);
    }
}

export const catchAsync = (fn: Function) => {
  return (...args: any[]) => Promise.resolve(fn(...args)).catch(args[2]);
};