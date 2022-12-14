// ==UserScript==
// @name         Codeforce Problem Clean
// @namespace    http://tampermonkey.net/
// @version      0.1
// @description  Help you to print complete problemset from CodeForces with only 1 column
// @author       Akhilesh Kumar Sharma
// @match        https://codeforces.com/*
// @icon         https://www.google.com/s2/favicons?sz=64&domain=codeforces.com
// @grant        none
// @license MIT 
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

function cleanProblemStatement(className){

     const ids = ["sidebar", "footer", "header"];
     const classNames = ["second-level-menu", "roundbox menu-box",
                         "property-title", "time-limit", "alert alert-info diff-notifier",
                         "memory-limit", "input-file", "output-file", "button-up"]

     // REMOVE ALL THE IDS AND CLASS
     ids.forEach(ele =>{ document.getElementById(ele).remove();});
     classNames.forEach(ele =>{removeElementsByClass(ele); });

     //
    document.querySelectorAll('.problemindexholder').forEach(function(el) {
        el.style.position = 'absolute';
    });

    document.querySelectorAll(".sample-test").forEach(function(el) {
        el.style.backgroundColor = '#fff';
    });

    document.querySelectorAll('.title').forEach(function(el) {
        el.style.lineSpace = 'absolute';
    });

    var body = document.getElementById("pageContent");
    body.style.padding = "0px";
    body.style.margin = "0px";

    // Left shift the title
    document.querySelectorAll('.problem-statement .header').forEach(function(el) {
        el.style.textAlign = 'left';
    });

    const testElement =document.querySelectorAll('.header .title').forEach(function(el) {
        el.style.fontSize ="xx-large";
    });

}


(function() {

    'use strict';
    // Using ctrl+P
    document.addEventListener('keydown', function(event) {
        if (event.code == 'KeyP' && (event.ctrlKey || event.metaKey)) {

            // CLEAN the page
            cleanProblemStatement();
            // watermark();

        }
    });

    addGlobalStyle('.compact-problemset .problem-frames { column-count: 1; }');


})();
