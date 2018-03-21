drop table if exists oauth_client_details;
create table oauth_client_details (
  client_id text PRIMARY KEY,
  resource_ids BIGINT,
  client_secret VARCHAR(255),
  scope VARCHAR(255),
  authorized_grant_types VARCHAR(255),
  web_server_redirect_uri VARCHAR(255),
  authorities VARCHAR(255),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additional_information VARCHAR(4096),
  autoapprove VARCHAR(255)
);

create table if not exists oauth_client_token (
  token_id BIGINT,
  token BYTEA,
  authentication_id BIGSERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  client_id text
);

create table if not exists oauth_access_token (
  token_id BIGINT,
  token BYTEA,
  authentication_id BIGSERIAL PRIMARY KEY,
  user_name VARCHAR(255),
  client_id text,
  authentication BYTEA,
  refresh_token VARCHAR(255)
);

create table if not exists oauth_refresh_token (
  token_id BIGINT,
  token BYTEA,
  authentication BYTEA
);

create table if not exists oauth_code (
  code VARCHAR(255), authentication BYTEA
);

create table if not exists oauth_approvals (
	userId BIGINT,
	clientId text,
	scope VARCHAR(255),
	status VARCHAR(10),
	expiresAt TIMESTAMP,
	lastModifiedAt TIMESTAMP
);

create table if not exists ClientDetails (
  appId SERIAL PRIMARY KEY,
  resourceIds VARCHAR(255),
  appSecret VARCHAR(255),
  scope VARCHAR(255),
  grantTypes VARCHAR(255),
  redirectUrl VARCHAR(255),
  authorities VARCHAR(255),
  access_token_validity INTEGER,
  refresh_token_validity INTEGER,
  additionalInformation VARCHAR(4096),
  autoApproveScopes VARCHAR(255)
);