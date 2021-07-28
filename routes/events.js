const { Router } = require("express");

const router = Router({ mergeParams: true });

router.get("/", async (req, res, next) => {
    try {
      const calendars = await CalendarDAO.getAll();
      res.json(calendars);
    } catch(e) {
      next(e);
    }
  });

  module.exports = router;