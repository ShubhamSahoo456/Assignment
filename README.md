Google Auth Flow

-> When Client clicks Login with Button The local server forward's user request to the google.

-> Google asks the user if they want to grant permission to the application.

->If user grants the permission google redirect to the local server. server holds the user take code from url.

->The server send request to google with code included.

->google sees the code and replies with details about the user

->the server get user details and create new record in the database
