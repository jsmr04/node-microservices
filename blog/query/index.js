const express = require('express')
const bodyParser = require('body-parser')
const cors = require("cors");
const axios = require('axios')

const app = express()

app.use(cors())
app.use(bodyParser.json())

const posts = {}

const handleEvent = (type, data)=>{
    if (type === "PostCreated") {
        const { id, title } = data;
        posts[id] = { id, title, comments: [] };
      }
    
      if (type === "CommentCreated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
    
        post.comments.push({ id, content, status });
      }
    
      if (type === "CommentUpdated") {
        const { id, content, postId, status } = data;
        const post = posts[postId];
        const comment = post.comments.find(comment => comment.id === id)
    
        comment.status = status
        comment.content = content
      }
}

app.get('/posts', (req, res)=>{

    res.send(posts)
})

app.post("/events", (req, res) => {
  const { type, data } = req.body;
  console.log("type ", type)
  console.log(data)

  handleEvent(type, data)

  console.log(posts)
  res.send({})
});

app.listen(4002, async ()=>{
    console.log('Listening on 4002')

    const res = await axios.get('http://event-bus-srv:4005/events')
    res.data.forEach(item => {
        console.log('Processing event ', item.type)
        
        handleEvent(item.type, item.data)
    })

})