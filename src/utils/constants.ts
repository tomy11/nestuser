export const jwtConstants = {
  secret: process.env.JWT_SECRET || 'ldZhXXlEsi',
};

export const ERROR_MESSAGES = {
  MISSING_CREDENTIALS: 'Username and password are required',
  INVALID_CREDENTIALS: 'Invalid username or password',
  USER_QUERY_FAILED: 'Failed to fetch user list',
  USER_TABLE_QUERY_FAILED: 'Failed to fetch user table',
  COMPANY_QUERY_FAILED: 'Failed to fetch company list',
  SECTION_QUERY_FAILED: 'Failed to fetch company section list',
  SECTION_MEMBER_QUERY_FAILED: 'Failed to fetch company section member list',
  DEPARTMENT_QUERY_FAILED: 'Failed to fetch department list',
};

export const REQUIRED_DB_ENV_VARS = [
  'DB_HOST',
  'DB_PORT',
  'DB_USERNAME',
  'DB_PASSWORD',
  'DB_DATABASE',
] as const;

export const INSECURE_DEFAULTS: {
  key: string;
  insecureValue: string;
  message: string;
}[] = [
  {
    key: 'JWT_SECRET',
    insecureValue: 'ldZhXXlEsi',
    message:
      'JWT_SECRET is still set to the publicly-known default value. ' +
      'Tokens can be forged by anyone who has access to this repository. ' +
      'Set a strong random JWT_SECRET immediately.',
  },
  {
    key: 'DB_PASSWORD',
    insecureValue: '123456',
    message:
      'DB_PASSWORD is still set to the publicly-known default value. ' +
      'Set a strong database password immediately.',
  },
];
