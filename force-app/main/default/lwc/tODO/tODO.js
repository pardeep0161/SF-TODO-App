import { LightningElement,api,track,wire } from 'lwc';
import loadData from '@salesforce/apex/TODOController.loadData';
import { updateRecord, createRecord } from 'lightning/uiRecordApi';
import { ShowToastEvent } from 'lightning/platformShowToastEvent';
import { refreshApex } from '@salesforce/apex';
import TODO_OBJECT from '@salesforce/schema/ToDo_c';
import NAME_FIELD from '@salesforce/schema/ToDo_c.Name';
import DESCRIPTION_FIELD from '@salesforce/schema/ToDo_c.Description__c';
import REMINDER_DATE from '@salesforce/schema/ToDo_c.Reminder_Date__c';
import DUE_DATE_FIELD from '@salesforce/schema/ToDo_c.Due_Date__c';
import COMPLETED_FIELD from '@salesforce/schema/ToDo_c.Comleted__c';

const COLS = [
    { label: 'Name', fieldName: 'Name', editable: true },
    { label: 'Description', fieldName: 'Description__c', editable: true },
    { label: 'Reminder_Date', fieldName: 'Reminder_Date__c',type: 'date', editable: true },
    { label: 'Due_Date', fieldName: 'Due_Date__c', type: 'date', editable: true },
    { label: 'Completed', fieldName: 'Comleted__c', type: 'boolean', editable: true }
];

export default class TODO extends LightningElement {
    @track columns = COLS;
    @track draftValues = [];
    toDoId;

    @wire(loadData)
    todo;
    
    handleSave(event){
        const recordInputs =  event.detail.draftValues.slice().map(draft => {
            const fields = Object.assign({}, draft);
            return { fields };
        });

        const promises = recordInputs.map(recordInput => updateRecord(recordInput));
        Promise.all(promises).then(todos => {
        this.dispatchEvent(
            new ShowToastEvent({
                title: 'Success',
                message: 'ToDo Checklist updated',
                variant: 'success'
            })
        );
         // Clear all draft values
         this.draftValues = [];    
         // Display fresh data in the datatable
         return refreshApex(this.todo);
    }).catch(error => {
        // Handle error
    });
    }


    createToDo() {
        const fields = {};
        fields[NAME_FIELD.fieldApiName] = this.name;
        const recordInput = { apiName: TODO_OBJECT.objectApiName, fields };
        createRecord(recordInput)
            .then(todos => {
                this.todoId = todos.id;
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Success',
                        message: 'Account created',
                        variant: 'success',
                    }),
                );
            })
            .catch(error => {
                this.dispatchEvent(
                    new ShowToastEvent({
                        title: 'Error creating record',
                        message: error.body.message,
                        variant: 'error',
                    }),
                );
            });
    }
}