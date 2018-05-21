export default function repsFromDay(day) {
  const reps = [4, 4, 4];
  let repsIndex = 0;
  for (let counter = day; counter > 0; counter--) {
    reps[repsIndex]++;
    repsIndex = repsIndex > reps.length - 2 ? 0 : repsIndex + 1;
  }
  return reps.join(' ');
}
