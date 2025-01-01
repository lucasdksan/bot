export interface IEnv {
    getPort(): number;
    getJwtSecret(): string;
    getJwtExpiresIn(): string;
}