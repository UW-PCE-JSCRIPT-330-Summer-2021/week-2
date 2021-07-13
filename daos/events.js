const Events = require('../models/events');

module.exports = {};

module.exports.create = async (eventEntity) => {
    // return await Events.create({ eventEntity });
    return await Events.create(eventEntity);
};

module.exports.getAll = async (calendarId) => {
    try {
        return await Events.find({ calendarId: calendarId }).lean();
    } catch (e) {
        return null;
    }
};

module.exports.getById = async (id) => {
    try {
        const eventEntity = await Events.findOne({ _id: id }).lean();
        return eventEntity;
    } catch (e) {
        return null;
    }
};

module.exports.removeById = async (id) => {
    try {
        await Events.deleteOne({ _id: id });
    } catch (e) {
        return null;
    }
}

module.exports.updateById = async (id, newData) => {
    try {
        const eventEntity = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
        return eventEntity;
    } catch (e) {
        return null;
    }
};
