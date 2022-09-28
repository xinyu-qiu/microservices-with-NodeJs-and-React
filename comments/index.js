const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { runInNewContext } = require('vm');

const app = express();
app.use(bodyParser.json());

//record comments
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //get the id, if there is no such id, get an empty array
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content });

    commentsByPostId[req.params.id] = comments;

    //send back entire array of comments
    res.status(201).send(comments);
});

app.listen(4001, () => {
    console.log('Listening on 4001');
});