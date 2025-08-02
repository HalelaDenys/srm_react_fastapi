import { transformKeysToCamelCase } from "../utils/utils";
import type { IPosition } from "../entities/position.types"
import { fetchPositions } from "../api/positions";


export const getPositionsService = async (): Promise<IPosition[]> => {
    const positions = await fetchPositions();
    return positions.map(transformKeysToCamelCase) as IPosition[];
}