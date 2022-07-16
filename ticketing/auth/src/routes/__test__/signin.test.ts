import request from "supertest";
import { app } from "../../app";

it('fails when an email that does not exists is supplied', async ()=>{
    return request(app)
        .post('/api/users/signin')
        .send({
            email: 'good@email.com',
            password: 'password'
        })
        .expect(400)
})

it('fails when a incorrect password is supplied', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'good@email.com',
            password: 'password'
        })
        .expect(201)

    await request(app)
        .post('/api/users/signin')
        .send({
            email: 'good@email.com',
            password: 'wrong-password'
        })
        .expect(400)
})


it('responds with a cookie when given valid credentials', async ()=>{
    await request(app)
        .post('/api/users/signup')
        .send({
            email: 'good@email.com',
            password: 'password'
        })
        .expect(201)

   const response = await request(app)
        .post('/api/users/signin')
        .send({
            email: 'good@email.com',
            password: 'password'
        })
        .expect(200)

    expect(response.get('Set-Cookie')).toBeDefined()
})