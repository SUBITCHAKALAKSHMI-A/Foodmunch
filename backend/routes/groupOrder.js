const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const GroupOrder = require('../models/GroupOrder');
const User = require('../models/User');

// POST - Create new group order (keep existing)
router.post('/', async (req, res) => {
  try {
    console.log('Incoming request body:', req.body);
    
    if (!req.body.userId) {
      return res.status(400).json({
        success: false,
        error: "UserId is required"
      });
    }

    const user = await User.findById(req.body.userId);
    if (!user) {
      return res.status(404).json({
        success: false,
        error: "User not found"
      });
    }

    const group = new GroupOrder({
      groupId: uuidv4(),
      creator: user._id,
      members: [user._id]
    });

    const savedGroup = await group.save();
    
    console.log('Group created:', savedGroup);
    
    res.status(201).json({
      success: true,
      groupId: savedGroup.groupId,
      creator: {
        id: user._id,
        name: user.name
      }
    });

  } catch (err) {
    console.error('Error creating group:', err);
    res.status(500).json({
      success: false,
      error: err.message,
      stack: process.env.NODE_ENV === 'development' ? err.stack : undefined
    });
  }
});

// GET - Fetch group order details (keep existing)
router.get('/:groupId', async (req, res) => {
  try {
    const group = await GroupOrder.findOne({ groupId: req.params.groupId })
      .populate('creator', 'name email')
      .populate('members', 'name email')
      .populate('items.user', 'name')
      .populate({
        path: 'items.dish',
        select: 'name price image',
        model: 'Dish'
      });

    if (!group) {
      return res.status(404).json({ 
        success: false,
        error: "Group not found" 
      });
    }

    // Add split calculations
    const total = group.items.reduce((sum, item) => sum + (item.dish.price * item.quantity), 0);
    const equalSplit = total / (group.members.length || 1);
    const itemizedSplit = group.items.reduce((acc, item) => {
      const userId = item.user._id.toString();
      acc[userId] = (acc[userId] || 0) + (item.dish.price * item.quantity);
      return acc;
    }, {});

    res.json({ 
      success: true,
      group,
      splits: {
        equalSplit,
        itemizedSplit,
        total
      }
    });
    
  } catch (err) {
    console.error('Error fetching group:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

// POST - Add item to group (new endpoint)
router.post('/:groupId/items', async (req, res) => {
  try {
    const group = await GroupOrder.findOneAndUpdate(
      { groupId: req.params.groupId },
      { $push: { items: req.body.item } },
      { new: true }
    ).populate('items.user items.dish');

    if (!group) {
      return res.status(404).json({ 
        success: false,
        error: "Group not found" 
      });
    }

    res.json({ 
      success: true,
      group 
    });
    
  } catch (err) {
    console.error('Error adding item:', err);
    res.status(500).json({ 
      success: false,
      error: err.message 
    });
  }
});

module.exports = router;