export default function promisify(func) {
  return function(...args) {
    const me = this;
    return new Promise((resolve, reject) => {
      function done(err: Error, ...results) {
        if (err) return reject(err);
        if (results.length === 0) return resolve.call(me);
        if (results.length === 1) return resolve.call(me, results[0]);
        return resolve.call(me, results);
      }
      args.push(done);
      func.apply(me, args);
    });
  };
}
