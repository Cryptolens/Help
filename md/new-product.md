# Create a Product

Each application you deploy can be thought of as a <a href="#prodkeys" target="_blank">product</a>.
A product is a collection of license keys.

In order to create a new product:
1. Click on 'create new product' on the <a href="https://serialkeymanager.com/" target="_blank">main page</a>   
2. On the '<a href="https://serialkeymanager.com/Product/Create" target="_blank">create new product page</a>', 
enter the name of your application and press 'Create'.
id as well.

## Product Id
When you start implementing SKM Client API into your code, you will need to provide
a `ProductId`, which is simply a number used to identify your product.

One of the ways to get the product id is to:

1. Go to the <a href="https://serialkeymanager.com/Product" target="_blank">product page</a>
2. Select the product in the list.
3. Copy the last numbers after `/Product/Detail/...`.

For example, the product id is highlighted below:

<img src="/images/skm-produc-id.png" style="width:100%; max-width:388px;" />

## Examples
### The main page

<img src="/images/skm-new-product.png" style="width:100%; max-width:566px;" />

### The 'create new product' page

<img src="/images/skm-new-product-2.png" style="width:100%; max-width:491px;" />


