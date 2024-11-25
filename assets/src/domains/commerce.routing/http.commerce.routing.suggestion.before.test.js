
require('dotenv').config();
const apiExt = require('./http.commerce.routing.suggestion.before'); // Adjust the path to your app
const candidates = {
	"candidateSuggestions": [
		{
			"locationCode": "CA01",
			"locationName": "SACRAMENTO",
			"addressLine1": null,
			"addressLine2": null,
			"addressLine3": null,
			"city": "ROCKLIN",
			"state": "CA",
			"countryCode": "US",
			"postalCode": "95765",
			"distance": "1454.3427734375 mi",
			"latitude": 38.8285,
			"longitude": -121.305,
			"express": true,
			"pickup": false,
			"transferEnabled": true,
			"directShip": true,
			"inventory": [
				{
					"available": 3,
					"sku": "prod1",
					"upc": "prod1"
				},
				{
					"available": 14,
					"sku": "1000000",
					"upc": "1000000"
				},
				{
					"available": 12,
					"sku": "8882342",
					"upc": "8882342"
				}
			]
		},
		{
			"locationCode": "WA01",
			"locationName": "WASHINGTON",
			"addressLine1": null,
			"addressLine2": null,
			"addressLine3": null,
			"city": "MOXEE CITY",
			"state": "WA",
			"countryCode": "US",
			"postalCode": "98936",
			"distance": "1646.1593017578125 mi",
			"latitude": 46.5707,
			"longitude": -120.398,
			"express": true,
			"pickup": false,
			"transferEnabled": true,
			"directShip": true,
			"inventory": [
				{
					"available": 36,
					"sku": "prod1",
					"upc": "prod1"
				},
				{
					"available": 12,
					"sku": "prod2",
					"upc": "prod2"
				},
				{
					"available": 17,
					"sku": "8882342",
					"upc": "8882342"
				}
			]
		}
	]
};
const requestBody = {
	"shippingAddress": {
		"customerID": 222,
		"addressID": 1,
		"addressLine1": "5207 Rain Creek Parkway",
		"city": "Austin",
		"countryCode": "us",
		"postalCode": "78759",
		"state": "tx"
	},
	"cartID": "123123",
	"items": [
		{
			"upc": "prod1",
			"orderItemID": 1,
			"quantity": 1
		},
		{
			"upc": "prod2",
			"orderItemID": 2,
			"quantity": 2
		}
	],
	"orderID": 123,
	"orderType": "DIRECTSHIP",
	"pickupLocationCode": "78759",
	"total": 123
};
//uncomment to test with live services
// describe('Commerce Routing Integrated', () => {
// 	test('should return suggestions for commerce routing', async () => {
// 		const context = {
// 			request: {
// 				query: {
// 					test: "true"
// 				},
// 				body: requestBody

// 			},
// 			response: {
// 				end: jest.fn(),
// 				statusCode: 200
// 			}
// 		};

// 		await new Promise((resolve) => {
// 			apiExt(context, () => {
// 				resolve();
// 			});
// 		});

// 		expect(context.response.statusCode).toBe(200);
// 		expect(context.response.body).toHaveProperty('assignmentSuggestions');

// 	});
// });
describe('Commerce Routing Mocked Candidates', () => {
	test('should return suggestions for commerce routing', async () => {
		const context = {
			request: {
				query: {
					test: "true"
				},
				body: requestBody

			},
			response: {
				end: jest.fn(),
				statusCode: 200
			}
		};
		apiExt.SuggestionBefore.getRoutingCandidates = jest.fn().mockResolvedValue(candidates);
		await new Promise((resolve) => {
			apiExt(context, () => {
				resolve();
			});
		});
		expect(context.response.statusCode).toBe(200);
		expect(context.response.body).toHaveProperty('assignmentSuggestions');
		expect(context.response.body.assignmentSuggestions["1"][0].locationCode).toEqual("CA01");
	});
});
