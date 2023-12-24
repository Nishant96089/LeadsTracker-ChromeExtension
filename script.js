     // Leads Tracker Chrome Extension
     
let myData = [];  //Empty array to store the data input by user.

// Catching input,save-btn,delete-btn and unoredered list.
let inputEl = document.getElementById("input-el");
const inputBtn = document.getElementById("input-btn");
const saveTab = document.getElementById("save-tab");
const ulEl = document.getElementById("ul-el");
const deleteBtn = document.getElementById("delete-btn");

// Fetching data from localStorage and converting it back to array.
const getData = JSON.parse(localStorage.getItem("myData"));

// This if statement will only run if localStorage has a Truthy value.
if(getData) {
    myData = getData;  
    show(myData); // assigning data = myData to use show() function.
}

inputBtn.addEventListener("click", function () {  // Save btn onclick function.
    myData.push(inputEl.value);   //Pushing data entered inside input into array.
    inputEl.value = "";  // Clearing input field.
    
//  Converting the input into string and storing it in LocalStorage.
    localStorage.setItem("myData", JSON.stringify(myData));

    show(myData);  // assigning data = myData to use show() function.

})

saveTab.addEventListener("click", function () {
    // Grabbing hold of current active window's url and pushing it in myData array.
    chrome.tabs.query({active: true, currentWindow: true}, function(tabs) {
        myData.push(tabs[0].url);
        localStorage.setItem("myData", JSON.stringify(myData));

        show(myData);  // assigning data = myData to use show() function.
    })
})

deleteBtn.addEventListener("dblclick", function () {
    localStorage.clear();
    myData = [];

    show(myData); // assigning data = myData to use show() function.
})

// Using 'data' as a parameter to make show() function reusable.

function show(data) {  
    let listItem = "";
    // Fetching data from entered array and adding it to listItem string.
    for (let i = 0; i < data.length; i++) {
    // Using backticks `` so that we can split the expression in different lines.
    // Using $ sign to enter javascript data.
        listItem += `<li>
                    <a target = "_blank" href = "${data[i]}">
                    ${data[i]}
                    </a>
                    </li>`
    }
    ulEl.innerHTML = listItem;  
}









