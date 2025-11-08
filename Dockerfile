FROM node:24-alpine

EXPOSE 3000
WORKDIR /usr/src/app

ENV HOST=0.0.0.0
ENV PORT=3000

COPY package.json pnpm-lock.yaml ./

RUN corepack enable && \
	corepack prepare pnpm@latest --activate && \
	pnpm install --frozen-lockfile

COPY . .
RUN pnpm run build

USER node
CMD [ "node", ".output/server/index.mjs" ]
