
import {use, expect} from 'chai'

import chaiHttp from 'chai-http'

import app from '../index.js'


const chai=use(chaiHttp);

describe('Pruebas de metodo GET', ()=>{
    it('Devuelve listado de animes', async()=>{
        const res = await chai.request.execute(app).get('/api/anime');
        expect(res).to.have.status(200);
        expect(res.body).to.be.an('object');
        expect(res.body.message).to.equal('Listado de anime.')
    })
})