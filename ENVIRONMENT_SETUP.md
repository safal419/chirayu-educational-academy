# Environment Setup Guide

This project uses environment variables to configure API endpoints. Follow these steps to set up your environment:

## 1. Create Environment File

Create a `.env.local` file in the root directory of the project with the following content:

```env
# API Configuration
NEXT_PUBLIC_API_BASE_URL=http://localhost:3030

# Database Configuration (if needed)
# DATABASE_URL=your_database_url_here

# Authentication (if needed)
# NEXTAUTH_SECRET=your_secret_here
# NEXTAUTH_URL=http://localhost:3000

# Other environment variables
# NODE_ENV=development
```

## 2. Configure API Base URL

The main environment variable you need to set is:

- `NEXT_PUBLIC_API_BASE_URL`: The base URL for your backend API

### Examples:

For local development:

```env
NEXT_PUBLIC_API_BASE_URL=http://localhost:3030
```

For production:

```env
NEXT_PUBLIC_API_BASE_URL=https://api.chirayuacademy.edu.np
```

For staging:

```env
NEXT_PUBLIC_API_BASE_URL=https://staging-api.chirayuacademy.edu.np
```

## 3. API Endpoints

The application automatically constructs the following endpoints based on your `NEXT_PUBLIC_API_BASE_URL`:

- Events: `${NEXT_PUBLIC_API_BASE_URL}/events`
- Gallery: `${NEXT_PUBLIC_API_BASE_URL}/gallery`
- Notices: `${NEXT_PUBLIC_API_BASE_URL}/notices`
- Results: `${NEXT_PUBLIC_API_BASE_URL}/results`
- Upload: `${NEXT_PUBLIC_API_BASE_URL}/upload`
- Authentication: `${NEXT_PUBLIC_API_BASE_URL}/auth`
- User Profile: `${NEXT_PUBLIC_API_BASE_URL}/auth/profile`
- Change Password: `${NEXT_PUBLIC_API_BASE_URL}/auth/change-password`
- User Management: `${NEXT_PUBLIC_API_BASE_URL}/users`

## 4. Default Values

If no environment variable is set, the application will default to `http://localhost:3030` for all API calls.

## 5. Restart Required

After creating or modifying the `.env.local` file, restart your Next.js development server:

```bash
npm run dev
# or
yarn dev
# or
pnpm dev
```

## 6. Security Notes

- Never commit `.env.local` to version control
- Use `.env.example` for documenting required environment variables
- For production, set environment variables through your hosting platform's dashboard

## 7. Authentication

The application uses JWT-based authentication for admin access:

- **Login**: POST to `/auth` with email and password
- **Profile**: GET `/auth/profile` with Bearer token
- **Token Storage**: JWT tokens are stored in localStorage
- **Auto-logout**: Tokens are validated on each request and auto-expire

### Admin Access

1. Use valid email and password registered in your backend
2. Tokens are automatically managed by the frontend
3. Sessions persist across browser refreshes
4. Automatic logout when tokens expire

### Admin Features

- **Dashboard**: Overview of all content and statistics
- **Content Management**: Manage notices, events, and gallery
- **User Management**: Create new users and change passwords
- **Academic Management**: Handle SEE results and programs
- **Secure Authentication**: JWT-based login with role management

## 8. Troubleshooting

If API calls are not working:

1. Check that your `.env.local` file is in the root directory
2. Verify the `NEXT_PUBLIC_API_BASE_URL` is correct
3. Ensure your backend API is running and accessible
4. Restart your Next.js development server
5. Check the browser's network tab for failed requests

### Authentication Issues

1. **Login fails**: Check if backend auth endpoint is accessible
2. **Token expired**: Clear localStorage and login again
3. **Access denied**: Verify user has admin role in backend
4. **CORS errors**: Ensure backend allows frontend domain
