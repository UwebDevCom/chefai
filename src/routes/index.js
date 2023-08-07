import express from 'express';
import users from './users.js';
import reciepes from './reciepes.js';

const router = express.Router();

export default () => {
    users(router);
    reciepes(router);
    return router;
}