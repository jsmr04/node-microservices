import request from "supertest";
import { app } from "../../app";
import { Ticket } from "../../models/ticket";

it('has a route handler to /api/tickets for post request', async ()=>{
    const response = await request(app)
                        .post('/api/tickets')
                        .send({})

    expect(response.status).not.toEqual(404)
})

it('can can only accessed is the user is signed in', async ()=>{
    const response = await request(app)
                        .post('/api/tickets')
                        .send({})
                        .expect(401)
})

it('returns a status other than 401 if the user is signed in', async ()=>{
    const response = await request(app)
                        .post('/api/tickets')
                        .set('Cookie', global.signin())
                        .send({})
    expect(response.status).not.toEqual(401)
})

it('returns an error if an invalid title is provided', async ()=>{
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: '',
        price: 10
    })
    .expect(400)

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        price: 10
    })
    .expect(400)
})

it('returns an error if an invalid price is provided', async ()=>{
    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'dlkfdld',
        price: -10
    })
    .expect(400)

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send({
        title: 'dlkfdld',
    })
    .expect(400)

})

it('creates a ticket with valid inputs', async ()=>{
    let tickets = await Ticket.find({})
    expect(tickets.length).toEqual(0)
    
    const dummyTicket = {
        title: 'This is a title',
        price: 20
    }

    await request(app)
    .post('/api/tickets')
    .set('Cookie', global.signin())
    .send(dummyTicket)
    .expect(201)

    tickets = await Ticket.find({})
    
    expect(tickets.length).toEqual(1)
    expect(tickets[0].title).toEqual(dummyTicket.title)
    expect(tickets[0].price).toEqual(dummyTicket.price)

})