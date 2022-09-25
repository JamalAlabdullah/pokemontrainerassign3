export class StorageUtil{
    
public static storageSave<T>(key:string, value:T):void
{
    sessionStorage.setItem(key,JSON.stringify(value));
}


public static storageRead<T>(key:string): T | undefined {
    const storageValue= sessionStorage.getItem(key);
    try {
        if(storageValue){
            return JSON.parse(storageValue) as T;

        }
            return undefined;

        
    } catch (e) {
        sessionStorage.removeItem(key);
        return undefined;
        
    }
  }
}






