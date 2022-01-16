import { Router } from 'express'

const routes = new Router();

routes.get('/', (req, res) => {
    return res.json('deu boa')
})

export default routes;
