import { Product } from './Product';

export class Service {

    id_Client?: number;
    id_Product?: number;
    code?: number;
    fullname?: string;
    state?: boolean;

    constructor( ) { }

    public async test(id: string, product: Product[]): Promise<void> {
        console.log(id);
        console.log(product);
        //return bcrypt.hash(password, salt);
    }
}
