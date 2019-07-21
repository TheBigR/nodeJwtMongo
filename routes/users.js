const controller = require('../controllers/users');
const validateToken = require('../utils').validateToken;

module.exports = (router) => {
    router.route('/users')
        .post(controller.add)
        .get(validateToken, controller.getAll);
    router.route('/login')
        .post(controller.login);
    router.route('/')
        .get(controller.init);
    router.route('/register')
        .get(controller.register);
    router.route('/signin')
        .get(controller.signin);
};

