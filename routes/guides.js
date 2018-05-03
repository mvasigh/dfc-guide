const express = require('express');
const router = express.Router({ mergeParams: true });

router.get('/:guideId', (req, res) => {
  res.render('guide/show');
});

module.exports = router;
