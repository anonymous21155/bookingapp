import 'isomorphic-fetch';
import dotenv from 'dotenv';
import express from 'express';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';


let clientSecretCredential;
let appGraphClient;
let eventArray;
let eventObj;
let jhonIsInRange = false;
let rizwanIsInRange = false;
let hariIsInRange = false;
let smithIsInRange = false;
let angelaIsInRange = false;
dotenv.config();
const cardiologyArray = [process.env.GOKUL, process.env.GOKUL2];
const generalMedicineArray = [process.env.GOKUL,process.env.VIMAL,process.env.DIVYA];
const dermatologyArray = [process.env.ATHIRA];
let eventData;  
const availabilityRouter = express.Router();
const serviceRouter = express.Router()

function initializeGraphForAppOnlyAuth () {
    if (!clientSecretCredential) {
        clientSecretCredential = new ClientSecretCredential(
          process.env.TENANT_ID,
          process.env.CLIENT_ID,
          process.env.CLIENT_SECRET
        );
      }

      if (!appGraphClient) {
        const authProvider = new TokenCredentialAuthenticationProvider(
          clientSecretCredential, {
            scopes: [ 'https://graph.microsoft.com/.default' ]
          });
    
        appGraphClient = Client.initWithMiddleware({
          authProvider: authProvider
        });
      }
    }

serviceRouter.post('/', (req, res) => {
  const  service = req.body.Service;
  if (service === 'Cardiology') {
      eventArray = cardiologyArray.map( (userID) => {
      return `/users/${userID}/events`;
      
    })
    
   } else if (service === 'GeneralMedicine') {
    eventArray = generalMedicineArray.map( (userID) => {
      return `/users/${userID}/events`;
    })
   } else {
    eventArray = dermatologyArray.map( (userID) => {
      return `/users/${userID}/events`;
    })
   }
})
 


async function availabilityStatus (startTime, endTime) {
    initializeGraphForAppOnlyAuth();
    const formattedStartTime = startTime.split('.');
    const finalStartTime = formattedStartTime[0];
    const formattedEndTime = endTime.split('.');
    const finalEndTime = formattedEndTime[0];
    console.log(`hee: ${finalStartTime}, ${finalEndTime}`);
    const eventPromises = eventArray.map((eventPath) => {
      return appGraphClient.api(eventPath)
      .header('Prefer','outlook.timezone="Asia/Kolkata"')
      .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
      .filter(`start/dateTime ge '${finalStartTime}' and end/dateTime le '${finalEndTime}'`)
      .get();
    })
    const events = await Promise.all(eventPromises);
    /*let events = await appGraphClient.api(eventArray)
    .header('Prefer','outlook.timezone="Asia/Kolkata"')
    .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
    .filter(`start/dateTime ge '${finalStartTime}' and end/dateTime le '${finalEndTime}'`)
    .get();*/
    console.log(events);
    for (eventObj of events) {
      const user = eventObj['@odata.context'].match(/'([^']+)'/)[1];
      const hasEvents = eventObj['value'].length;
      if (user === process.env.GOKUL && hasEvents > 0 ) {
        jhonIsInRange = true;
      }if (user === process.env.GOKUL2 && hasEvents > 0) {
        rizwanIsInRange = true;
      }
      if (user === process.env.VIMAL && hasEvents > 0) {
        hariIsInRange = true;
      }
      if (user === process.env.DIVYA && hasEvents > 0) {
        smithIsInRange = true;
      }
      if (user === process.env.ATHIRA && hasEvents > 0) {
        angelaIsInRange = true;
      }
      console.log(jhonIsInRange, rizwanIsInRange);
    }
    
}


availabilityRouter.get('/', (req,res) => {
     res.json({ jhonStatus: jhonIsInRange, rizwanStatus: rizwanIsInRange, hariStatus: hariIsInRange, smithStatus: smithIsInRange, angelaStatus: angelaIsInRange});
     
})



export { availabilityRouter, availabilityStatus, serviceRouter };

