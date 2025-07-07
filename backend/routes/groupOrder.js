const express = require('express');
const router = express.Router();
const { v4: uuidv4 } = require('uuid');
const GroupOrder = require('../models/GroupOrder');
const Dish = require('../models/Dish');
const mongoose = require('mongoose');

// Create new group order
router.post('/', async (req, res) => {
  try {
    const { userId } = req.body;

    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "Valid user ID is required"
      });
    }

    const groupId = uuidv4();
    const newGroup = await GroupOrder.create({
      groupId,
      creator: userId,
      members: [userId],
      items: []
    });

    res.status(201).json({
      success: true,
      groupId: newGroup.groupId
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: "Server error: " + err.message
    });
  }
});

// Get group order details
router.get('/:groupId', async (req, res) => {
  try {
    const group = await GroupOrder.findOne({ groupId: req.params.groupId })
      .populate('creator', 'name email')
      .populate('members', 'name email')
      .populate('items.user', 'name email')
      .populate('items.dish', 'name price image category')
      .lean();

    if (!group) {
      return res.status(404).json({
        success: false,
        error: "Group not found"
      });
    }

    const { total, equalSplit, itemizedSplit } = calculateSplits(group);

    res.json({
      success: true,
      group,
      splits: {
        total,
        equalSplit,
        itemizedSplit
      }
    });

  } catch (err) {
    res.status(500).json({
      success: false,
      error: process.env.NODE_ENV === 'development' ? err.message : 'Server error'
    });
  }
});

// Add item to group order
router.post('/:groupId/items', async (req, res) => {
  try {
    const { userId, dishId, quantity = 1 } = req.body;

    // ✅ Validate userId
    if (!userId || !mongoose.Types.ObjectId.isValid(userId)) {
      return res.status(400).json({
        success: false,
        error: "Valid user ID is required"
      });
    }

    // ✅ Validate dishId
    if (!dishId || !mongoose.Types.ObjectId.isValid(dishId)) {
      return res.status(400).json({
        success: false,
        error: "Valid dish ID is required"
      });
    }

    // ✅ Find dish by _id only
    const dish = await Dish.findById(dishId);

    if (!dish) {
      return res.status(404).json({
        success: false,
        error: `Dish not found for ID: ${dishId}`
      });
    }

    // ✅ Add item to group order
    const group = await GroupOrder.findOneAndUpdate(
      { groupId: req.params.groupId },
      {
        $push: {
          items: {
            user: userId,
            dish: dish._id,
            quantity: quantity
          }
        },
        $addToSet: { members: userId }
      },
      {
        new: true,
        runValidators: true
      }
    )
      .populate('items.user', 'name email')
      .populate('items.dish', 'name price image');

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
    res.status(500).json({
      success: false,
      error: `Server error: ${err.message}`
    });
  }
});

// Helper function to calculate splits
function calculateSplits(group) {
  const total = group.items.reduce((sum, item) => {
    return sum + (item.dish?.price || 0) * (item.quantity || 1);
  }, 0);

  const memberCount = Math.max(group.members?.length || 1, 1);
  const equalSplit = total / memberCount;

  const itemizedSplit = group.items.reduce((acc, item) => {
    const userId = item.user?._id?.toString() || item.user?.toString();
    if (userId) {
      acc[userId] = (acc[userId] || 0) + (item.dish?.price || 0) * (item.quantity || 1);
    }
    return acc;
  }, {});

  return { total, equalSplit, itemizedSplit };
}

module.exports = router;
