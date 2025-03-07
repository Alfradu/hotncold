import { Level, levels } from "../constants";

export const headingToOrientation = (bearing: number): string => {
    const compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
    return compass[Math.round(bearing / 22.5)];
}

export const calculateLevel = (distance: number): Level => {
    return levels[distance];
}