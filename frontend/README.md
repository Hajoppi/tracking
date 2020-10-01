# Frontend

This is the page's frontend.

## Usage
To get up and running run:
``` bash
$ npm install
$ npm start
```
Yes, that's it. Only two commands!

## Important Files ##
So there are two important files that needs to be addressed:

### main.js ###
This file will load your single page application and bootstrap all the plugins that are used.
It will also serve as the entry point which will be loaded and compiled using webpack.

### App.vue ###
The main Vue file.
This file will load the page inside the `router-view`-component.
It will check if the user is authenticated and load the resources accordingly.

## Directory Structure ##
Inside the `src`-directory, are a couple directories that needs to be addressed:

### Assets ###
The assets that you want to use are places inside this directory.
This can be images, stylesheets, videos... you name it.

### Components ###
Your components will be placed inside this directory.
As you can see, this boilerplate comes already shipped with a pre-made card component.

### Layouts ###
Your layout files will be placed inside this directory.
When you are building a large single page application, you will be using different layouts.

### Locale ###
The Vue I18n plugin is used for localization.

### Mixins ###
The mixins you want to use with Vue will be placed inside this directory.

### Plugins ###
It will load and configure:
 - axios
 - vue-i18n
 - vue-router
 - vuex
 - vuex-router-sync

### Proxies ###
Proxies are used to perform AJAX-requests.

### Routes ###
In this directory you can specify the routes that are used by this application.
Vue Router loads the routes located in this directory.

### Store ###
As mentioned before, Vuex is used as a single point of truth.

### Transformers ###
Transformers are used to transform the incoming and outgoing requests.

### Utils ###
Handy utils
(None there yet :D)
### Pages ###
The pages are placed inside this directory.
