import mongoose from "mongoose";
import request from "supertest"
import { app } from "../../app";

it('returns a 404 if the ticket is not found', async ()=>{
    const id = new mongoose.Types.ObjectId().toHexString();
    await request(app)
    .get(`/api/tickets/${id}`)
    .send()
    .expect(404)
})

it('returns a the ticket if the ticket is found', async ()=>{
    const dummyTicket = {
        title: "New ticket",
        price: 20
    }

    const response = await request(app)
        .post('/api/tickets')
        .set('Cookie', global.signin())
        .send(dummyTicket)
        .expect(201)

    const responseTicket = await request(app)
        .get(`/api/tickets/${response.body.id}`)
        .send()
        .expect(200)

    expect(responseTicket.body.title).toEqual(dummyTicket.title)
    expect(responseTicket.body.price).toEqual(dummyTicket.price)
})