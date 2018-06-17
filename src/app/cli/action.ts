const SOURCE_MAP_SUPPORT = true?require('source-map-support').install():null;
import {CliConfig} from '../cli/models/cli-config';
export abstract class Action {
    constructor(cliParams:string[]) {

    }
    config: CliConfig = require('../../../default-cli.config');;
    static run() {
        try {
            var implementor = require('./actions/' + ACTION_NAME),
                implementorName = Object.keys(implementor)[0],
                implementorConstructor = implementor[implementorName],
                logMessage = Action.debugSplash(implementorName),
                impinst =  new implementorConstructor(process.argv);
            
            return impinst;
        } catch(e) {
            Action.error(e)
        }
    }
    static debugSplash(implementorName) {
        Action.debug(
            `Running cli Action "${implementorName}" with process.argv:`,
            process.argv
        )
    }
    static debug(...anything:any[]) {
        if (true)
            anything.forEach(thing=>console.log(thing))
    }

    static error(...anything:any[]) {
        if (true)
            anything.forEach(thing=>console.error(thing))
    }
    static invalid(qualifier:ParamQualifier) : boolean | ParamQualifier  {
        if (typeof qualifier.byIndex !== undefined && !isNaN(qualifier.byIndex)) {
            if (typeof process.argv[qualifier.byIndex] === 'undefined')
                return { byIndex:qualifier.byIndex }
        } else throw new Error('ParamQualifier instance missing \'byIndex\'');
        if (typeof qualifier.hasType === 'string') {
            var hasTypeError = ()=> { return { byIndex:qualifier.byIndex, hasType:qualifier.hasType }};
            if (typeof qualifier.hasType === 'object') {
                if (typeof (qualifier.hasType as Array<string>).find(t=>typeof process.argv[qualifier.byIndex]===t) === 'undefined')
                    return hasTypeError();
            }
            else if (typeof process.argv[qualifier.byIndex] !== qualifier.hasType) {
                return hasTypeError();
            }
        }
        if (typeof qualifier.isNot === 'string') {
            var isTypeError = (itIs)=> { return { byIndex:qualifier.byIndex, isNot:itIs }},
                itIs = typeof qualifier.isNot === 'object'?(qualifier.isNot as Array<string>).find(t=>typeof process.argv[qualifier.byIndex]===t):typeof process.argv[qualifier.byIndex];
            if (typeof qualifier.isNot === 'object') {
                if (typeof itIs !== 'undefined')
                    return isTypeError(itIs);
            }
            else if (itIs === qualifier.isNot) {
                return isTypeError(itIs);
            }
        }
        if (typeof qualifier.hasValue === 'string' || qualifier.hasValue instanceof RegExp || typeof qualifier.hasValue === 'object') {
            var hasValueError = ()=> { return { byIndex:qualifier.byIndex, hasValue:qualifier.hasValue }},
            hasTest = (val)=>val as any instanceof RegExp?(val as any as RegExp).test(process.argv[qualifier.byIndex]):process.argv[qualifier.byIndex]===val;
            if (typeof qualifier.hasValue === 'object') {
                if (typeof (qualifier.hasValue as Array<string>).find(t=>hasTest(t)) === 'undefined')
                    return hasValueError();
            }
            else if (!hasTest(qualifier.hasValue)) {
                return hasValueError();
            }
        }
        return false;

    }
}
export class ParamQualifier {
    byIndex:number;
    hasType?:string|string[];
    isNot?:string|string[];
    hasValue?:string|string[]|RegExp|RegExp[];
}
export const
    NODE_PATH_INDEX     = 0,
    COMMAND_PATH_INDEX  = 1,
    ACTION_INDEX        = 2,
    SUBJECT_INDEX       = 3,
    SUBJECT_NAME_INDEX  = 4,
    NODE_PATH = process.argv[NODE_PATH_INDEX],
    COMMAND_PATH = process.argv[COMMAND_PATH_INDEX],
    ACTION_NAME = process.argv[ACTION_INDEX],
    SUBJECT = process.argv[SUBJECT_INDEX],
    SUBJECT_NAME = process.argv[SUBJECT_NAME_INDEX];
Action.run();