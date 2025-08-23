#!/usr/bin/env node

import { Server } from '@modelcontextprotocol/sdk/server/index.js';
import { StdioServerTransport } from '@modelcontextprotocol/sdk/server/stdio.js';
import {
  CallToolRequestSchema,
  ErrorCode,
  ListResourcesRequestSchema,
  ListToolsRequestSchema,
  McpError,
  ReadResourceRequestSchema,
} from '@modelcontextprotocol/sdk/types.js';
import { z } from 'zod';
import { PrismaClient } from '@prisma/client';

// Initialize Prisma client
const prisma = new PrismaClient();

// Validation schemas
const SearchUsersSchema = z.object({
  query: z.string().optional(),
  limit: z.number().int().positive().max(100).optional().default(10),
  offset: z.number().int().min(0).optional().default(0),
});

const AddUserSchema = z.object({
  name: z.string().min(1, 'Name is required'),
  email: z.string().email().optional(),
  phoneNumber: z.string().min(1, 'Phone number is required'),
});

const UpdateUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
  name: z.string().min(1).optional(),
  email: z.string().email().optional(),
  phoneNumber: z.string().optional(),
});

const DeleteUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
});

const GetUserSchema = z.object({
  id: z.string().min(1, 'User ID is required'),
});

// Create server instance
const server = new Server(
  {
    name: 'person-search-mcp-server',
    version: '1.0.0',
  },
  {
    capabilities: {
      resources: {},
      tools: {},
    },
  }
);

// List available tools
server.setRequestHandler(ListToolsRequestSchema, async () => {
  return {
    tools: [
      {
        name: 'search_users',
        description: 'Search for users in the person database',
        inputSchema: {
          type: 'object',
          properties: {
            query: {
              type: 'string',
              description: 'Search query to filter users by name, email, or phone number',
            },
            limit: {
              type: 'number',
              description: 'Maximum number of results to return (1-100)',
              minimum: 1,
              maximum: 100,
              default: 10,
            },
            offset: {
              type: 'number',
              description: 'Number of results to skip for pagination',
              minimum: 0,
              default: 0,
            },
          },
        },
      },
      {
        name: 'add_user',
        description: 'Add a new user to the person database',
        inputSchema: {
          type: 'object',
          properties: {
            name: {
              type: 'string',
              description: 'Full name of the user',
            },
            email: {
              type: 'string',
              description: 'Email address of the user',
              format: 'email',
            },
            phoneNumber: {
              type: 'string',
              description: 'Phone number of the user',
            },
          },
          required: ['name', 'phoneNumber'],
        },
      },
      {
        name: 'update_user',
        description: 'Update an existing user in the person database',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID of the user to update',
            },
            name: {
              type: 'string',
              description: 'New name for the user',
            },
            email: {
              type: 'string',
              description: 'New email address for the user',
              format: 'email',
            },
            phoneNumber: {
              type: 'string',
              description: 'New phone number for the user',
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'delete_user',
        description: 'Delete a user from the person database',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID of the user to delete',
            },
          },
          required: ['id'],
        },
      },
      {
        name: 'get_user',
        description: 'Get a specific user by ID from the person database',
        inputSchema: {
          type: 'object',
          properties: {
            id: {
              type: 'string',
              description: 'ID of the user to retrieve',
            },
          },
          required: ['id'],
        },
      },
    ],
  };
});

// List available resources
server.setRequestHandler(ListResourcesRequestSchema, async () => {
  return {
    resources: [
      {
        uri: 'person-search://users',
        mimeType: 'application/json',
        name: 'All Users',
        description: 'Complete list of all users in the person database',
      },
      {
        uri: 'person-search://stats',
        mimeType: 'application/json',
        name: 'Database Statistics',
        description: 'Statistics about the person database',
      },
      {
        uri: 'person-search://schema',
        mimeType: 'application/json',
        name: 'Database Schema',
        description: 'Schema information for the person database',
      },
    ],
  };
});

// Handle resource reading
server.setRequestHandler(ReadResourceRequestSchema, async (request) => {
  const { uri } = request.params;

  try {
    switch (uri) {
      case 'person-search://users': {
        const users = await prisma.user.findMany({
          orderBy: { createdAt: 'desc' },
        });
        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(users, null, 2),
            },
          ],
        };
      }

      case 'person-search://stats': {
        const totalUsers = await prisma.user.count();
        const usersWithEmail = await prisma.user.count({
          where: { email: { not: null } },
        });
        const recentUsers = await prisma.user.count({
          where: {
            createdAt: {
              gte: new Date(Date.now() - 7 * 24 * 60 * 60 * 1000), // Last 7 days
            },
          },
        });

        const stats = {
          totalUsers,
          usersWithEmail,
          usersWithoutEmail: totalUsers - usersWithEmail,
          recentUsers,
          lastUpdated: new Date().toISOString(),
        };

        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(stats, null, 2),
            },
          ],
        };
      }

      case 'person-search://schema': {
        const schema = {
          models: {
            User: {
              fields: {
                id: { type: 'String', required: true, primaryKey: true },
                name: { type: 'String', required: true },
                email: { type: 'String', required: false },
                phoneNumber: { type: 'String', required: true },
                createdAt: { type: 'DateTime', required: true, default: 'now()' },
                updatedAt: { type: 'DateTime', required: true, updatedAt: true },
              },
            },
          },
        };

        return {
          contents: [
            {
              uri,
              mimeType: 'application/json',
              text: JSON.stringify(schema, null, 2),
            },
          ],
        };
      }

      default:
        throw new McpError(ErrorCode.InvalidRequest, `Unknown resource: ${uri}`);
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Failed to read resource ${uri}: ${error}`
    );
  }
});

// Handle tool calls
server.setRequestHandler(CallToolRequestSchema, async (request) => {
  const { name, arguments: args } = request.params;

  try {
    switch (name) {
      case 'search_users': {
        const { query, limit, offset } = SearchUsersSchema.parse(args);
        
        const whereClause = query
          ? {
              OR: [
                { name: { contains: query, mode: 'insensitive' as const } },
                { email: { contains: query, mode: 'insensitive' as const } },
                { phoneNumber: { contains: query } },
              ],
            }
          : {};

        const users = await prisma.user.findMany({
          where: whereClause,
          take: limit,
          skip: offset,
          orderBy: { createdAt: 'desc' },
        });

        const total = await prisma.user.count({ where: whereClause });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                users,
                pagination: {
                  total,
                  limit,
                  offset,
                  hasMore: offset + limit < total,
                },
              }, null, 2),
            },
          ],
        };
      }

      case 'add_user': {
        const userData = AddUserSchema.parse(args);
        
        const newUser = await prisma.user.create({
          data: userData,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: 'User added successfully',
                user: newUser,
              }, null, 2),
            },
          ],
        };
      }

      case 'update_user': {
        const { id, ...updateData } = UpdateUserSchema.parse(args);
        
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { id },
        });

        if (!existingUser) {
          throw new McpError(ErrorCode.InvalidRequest, `User with ID ${id} not found`);
        }

        const updatedUser = await prisma.user.update({
          where: { id },
          data: updateData,
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: 'User updated successfully',
                user: updatedUser,
              }, null, 2),
            },
          ],
        };
      }

      case 'delete_user': {
        const { id } = DeleteUserSchema.parse(args);
        
        // Check if user exists
        const existingUser = await prisma.user.findUnique({
          where: { id },
        });

        if (!existingUser) {
          throw new McpError(ErrorCode.InvalidRequest, `User with ID ${id} not found`);
        }

        await prisma.user.delete({
          where: { id },
        });

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                message: 'User deleted successfully',
                deletedUser: existingUser,
              }, null, 2),
            },
          ],
        };
      }

      case 'get_user': {
        const { id } = GetUserSchema.parse(args);
        
        const user = await prisma.user.findUnique({
          where: { id },
        });

        if (!user) {
          throw new McpError(ErrorCode.InvalidRequest, `User with ID ${id} not found`);
        }

        return {
          content: [
            {
              type: 'text',
              text: JSON.stringify({
                success: true,
                user,
              }, null, 2),
            },
          ],
        };
      }

      default:
        throw new McpError(ErrorCode.MethodNotFound, `Unknown tool: ${name}`);
    }
  } catch (error) {
    if (error instanceof McpError) {
      throw error;
    }
    if (error instanceof z.ZodError) {
      throw new McpError(
        ErrorCode.InvalidParams,
        `Invalid parameters: ${error.errors.map(e => `${e.path.join('.')}: ${e.message}`).join(', ')}`
      );
    }
    throw new McpError(
      ErrorCode.InternalError,
      `Tool execution failed: ${error}`
    );
  }
});

// Error handling
process.on('SIGINT', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

process.on('SIGTERM', async () => {
  await prisma.$disconnect();
  process.exit(0);
});

// Start the server
async function main() {
  const transport = new StdioServerTransport();
  await server.connect(transport);
  console.error('Person Search MCP server running on stdio');
}

main().catch((error) => {
  console.error('Failed to start server:', error);
  process.exit(1);
});