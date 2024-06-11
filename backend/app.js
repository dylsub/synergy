const express = require('express');
const bodyParser = require('body-parser');


const { getStoredStores, storeStores, getStoredPosts, storePosts } = require('./data/posts');

const app = express();

app.use(bodyParser.json());

app.use((req, res, next) => {
  // Attach CORS headers
  // Required when using a detached backend (that runs on a different domain)
  res.setHeader('Access-Control-Allow-Origin', '*');
  res.setHeader('Access-Control-Allow-Methods', 'GET,POST');
  res.setHeader('Access-Control-Allow-Headers', 'Content-Type');
  next();
});

app.get('/posts', async (req, res) => {
  const storedPosts = await getStoredPosts();
  // await new Promise((resolve, reject) => setTimeout(() => resolve(), 1500));
  res.json({ posts: storedPosts });
});

app.get('/posts/:id', async (req, res) => {
  const storedPosts = await getStoredPosts();
  const post = storedPosts.find((post) => post.id === req.params.id);
  res.json({ post });
});

app.post('/posts', async (req, res) => {
  const existingPosts = await getStoredPosts();
  const postData = req.body;
  const newPost = {
    ...postData,
    id: Math.random().toString(),
  };
  const updatedPosts = [newPost, ...existingPosts];
  await storePosts(updatedPosts);
  res.status(201).json({ message: 'Stored new post.', post: newPost });
});


app.get('/stores', async (req, res) => {
  const storedStores = await getStoredStores();
  res.json({ stores: storedStores });
});

app.get('/stores/:name', async (req, res) => {
  const storedStores = await getStoredStores();
  const store = storedStores.find((store) => store.name === req.params.name);
  res.json({ store });
});

app.post('/stores', async (req, res) => {
  const existingStores = await getStoredStores();
  const storeData = req.body;
  const newStore = {
    ...storeData,
    name: storeData.name,
  };
  const updatedStores = [newStore, ...existingStores];
  await storeStores(updatedStores);
  res.status(201).json({ message: 'Stored new store.', store: newStore });
});

app.listen(8080);
