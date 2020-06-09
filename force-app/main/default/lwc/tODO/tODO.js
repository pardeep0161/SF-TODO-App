import { LightningElement,api,track,wire } from 'lwc';
import loadData from '@salesforce/apex/TODOController.loadData';

const COLS = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Description', fieldName: 'Description__c', editable: true },
    { label: 'Reminder_Date', fieldName: 'Reminder_Date__c',type: 'date' },
    { label: 'Due_Date', fieldName: 'Due_Date__c', type: 'date' },
    { label: 'Completed', fieldName: 'Comleted__c', type: 'boolean' }
];

export default class TODO extends LightningElement {
    @track columns = COLS;

    @wire(loadData)
    todo;
}