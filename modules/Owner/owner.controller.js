const OwnerRouter = require('express').Router();
const Owner = require('./owner.model');
const {
    Types
} = require('mongoose');

// 2. Get All Owner
//http://localhost:3000/owner/
OwnerRouter.get('/', async (req, res) => {
    try {
        const response = await Owner.find(); // [{}, {}] or []
        return res.json({
            message: "Owner fetched successfully",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",         
            error
        })
    }
});

// 3. Get a owner
// http://localhost:3000/owner/owner/1
OwnerRouter.get('/owner/:ownerId', async (req, res) => {
    const {
        ownerId
    } = req.params;
    try {
        console.log(req.params)
        const response = await Owner.findOne({
            _id: new Types.ObjectId(ownerId)
        }); // null/undefined or {}
        if (response) {
            return res.status(200).json({
                message: "owner fetched successfully",
                data: response
            })
        } else {
            return res.status(404).json({
                message: "No owner found",
                data: {}
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
})

// 4. Update a user
// http://localhost:3000/users/update/1
OwnerRouter.patch('/update/:ownerId', async (req, res) => {
    const {
        ownerId
    } = req.params;
    try {
        const response = await Owner.findOneAndUpdate({
            _id: new Types.ObjectId(ownerId),
        }, {
            $set: req.body
        }, {
            new: true,
            projection: {
                _id: 0
            }
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed updating user! No User found",
            })
        } else {
            return res.json({
                message: "User updated successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

// 5. Delete a user
// http://localhost:3000/owner/delete/1
UsersRouter.delete('/delete/:ownerId', async (req, res) => {
    const {
        ownerId
    } = req.params;
    try {
        const response = await Owner.findOneAndDelete({
            _id: new Types.ObjectId(ownerId),
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed deleting owner! No owner found",
            })
        } else {
            return res.json({
                message: "owner deleted successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
});

module.exports = OwnerRouter;