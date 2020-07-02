"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.ClientS = void 0;
class ClientS {
    constructor() {
        this.id_Client = '';
        this.id_Product = 0;
        this.code = 0;
        this.fullname = '';
        this.state = true;
    }
    loadService(id_Client, serv) {
        const service = new ClientS();
        service.id_Client = id_Client;
        service.id_Product = serv.id;
        service.code = serv.code;
        service.fullname = serv.fullname;
        service.state = true;
        return service;
    }
}
exports.ClientS = ClientS;
//# sourceMappingURL=ClientS.js.map