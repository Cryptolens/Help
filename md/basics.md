
<img src="/images/skmoverview3.png" width="100%" />

Before we dig into the specifics, let's look at how SKM works.

# SKM Platform
SKM Platform is accessed through the [skmapp.com](http://skmapp.com) website.
This is the central place where you can control all your applications. 
For instance, it enables you to:

* Implement licensing
* Process payments
* Analyse usage data

# SKM Client API
In order to be able to take advantage of all the power of the **SKM Platform**,
you need to include small [library](https://github.com/SerialKeyManager/SKGL-Extension-for-dot-NET) into your application.
As an example, it enables you to translate your licensing model into simple logic, as shown below:

```
if(license.HasFeature(1)
          .HasNotExpired()
          .IsValid())
{
    // do something
}
else
{
    // invalid license.
}
```