
function autocomplete(inputData, data) {
    var currentFocusedItem;
    inputData.addEventListener("input", function (e) {
        var autocompletedItems,
            appItem, inputValue = this.value;
        removeSuggestedList();
        currentFocusedItem = -1;
        autocompletedItems = document.createElement("DIV");
        autocompletedItems.setAttribute("id", "autocomplete-list");
        autocompletedItems.setAttribute("class", "autocomplete-items");
        this.parentNode.appendChild(autocompletedItems);
        for (var i = 0; i < data.length; i++) {
            if (data[i].name.substr(0, inputValue.length).toUpperCase() == inputValue.toUpperCase() || inputValue.length == 0) {
                appItem = document.createElement("DIV");
                appItem.innerHTML += data[i].name;
                appItem.innerHTML += "<input type='hidden' value='" + data[i].name + "'>";
                appItem.addEventListener("click", function(e) {
                    inputData.value = this.getElementsByTagName("input")[0].value;
                    removeSuggestedList();
                });
                autocompletedItems.appendChild(appItem);
            }
        }
    });

    function removeSuggestedList(elmnt) {
        var itemList = document.getElementsByClassName("autocomplete-items");
        for (var i = 0; i < itemList.length; i++) {
            if (elmnt != itemList[i] && elmnt != inputData) {
                itemList[i].parentNode.removeChild(itemList[i]);
            }
        }
    }

    document.addEventListener("click", function (e) {
        removeSuggestedList(e.target);
    });
}