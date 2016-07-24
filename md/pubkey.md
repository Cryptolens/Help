# Public Key

In many cases, you will store license key data locally on your customers' device, partly to allow your customers
to use the application offline. At the same time, you don't want them to be able to modify the license key data
(for example, the number of features they are entitled to and expiration date).

Therefore, SKM will sign the license key (if you explicitly tell it to do so)
with your **private key**. The **public key** will allow your application
to check that the license key file hasn't been modified since it was by SKM. 

The **public key** won't allow them to re-sign the data, only to validate it.

## Finding your Public Key
In order to find your unique public key:

1. In the menu in the right corner (with your name), select 'Security Settings'.
2. Copy the entire public key and replace it with ours (in the `publicKey` variable).

<img src="/images/skm-pubkey.png" style="width:100%; max-width:651px;"/> 



