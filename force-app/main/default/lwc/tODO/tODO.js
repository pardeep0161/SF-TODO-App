import { LightningElement,api,track,wire } from 'lwc';
import loadData from '@salesforce/apex/TODOController.loadData';

const COLS = [
    { label: 'Name', fieldName: 'FirstName', editable: true },
    { label: 'Decription', fieldName: 'Decription', editable: true },
    { label: 'Reminder_Date', fieldName: 'Reminder_Date',type: 'date' },
    { label: 'Due_Date', fieldName: 'Due_Date', type: 'date' },
    { label: 'Comleted', fieldName: 'EmaComletedl', type: 'checkbox' }
];

export default class TODO extends LightningElement {
    @api recordId;

    @track columns = COLS;

    @wire(loadData)
    todo;
}