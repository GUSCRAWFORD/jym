import { Command } from 'app/cli/command';
import { ObjectType } from 'app/cli/models';
export class NewCommand extends Command {
    constructor(...cliParams:string[]) {
        super (cliParams);
    }

    async module(name:string) {

    }
}

export interface Newable<T extends ObjectType> {

}