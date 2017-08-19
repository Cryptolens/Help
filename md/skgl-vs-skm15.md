# Difference between SKGL and SKM15
Serial Key Manager platform supports two key generation algorithms, SKGL and SKM15. Both offer different advantages, however it is recommended to use SKM15 instead of SKGL. Note, some methods in the Web API work with a certain type of key generation algorithm only. You can find out more here.

## SKGL

[SKGL](https://skgl.codeplex.com/) – Serial Key Generating Library is an open source, information based key validation algorithm. It’s the primary algorithm that Serial Key Manager uses to generate new keys. One of the features of SKGL is that it is decentralized, allowing you to validate keys without using Serial Key Manager. However, one of the advantages of using Serial Key Manager is the fact that you don’t need to expose the encryption password during key validation.

## SKM15

SKM15 – Serial Key Manager 2015 is an algorithm that is specifically developed to take an advantage of the fact that most of the applications will directly or indirectly access the license server at some point in time. It’s an information based key generation algorithm that does not contain any useful information such as the creation date. Instead, it relies on the license server or a local license file accompanying the license key.

## SKGL versus SKM15?

Depending on your requirements, both SKGL and SKM15 can work equally well. However, if you are unsure, you should preferably choose SKM15 (once the Web API supports it completely), mainly because it has several features that will be great to most of the users.

## Reasons to choose SKGL

* If you want to be able to get information such as the creation date, expiration date, features, etc, without accessing the license server.
* If your application will only have access to the licence key (i.e. with no access to neither the license server nor a a signed license file).

## Reasons to choose SKM15

* Your application will either have full access to the license server or a signed license file.
* You want to be able to update the key (either using the control panel or * when using trial activation) without changing the license key. In SKGL, by changing key information details, it will update the key since the algorithm is decentralized.
* You don’t want to remember a password for each project.
* You want your keys to contain as little amount of information as possible (such as creation date)