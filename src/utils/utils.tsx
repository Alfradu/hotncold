import { Level, levels } from "../constants";

export type Coordinate = {
    x: number
    y: number
}

export const headingToOrientation = (bearing: number, debug: boolean = false): string => {
    const compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
    const compassLabels = ['North', 'North Northeast', 'Northeast', 'East Northeast', 'East', 'East Southeast', 'Southeast', 'South Southeast', 'South', 'South Southwest', 'Southwest', 'West Southwest', 'West', 'West Northwest', 'Northwest', 'North Northwest', 'North']
    return debug ? compass[Math.round(bearing / 22.5)] : compassLabels[Math.round(bearing / 22.5)];
}

export const calculateLevel = (distance: number): Level => {
    return levels[distance];
}

export const calculateHitSplatLocation = (): Coordinate => {
    const centerWidth = window.innerWidth / 2;
    const centerHeight = window.innerHeight / 2;
    const x = (Math.random() * 100) + centerWidth - 300;
    const y = (Math.random() * 100) + centerHeight - 300;
    return { x, y };
}