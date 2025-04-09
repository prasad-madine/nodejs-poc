exports.getPosts = (req, res, next) => {
  req.status(200).json({
    posts: [{ title: "first post", content: "this is mu=y first post" }],
  });
};

exports.createPost = (req, res, next) => {
  const title = req.body.title;
  const content = req.body.content;
  res.status(201).json({
    message: "post created successfully",
    post: { id: Math.random().toString(), title: title, content: content },
  });
};
