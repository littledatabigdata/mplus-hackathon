// Global vars
let seed = 5;

// Random function using seed.
function random() {
  var x = Math.sin(seed++) * 10000;
  return x - Math.floor(x);
}

// Returns a hash code for a string.
function hashCode(s) {
  let h;
  for (let i = 0; i < s.length; i++)
    h = (Math.imul(31, h) + s.charCodeAt(i)) | 0;
  return h;
}
