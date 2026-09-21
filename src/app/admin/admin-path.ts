export function adminPath(
  key: string,
  opts?: { view?: "projects" | "messages"; editId?: string }
) {
  const params = new URLSearchParams();
  params.set("key", key);
  if (opts?.view) params.set("view", opts.view);
  if (opts?.editId) params.set("editId", opts.editId);
  return `/admin?${params.toString()}`;
}
