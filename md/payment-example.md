Let's look at how it's possible to set up a Payment Form. Each set of steps is grouped into a certain section in order to make it easier for you to go through the tutorial.
<h3>Aim (what to achieve?)</h3>
After the steps below, we want to set up a payment form for the product <strong>Software Protector 365</strong>. We will charge $45 US Dollars for it. Once a payment is complete, we will give the user a valid serial key. We will use both PayPal and Stripe to process the payment. We will also notify our web application that the payment was processed.
<h3>Payment Form</h3>
<ol>
	<li>The first step is to create a Payment Form. In the top menu, click on Forms &gt; Payment Forms. Then, click on <span style="color: #0000ff;"><strong>Create new Payment Form </strong>(blue button)</span>.</li>
	<li>Enter a <strong>name</strong> and a short <strong>description</strong> of the form and press <strong><span style="color: #0000ff;">Create</span></strong>.</li>
	<li>Now, you will see many different options:
<img class="alignnone wp-image-1132 size-full" src="https://support.serialkeymanager.com/wp-content/uploads/2016/01/example-e1454151767757.png" alt="example" width="500" height="443" /></li>
	<li>Set <b>the header </b> to "Software Protector Order Form". Then, set <b>product name</b> to "Software Protector 365".</li>
	<li>Set the <strong>currency</strong> to "USD". Then, set <strong>price </strong>to "45".</li>
	<li>In the <strong>custom message</strong>, enter
<pre class="toolbar:2 lang:diff decode:true">Thank you for ordering Software Protector! Your key is [key].</pre>
</li>
</ol>
<h3>Payment Processor</h3>
We now have an almost working Payment Form. However, we need to tell it how it should process a payment. Right now, we can use both PayPal and Stripe. First, let's create a Payment Processor.
<ol>
	<li>If you haven't changed the page (i.e. you are on the page you were in the last step of <em>Payment Form</em> tutorial), click on the big <span style="color: #0000ff;"><strong>blue plus (+)</strong></span> to the right of Stripe or PayPal. Now, go to directly to step 5.</li>
	<li>(if not (1)) Otherwise, click on Forms &gt; Payment Forms in the top menu.</li>
	<li>Press on <span style="color: #ff9900;"><strong>See Payment Processors </strong>(orange button)</span>.</li>
	<li>Press on <span style="color: #0000ff;"><strong>Create new Payment Processor</strong> (blue button)</span></li>
	<li>Enter a <strong>name</strong> and a <strong>description </strong>and press <span style="color: #0000ff;"><strong>Create</strong></span>.</li>
</ol>
After these steps, you should see a page similar to the one below:

<a href="http://support.serialkeymanager.com/wp-content/uploads/2015/06/payforms2.png"><img class="alignnone wp-image-703 size-medium" src="http://support.serialkeymanager.com/wp-content/uploads/2015/06/payforms2-300x183.png" alt="payforms2" width="300" height="183" /></a>
<a name="paypal"></a>
<h4>PayPal</h4>
<ol>
	<li>Ensure that <strong>Payment Processor</strong> is set to "PayPal".</li>
	<li>In PayPal, you can test your the system by being in <strong>Sandbox</strong> mode. If you want to be in <strong>Sandbox</strong> mode, please check the box.</li>
	<li>In the <strong>public key</strong> box, you should enter your "primary business email". This is the email address where the money will be sent.</li>
	<li>In the <strong>private key</strong> box, you should enter your "identity token". You can find it on your PayPal page by clicking on Profile (top menu, right corner) &gt; Account Settings &gt; Website Preferences. On that page, select <em>Auto Return</em> to "On", enter "https://serialkeymanager.com/Form/IPN/" and finally set <em>Payment Data Transfer</em> to "On". Then, press on Save. An identity token will be generated for you. <strong><span style="color: #ff0000;">Note</span>:</strong> 
    ```
    If you want to receive payments in a currency that is not your default currency, please ensure that you allow other currencies. You can do so by going to Profile (top menu, right corner) &gt; Account Settings &gt; Block Payments and select "Yes, accept and convert them to U.S. Dollars". <strong>Tip</strong>: If you are using the classical interface, you would need to go to Profile (top menu, right corner) &gt; My Selling Tools (in both scenarios).
    ```
    </li>
</ol>
<a name="stripe"></a>
<h4>Stripe</h4>
<ol>
	<li>Ensure that <strong>Payment Processor</strong> is set to "Stripe".</li>
	<li>Open your Stripe Dashboard here: <a href="https://dashboard.stripe.com/test/dashboard">https://dashboard.stripe.com/test/dashboard</a>. Note, for this example, we are using the test dashboard. For live payments, you should use the live dashboard.</li>
	<li>In the top right corner, click on your name and select "Account Settings".</li>
	<li>Now, select API keys tab.</li>
	<li>Here, you can find both your test keys (equivalent to sandbox mode in PayPal) and the live keys. Since we are still testing, please select the test public key and insert it into <strong>public key</strong> field. Do the same for the <strong>private key</strong>.</li>
	<li>Press save. Now we are done!</li>
</ol>
Once we are back to our original Payment Form, we should select our payment processors in <strong>stripe (payment processor)</strong> and <strong>paypal (payment processor</strong>) drop-down boxes.
<h3>Adding a Request (aka Webhooks)</h3>
Finally, we want to make sure that a new key is generated, which can be achieved using <a href="https://serialkeymanager.com/docs/api/v2/GenerateKey">GenerateKey</a> method in the <a href="https://support.serialkeymanager.com/kb/web-api-2-0">Web API</a> combined with Data Requests. Note, the difference between a <strong>data request</strong> and a <strong>void request</strong> (as described <a href="https://support.serialkeymanager.com/kb/introduction-to-payment-forms">here</a>) is that a data request allows us to use the result from a third party (in this case Web API) to change the message displayed once an order is processed. A void request is simply used to notify another site that a payment was processed.

Let's start by adding a new data request. To do this, please press on the big plus button in the <strong>request </strong>section. You would see a page similar to the one below.

<img class="alignnone size-full wp-image-1143" src="https://support.serialkeymanager.com/wp-content/uploads/2016/01/request.png" alt="request" width="528" height="254" />

To the key generation link, please follow the instructions <a href="https://support.serialkeymanager.com/kb/key-generation">here</a>. Now, we are finished!
<h3>Preview the Form</h3>
Once this is complete, please press <strong>Preview</strong>. Preview contains a link to the live payment form that is ready to process transactions. Below is an illustration of how it might look like:

<a href="https://serialkeymanager.com/Form/P/TWwk4yGK/3"><img class="alignnone size-full wp-image-1139" src="https://support.serialkeymanager.com/wp-content/uploads/2016/01/form.png" alt="form" width="520" height="784" /></a>

Let's try this form using Stripe. For example credit cards, please see <a href="https://stripe.com/docs/testing">this article</a>. If the payment was successful, you will see the following:

<img class="alignnone size-full wp-image-1145" src="https://support.serialkeymanager.com/wp-content/uploads/2016/01/success.png" alt="success" width="512" height="195" />

In addition, you will receive a message (receipt) to the specified address. In the case of PayPal, buyers email will be used. However, you can always disable this option, but this is not recommended.

<img class="alignnone size-full wp-image-1146" src="https://support.serialkeymanager.com/wp-content/uploads/2016/01/receipt.png" alt="receipt" width="1058" height="327" />