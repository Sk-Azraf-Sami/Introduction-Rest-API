# Introduction-Rest-API

#### Basic: 
REST -> Representational State Transfer 

Guided Architectural Constraints: 
- Client-Server Architecture
- Statelessness
- Cacheability
-  Layered System
- Code on Demand
- Uniform Interface

#### Using Curl 

Example: 

```
curl https://icanhazdadjoke.com
```
Output: 
What do you get if you cross a turkey with a ghost? A poultry-geist!


#### Spotify API 
###### Important Links:
- https://developer.spotify.com/documentation/web-api/reference/search
- https://developer.spotify.com/documentation/web-api
- https://developer.spotify.com/dashboard

###### Get Token: 
https://developer.spotify.com/documentation/web-api/tutorials/getting-started#request-an-access-token

```bash
curl -X POST "https://accounts.spotify.com/api/token" \
     -H "Content-Type: application/x-www-form-urlencoded" \
     -d "grant_type=client_credentials&client_id=your-client-id&client_secret=your-client-secret"
```
Here, your-client-id = Account SID </br>  
your-client-secret = Account Auth Token 

### Twilio API 

###### Verify the phone number: 
https://console.twilio.com/us1/develop/phone-numbers/manage/verified
###### Curl: 
https://www.twilio.com/docs/whatsapp/quickstart/curl#twilio-docs-content-area


###### Get Account Sid: 
https://console.twilio.com/



###### To send message: 

Always use Twilio verified phone number: https://console.twilio.com/us1/develop/phone-numbers/manage/verified

```bash
curl -X POST "https://api.twilio.com/2010-04-01/Accounts/ACCOUNT_SID/Messages.json" \
--data-urlencode "From=+ *********" \
--data-urlencode "Body=I am Sami" \
--data-urlencode "To=+ ********" \
-u ACCOUNT_SID:ACCOUNT_AUTH_TOKEN
```


#### API Exploring Tools 
- Thunder Client: Vs code extension 
- Postman: https://www.postman.com/twilio/workspace/twilio-api/collection/
- Restfox: To install `sudo snap install restfox`


Writing Code: 
All Docs: https://www.twilio.com/docs
https://www.twilio.com/docs/messaging/api/message-resource#list-all-message-resources
https://www.twilio.com/docs/usage/secure-credentials

Web Hooks: Reverse of API. You call API but for web hooks, API call you
