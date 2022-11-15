const express = require('express');
const bodyParser = require('body-parser');
const { randomBytes } = require('crypto');
const { runInNewContext } = require('vm');
const cors = require('cors');
const axios = require('axios');

const app = express();
app.use(bodyParser.json());
app.use(cors());

//record comments
const commentsByPostId = {};

app.get('/posts/:id/comments', (req, res) => {
    res.send(commentsByPostId[req.params.id] || []);
});

app.post('/posts/:id/comments', async (req, res) => {
    const commentId = randomBytes(4).toString('hex');
    const { content } = req.body;

    //get the id, if there is no such id, get an empty array
    const comments = commentsByPostId[req.params.id] || [];

    comments.push({ id: commentId, content, status: 'pending' });

    commentsByPostId[req.params.id] = comments;

    await axios.post('http://event-bus-srv:4005/events', {
        type: 'CommentCreated',
        data: {
            id: commentId,
            content,
            postId: req.params.id,
            status: 'pending'
        }
    });

    //send back entire array of comments
    res.status(201).send(comments);
});

app.post('/events', async (req, res) => {
    console.log('Received Event', req.body.type);

    const { type, data } = req.body;

    if (type === 'CommentModerated') {
        const { postId, id, status, content } = data;
        const comments = commentsByPostId[postId];

        const comment = comments.find(comment => {
            return comment.id === id;
        });
        comment.status = status;

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

    res.send({});
});


app.listen(4001, () => {
    console.log('Listening on 4001');
});