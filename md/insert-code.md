# Adding Code
We almost have all the pieces in place to get a working licensing solution.
We will cover the code in this section and look at how to retrieve **access tokens** and **public key (RSA)** later.

Our application will have two places where we will need to insert the code:
* During license key registration - the first time the user inserts a license key
* During application start - to check for existing license on launch

You can download the source code <a href="https://github.com/SerialKeyManager/Examples/tree/master/Digital%20Tools%20Collection" target="_blank">here</a>.

## License Key Registration

```
Dim token = "WyIxNzIiLCJhak9OT1g3NW90YlQyRFFVUzBWdnlGSHJYdUpMdDA0REMxNzNOa2duIl0="
Dim key = TextBox1.Text.Replace(" ", "")

Dim license = New LicenseKey() With
{
    .ProductId = 3349,
    .Key = key
}

If license.Refresh(token, True) Then
    ' we are able to auto complete missing key info

    Form1.Button1.Enabled = license.HasFeature(3).IsValid() ' either we have feature1 or not.
    Form1.Button2.Enabled = license.HasFeature(4).IsValid() ' either we have feature2 or not.
    Form1.Button4.Enabled = license.HasFeature(5).IsValid() ' either we have feature3 or not.

    Form1.Text = "Digital Tools"

    If license.HasFeature(1).HasNotExpired().IsValid() Then
        ' feature 1 is a time limited, so we check that it has not expired.
        Form1.Text = "Digital Tools - " + license.DaysLeft().ToString() + " day(s) left"
    ElseIf license.HasNotFeature(1).IsValid() Then
    Else
        MsgBox("Your license has expired and cannot be used.")
        nolicense()
    End If
    license.SaveToFile()
Else
    ' something went wrong.
    MsgBox("Unable to access the license server or the key is wrong.")
End If
```

This code will retrieve all the license data (using `Refresh`) and enable buttons depending on the features in the license.
Features 3-5 indicate a certain functionality whereas Feature 1 is used to indicate a time-limit (in case it's a subscription).
Once we have a valid license, we will save it locally (it will be signed by SKM, because **sign** is set to true in `Refresh`).
 
 ## Application Start
 ```
 NoLicense()

Dim license = New LicenseKey().LoadFromFile()
Dim publicKey = "<RSAKeyValue><Modulus>sGbvxwdlDbqFXOMlVUnAF5ew0t0WpPW7rFpI5jHQOFkht/326dvh7t74RYeMpjy357NljouhpTLA3a6idnn4j6c3jmPWBkjZndGsPL4Bqm+fwE48nKpGPjkj4q/yzT4tHXBTyvaBjA8bVoCTn+LiC4XEaLZRThGzIn5KQXKCigg6tQRy0GXE13XYFVz/x1mjFbT9/7dS8p85n8BuwlY5JvuBIQkKhuCNFfrUxBWyu87CFnXWjIupCD2VO/GbxaCvzrRjLZjAngLCMtZbYBALksqGPgTUN7ZM24XbPWyLtKPaXF2i4XRR9u6eTj5BfnLbKAU5PIVfjIS+vNYYogteQ==</Modulus><Exponent>AQAB</Exponent></RSAKeyValue>"

Dim token = "WyIxNzIiLCJhak9OT1g3NW90YlQyRFFVUzBWdnlGSHJYdUpMdDA0REMxNzNOa2duIl0="

If license IsNot Nothing Then

    ' either we get a fresh copy of the license or we use the existing one (given it is no more than 90 days old)
    If license.Refresh(token, True) Or license.HasValidSignature(publicKey, 90).IsValid() Then

        Button1.Enabled = license.HasFeature(3).IsValid() ' either we have feature1 or not.
        Button2.Enabled = license.HasFeature(4).IsValid() ' either we have feature2 or not.
        Button4.Enabled = license.HasFeature(5).IsValid() ' either we have feature3 or not.

        Text = "Digital Tools"

        If license.HasFeature(1).HasNotExpired().IsValid() Then
            ' feature 1 is a time limited, so we check that it has not expired.
            Text = "Digital Tools - " + license.DaysLeft().ToString() + " day(s) left"
        ElseIf license.HasNotFeature(1).IsValid() Then
            ' not time limited.

        Else
            MsgBox("Your license has expired and cannot be used.")
            NoLicense()

        End If

        license.SaveToFile()

    Else
        MsgBox("Your license has expired and cannot be used.")
    End If

Else
    ' no license found. you could tell the user to provide a license key.
End If
 ```
When your application launches, we will try to get a new version of the license key, in case it has been modified.
If we don't have internet access, we will use the local copy as long as 90 days have not passed since it was retrieved.
Everything else is the same as when the user registers the license for the first time.