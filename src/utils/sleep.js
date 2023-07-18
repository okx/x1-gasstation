// sleep for `ms` miliseconds, just do nothing
const sleep = async (ms) =>
    new Promise((res, _) => {
        setTimeout(res, ms);
    });

export default sleep;
