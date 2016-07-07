<img src="/images/web-api-illustration.png" width="80%"/>
# Talking to Web API
Web API can be thought of as a channel that can be used to talk to SKM Platform from
your application and third party services. It contains a wide range of methods, which allow you to activate keys, create new ones,
analyse usage data, and so much more.

## SKM Client API
This is a free of charge and open source library that simplifies this communication. 
If you happen to be targeting the .NET Framework, it's really easy to get started.
 You can find out more [here](https://support.serialkeymanager.com/kb/skgl-extension-api).

## Direct Communication 
If you are on a platform that does not support .NET,
you can still take advantage of the functionality of SKM's Web API.
For example, in order to retrieve key information in JSON, you can call
```
https://serialkeymanager.com/api/key/GetKey?token={accesstoken}&ProductId=1234&Key=MUYVD-LSEBY-CXHRQ-XFAGY&Sign=True
```
You can find more [here](https://serialkeymanager.com/docs/api/v3/).