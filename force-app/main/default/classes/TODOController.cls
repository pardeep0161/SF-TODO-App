public with sharing class TODOController {
    
    @AuraEnabled(cacheable=true)
    public static List<ToDo__c> loadData(){
        return [SELECT ID,Name,Description__c,Reminder_Date__c,Due_Date__c,Comleted__c FROM ToDo__c];
    }
}
