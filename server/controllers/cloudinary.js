const cloudunary = require("cloudinary");

//config
cloudunary.config({
  cloude_name: process.env.CLOUDINARY_CLOUD_NAME,
  api_key: process.env.CLOUDINARY_API_KEY,
  api_secret: process.env.CLOUDINARY__API_SECRET,
});

//uploading image
exports.upload = async (req, res) => {
  let result = await cloudunary.uploader.upload(req.body.image, {
    public_id: `${Date.now()}`, // image name
    resource_type: "auto", //jpeg, png
  });
  res.json({
    public_id: result.public_id,
    url: result.secure_url,
  });
};

//removing image
exports.remove = (req, res) => {
  let image_id = req.body.public_id;
  cloudunary.uploader.destroy(image_id, (err, result) => {
    if (err) {
      return res.json({ succerr: false, err });
    } else {
      res.send("Ok");
    }
  });
};

//If form data: req.files.file.path
