export const headingToOrientation = (bearing: number): string => {
    var compass = ['N', 'NNE', 'NE', 'ENE', 'E', 'ESE', 'SE', 'SSE', 'S', 'SSW', 'SW', 'WSW', 'W', 'WNW', 'NW', 'NNW', 'N'];
    return compass[Math.round(bearing / 22.5)];
}
