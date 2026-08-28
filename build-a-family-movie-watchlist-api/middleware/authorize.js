export function authorizeModification(req, res, next) {
  const userId = String(req.user.id);
  const requestedUserId = String(req.params.userId);

  if (req.user.role === "parent") {
    return next();
  }

  if (
    req.user.role === "child" &&
    userId === requestedUserId
  ) {
    return next();
  }

  return res.status(403).json({
    error: "Access denied"
  });
}
