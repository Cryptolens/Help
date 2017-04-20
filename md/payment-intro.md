Using the <a href="http://support.serialkeymanager.com/kb/web-api">Web API</a>, you can achieve a great degree of automatization in your licensing solutions. By combining payment forms with the <a href="http://support.serialkeymanager.com/kb/web-api">Web API</a>, you can ensure that your customers receive a key directly after that they've purchased a license. This means that they can use your software right away. There's no need to take any specific actions from your side. This is one of the advantages of using payment forms.

The Payment Form (the way it's called in Serial Key Manager) feature is a way to get a configured and hosted solution to process payments. You only need to set up a <a href="https://stripe.com/">Stripe</a> and/or <a href="https://www.paypal.com/">PayPal</a> account; the rest is already done. Here's an overview of the capabilities of the Payment Forms feature.
<img class="wp-image-662 size-full aligncenter" src="http://support.serialkeymanager.com/wp-content/uploads/2015/05/payforms.png" alt="payforms" width="546" height="328" />
<h2><del></del>Concepts</h2>
There are thee important concepts that are good to keep in mind when working with Payment Forms: <em>Payment Form</em>, <em>Payment Processor</em> and <em>Request</em>. Let's quickly take a look at them.
<h3>Payment Form</h3>
This is the actual form that users will see. Here you can specify the price, the success message, what kind of Payment Processors you want to use, the type of Requests you want execute, et cetera. It's the heart of your payment solution.
<ul>
 	<li><a href="https://serialkeymanager.com/PaymentForms">Create a new Payment Form</a></li>
</ul>
<h3>Payment Processor</h3>
For a Payment Form to work, we need a Payment Processor that will process payments. It can be <a href="https://stripe.com/">Stripe</a> or <a href="https://www.paypal.com/">PayPal</a>, at the moment.
<ul>
 	<li><a href="https://serialkeymanager.com/PaymentProcessors/">Create a new Payment Processor</a></li>
</ul>
<h3>Request</h3>
When a transaction is complete, it's important to tell the <a href="http://support.serialkeymanager.com/kb/web-api-2-0/">Web API</a> that you want to generate a new key that should be sent to the customer upon successful transaction. You can send a request to any other web application as well. There are two types of requests that can be sent:
<ul>
 	<li><strong>Void Request</strong> - Simply sends a request without looking at the response.</li>
 	<li><strong>Data Request</strong> - Sends a request and awaits data in JSON. <a href="http://support.serialkeymanager.com/kb/key-generation/">Key Generation</a> requests (<a href="http://support.serialkeymanager.com/kb/web-api-2-0/">Web API</a>) should be of this kind.</li>
</ul>
The great thing about data requests is that they can send the payment form additional information (in JSON). For example, a success message may look like:
<pre class="toolbar:2 lang:diff decode:false ">Thank you for purchasing Product. Your key is [key].
Your customer code (when contacting our support team) is [customer_id].</pre>
The key will later be replaced by a key from the Web API. The customer_id is an example of a variable that can be returned by your own web application. If this sounds complicated, don't worry, we will cover it in more details later!