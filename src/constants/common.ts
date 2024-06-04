const LIMIT_DATA_QUERY = 3;

const LIMIT_QUERY_REVIEWS_FRONT = 4;

const LIMIT_QUERY_REVIEWS = 5;

const ROLE_USER = {
  RHV: 'RHV',
  RGV: 'RGV',
  ROP: 'ROP',
};

const COURSE_STATUS = {
  DEFAULT: 0,
  PENDING: 1,
  PUBLIC: 2,
  REJECT: 3,
};

const REQUEST_TEACHER = {
  DEFAULT: 0,
  PENDING: 1,
  ACCEPT: 2,
  REJECT: 3,
};

const FLAG_REQUEST = {
  DELETE: 'delete',
  UPDATE: 'update',
  ACCEPT: 'accept',
  REJECT: 'reject',
};

const PACKAGE_TYPE = {
  BASIC: 'packageBasic',
  PRO: 'packagePro',
};

const PAYMENT_STATUS = {
  CANCEL: 0,
  PENDING: 1,
  SUCCESS: 2,
};

export {
  LIMIT_DATA_QUERY,
  LIMIT_QUERY_REVIEWS_FRONT,
  LIMIT_QUERY_REVIEWS,
  ROLE_USER,
  COURSE_STATUS,
  REQUEST_TEACHER,
  FLAG_REQUEST,
  PACKAGE_TYPE,
  PAYMENT_STATUS,
};
