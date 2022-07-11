const express = require('express')
const cors = require("cors");
const bodyParser = require('body-parser')
const { randomBytes } = require('crypto')
const axios = require('axios')
const app = express()

const commentsByPostId = {}
app.use(cors())
app.use(bodyParser.json())

app.get('/posts/:id/comments', (req, res)=>{
    const comments = commentsByPostId[req.params.id] || []
    res.send(comments)
})

app.post('/posts/:id/comments', (req, res)=>{
    const commentId = randomBytes(4).toString('hex')
    const { content } = req.body;
    
    const comments = commentsByPostId[req.params.id] || []

    comments.push({id: commentId, content, status: 'pending'})
    commentsByPostId[req.params.id] = comments
    
    axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    })

    res.send(comments)
})

app.post('/events', async (req, res)=>{
    console.log('Received event', req.body.type)
    console.log(req.body.data)
    const { type, data } = req.body
    if (type === 'CommentModerated'){
        const {postId, id, status, content} = data
        const comments = commentsByPostId[postId] || []

        const comment = comments.find(comment => comment.id === id)
        comment.status = status

        await axios.post('http://event-bus-srv:4005/events', {
            type: 'CommentUpdated',
            data: {
                id,
                status,
                postId,
                content
            }
        })
    }

    res.send({})
})

app.listen(4001, ()=>{
    console.log('Listening on 4001')
})