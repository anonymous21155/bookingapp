import 'isomorphic-fetch';
import dotenv from 'dotenv';
import express from 'express';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';


let clientSecretCredential;
let appGraphClient;
let eventStartTime;
let eventEndTime;
let isInRange = false;
dotenv.config();
const jhonUserId = process.env.GOKUL;
const angelaUserId = process.env.ATHIRA;
const smithUserId = process.env.DIVYA;
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
    eventData = `/users/${jhonUserId}/events`;
   } else if (service === 'GeneralMedicine') {
    eventData = `/users/${smithUserId}/events`;
   } else {
    eventData = `/users/${angelaUserId}/events`;
   }
})
 


async function availabilityStatus (startTime, endTime) {
    initializeGraphForAppOnlyAuth();
    const formattedStartTime = startTime.split('.');
    const finalStartTime = formattedStartTime[0];
    const formattedEndTime = endTime.split('.');
    const finalEndTime = formattedEndTime[0];
    console.log(`hee: ${finalStartTime}, ${finalEndTime}`);
    let events = await appGraphClient.api(eventData)
    .header('Prefer','outlook.timezone="Asia/Kolkata"')
    .select('subject,body,bodyPreview,organizer,attendees,start,end,location')
    .filter(`start/dateTime ge '${finalStartTime}' and end/dateTime le '${finalEndTime}'`)
    .get();
    
    if (events.value !== undefined && events.value.length > 0) {
      isInRange = true;
    } else {
      isInRange = false;
    }
    


    console.log(isInRange);   

    
}

availabilityRouter.get('/', (req,res) => {
     res.json({ range: isInRange })
})



export { availabilityRouter, availabilityStatus, serviceRouter };

