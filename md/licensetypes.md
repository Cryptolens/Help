<table class="table table-hover">
<tr>
<th>Licensing Model</th>
<th>Description</th>
<th style="width:20%;">Implementation</th>
</tr>
<tr>
<td>Try and Buy (perpetual)</td>

<td><p>This model enables you to securely distribute trial versions of your product, which your customer can easily upgrade.</p>
<p>A trial license can either be time-limited (eg. 30 days) or not. When it's not time-limited, it can have a reduced set features 
(eg. lite version). Once the time limit is reached, it can either disable the entire application or just certain features.
</p>
<p>The user can later upgrade the same license key to be able to get a full-featured version of the application.</p>
</td>
<td>To get this working, you only need to
<ol>
<li><a href="https://github.com/SerialKeyManager/SKGL-Extension-for-dot-NET/blob/master/Tutorials/v401.md#get-license-information">get license key details</a>
</li>
<li><a href="https://github.com/SerialKeyManager/SKGL-Extension-for-dot-NET/blob/master/Tutorials/v401.md#checking-properties">check properties to enable/disable functionality</a>
</li>
</ol>
 </td>
</tr>
<tr>
<td>Subscription</td>
<td><p>A subscription is when you give access to your product for a limited period of time.
</p>
<p>
Instead of offering your application as a 'product', you can offer it it as a 'service'
(for example, your customers may get addition support together with the product during the subscription period).
</p> 
<p>
This model is good because it provides you with a recurring revenue stream.
</p>
</td>

<td>To get this working, you only need to
<ol>
<li><a href="https://github.com/SerialKeyManager/SKGL-Extension-for-dot-NET/blob/master/Tutorials/v401.md#get-license-information">get license key details</a>
</li>
<li><a href="https://github.com/SerialKeyManager/SKGL-Extension-for-dot-NET/blob/master/Tutorials/v401.md#checking-properties">check properties to enable/disable functionality</a>
</li>
</ol>
In addition, you will need to set up <a href="https://support.serialkeymanager.com/kb/introduction-to-payment-forms">payment forms</a>
to get auto-renewal functionality and payments.
</td>
</tr>
<tr>
<td>Pay per use</td>
<td><p>Pay-per-use enables you to charge based on usage.
</p>
<p>
A license may be _pre-paid_ with 'credits' that your customers consume when they use your app. They can later refill them.
</p> 
<p>
This model is gives you additional ways of monetizing your software, eg. based on CPU usage, number of reports generated (accounting software), or anything more specific to your app. 
</p>
</td>

<td>To get this working, you need to use <a href="https://github.com/SerialKeyManager/SKGL-Extension-for-dot-NET/blob/master/Tutorials/v401.md#custom-variables-aka-data-objects">data objects</a>.
You can then use methods such as <a href="http://api.serialkeymanager.com/html/M_SKM_V3_Methods_Data_IncrementIntValue_1.htm">increment int value</a> to increase the counter inside your app.
</td>
</tr>
<tr>
<td>Floating / Concurrent</td>
<td><p>Floating licenses restrict the number of users that can use the app at the same time.
</p>
<p>
For example, imagine you want your customers to be able to use your application on 10 devices at once. That is, they may have the software installed on 100 devices, but they can only use it on 10 of them at the same time.
</p> 
</td>

<td>Please see the 
<a href="https://github.com/SerialKeyManager/SKGL-Extension-for-dot-NET/blob/master/Tutorials/v401.md#floating-licenses">example code</a>.
</td>
</tr>

<tr>
<td>Custom licensing</td>
<td><p>SKM can be thought of as a toolbox for developers that simplifies implementation of a big variety of licensing scenarios.
</p>
</td>

<td>Please <a href="https://support.serialkeymanager.com/contact">contact us</a>!.
</td>
</tr>
</table>


<!--

<tr>
<td></td>
<td></td>
<td></td>
</tr>

-->