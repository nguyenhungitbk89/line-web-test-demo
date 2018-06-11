function dataBindingHistories() {
    var dataProvider = new localDataProvider(),
        historyContainer = document.getElementById("list-history"),
        historyData = dataProvider.retrieveData().sort(function(a, b){return b.count - a.count});

    for (var i = 0; i < historyData.length; i++) {
        var historyItem = document.createElement("li");
        historyItem.setAttribute("id", historyData[i].keyWord);
        historyItem.setAttribute("class", "list-group-item");
        historyItem.innerHTML += "<a href='history.html'><span class='glyphicon glyphicon-trash'>Delete</span></a>&nbsp"
        historyItem.innerHTML += historyData[i].keyWord;
        historyItem.innerHTML += "<span class='badge'>" + historyData[i].count + "</span>";

        historyItem.addEventListener("click", function (e) {
            if(e.target.localName == "span")
            {
                dataProvider.deleteHistoryItem(this.id);
            }
        });

        historyContainer.appendChild(historyItem);
    }
}