import { loginUser, registerUser } from '../controllers/users.js'

export default (router) => {
    router.post("/auth/login", loginUser);
    router.post("/auth/register", registerUser);
}