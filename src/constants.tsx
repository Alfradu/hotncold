export const objectives: Objective[] =
	[
		{
			goalKeyword: "Dragon scimitar", //park1 team1 step1
			latitude: 59.862274,
			longitude: 17.617039
		},
		{
			goalKeyword: "Abyssal whip", //park2 team2 step1
			latitude: 59.862270,
			longitude: 17.620841
		},
		{
			goalKeyword: "Shark", //park4 team1 step2
			latitude: 59.860323,
			longitude: 17.622887
		},
		{
			goalKeyword: "Lobster", //park3 team2 step2
			latitude: 59.861370,
			longitude: 17.611900
		},
		{
			goalKeyword: "Wyrmling bones", //stubbestabby team2 step5
			latitude: 59.859910,
			longitude: 17.601400
		},
		{
			goalKeyword: "Wyrm bones", // parkbänk botaniska team2 step4
			latitude: 59.853120,
			longitude: 17.628860
		},
		{
			goalKeyword: "Adamant platebody", // slottet team2 step3
			latitude: 59.854230,
			longitude: 17.634100
		},
		{
			goalKeyword: "Bandos godsword", // domkyrkan team1 step4
			latitude: 59.857520,
			longitude: 17.633520
		},
		{
			goalKeyword: "Bandos godsword", // höganäsparken team1 step5
			latitude: 59.866260,
			longitude: 17.643300
		},
		{
			goalKeyword: "Bandos godsword", // semijnarieparken team1 step3
			latitude: 59.867660,
			longitude: 17.621580
		}
	];
//todo: add dummy items that look similar to harder steps
//		something like range pot looking like prayer pot?
// 		steps 3-5 should have one or two duds ea.
//		lat/long can be something stupid far away handled with a
//		special text indicating that its definitely wrong

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