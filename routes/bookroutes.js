const router = require("express").Router();
const verify = require("./verifyToken");
const Post = require("../model/post");

//Posting an element
router.post("/", verify, (req, res) => {
  const user = new Post({
    bookName: req.body.bookName,
    authorName: req.body.authorName,
    image: req.body.image,
  });
  user
    .save()
    .then((data) => {
      res.json(data);
    })
    .catch((err) => {
      console.log(err.message);
    });
});

//searching an element
router.get("/search/:id", verify, async (req, res) => {
  try {
    const result = await Post.findById(req.params.id, {
      useFindAndModify: false,
    });
    res.status(200).json(result);
  } catch (error) {
    res.status(400).send({ error: "No such file" });
  }
});
//updating a single data in database
router.get("/update/:id", verify, async (req, res) => {
  try {
    const result1 = await Post.findByIdAndUpdate(
      req.params.id,
      { bookName: "Rohit Gautam Book" },
      { useFindAndModify: false }
    );
    res.status(200).send({ message: "DataBase Updated" });
  } catch (error) {
    res.status(400).send({ error: "Error Updating" });
  }
});

//Delete a specific element
router.get("/delete/:id", verify, async (req, res) => {
  const book = req.params.bookName;
  try {
    const result = await Post.findByIdAndRemove(req.params.id, {
      useFindAndModify: false,
    });
    res.status(200).send({ message: "Item Deleted" });
  } catch (error) {
    res.status(400).send({ error: "Error Deleting" });
  }
});

//Complete book list
router.get("/findall", verify, (req, res) => {
  Post.find({}, function (err, Post) {
    res.send(Post);
  });
});

//404 Page Not Found Error
router.use((req, res, next) => {
  res.status(404).send({ error: "Page Not Found" });
});

module.exports = router;
