import 'isomorphic-fetch';
import dotenv from 'dotenv';
import express from 'express';
import { ClientSecretCredential } from '@azure/identity';
import { Client } from '@microsoft/microsoft-graph-client';
import { TokenCredentialAuthenticationProvider } from '@microsoft/microsoft-graph-client/authProviders/azureTokenCredentials/index.js';

let clientSecretCredential;
let appGraphClient;
let startNewHour; 
let formattedEndTime;
let formattedStartTime;
let formattedStartTimeInUTC;
let finalFormattedEndTime;
let finalFormattedStartTime;
dotenv.config();
const bookingRouter = express.Router();
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
    bookingRouter.post('/', (req, res) => {
      const { date, time } = req.body;
      
      const splittedDate = date.split('T');
      const formattedDate = splittedDate[0];
      const [splittedHour, splittedMinute] = time.split(':');
      const hour = parseInt(splittedHour);
      const minute = parseInt(splittedMinute);
      
       
      const formattedMinute = minute+ 30;
      let newHour;
      let extraMinutes;
      if (formattedMinute >= 60) {
        extraMinutes = formattedMinute % 60;
        const extraHours = Math.floor(formattedMinute / 60);
        newHour = (hour + extraHours) % 24;
      } else {
        newHour = hour;
        extraMinutes = formattedMinute;
      }
      
    
      const formattedTime = `${newHour.toString().padStart(2, '0')}:${extraMinutes.toString().padStart(2, '0')}`;
       formattedStartTime = formattedDate + 'T' + time + ':00.0000000+05:30';
       formattedEndTime = formattedDate + 'T' + formattedTime + ':00.0000000+05:30';
      console.log();
    });
      

      async function createBooking(data) {
        let serviceID; 
        let staffMemberID;
    
        initializeGraphForAppOnlyAuth();
    
        const { service , email, doctor } = data;
        console.log(service, email, doctor);
        if (service === "GeneralMedicine" && doctor === "Dr Smith") {
          serviceID = process.env.GENERAL_MEDICINE_ID;
          staffMemberID = process.env.DR_SMITH;
        } else if (service === "Cardiology" && doctor === "Dr jhon") {
          serviceID = process.env.CARDIOLOGY_ID;
          staffMemberID = process.env.DR_JHON
        } else if (service === "Dermatology") {
          serviceID = process.env.DERMATOLOGY_ID;
          staffMemberID = process.env.DR_ANGELA;
        }
        console.log(serviceID, staffMemberID);
        const bookingAppoinment = {
            '@odata.type': '#microsoft.graph.bookingAppointment',
            customerTimeZone: 'UTC',
            endDateTime: {
                '@odata.type': '#microsoft.graph.dateTimeTimeZone',
                dateTime: formattedEndTime,
                timeZone: 'UTC'
            },
            isLocationOnline: true,
            anonymousJoinWebUrl: null,
            maximumAttendeesCount: 1,
            optOutOfCustomerEmail: false,
            serviceName: service,
            serviceId: serviceID,
            staffMemberIds: [
              staffMemberID
            ],
            "customers@odata.type": "#Collection(microsoft.graph.bookingCustomerInformation)",
            customers: [
              { 
                "@odata.type": "#microsoft.graph.bookingCustomerInformation",
                emailAddress: email,
                name: "Patient",
              }
            ],
            startDateTime: {
              '@odata.type': '#microsoft.graph.dateTimeTimeZone',
              dateTime: formattedStartTime,
              timeZone: 'UTC',
              
          },
        }
        const newEvent = await appGraphClient.api('/solutions/bookingBusinesses/acs@cc.tenxds.in/appointments').post(bookingAppoinment);
        console.log(newEvent);
        return newEvent;
        
      }
   
    

export { createBooking, bookingRouter };
