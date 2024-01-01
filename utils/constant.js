import dotenv from 'dotenv';
dotenv.config();
const { PORT,DATABASE_URL,secretKey } = process.env;

const ERROR_CODES = {
    SAVED:200,
    NOT_FOUND: 404,
    SERVER_ERROR: 500,
    UNAUTHRIZE:401,
    INCORRECT:400
    
};
export{secretKey,PORT,DATABASE_URL,ERROR_CODES}