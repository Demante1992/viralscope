import apiCore from "./_shared/api-core.cjs";

export default async (request, context) => {
  return apiCore.handler(request, context);
};

export const config = {
  path: "/api/*"
};
