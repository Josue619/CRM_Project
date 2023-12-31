import { IEvent } from '../interfaces/ievent.interface';
import * as _ from 'lodash';
import * as moment from 'moment';

export class Event implements IEvent {

    constructor(data) {
        _.set(this, 'data', data);
    }

    get id(): string {
        return _.get(this, 'data.id');
    }

    set id(value: string) {
        _.set(this, 'data.id', value); 
    }

    get id_User(): string {
        return _.get(this, 'data.id_User');
    }

    set id_User(value: string) {
        _.set(this, 'data.id_User', value); 
    }

    get title(): string {
        return _.get(this, 'data.title');
    }

    set title(value: string) {
        _.set(this, 'data.title', value); 
    }

    get start(): string {
        return _.get(this, 'data.start');
    }

    set start(value: string) {
        _.set(this, 'data.start', value); 
    }

    get end(): string {
        return _.get(this, 'data.end');
    }

    set end(value: string) {
        _.set(this, 'data.end', value); 
    }

    get startDate(): Date {
        return _.has(this, 'data.startDate') ? _.get(this, 'data.startDate') : moment(this.start);
    }

    set startDate(value: Date) {
        _.set(this, 'data.startDate', value); 
    }

    get endDate(): Date {
        return _.has(this, 'data.endDate') ? _.get(this, 'data.endDate') : moment(this.end);
    }

    set endDate(value: Date) {
        _.set(this, 'data.endDate', value); 
    }

    get description(): string {
        return _.get(this, 'data.description');
    }

    set description(value: string) {
        _.set(this, 'data.description', value); 
    }

    get className(): string {
        return _.get(this, 'data.className');
    }

    set className(value: string) {
        _.set(this, 'data.className', value); 
    }

    get url(): string {
        return _.get(this, 'data.url');
    }

    set url(value: string) {
        _.set(this, 'data.url', value); 
    }

    get emailSent(): boolean {
        return _.get(this, 'data.emailSent');
    }

    set emailSent(value: boolean) {
        _.set(this, 'data.emailSent', value); 
    }

    getData() {
        return _.get(this, 'data');
    }

}