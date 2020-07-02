export class DataStorage {
    
    setDataStorage(key, value) {       
        localStorage.setItem(key, JSON.stringify(value));
    }

    getDataStorage(key) {
        if (localStorage.key) {
            return JSON.parse(localStorage.getItem(key));
        }        
    }   
}