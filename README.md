## Clean-Codeforces **(using Ctrl+P)**
Simple JS script that make codeforces problem page clean &amp; space optimize using Tampermonkey browser extension.
![BefvsAft](https://user-images.githubusercontent.com/74103314/207593287-bb75ecfd-7961-4423-a6cc-f9ab32117c84.png)


**Tutorial**
## Setup & Installation
- Install [Tamper Monkey](https://chrome.google.com/webstore/detail/tampermonkey/dhdgffkkebhmkfjojejmpbldmpobfkfo?hl=en) browser extension.
- Create a new script in Tamper Monkey & Paste this Code.
  
use by **Ctrl+P**
  ```// @name         Codeforce Problem Clean
  // @namespace    http://tampermonkey.net/
  // @version      0.1
  // @description  Help you to print complete problemset from CodeForces with only 1 column
  // @author       Akhilesh Kumar Sharma
  // @match        https://codeforces.com/problemset/*
  // @icon         https://www.google.com/s2/favicons?sz=64&domain=codeforces.com
  // @grant        none
  // @license MIT 
  // ==/UserScript==


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
                           "memory-limit", "input-file", "output-file"]

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

  }


  (function() {

      'use strict';

      // Using ctrl+P
      document.addEventListener('keydown', function(event) {
          if (event.code == 'KeyP' && (event.ctrlKey || event.commandKey)) {
              cleanProblemStatement();
          }
      });

  })();
  
  ```
