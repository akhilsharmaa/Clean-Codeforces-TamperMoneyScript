## Clean-Codeforces **(using Ctrl+P)**
Simple JS script that make codeforces problem page clean &amp; space optimize using Tampermonkey browser extension.
![BefvsAft](https://user-images.githubusercontent.com/74103314/207593287-bb75ecfd-7961-4423-a6cc-f9ab32117c84.png)


**Tutorial**
## Setup & Installation
- Install [Tamper Monkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) browser extension.
- Create a new script in Tamper Monkey & Paste this Code.
  
use by **Ctrl/Cmd+P**
  
  ```
 
// ==UserScript==
// @name         Codeforce Problem Clean
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Help you to print complete problemset from CodeForces with only 1 column
// @author       Akhilesh Kumar Sharma
// @match        https://codeforces.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codeforces.com
// @grant        none
// ==/UserScript==

function addGlobalStyle(css) {
    // Copy from: https://stackoverflow.com/a/46285637
    var head, style;
    head = document.getElementsByTagName('head')[0];
    if (!head) { return; }
    style = document.createElement('style');
    style.type = 'text/css';
    style.innerHTML = css.replace(/;/g, ' !important;');
    head.appendChild(style);
}

function watermark(){
    var pageUrl = "URL : " + window.location.href.substring(8);;
    const node = document.createElement("p");
    node.style.textAlign = "end";
    node.style.color ="#a5a5a5";
    const textnode = document.createTextNode(pageUrl);
    node.appendChild(textnode);
    document.getElementsByClassName("note")[0].appendChild(node);
}

function removeElementsByClass(className){
    const elements = document.getElementsByClassName(className);
    while(elements.length > 0){
        elements[0].parentNode.removeChild(elements[0]);
    }
}

function cleanProblemStatement(){

     const ids = ["sidebar", "footer", "header"];
     const classNames = [ "second-level-menu",
                         "roundbox menu-box",
                         //"property-title",
                         // "time-limit",
                         "alert alert-info diff-notifier",
                         // "memory-limit",
                         "input-file",
                         "alert",
                         "alert-success",
                         "output-file",
                         "button-up",
                         "input-output-copier"]

     // REMOVE ALL THE IDS AND CLASS
     ids.forEach(ele =>{document.getElementById(ele).remove();});
     classNames.forEach(ele =>{removeElementsByClass(ele); });

    document.querySelectorAll('.problemindexholder').forEach(function(el) {
        el.style.position = 'absolute';
    });

    document.querySelectorAll('.problemindexholder').forEach(function(el) {
        el.style.position = 'absolute';
    });


    document.querySelectorAll('.title').forEach(function(el) {
        el.style.lineSpace = 'absolute';
    });

    var body = document.getElementById("pageContent");
    body.style.padding = "0px";
    body.style.margin = "0px";

    // Center shift the title
    document.querySelectorAll('.problem-statement .header').forEach(function(el) {
        el.style.textAlign = 'center';
    });


    document.getElementsByClassName("ttypography")[0].style.cssText= "margin: 0 !important;";
    document.getElementById("body").style.padding = "0";
    document.getElementsByClassName("problem-statement")[0].style.cssText= "margin: 0!important;";


    const testElement =document.querySelectorAll('.header .title').forEach(function(el) {
        el.style.fontSize ="24px";
    });

}

function customizeTimeMemoryLimit(){

    var timeLimitTitle = document.querySelector(".time-limit .property-title");
    var memoryLimitTitle = document.querySelector(".memory-limit .property-title");

    timeLimitTitle.innerHTML = "<div class='property-title'>Time/Mem</div>";
    memoryLimitTitle.innerHTML = "";

    var timeLimit = document.querySelector(".time-limit");
    var memoryLimit = document.querySelector(".memory-limit");

    timeLimit.appendChild(memoryLimit)
    timeLimit.style.display = "flex";
    timeLimit.style.alignItems = "center";
    timeLimit.style.width = "fit-content";


    var title = document.querySelector(".title p");
    title.appendChild(timeLimit);

    timeLimit = document.querySelector(".time-limit");
    timeLimit.style.fontSize ="13px";
    timeLimit.style.fontStyle = "normal";
    timeLimit.style.fontFamily = "'Roboto Slab', serif";


     var styleElement = document.getElementById("customStyle");

     if (!styleElement) {
         styleElement = document.createElement("style");
         styleElement.id = "customStyle";
         document.head.appendChild(styleElement);
     }

    var cssRule = ".problem-statement .property-title:after { content: \"\"; }";
    styleElement.textContent = cssRule;
}

function addContestNameAndRating(ratingStr){

    const sidebar = document.getElementsByClassName("left");
    const text = sidebar[0].textContent;

    if(text=="Name"){
        return;
    }

    const el = document.createElement('p');
    el.textContent = ratingStr + " - " + text;
    el.style.fontSize ="20px";
    el.style.paddingTop ="2px";
    el.style.paddingBottom ="2px";
    // el.style.fontStyle = "italic";
    el.style.textAlign = "center";

    el.style.fontFamily = "Times New Roman ,sans-serif";
    el.style.margin = "0px";

    const box = document.getElementsByClassName("title")[0];
    box.appendChild(el);
}

function addFonts(){

    // Create a link element for Google Fonts
    var linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href = "https://fonts.googleapis.com/css2?family=Josefin+Sans&family=Poppins:ital,wght@0,100;0,200;0,300;0,400;0,500;0,600;0,700;0,800;0,900;1,300;1,400&family=Source+Code+Pro:wght@300&display=swap";

    // Append the link element to the document's head
    document.head.appendChild(linkElement);



    // Create a link element for Google Fonts
    linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href = "https://fonts.googleapis.com/css2?family=Roboto+Slab&display=swap";

    // Append the link element to the document's head
    document.head.appendChild(linkElement);


    linkElement = document.createElement("link");
    linkElement.rel = "stylesheet";
    linkElement.type = "text/css";
    linkElement.href = "<link rel='stylesheet' href='https://fonts.googleapis.com/css2?family=Material+Symbols+Outlined:opsz,wght,FILL,GRAD@24,400,0,0\' />"

    document.head.appendChild(linkElement);


}

function getProblemDifficulty(){

    var tagBoxElement = document.querySelector('.tag-box[title="Difficulty"]');

    // Create a variable and copy the content into it
    var tagBoxContent = "";
    if (tagBoxElement) {
        tagBoxContent = tagBoxElement.textContent || tagBoxElement.innerText;
    }

    const rating = "" + tagBoxContent.substring(6);
    return rating;
}


function addProblemDifficulty(ratingString){

    var titleParagraph = document.querySelector('.title');

        // Check if the element is found
    if (ratingString) {
            // Append HTML using innerHTML
            titleParagraph.innerText += "" + ratingString;

    }

}


(function() {

    'use strict';
    // Using ctrl+P
    document.addEventListener('keydown', function(event) {
        if (event.code == 'KeyP' && (event.ctrlKey || event.metaKey)) {

            addFonts();

            var problemDiffculty = getProblemDifficulty();
            // addProblemDifficulty(problemDiffculty);

            addContestNameAndRating(problemDiffculty);
            cleanProblemStatement();

            customizeTimeMemoryLimit();
        }
    });

    addGlobalStyle('.compact-problemset .problem-frames { column-count: 1; }');


})();

  ```
