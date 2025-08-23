# Person Search MCP Server

A Model Context Protocol (MCP) server that provides AI assistants with access to the person search application's database functionality.

## 🚀 Features

### Tools Available
- **search_users**: Search for users by name, email, or phone number with pagination
- **add_user**: Add a new user to the database
- **update_user**: Update an existing user's information
- **delete_user**: Remove a user from the database
- **get_user**: Retrieve a specific user by ID

### Resources Available
- **person-search://users**: Complete list of all users in the database
- **person-search://stats**: Database statistics (total users, recent additions, etc.)
- **person-search://schema**: Database schema information

## 📦 Installation

1. **Navigate to the MCP server directory**:
   ```bash
   cd mcp-server
   ```

2. **Install dependencies**:
   ```bash
   npm install
   ```

3. **Set up environment variables**:
   ```bash
   cp .env.example .env
   # Edit .env and add your DATABASE_URL
   ```

4. **Generate Prisma client**:
   ```bash
   npx prisma generate
   ```

## 🔧 Configuration

### Environment Variables
Create a `.env` file in the `mcp-server` directory:

```env
DATABASE_URL="your-neon-postgresql-connection-string"
PRISMA_LOG_LEVEL="info"
```

### MCP Client Configuration

To use this server with an MCP client like Claude Desktop, add the following to your MCP configuration:

#### Claude Desktop Configuration
Add to your Claude Desktop configuration file:

**Windows**: `%APPDATA%\\Claude\\claude_desktop_config.json`
**macOS**: `~/Library/Application Support/Claude/claude_desktop_config.json`

```json
{
  "mcpServers": {
    "person-search": {
      "command": "node",
      "args": ["path/to/person-search-1/mcp-server/dist/index.js"],
      "env": {
        "DATABASE_URL": "your-neon-postgresql-connection-string"
      }
    }
  }
}
```

## 🛠️ Development

### Build the server
```bash
npm run build
```

### Run in development mode
```bash
npm run dev
```

### Watch mode for development
```bash
npm run watch
```

## 🔍 Usage Examples

### Through MCP Client (Claude Desktop)

Once configured, you can interact with the person search database through natural language:

- "Search for users with the name John"
- "Add a new user named Alice with email alice@example.com and phone 555-0123"
- "Update user ID abc123 to change their email to newemail@example.com"
- "Delete the user with ID xyz789"
- "Show me all users in the database"
- "What are the current database statistics?"

### Direct Tool Calls

#### Search Users
```json
{
  "name": "search_users",
  "arguments": {
    "query": "john",
    "limit": 10,
    "offset": 0
  }
}
```

#### Add User
```json
{
  "name": "add_user",
  "arguments": {
    "name": "John Doe",
    "email": "john@example.com",
    "phoneNumber": "555-0123"
  }
}
```

#### Update User
```json
{
  "name": "update_user",
  "arguments": {
    "id": "user-id-here",
    "name": "John Smith",
    "email": "johnsmith@example.com"
  }
}
```

## 📋 API Reference

### Tools

#### search_users
Search for users in the database with optional filtering and pagination.

**Parameters:**
- `query` (optional): Search term to filter by name, email, or phone
- `limit` (optional): Maximum results (1-100, default: 10)
- `offset` (optional): Number of results to skip (default: 0)

#### add_user
Add a new user to the database.

**Parameters:**
- `name` (required): Full name of the user
- `phoneNumber` (required): Phone number of the user
- `email` (optional): Email address of the user

#### update_user
Update an existing user's information.

**Parameters:**
- `id` (required): ID of the user to update
- `name` (optional): New name for the user
- `email` (optional): New email address
- `phoneNumber` (optional): New phone number

#### delete_user
Remove a user from the database.

**Parameters:**
- `id` (required): ID of the user to delete

#### get_user
Retrieve a specific user by their ID.

**Parameters:**
- `id` (required): ID of the user to retrieve

### Resources

#### person-search://users
Returns a JSON array of all users in the database, ordered by creation date (newest first).

#### person-search://stats
Returns database statistics including:
- Total number of users
- Users with/without email addresses
- Recently added users (last 7 days)
- Last updated timestamp

#### person-search://schema
Returns the database schema information for the User model.

## 🔒 Security Considerations

- The MCP server connects directly to your database
- Ensure your DATABASE_URL is kept secure
- Consider implementing rate limiting for production use
- The server runs with full database access - use appropriate network security

## 🐛 Troubleshooting

### Common Issues

1. **Prisma Client not generated**:
   ```bash
   npx prisma generate
   ```

2. **Database connection issues**:
   - Verify your DATABASE_URL is correct
   - Ensure your database is accessible
   - Check firewall settings

3. **TypeScript compilation errors**:
   ```bash
   npm run build
   ```

## 📄 License

MIT License - see the main project's license file.