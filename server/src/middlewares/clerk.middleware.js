import { requireAuth } from "@clerk/clerk-sdk-node";

// Middleware to validate Clerk sessions
const clerkAuthMiddleware = (req, res, next) => {
  requireAuth()(req, res, () => {
    req.user = req.auth.userId; // Clerk's user ID
    next();
  });
};

export default clerkAuthMiddleware;