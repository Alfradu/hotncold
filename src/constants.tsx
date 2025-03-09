export const geoGoal1 = {
    latitude: 59.8604189,
    longitude: 17.6034489
}
export const geoGoal2 = {
    latitude: 59.861524,
    longitude: 17.603079
}

export type Level = {
    feel: string
    info: string
    distance: number
}

export const levels: Level[] = [
    { feel: 'The Device is Ice Cold', info: 'You are no where near the dig spot.', distance: 1000 },
    { feel: 'The Device is Very Cold', info: 'You are very far away from the dig spot.', distance: 700 },
    { feel: 'The Device is Cold', info: 'You are far away from the dig spot.', distance: 500 },
    { feel: 'The Device is Warm', info: 'You are getting close.', distance: 300 },
    { feel: 'The Device is Hot', info: 'You are close.', distance: 150 },
    { feel: 'The Device is Very Hot', info: 'You are very close.', distance: 70 },
    { feel: 'The Device is Incredibly Hot', info: 'You are almost at the dig spot.', distance: 30 },
    { feel: 'The Device is Visibly Shaking', info: 'You are on top of the dig spot - dig now!', distance: 5 }];