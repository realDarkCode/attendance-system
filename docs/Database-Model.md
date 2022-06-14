# Database Model

## Table of contents

- [User-Model](#user-model)

## User Model

[User Model](../server/models/User.js) will contain authentication and authorization related information
| Field |Required | Type | validation |
| ------------ |------ | ------------- | ----------- |
| Name |True | String | . `minlen:6`, `maxlen:20` |
| Email |True | String | valid email address |
| Password |True | String | `minlen:6`, `maxlen:20` . |
| Roles |false | Array | [ `ADMIN`, `STUDENT`]. (Default: `STUDENT`) |
| AccountType |false | Enum | `PENDING` \|\| `ACTIVE` \|\| `REJECTED` (Default: `PENDING`) |
