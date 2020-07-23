const express = require('express');
const router = express.Router();
const validUrl = require('valid-url');
const shortid = require('shortid');
const config = require('config');

const Url = require('../models/Url');

// @route     POST /api/url/shorten
// @desc      Create short URL
router.post('/shorten', async (req, res) => {
  const { longUrl } = req.body;
  const baseUrl = config.get('baseUrl');

  // Check base url
  if (!validUrl.isUri(baseUrl)) {
    return res.status(401).json('404 Invalid base url');
  }

  // Create url code
  const urlCode = shortid.generate();

  // Check long url
  // if (validUrl.isUri(longUrl) || validUrl.isHttpsUri(longUrl)) {
    try {
      let url = await Url.findOne({ longUrl });

      if (url) {
        let {urlCode} = url;
        res.json({
          "id":url["_id"],
          longUrl,
          shortUrl:baseUrl + '/' + urlCode
        });
      } else {
        const shortUrl = baseUrl + '/' + urlCode;

        url = new Url({
          longUrl,
          urlCode
        });

        await url.save();

        res.json({
          "id":url["_id"],
          longUrl,
          shortUrl
        });
      }
    } catch (err) {
      console.error(err);
      res.status(500).json('Server error');
    }
  // } else {
  //   res.status(401).json('401 Invalid long url');
  // }
});

module.exports = router;
