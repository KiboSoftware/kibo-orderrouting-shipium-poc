
let OrderRouting = require('@kibocommerce/rest-sdk/clients/OrderRouting');
let Config = require('@kibocommerce/rest-sdk');

class SuggestionBefore {
  static mainFunction(context, callback) {
    let testMode = context.request.query?.test == 'true';

    if (!testMode) {
      return callback();
    }
    SuggestionBefore.getRoutingCandidates(context)
      .then(async (candidates) => {
        const order = context.request.body;
        const sortedCandidates = await SuggestionBefore.sortCandidateByShipium(candidates.candidateSuggestions, order);
        const suggestOutput =  SuggestionBefore.convertCandidatesToSuggest(sortedCandidates, order);
        context.response.statusCode = 200;
        context.response.body = suggestOutput;
        context.response.end();
        return callback();
      })
      .catch((error) => {
        console.error(error);
        context.response.statusCode = 500;
        context.response.end();
        return callback();
      });

  }
  static async getRoutingCandidates(context) {
    let requestBody = context.request.body;
    let config = Config.Configuration.fromEnv();
    let routingApi = new OrderRouting.RoutingApi(config);
    let request = requestBody;
    let candidateResponse = await routingApi.suggestCandidates({ request });

    return candidateResponse;
  }
  static async sortCandidateByShipium(candidates, order) {
    //todo sort the locations by shipium price
    await new Promise(resolve => setTimeout(resolve, 2));
    return candidates;
  }
  static convertCandidatesToSuggest  (candidates, order) {
    const assignmentSuggestions = {};    

    for (let i =0 ; i < order.items.length; i++) {
      const { orderItemID, quantity , upc} = order.items[i];
      assignmentSuggestions[orderItemID] = [];
      
      const candidate = candidates.find(c => 
        c.inventory.some(inv => inv.upc === upc && inv.available >= quantity)        
      );
      if (candidate) {
       
        assignmentSuggestions[orderItemID].push({
          orderItemID: orderItemID,
          locationID: null, // Add real location ID mapping if available
          locationCode: candidate.locationCode,
          quantity: quantity,
          route: "API_EXTENSION_ROUTING",
          futureDate: null,
          futureDateString: null,
        });

      }else{
        assignmentSuggestions[orderItemID].push({
          "orderItemID": orderItemID,
          "stateChange": "CUSTOMER_CARE",
          "quantity": quantity
        });
      }

    }
    

    // Building the full suggest structure
    const suggestOutput = {
      assignmentSuggestions,
      futureAssignmentSuggestions: {},
      stateChangeSuggestions: {},
      availableLocations: [],
      responseID: null,
      externalResponseID: null,
      suggestionLog: null,
      route: "API_EXTENSION_ROUTING",
      emptyResponse: Object.keys(assignmentSuggestions).length === 0,
    };

    return suggestOutput;
  };
}


module.exports = SuggestionBefore.mainFunction;
module.exports.SuggestionBefore = SuggestionBefore;