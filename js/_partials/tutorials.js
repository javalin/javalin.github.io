 (() => {
     // calculate time to read
     if (document.getElementById("timeToRead") !== null) {
         function getText(a){for(var d="",c=0;c<a.childNodes.length;c++){var b=a.childNodes[c];8!==b.nodeType&&(d+=1!=b.nodeType?" "+b.nodeValue:getText(b))}return d}function wordCount(a){return a.replace(/\r+/g," ").replace(/\n+/g," ").replace(/[^A-Za-z0-9 ]+/gi,"").replace(/^\s+/,"").replace(/\s+$/,"").replace(/\s+/gi," ").split(" ").length} var estTime=Math.floor(wordCount(getText(document.getElementsByTagName("article")[0]))/100),estInterval=5*Math.round((estTime-estTime/3)/5)+"-"+5*Math.round((estTime+estTime/3)/5),estInterval=("0-0"===estInterval||"0-5"===estInterval||"5-5"===estInterval)?"~5":estInterval; document.getElementById("timeToRead").innerHTML = "Reading time: <b>"+estInterval+" min</b>";
     }

     // build tutorial tabs
     const allTutorials = document.querySelector(".all-tutorials")
     if (!allTutorials) return;
     document.querySelectorAll(".tutorial-tab").forEach(tab => {
         tab.addEventListener("click", e => {
             const tab = e.target.getAttribute("data-tutorial-tab");
             allTutorials.setAttribute("data-tab", tab); // set active tab
             history.replaceState({}, '', `${location.pathname}?tab=${tab}`);
         })
     })
     allTutorials.setAttribute("data-tab", "official"); // set default tab

     // set active tab from query param
     const urlParams = new URLSearchParams(location.search);
     const tab = urlParams.get("tab");
     if (tab) {
         allTutorials.setAttribute("data-tab", tab);
     }
 })();
