let start = process.hrtime();

module.exports = {
  startTimer: () => {
    start = process.hrtime();
  },
  endTimer: (flag) => {
    // if(!flag) {
    //   return null;
    // }
      const precision = 3;
      const elapsed = process.hrtime(start)[1] / 1000000;
      console.log(`TimeSpend ${process.hrtime(start)[0]} s, ${elapsed.toFixed(precision)} ms `);
  }
};
