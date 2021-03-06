import { Action, SUBJECT, SUBJECT_NAME, ACTION_NAME } from '../action';
import { ObjectType } from '../models/objects';
export class NewAction extends Action {
    constructor(cliParams:string[]) {
        super (cliParams);
        Action.debug(`Running: "new", subject:"${SUBJECT}"`);
        if( typeof this[this.subject] === 'function')
            this[this.subject](cliParams);
    }
    subject:string;
    subjectName:string;

    async module(cliParams) {
        if(!Action.invalid({byIndex:4}))
            Action.debug(`Generating a module: "${SUBJECT_NAME}" in "${this.config.target.path}"`);

    }
}

export interface Newable<T extends ObjectType> {

}