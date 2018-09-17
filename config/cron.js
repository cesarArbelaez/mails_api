module.exports.cron = {
    mailScheduleJob: {
      schedule: '0 0 */24 * * *',
      onTick: function () {
        Mail.scheduleSending();
      }
    }
  };