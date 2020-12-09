const Blogs = require("../../schema/Blogs");

const Create = (req, res) => {
  console.log(req.body);
  new Blogs(req.body)
    .save()
    .then((data) => res.status(200).json({ message: "Success" }))
    .catch((err) => {
      return res.status(400).json({ message: "error", error: err });
    });
  //   return res.status(400).json({ message: "successfully created" });
};

const View = (req, res) => {
  let check = {
    draft: false,
  };
  Blogs.find(check)
    .then((data) => {
      return res.status(200).json({ message: "success", data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "error", error: err });
    });
};

const UpdateReadCount = (req, res) => {
  Blogs.findById(req.params.id)
    .then((blogs) => {
      blogs.readBy = blogs.readBy + 1;
      Blogs.save(blogs)
        .then((data) => res.json({ message: "success", data: data }))
        .catch((err) => {
          return res.status(400).json({ message: "Could not update read count", err: err });
        });
    })
    .catch((err) => {
      return res.status(400).json({ message: "No blog found", err: err });
    });
};

const ViewByid = (req, res) => {
  Blogs.findById(req.params.id)
    .then((blogs) => {
      console.log(blogs.readBy);
      return res.status(200).json({ message: "success", data: blogs });
    })
    .catch((err) => {
      return res.status(400).json({ message: "No blog found", err: err });
    });
};

const UpdateCount = (req, res) => {
  Blogs.findById(req.params.id).then((blogs) => {
    blogs.readBy = blogs.readBy + 1;
    blogs.save().then((blog) => res.json(blog));
  });
};

const FindbySlug = (req, res) => {
  let check = {
    slug: req.params.id,
  };
  Blogs.find(check)
    .then((data) => {
      return res.status(200).json({ message: "success", data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "error", error: err });
    });
};

const GetTop = (req, res) => {
  Blogs.find({ draft: false })
    .sort({ readBy: -1 })
    .limit(5)
    .then((blogs) => {
      return res.status(200).json({ message: "success", data: blogs });
    })
    .catch((err) => {
      return res.status(400).json({ message: err });
    });
};

const FindByCategory = (req, res) => {
  Blogs.find({ category: req.params.id })
    .then((data) => {
      return res.status(200).json({ message: "success", data: data });
    })
    .catch((err) => {
      return res.status(400).json({ message: "error", error: err });
    });
};

module.exports = {
  Create,
  View,
  UpdateReadCount,
  ViewByid,
  UpdateCount,
  FindbySlug,
  GetTop,
  FindByCategory,
};
