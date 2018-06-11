function autocomplete(inputData, data) {
    var currentFocusedItem,
        dataProvider = new localDataProvider(),
        events = ['input', 'click'];

    events.map(function (e) {
        inputData.addEventListener(e, function (e) {
                var autocompletedItems,
                    appItem,
                    inputValue = this.value;
                removeSuggestedList();
                currentFocusedItem = -1;
                autocompletedItems = document.createElement("DIV");
                autocompletedItems.setAttribute("id", "autocomplete-list");
                autocompletedItems.setAttribute("class", "autocomplete-items");
                this.parentNode.appendChild(autocompletedItems);

                for (var i = 0; i < data.length; i++) {
                    if (!Utils.isHTML(data[i].name) && (data[i].name.substr(0, inputValue.length).toUpperCase() == inputValue.toUpperCase() || inputValue.length == 0)) {
                        appItem = document.createElement("DIV");
                        appItem.innerHTML += "<img src='" + data[i].thumbnailUrl + "' class='thumbnail-item'></img>";
                        appItem.innerHTML += data[i].name;
                        appItem.innerHTML += "<input type='hidden' value='" + data[i].name + "'>";
                        appItem.addEventListener("click", function (e) {
                            inputData.value = this.getElementsByTagName("input")[0].value;
                            removeSuggestedList();
                            dataProvider.saveData(inputValue);
                        });
                        autocompletedItems.appendChild(appItem);
                    }
                }
            });
    });

    inputData.addEventListener("keydown", function (e) {
        var itemList = document.getElementById("autocomplete-list");
        if (itemList) 
            itemList = itemList.getElementsByTagName("div");
        if (e.keyCode == 40) { // DOWN key is pressed
            currentFocusedItem++;
            activeFocusedItem(itemList);
        } else if (e.keyCode == 38) { //UP key is pressed
            currentFocusedItem--;
            activeFocusedItem(itemList);
        } else if (e.keyCode == 13) { // ENTER key is pressed
            e.preventDefault();
            if (currentFocusedItem > -1) {
                //Click on the selected item
                if (itemList) {
                    itemList[currentFocusedItem].click();
                }
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

    function activeFocusedItem(itemList) {
        if (!itemList) 
            return false;
        unActiveItem(itemList);
        if (currentFocusedItem >= itemList.length) 
            currentFocusedItem = 0;
        if (currentFocusedItem < 0) 
            currentFocusedItem = (itemList.length - 1);
        itemList[currentFocusedItem].classList.add("autocomplete-active");
    }

    function unActiveItem(itemList) {
        for (var i = 0; i < itemList.length; i++) {
            itemList[i].classList.remove("autocomplete-active");
        }
    }

    document.addEventListener("click", function (e) {
        removeSuggestedList(e.target);
    });
}