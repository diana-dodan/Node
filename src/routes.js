import { defineRoute, router } from "./utils/define-route.js";
import users from "../users.json" with { type: "json" };
import posts from "../posts.json" with { type: "json" };

import { v4 as uuidv4 } from 'uuid';
import fs from 'fs';


defineRoute("GET", "/users", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: "GET /users/ matched",
    })
  );
});

defineRoute("GET", "/users/:id", (req, res) => {
  const userId = req.params.id;

  const userResult = users.find(({ id }) => {
    return id === userId;
  });

  res.setHeader("Content-Type", "application/json");

  if(userResult == undefined){
    res.statusCode = 204;
    res.end();
    return;
  }
  res.statusCode = 200;
  res.end(
    JSON.stringify(userResult)
  );
});

defineRoute("POST", "/users", (req, res) => {
  //validate request

  if (!req.body.hasOwnProperty('name') || typeof req.body.name !== 'string'){
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: "Property name should be string"
      })
    )
    return;
  }

  const newUser = {
    id: uuidv4(),
    name: req.body.name
  }

  users.push(newUser);
  const jsonData = JSON.stringify(users);
  
  fs.writeFileSync('users.json', jsonData);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `User was created`,
    })
  );
});


defineRoute("PUT", "/users/:id", (req, res) => {
  const userId = req.params.id;
 
  //validate request
  if (!req.body.hasOwnProperty('name') || typeof req.body.name !== 'string'){
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: "Property name should be string"
      })
    )
    return;
  }

  const updatedUsers = users.map((user) => {
    console.log('user is', user);
    if(user.id === userId) {
      user.name = req.body.name;
    }
    return user;
  })

  const jsonData = JSON.stringify(updatedUsers);
  
  fs.writeFileSync('users.json', jsonData);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `User was updated`,
    })
  );
});

defineRoute("DELETE", "/users/:id", (req, res) => {
  const userId = req.params.id;

  const updatedUsers = users.filter((user) => {
    return user.id !== userId;
  })

  const jsonData = JSON.stringify(updatedUsers);
  
  fs.writeFileSync('users.json', jsonData);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `User was deleted`,
    })
  );
});

defineRoute("GET", "/posts", (req, res) => {
  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: "GET /posts/ matched",
    })
  );
});

defineRoute("GET", "/posts/:id", (req, res) => {
  const postId = req.params.id;

  const postResult = posts.find(({ id }) => {
    return id === postId;
  });

  res.setHeader("Content-Type", "application/json");

  if(postResult == undefined){
    res.statusCode = 204;
    res.end();
    return;
  }
  res.statusCode = 200;
  res.end(
    JSON.stringify(postResult)
  );
});

defineRoute("POST", "/posts", (req, res) => {
  //validate request

  if (!req.body.hasOwnProperty('id') || typeof req.body.id !== 'string'){
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: "Post should be string"
      })
    )
    return;
  }

  const newPost = {
    id: req.body.id,
  }

  posts.push(newPost);
  const jsonData = JSON.stringify(posts);
  
  fs.writeFileSync('posts.json', jsonData);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `Post was created`,
    })
  );
});


defineRoute("PUT", "/posts/:id", (req, res) => {
  const postId = req.params.id;
 
  //validate request
  if (!req.body.hasOwnProperty('id') || typeof req.body.id !== 'string'){
    res.statusCode = 400;
    res.end(
      JSON.stringify({
        message: "Post should be string"
      })
    )
    return;
  }

  const updatedPosts = posts.map((post) => {
    console.log('post is', post);
    if(post.id === postId) {
      post.id = req.body.id;
    }
    return post;
  })

  const jsonData = JSON.stringify(updatedPosts);
  
  fs.writeFileSync('posts.json', jsonData);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `Post was updated`,
    })
  );
});

defineRoute("DELETE", "/posts/:id", (req, res) => {
  const postsId = req.params.id;

  const updatedPosts = posts.filter((post) => {
    return post.id !== postsId;
  })

  const jsonData = JSON.stringify(updatedPosts);
  
  fs.writeFileSync('posts.json', jsonData);

  res.setHeader("Content-Type", "application/json");
  res.statusCode = 200;
  res.end(
    JSON.stringify({
      message: `Post was deleted`,
    })
  );
});


export default router;
