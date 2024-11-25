# RoutingWithShipiumPOC

### Version 0.1.0

## Overview

This repository is a Proof of Concept (POC) for replacing the core Order Routing Suggest call with a call to Candidates, which can then be sorted by making calls to Shipium. The goal is to enhance the order routing process by integrating Shipium's capabilities for better sorting and routing of candidates.

## Features

- Replace core Order Routing Suggest call with a call to Candidates.
- Sort candidates by making calls to Shipium.
- Return with Locations optimized by shipping cost.

## Installation

1. Clone the repository:
   ```sh
   git clone [this repo]
   cd RoutingWithShipiumPOC
   ```

## Tests
`` sh
    npx jest
``

## deploy 
Add and mozu.config.json and deploy with grunt

## Tests
`` sh
    npx jest
``

## todo 
implement the sortCandidateByShipium function to sort the locations by cost
  
```javascript
static async sortCandidateByShipium(candidates, order) {
    //todo sort the locations by shipium price
    await new Promise(resolve => setTimeout(resolve, 2));
    return candidates;
  }

```
## integration testing
* you can call the proxy directly by using the following route
<B>/api/commerce/orders/orderRoutingProxy/api/v1/routing/suggestion</B>
* NOTE: the feature is gated by a querystring <i>test=true</i>
* remove the test flag to test with order ingest
```javascript
    let testMode = context.request.query?.test == 'true';

    if (!testMode) {
      return callback();
    }
```