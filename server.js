const express = require('express');
const app = express();
const port = 3000;

app.set('view engine', 'ejs');
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

let posts = [];

app.get('/', (req, res) => {
  res.render('index', { posts });
});

app.post('/posts', (req, res) => {
  const { title, content } = req.body;
  posts.push({
    title,
    content,
    date: new Date().toLocaleDateString('en-US', { 
      weekday: 'long', 
      year: 'numeric', 
      month: 'long', 
      day: 'numeric' 
    })
  });
  res.redirect('/');
});

app.get('/posts/:id/edit', (req, res) => {
  const id = req.params.id;
  res.render('edit', { post: posts[id], id });
});

app.post('/posts/:id/edit', (req, res) => {
  const id = req.params.id;
  posts[id] = {
    ...posts[id],
    title: req.body.title,
    content: req.body.content
  };
  res.redirect('/');
});

app.post('/posts/:id/delete', (req, res) => {
  const id = req.params.id;
  posts.splice(id, 1);
  res.redirect('/');
});

app.listen(port, () => {
  console.log(`Server running at http://localhost:${port}`);
});