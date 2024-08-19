const ShopRouter = require('express').Router();
const Shop = require('./shop.model');
const {
    Types
} = require('mongoose');

// 2. Get All shops
//http://localhost:3000/shop/
OwnerRouter.get('/', async (req, res) => {
    try {
        const response = await Shop.find(); // [{}, {}] or []
        return res.json({
            message: "shop fetched successfully",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",         
            error
        })
    }
});

// 3. Get a shop
// http://localhost:3000/shop/shop/1
OwnerRouter.get('/shop/:shopId', async (req, res) => {
    const {
        shopId
    } = req.params;
    try {
        console.log(req.params)
        const response = await Shop.findOne({
            _id: new Types.ObjectId(shopId)
        }); // null/undefined or {}
        if (response) {
            return res.status(200).json({
                message: "shop fetched successfully",
                data: response
            })
        } else {
            return res.status(404).json({
                message: "No shop found",
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

// 4. Update a shop
// http://localhost:3000/shop/update/1
OwnerRouter.patch('/update/:shopId', async (req, res) => {
    const {
        shopId
    } = req.params;
    try {
        const response = await Shop.findOneAndUpdate({
            _id: new Types.ObjectId(shopId),
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
                message: "Failed updating shop! No Shop found",
            })
        } else {
            return res.json({
                message: " Shop updated successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

// 5. Delete a shop
// http://localhost:3000/shop/delete/1
UsersRouter.delete('/delete/:shopId', async (req, res) => {
    const {
        shopId
    } = req.params;
    try {
        const response = await Shop.findOneAndDelete({
            _id: new Types.ObjectId(shopId),
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed deleting shop! No shop found",
            })
        } else {
            return res.json({
                message: "shop deleted successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
});

module.exports = ShopRouter;