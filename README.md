# SKM Wiki Engine
This repository contains a wiki engine and wiki articles for SKM's help page.

## Introduction
It's very easy to use this engine to host your own wiki. There are four different types of files:

* __index.html__ (*root folder*) - Renders all other pages. This is where you can customize the menu bar, footer, etc. 
Make sure to keep the `markdownout` tag, for otherwise the engine won't be able to render the pages.
* __file.md__ (*md folder*) - This is the actual page (here, it's `file`) that is stored in the markdown format. Note, html can still
be used. To access this page, we enter `example.com/#file`. 
*  __file.json__ (*json folder*)- This configures the page layout of `file`. For example, it sets the title, the background colour, etc.
Moreover, they specify the menu that should be used (see below).
* __.menu.json__ (*json folder*)- This file stores the menu that we display on the right hand side. Please add a *dot* in the beginning
of the file to mark a json file as a menu (it's a good convention if you have many pages.

In addition, there are several defaults:
* __404.md__ - This is the not found page that will be displayed if the desired file cannot be found. Please add this file to your wiki.
* __index.md__ - This file will be shown by default, i.e. if no page is specified. So, if we go to `example.com`, we will see the this page.

## Getting started
In order to set up the wiki, you need to restore all `bower` pages. If you don't have `bower`, you need to create
a folder called `bower_components` that includes all the packages listed in `bower.json`. However, it's much easier if you just install `bower`!

Now, you technically done. You only need to create custom wiki pages. If you want to test run them on your computer, please note that it won't unless
you run an http server of some kind (such Apache). If you don't want to install Apache, please run `server.py` using Python 3.

## Example files

### file.json
```
{
    "title": "Basics of SKM",
    "color": "#0066cc",
    "text": "white",
    "showmenu": "true",
    "menu" : ".menu",
    "next": "#prodkeys",
    "prev": null
} 

```
### .menu.json
```
{
        "Introduction": "#basics",
        "Products and Keys": "#prodkeys",
        "Web API": "#webapi"
}
```
## Viewing pages locally (server.py)
Th wiki engine needs to be able to access the file system, in order to render the pages properly. You can either use Apache or the small Python server script. If you have Python 3.*, simply run the `server.py` script.
