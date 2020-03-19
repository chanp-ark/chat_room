const express = require('express');
const router = express.Router();

// Group Model
const Group = require('../../models/Group')

// @route   GET api/groups
// @desc    Gets all groups
// @access  Public
router.get('/', (req, res) => {
    Group.find()
        // sort by date descending
        .sort(({ date: -1 }))
        .then(groups => res.json(groups))    
})


// @route   GET api/groups/:id
// @desc    Gets one group's data
// @access  Public
router.get('/:id', (req, res) => {
    Group.findById(req.params.id)
        // sort by date descending
        .then(item => {
            res.json(item)
        })
          
})

// @route   POST api/groups
// @desc    Creates a group
// @access  Public

router.post('/', (req, res) => {
    console.log(req.body)
    const newGroup = new Group({
        name: req.body.name,
    })
    newGroup.save( err => {
        if (err) {
            console.error(err)
        } else {
            console.log("saved!")   
        }
    })
    res.redirect('/')
})


// @route   DELETE api/groups
// @desc    Deletes a group
// @access  Public

router.delete("/:id", (req, res) => {
    Group.findByIdAndDelete(req.params.id)
        .then(item => {
            res.json(item)
        })
})
   
    
module.exports = router;