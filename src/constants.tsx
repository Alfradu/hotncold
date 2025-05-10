export const objectives: Objective[] =
	[
		{
			goalKeyword: "Dragon scimitar",
			latitude: 59.8604189,
			longitude: 17.6034489
		},
		{
			goalKeyword: "Abyssal whip",
			latitude: 59.861524,
			longitude: 17.603079
		},
		{
			goalKeyword: "Shark",
			latitude: 59.861524,
			longitude: 17.603079
		},
		{
			goalKeyword: "Lobster",
			latitude: 59.861524,
			longitude: 17.603079
		},
		{
			goalKeyword: "Wyrmling bones",
			latitude: 59.861524,
			longitude: 17.603079
		},
		{
			goalKeyword: "Wyrm bones",
			latitude: 59.861524,
			longitude: 17.603079
		},
		{
			goalKeyword: "Adamant platebody",
			latitude: 59.861524,
			longitude: 17.603079
		},
		{
			goalKeyword: "Bandos godsword",
			latitude: 59.861524,
			longitude: 17.603079
		}
	];

type Objective = {
	goalKeyword: string;
	latitude: number;
	longitude: number
}

export type Level = {
	feel: string
	info: string
	distance: number
	style: string
}

export const levels: Level[] = [
	{ feel: 'The Device is Ice Cold', info: 'You are no where near the dig spot.', distance: 2000, style: '' },
	{ feel: 'The Device is Very Cold', info: 'You are very far away from the dig spot.', distance: 1500, style: 'hue-rotate(20deg)' },
	{ feel: 'The Device is Cold', info: 'You are far away from the dig spot.', distance: 1000, style: 'hue-rotate(30deg)' },
	{ feel: 'The Device is Warm', info: 'You are getting close.', distance: 700, style: 'hue-rotate(40deg)' },
	{ feel: 'The Device is Hot', info: 'You are close.', distance: 500, style: 'hue-rotate(50deg)' },
	{ feel: 'The Device is Very Hot', info: 'You are very close.', distance: 250, style: 'hue-rotate(60deg)' },
	{ feel: 'The Device is Incredibly Hot', info: 'You are almost at the dig spot.', distance: 100, style: 'hue-rotate(70deg)' },
	{ feel: 'The Device is Visibly Shaking', info: 'You are probably on top of the dig spot - look for a diggable spot now!', distance: 50, style: 'hue-rotate(90deg) saturate(2)' }];