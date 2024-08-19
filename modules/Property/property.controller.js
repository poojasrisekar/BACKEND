const PropertyRouter = require('express').Router();
const Property = require('./property.model');
const {
    Types
} = require('mongoose');

// 2. Get All Property
//http://localhost:3000/Property/
PropertyRouter.get('/', async (req, res) => {
    try {
        const response = await Property.find(); // [{}, {}] or []
        return res.json({
            message: "Property fetched successfully",
            data: response
        })
    } catch (error) {
        return res.status(500).json({
            message: "Something went wrong",
            error
        })
    }
});

// 3. Get a property
// http://localhost:3000/Properties/property/1
PropertyRouter.get('/user/:userId', async (req, res) => {
    const {
        PropertyId
    } = req.params;
    try {
        console.log(req.params)
        const response = await Property.findOne({
            _id: new Types.ObjectId(PropertyId)
        }); // null/undefined or {}
        if (response) {
            return res.status(200).json({
                message: "Property fetched successfully",
                data: response
            })
        } else {
            return res.status(404).json({
                message: "No Property found",
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

// 4. Update a property
// http://localhost:3000/property/update/1
PropertyRouter.patch('/update/:propertyId', async (req, res) => {
    const {
        PropertyId
    } = req.params;
    try {
        const response = await Property.findOneAndUpdate({
            _id: new Types.ObjectId(PropertyId),
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
                message: "Failed updating property! No Property found",
            })
        } else {
            return res.json({
                message: "property updated successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
})

// 5. Delete a property
// http://localhost:3000/property/delete/1
PropertyRouter.delete('/delete/:propertyId', async (req, res) => {
    const {
        PropertyId
    } = req.params;
    try {
        const response = await Property.findOneAndDelete({
            _id: new Types.ObjectId(PropertyId),
        });
        if (!response) {
            return res.status(404).json({
                message: "Failed deleting property! No Property found",
            })
        } else {
            return res.json({
                message: "Property deleted successfully",
                data: response
            })
        }
    } catch (error) {
        return res.status(500).json({
            message: "Internal server error",
        })
    }
});

module.exports = PropertyRouter;