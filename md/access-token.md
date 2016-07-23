# Access Tokens
In the code example on the previous page, we had a variable called `token`.
This is also called an <a href="https://serialkeymanager.com/docs/api/v3/auth" target="_blank">access token</a>.

The idea behind access tokens is to allow you to:
 * identify yourself with SKM (authentication) - let SKM know that you are you
 * make sure only desired permission is given to something (authorization) - eg. method scope, product, etc.

Using an access token, you can specify the methods you want to be able to call,
the product you want to use, the license key, and optionally feature you want to change.
You can read more about them <a href="https://serialkeymanager.com/docs/api/v3/auth" target="_blank">here</a>.

## Creating a new Access Token

In order to create an access token with the permission required by the previous example:

1. Go to 'Your account name' (right corner) > 'Access Token'.
2. Click on 'Create new Access Token'.
You will now be on <a href="https://serialkeymanager.com/User/AccessToken#/newtoken" target="_blank">this page</a>.
3. Enter a name, such as "GetKey AccessToken".
4. Check the 'Get Key' box (under LicenseKey)
5. Select the 'Product Lock' to be the name of your application.
6. Press 'Create an Access Token'.
7. Copy the access token and replace our token with yours.

## Example
<img src="/images/skm-access-token.png" style="width:100%; max-width:615px;" />





