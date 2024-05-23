const router = require('express').Router();
const { Tag, Product, ProductTag } = require('../../models');

// The `/api/tags` endpoint

// get all tags
router.get('/', async (req, res) => {
  // find all tags
  // be sure to include its associated Product data
  try {
    const tags = await Tag.findAll({
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });
    res.status(200).json(tags);
  } catch (err) {
    res.status(500).json(err);
  }
});

// get one tag
router.get('/:id', async (req, res) => {
  // find a single tag by its `id`
  // be sure to include its associated Product data
  try {
    const tag = await Tag.findByPk(req.params.id, {
      include: [{
        model: Product,
        through: ProductTag,
      }],
    });
    if (!tag) {
      return res.status(404).json({ message: 'No tag found by provided ID' });
    }
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// create a new tag
router.post('/', async (req, res) => {
  try {
    const tag = await Tag.create(req.body);
    res.status(200).json(tag);
  } catch (err) {
    res.status(500).json(err);
  }
});

// update a tag's name by its `id` value
router.put('/:id', async (req, res) => {
  try {
    const tag = await Tag.update(req.body, {
      where: {
        id: req.params.id,
      },
    });
    if (!tag[0]) {
      return res.status(404).json({ message: 'No tag found by provided ID' });
    }
    res.status(200).json({ message: 'Tag updated successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

// delete one tag by its `id` value
router.delete('/:id', async (req, res) => {
  try {
    const result = await Tag.destroy({
      where: {
        id: req.params.id,
      },
    });
    if (!result) {
      return res.status(404).json({ message: 'No tag found by provided ID' });
    }
    res.status(200).json({ message: 'Tag deleted successfully' });
  } catch (err) {
    res.status(500).json(err);
  }
});

module.exports = router;
