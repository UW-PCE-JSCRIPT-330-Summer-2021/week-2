const Events = require ('../models/events');
module.exports={};

module.exports.create = async (event) => {
   try {
     return await Events.create(event);
   } catch (e) {
     //return null;
   }
 };
//getall
module.exports.getAll = async (calendarId) => {
   try {
     return await Events.find({ calendarId: calendarId }).lean();
   } catch (e) {
  //   return null;
   }
 };
//getbyID
module.exports.getById = async (id) => {
    try {
        const event = await Events.findOne ({ _id: id }).lean();
        return event;
    } catch (e) {
    //    return null;
    }
};
//UpdatebyId
module.exports.updateById = async (id, newData) => {
    try {
        const event = await Events.findOneAndUpdate({ _id: id }, newData, { new: true }).lean();
        return event;

    } catch (e) {
      //  return null;
    }
};
module.exports.removebyId = async (id) => {
    try{
        return await Events.deleteOne({ _id:id});
    } catch (e) {
   //     return null;
    }
};