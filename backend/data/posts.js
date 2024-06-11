// const fs = require('node:fs/promises');

// async function getStoredPosts() {
//   const rawFileContent = await fs.readFile('posts.json', { encoding: 'utf-8' });
//   const data = JSON.parse(rawFileContent);
//   const storedPosts = data.posts ?? [];


//   return storedPosts;
// }

// function storePosts(posts) {
//   return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
// }

// exports.getStoredPosts = getStoredPosts;
// exports.storePosts = storePosts;

const fs = require('node:fs/promises');

async function getStoredPosts() {
  const rawFileContent = await fs.readFile('posts.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedPosts = data.posts ?? [];
  
  return storedPosts;
}

async function getStoredStores() {
  const rawFileContent = await fs.readFile('stores.json', { encoding: 'utf-8' });
  const data = JSON.parse(rawFileContent);
  const storedStores = data.stores ?? [];

  return storedStores;
}

function storePosts(posts) {
  return fs.writeFile('posts.json', JSON.stringify({ posts: posts || [] }));
}

function storeStores(stores) {
  return fs.writeFile('stores.json', JSON.stringify({ stores: stores || [] }));
}

exports.getStoredPosts = getStoredPosts;
exports.storePosts = storePosts;

exports.getStoredStores = getStoredStores;
exports.storeStores = storeStores;

