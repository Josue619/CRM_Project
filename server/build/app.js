"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const morgan_1 = __importDefault(require("morgan"));
const cors_1 = __importDefault(require("cors"));
const dotenv_1 = __importDefault(require("dotenv"));
dotenv_1.default.config();
const authRoutes_1 = __importDefault(require("./routes/authRoutes"));
const userRoutes_1 = __importDefault(require("./routes/userRoutes"));
const fileRoutes_1 = __importDefault(require("./routes/fileRoutes"));
const plannerRoutes_1 = __importDefault(require("./routes/plannerRoutes"));
const productRoutes_1 = __importDefault(require("./routes/productRoutes"));
const binnacleRoutes_1 = __importDefault(require("./routes/binnacleRoutes"));
const reportRoutes_1 = __importDefault(require("./routes/reportRoutes"));
class Server {
    constructor() {
        this.app = express_1.default();
        this.config();
        this.routes();
    }
    config() {
        this.app.set('port', process.env.PORT || 3000);
        this.app.use(morgan_1.default('dev'));
        this.app.use(cors_1.default());
        this.app.use(express_1.default.json());
        this.app.use(express_1.default.urlencoded({ extended: false }));
    }
    routes() {
        this.app.use('/api/auth', authRoutes_1.default);
        this.app.use('/api/user', userRoutes_1.default);
        this.app.use('/api/file', fileRoutes_1.default);
        this.app.use('/api/planner', plannerRoutes_1.default);
        this.app.use('/api/product', productRoutes_1.default);
        this.app.use('/api/binnacle', binnacleRoutes_1.default);
        this.app.use('/api/report', reportRoutes_1.default);
    }
    start() {
        this.app.listen(this.app.get('port'), () => {
            console.log('Server on port', this.app.get('port'));
        });
    }
}
const server = new Server();
exports.default = server;
//# sourceMappingURL=app.js.map