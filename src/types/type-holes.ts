declare function _<T>(): T;

/* ---------------------------------------------------------- *
 *
 *  Example 1
 *
 * ---------------------------------------------------------- */
type Jonk = <A, B>(ab: (a: A) => B, ann: (an: (a: A) => number) => number) => (bn: (b: B) => number) => number;

const jonk1: Jonk = (ab, ann) => {
  return _();
};

const jonk2: Jonk = (ab, ann) => {
  return bn => _();
};

const jonk3: Jonk = (ab, ann) => {
  return bn => ann(_());
};

const jonk4: Jonk = (ab, ann) => {
  return bn => ann(a => _());
};

const jonk5: Jonk = (ab, ann) => {
  return bn => ann(a => bn(_()));
};

const jonk6: Jonk = (ab, ann) => {
  return bn => ann(a => bn(ab(_())));
};

/** Done */
const jonk7: Jonk = (ab, ann) => {
  return bn => ann(a => bn(ab(a)));
};

/* ---------------------------------------------------------- *
 *
 *  Exmaple2
 *
 * ---------------------------------------------------------- */
type Zoop = <A, B>(abb: (a: A) => (b: B) => B, b: B, as: Array<A>) => B;

const zoop1: Zoop = (abb, b, as) => {
  return _();
};

const zoop2: Zoop = (abb, b, as) => {
  return as.reduce((acc, n) => {
    return _();
  }, b);
};

const zoop3: Zoop = (abb, b, as) => {
  return as.reduce((acc, n) => {
    return abb(n)(_());
  }, b);
};

/** Done */
const zoop4: Zoop = (abb, b, as) => {
  return as.reduce((acc, n) => {
    return abb(n)(acc);
  }, b);
};
