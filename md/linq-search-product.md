## Searching for Licenses using Linq Queries

### Sorting by ID

If you happen to know the ID of a license key, it can easily be found. You can use relation operators too. These are just some of the examples:

* `id=2` - One key where id is equal to 2.</li>
* `id=2` or `id=3` - Two keys, one with id set to 2 and another with id set to 3.
* `id < 10` - Keys where id is less than 10. Here, we will get 9 keys. You can also change to `id <= 10` to get 10 keys (using less than or equal to operator).


### Sorting by Key
Let's say that you want to look at a license (or several licenses) with a certain key string (in Key column). Below, some of the examples:
* `key="ITVBC-GXXNU-GSMTK-NIJBT"` - One license key (if exists).
* `key.contains("ITVBC")` - All keys that contain "ITVBC".


### Sorting "Created" and "Expires"

Say you want to look at licenses that were created at a certain point in time or that will expire at a given date. Or, maybe you are interested in a certain interval, for instance keys created a yesterday or a month ago. Here are some examples:

* `created = today` - Keys created today only.
* `created >= yesterday` - Keys created today and yesterday. We could also type `created = today or created = yesterday`.
* `created >= DateTime(2015,01,01)` - Keys that were created in the beginning of 2015.
* `expires <= DateTime(2016,01,01)` - Keys that will expire no later than the beginning of 2016.

#### Variables

In addition, you can use variables such as `tomorrow`, `monthback`, `monthforward`>.

### Sorting by "Period"
If you choose to have a time limited license, such as those that are used in a subscription, the period becomes important. You can sort keys based on the period as follows:
* `period = 30` - Keys that have a period equal to 30.

### Sorting features "F1,..., F8"
Features can be sorted also. Note, although features are represented as 1's and 0's, these are actually referring to a Boolean type, i.e. True or False.
<ul>
	<li><span class="lang:default decode:true crayon-inline">F1 = true</span> - Keys that have feature1 set to true (or 1 on the product page).</li>
</ul>

### Searching The Notes Field
Notes field can be sorted in a similar way as Key (see above). Here are some of the examples.
* `notes="Bob"` - Keys where Notes is equal to "Bob"
* `notes.contains("to Bob")` -  Keys where Notes contains "to Bob"


### Sorting by Block
Block can be sorted similar to Features. "Yes" and "No" refer to the Boolean values "True" and "False", respectively.

* `block=true` - Keys that are blocked (block=yes/true).

### Sorting based on Customer
A customer object has four fields that can be used when sorting licenses.

* **Id** - (a number, similar to ID field sorting).
* **Name** - (a string, similar to notes field sorting).
* **Email** - (a string, similar to notes field sorting).
* **CompanyName** - (a string, similar to notes field sorting).
* **Created** - (a date, similar to Created field sorting).

Here are some sample queries:
* `customer.name="Bob"` - Keys where the Customer's name is "Bob"
* `customer.id=3` - Keys where where Customer's id is 3.
* `customer.created= today` - Keys where the Customer's creation date is set to today.


### Sorting based on Activated Devices
The Activated Devices (aka Activated Machines) is stored as a list of elements that contain three fields:
<ul>
	<li><strong>Mid</strong> - (machine code of the device)</li>
	<li><strong>IP</strong> - (the IP address of the device during activation)</li>
	<li><strong>Time</strong> - (the date and time of the activation)</li>
</ul>
There are several useful parameters that can be retrieved using a query:
<h4>Find license keys that have activated devices</h4>
<ul>
	<li><span class="lang:default decode:true crayon-inline ">ActivatedMachines.Count() &gt; 0</span>  - Keys that have at least one activated device.</li>
	<li><span class="lang:default decode:true crayon-inline ">ActivatedMachines.Count() &gt; 0 and ActivatedMachines.Count() &lt; 10</span>  - Keys that have at least one and at most 9 activated devices.</li>
</ul>
<h4>Find license keys that have a certain machine code</h4>
<ul>
	<li><span class="lang:default decode:true crayon-inline">ActivatedMachines.Count(it.Mid="machine code") &gt; 0</span>  - Keys with at least one device that has the machine code "machine code".</li>
	<li><span class="lang:default decode:true crayon-inline">ActivatedMachines.Count(it.Time &gt;= DateTime(2015,01,01)) &gt; 0</span>  - Keys that were activated after the 1st of January, 2015.</li>
</ul>
<h3>Sorting based on Data Objects (additional variables)</h3>
Every license key can have a set of data objects (aka additional variables) associated with them. They have the following four fields:
<ul>
	<li><strong>Id</strong> - (the unique identifier of the data object, eg. 35.)</li>
	<li><strong>Name</strong> - (an optional name of the data object)</li>
	<li><strong>StringValue</strong> - (the string value of the data object)</li>
	<li><strong>IntValue</strong> - (the int value of the data object)</li>
</ul>
<h4>Find licenses keys that have at least one data object</h4>
<ul>
	<li><span class="lang:default decode:true  crayon-inline">dataobjects.count() &gt; 0</span>  - Keys with at least one data object</li>
</ul>
<h4>Find license keys that have a specific value attached to them</h4>
<ul>
	<li><span class="lang:default decode:true  crayon-inline">dataobjects.count(it.StringValue="test") &gt; 0</span> - Keys where at least one data object has the string value of "test".</li>
	<li><span class="lang:default decode:true  crayon-inline">dataobjects.count(it.name="usagecount") &gt; 0</span> - Keys that have a usage counter (see <a href="https://support.serialkeymanager.com/kb/set-usage-quota-for-a-feature">Set Usage 'Quota' for a Feature</a>)</li>
</ul>
<h3>Sorting with Advanced Parameters</h3>
Advanced parameters are those that are not displayed directly on the product page, but can be found when selecting individual keys. These are:
<ul>
	<li><strong>AutomaticActivation</strong> - (a Boolean i.e. either <em>true</em> or <em>false</em>, depending on if it should be possible to perform an activation)</li>
	<li><strong>AllowedMachines</strong> - (a string, separated by new lines, that contains a white list of devices that can be activated, no matter if the maximum number of machines limit has been achieved)</li>
	<li><strong>TrialActivation</strong> - (a Boolean that sets the <a href="https://support.serialkeymanager.com/kb/trial-activation">Trial Activation</a>)</li>
	<li><strong>MaxNoOfMachines</strong> - (an integer that specifies the number of devices that can use the same license key simultaneously)</li>
</ul>
<h4>Keys with Trial Activation property</h4>
<ul>
	<li><span class="lang:default decode:true crayon-inline ">trialactivation = true</span>  - Keys with <a href="https://support.serialkeymanager.com/kb/trial-activation">Trial Activation</a> enabled.</li>
</ul>
<h4>Keys with a certain white listed machine code</h4>
<ul>
	<li><span class="lang:default decode:true crayon-inline">allowedmachines.contains("machine code")</span>  - Keys that have an allowed machine code "machine code".</li>
</ul>
<h3>Notes</h3>
<ul>
	<li>Variable names, eg. <em>AllowedMachines</em>, are <em>case-insensitive</em>, that is, you can express it as "allowedmachines" or "AllowedMachines".</li>
</ul>