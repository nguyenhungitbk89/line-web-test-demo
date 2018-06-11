
class localDataProvider{
    constructor(){
        if(localStorage){
            this.dataSet = localStorage;
        }else{
            alert("localStorage is not supported!");
        }
    }

    saveData(searchKeyWord){
        let historyData = this.dataSet.getItem("historySearch");
        historyData = historyData? JSON.parse(historyData) : [];
        
        if(this.isExistingKeyWord(searchKeyWord, historyData)){
            let itemIdx = historyData.findIndex(function(item){
                return item.keyWord.toLowerCase() == searchKeyWord.toLowerCase()
            });
            historyData[itemIdx].count = historyData[itemIdx].count + 1; 
        }else{
            historyData.push({keyWord: searchKeyWord.toLowerCase(), count: 1})
        }
        
        this.dataSet.setItem("historySearch", JSON.stringify(historyData));
    }

    retrieveData(key){
        var ret = this.dataSet.getItem("historySearch");
        return JSON.parse(ret);
    }
    
    deleteHistoryItem(searchKeyWord){
        let historyData = this.dataSet.getItem("historySearch");
        historyData = historyData? JSON.parse(historyData) : [];

        if(historyData.length > 0 && this.isExistingKeyWord(searchKeyWord, historyData)){
            let itemIdx = historyData.findIndex(function(item){
                return item.keyWord.toLowerCase() == searchKeyWord.toLowerCase()
            });
            historyData.slice(itemIdx, 1);
        }
    }

    isExistingKeyWord(searchKeyWord, historyData){
        var listKey = [];
        listKey = historyData.filter(function(item){
            return item.keyWord.toLowerCase() == searchKeyWord.toLowerCase();
        });
        return listKey.length > 0? true : false;
    }
}