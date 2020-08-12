export class Planner {
    id_Client: string = '0';
    title: string = '';
    start?: Date;
    startDate: Date = new Date();
    end?: Date;
    endDate?: Date;
    description: string = '';
    className: string = '';
    url?: string;
    emailSent: boolean = false;
}