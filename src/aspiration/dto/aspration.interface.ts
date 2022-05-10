import { IsNotEmpty, IsString } from "class-validator";

export interface AspirationInterface {
    aspirationId: number,
    aspirationState: string
}