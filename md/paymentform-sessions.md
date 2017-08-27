### Sessions
Sessions allow you to customize the look of the payment form. This includes the header, product name, price and currency. 
In addition, you can supply a custom field (note, this will override the custom field we discussed in the [previous article](#payment-request))
and metadata.

### Forced or voluntary
When you create a payment form, you will see the option __Force Sessions__. This is a way to ensure that the payment form can only
be accessed using a session. If you leave this option unchecked, it will be possible to access the form both using sessions and without.

### Workflow
In order to create a session, you need to call `CreateSession` in the Web API. This requires a __Payment Form__ permission for the access token.
You should only call this method from your own server side and never directly from the application. If you do the latter, the user can get hold
of the access token and create a session that has price set to zero and thus be able to execute the requests that should only be called upon a successful
transaction.