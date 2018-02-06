# Tabswitcher
![TabSwitcher](tabswitcher.png)


## Package development from
[react-chrome-redux-examples](https://github.com/tshaddix/react-chrome-redux-examples)

## To Run Tabswitcher
Clone or download this repo.

Navigate to an example's root folder, then run

```
npm install 
```

To build the project, run 

```
gulp
gulp watch
```

And webpack bundle will be created. 

In the root project directory, you will find a `build` folder. To install the extension in chrome, go to [chrome://extensions](chrome://extensions) on your browser, make sure developer mode is enabled, and click on "Load unpacked extension...". Select the `build` directory and you're on you're way!


## Running / Development

1. Clone and Enter into the directory `cd taskmanager`
2. Execute `gulp watch` command on terminal. A new folder named [build] is created in current Directory 
3. Open Chrome(Browser). Go to Options (on right hand side beside address bar) -> More Tools -> Extensions or enter chrome://extensions on the address bar
4. Enable Developer mode
5. Click on "Load unpacked extension"
6. Choose `build` folder previously created by grunt and choose open.
7. Your extension is now installed
8. Browse new tab to view the newly install extension in development mode

