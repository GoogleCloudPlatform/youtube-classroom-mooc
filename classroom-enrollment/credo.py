from google.oauth2 import service_account

credentials = service_account.Credentials.from_service_account_file(
    'service.json')

scoped_credentials = credentials.with_scopes(
    ['https://www.googleapis.com/auth/cloud-platform'])
