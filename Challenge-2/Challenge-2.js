async function logItemsWithIncreasingDelay(arr) {
  let delay = 1000;

  for (const item of arr) {
    await new Promise((resolve) => setTimeout(resolve, delay));
    console.log(item);
    delay *= 2;
  }
}
